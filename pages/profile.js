import React from 'react';
import { Card, Typography, Space, IconTrash } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Only users login can access this
const List = ({ profile, items }) => {
  const router = useRouter();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '96px auto' }}>
      <Card>
        <Space direction="vertical" size={6}>
          <Typography.Text>User Data</Typography.Text>

          <Typography.Text>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Typography.Text>

          <Typography.Text>
            <Link href="/">Back to home</Link>
          </Typography.Text>
        </Space>
      </Card>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const { user: userCookie } = await supabase.auth.api.getUserByCookie(req);

  if (!userCookie) {
    // If no user, redirect to index.
    // Since this is an authenticated route
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }

  // If there is a user, get details
  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', userCookie.id);

  return { props: { profile: profiles[0] } };
}

export default List;
