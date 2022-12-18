import React from 'react';
import { Card, Typography, Space, IconTrash } from '@supabase/ui';
import Link from 'next/link';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

// Only users login can access this
const Users = ({ profiles }) => (
  <div style={{ maxWidth: '800px', margin: '96px auto' }}>
    <Card>
      <Space direction="vertical" size={6}>
        <Typography.Text>Users Table</Typography.Text>

        {profiles?.map((prof) => (
          <Card
            key={prof.id}
            style={{
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>{prof.full_name}</Typography.Text>
              <Typography.Text>{prof.role < 2 ? 'user' : 'admin'}</Typography.Text>
              {prof.role && <IconTrash />}
            </div>
          </Card>
        ))}

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

  if (!session || profile[0].role !== 2) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  const { data: profiles } = await supabase.from('profiles').select();

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] },
      profiles,
    },
  };
};

export default Users;

