import { Card, Typography, Space } from '@supabase/ui';
import {
  Auth,
  // Import predefined theme
  ThemeSupa,
} from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const Index = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [authView, setAuthView] = useState('sign_in');

  useEffect(() => {
    if (user) router.push('/home');
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password');
        if (event === 'USER_UPDATED') { setTimeout(() => setAuthView('sign_in'), 1000); }
        if (event === 'SIGNED_IN') router.push('/home');
      },
    );

    return () => {
      if (authListener && authListener?.unsubscribe) {
        authListener?.unsubscribe();
      }
    };
  }, []);

  return (
    <div style={{ maxWidth: '400px', margin: '96px auto' }}>
      <Card>
        <Space direction="vertical" size={8}>
          <div>
            <img
              src="https://app.supabase.io/img/supabase-dark.svg"
              width="96"
            />
            <Typography.Title level={3}>
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Auth
            redirectTo="http://localhost:3000/home"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            onlyThirdPartyProviders
            providers={['google', 'facebook', 'github', 'twitter']}
            view={authView}
            socialLayout="vertical"
            socialButtonSize="xlarge"
          />
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

  const props = {
    initialSession: null,
    user: null,
  };

  if (session) {
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('id', session?.user?.id);

    props.initialSession = session;
    props.user = { ...session?.user, profile: profile[0] };
  }

  if (props.initialSession && props.user) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
      props,
    };
  }
  return { props };
};

export default Index;
