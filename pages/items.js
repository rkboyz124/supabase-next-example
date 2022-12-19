import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import fetchUser from '../api/fetchUser';

// Only users login can access this
const Items = ({ user, items }) => {
  const renderRow = ({ name }) => (
    <tr key={name}>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{items?.map(renderRow)}</tbody>
      </table>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const { data: items } = await supabase.from('item').select();
  const result = await fetchUser({ supabase, additionalProps: { items } });
  return result;
};

export default Items;