/* eslint-disable camelcase */
import React, { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import fetchUser, { TResult } from '../api/fetchUser';
import LoginModal from '../components/LoginModal';

// Only users login can access this
const Users = ({ profiles, triggerLogin }) => {
  const [open, setOpen] = useState<boolean>(true);
  const [loginSuccess, setLoginSuccess] = useState(!triggerLogin);
  const renderRow = ({ full_name, role, id }) => (
    <tr key={id}>
      <td className="text-center">{full_name}</td>
      <td className="text-center">{role < 2 ? 'user' : 'admin'}</td>
      <td className="text-center">
        <button
          type="submit"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Delete
        </button>
      </td>
    </tr>
  );

  return (
    <div className="px-8">
      {!loginSuccess ? (
        <>
          <LoginModal
            setLoginSuccess={setLoginSuccess}
            open={open}
            setOpen={setOpen}
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">User List</h1>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{profiles?.map(renderRow)}</tbody>
          </table>
        </>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const result: TResult = await fetchUser({ supabase });

  if (
    !result?.props?.initialSession ||
    result?.props?.user.profile.role !== 2
  ) {
    return {
      // redirect: {
      //   destination: '/home',
      //   permanent: false
      // }
      props: {
        triggerLogin: true
      }
    };
  }

  const { data: profiles } = await supabase.from('profiles').select();

  if (result.redirect) {
    return {
      // redirect: result.redirect
      props: {
        triggerLogin: true
      }
    };
  }

  return {
    ...result,
    props: {
      ...result.props,
      profiles
    }
  };
};

export default Users;
