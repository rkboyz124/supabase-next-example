import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import fetchUser from '../api/fetchUser';
import { IUser } from '../types/IProfile';

// Only users login can access this
const Profile = ({ user }: { user: IUser }) => (
  <div className="px-8">
    <h1 className="text-2xl font-bold">User Data</h1>
    <pre className="mt-8">
      <code>{JSON.stringify(user, null, 2)}</code>
    </pre>
  </div>
);

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient(ctx);
  const result = await fetchUser({ supabase });
  return result;
};

export default Profile;
