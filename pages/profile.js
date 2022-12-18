import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Only users login can access this
const Profile = ({ user }) => (
  <div className="px-8">
    <h1 className="text-2xl font-bold">User Data</h1>
    <pre className="mt-8">
      <code>{JSON.stringify(user, null, 2)}</code>
    </pre>
  </div>
);

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

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] }
    }
  };
};

export default Profile;
