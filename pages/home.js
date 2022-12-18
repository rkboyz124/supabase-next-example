import Link from 'next/link';
import { Card, Typography, Button, Icon, Space } from '@supabase/ui';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Home = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const logout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };
  return (
    <div style={{ maxWidth: !user ? '400px' : '800px', margin: '96px auto' }}>
      <Card>
        <br />
        <Space direction="vertical" size={8}>
          <div>
            <div>
              <img
                src="https://app.supabase.io/img/supabase-dark.svg"
                width="96"
              />
              <Button icon={<Icon type="LogOut" />} type="outline" onClick={logout}>
                Log out
              </Button>
            </div>

            <Typography.Title level={3}>
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Typography.Text>
            <Link href="/profile">Profile</Link>
            <br />
            <Link href="/items">Items List</Link>
            {user?.profile?.role === 2 && (
              <>
                <br />
                <Link href="/users">Users Panel</Link>
              </>
            )}
          </Typography.Text>
        </Space>
      </Card>
    </div>
  );
};

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

export default Home;
