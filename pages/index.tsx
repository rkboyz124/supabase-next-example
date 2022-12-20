import {
  Auth,
  // Import predefined theme
  ThemeSupa
} from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import fetchUser from '../api/fetchUser';

const Index = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/home');
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') router.push('/home');
    });
  }, []);

  return (
    <div className="flex flex-col justify-center mt-8">
      <div className="inline-flex self-center">
        <h1 className="text-5xl font-bold mr-5">Welcome to Booths2Go</h1>
        <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
      </div>
      <div className="inline-flex self-center">
        <Auth
          redirectTo="http://localhost:3000/home"
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['google', 'facebook', 'github', 'twitter']}
          view="sign_in"
          socialLayout="vertical"
          magicLink
        />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);

  const result = await fetchUser({
    supabase,
    shouldRedirect: false,
    redirect: {
      destination: '/home',
      permanent: false
    }
  });

  return result;
};

export default Index;
