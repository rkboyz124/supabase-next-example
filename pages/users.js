import React, { useEffect } from 'react';
import { Card, Typography, Space, IconTrash, Auth } from '@supabase/ui';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';

import { supabase } from '../lib/initSupabase';
import { fetchEntity } from './api/fetchEntity';

// Only users login can access this
const List = ({ profile }) => {
  const { user, session } = Auth.useUser();
  const { data: profiles, error } = useSWR(
    session ? ['/api/getProfiles', session.access_token] : null,
    fetchEntity({ method: 'get' })
  );

  useEffect(() => {
    if (profile.role < 2) {
      router.push('/');
    };

  }, [profile])
  const router = useRouter();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.push('/');
  };

  return (
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
                <Typography.Text>{profile.role < 2 ? 'user' : 'admin'}</Typography.Text>
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
  
  return { props: { profile: profiles[0]} };
}

export default List;
