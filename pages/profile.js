import React from 'react';
import { Card, Typography, Space } from '@supabase/ui';
import Link from 'next/link';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Only users login can access this
const Profile = ({ user }) => (
  <div style={{ maxWidth: '800px', margin: '96px auto' }}>
    <Card>
      <Space direction="vertical" size={6}>
        <Typography.Text>User Data</Typography.Text>

        <Typography.Text>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </Typography.Text>

        <Typography.Text>
          <Link href="/">Back to home</Link>
        </Typography.Text>
      </Space>
    </Card>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session?.user?.id);

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] },
    },
  };
};

export default Profile;
