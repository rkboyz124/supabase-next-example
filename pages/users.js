/* eslint-disable camelcase */
import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Only users login can access this
const Users = ({ profiles }) => {
  const renderRow = ({ full_name, role }) => (
    <tr>
      <td>{full_name}</td>
      <td>{role}</td>
      <td>
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
      <h2>Users</h2>
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
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session?.user?.id);

  if (!session || profile[0].role !== 2) {
    return {
      redirect: {
        destination: '/home',
        permanent: false
      }
    };
  }

  const { data: profiles } = await supabase.from('profiles').select();

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] },
      profiles
    }
  };
};

export default Users;
