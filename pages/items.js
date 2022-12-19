import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Only users login can access this
const Items = ({ user, items }) => {
  const renderRow = ({ name }) => (
    <tr>
      <td className="text-center">{name}</td>
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

  //   {!items?.length && <Typography.Text>No items yet</Typography.Text>}
  return (
    <div className="px-8">
      <h1 className="text-2xl font-bold">Items</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Name</th>
            {user.profile.role === 2 && <th>Action</th>}
          </tr>
        </thead>
        <tbody>{items?.map(renderRow)}</tbody>
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
  const { data: items } = await supabase.from('item').select();

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] },
      items
    }
  };
};

export default Items;
