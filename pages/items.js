import React from 'react';
import { Card, Typography, Space, IconTrash } from '@supabase/ui';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

// Only users login can access this
const Items = ({ user, items }) => (
  <div style={{ maxWidth: '800px', margin: '96px auto' }}>
    <Card>
      <Space direction="vertical" size={6}>
        {!items?.length && <Typography.Text>No items yet</Typography.Text>}
        {items?.map((item) => (
          <Card
            key={item.id}
            style={{
              color: 'white',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography.Text>{item.name}</Typography.Text>
              {user.profile.role === 2 && <IconTrash />}
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
  const { data: items } = await supabase.from('item').select();

  return {
    props: {
      initialSession: session,
      user: { ...session?.user, profile: profile[0] },
      items,
    },
  };
};

export default Items;
