import React from 'react';
import {
  Auth,
  // Import predefined theme
  ThemeSupa
} from '@supabase/auth-ui-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from './Modal';

interface IProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoginSuccess: (v: boolean) => void;
}

const LoginModal: React.FC<IProps> = ({
  // user
  open,
  setOpen,
  setLoginSuccess
}) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  console.log(router);

  useEffect(() => {
    // if (user) router.push('/home');
    supabaseClient.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setLoginSuccess(true);
      }
    });
  }, []);

  return (
    <Modal open={open} setOpen={setOpen} withFooter={false}>
      <div className="inline-flex self-center">
        <h1 className="text-2xl font-bold mr-5">Welcome to Booths2Go</h1>
        <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
      </div>
      <div className="inline-flex self-center">
        <Auth
          redirectTo={`http://localhost:3000${router.pathname}`}
          appearance={{ theme: ThemeSupa }}
          supabaseClient={supabaseClient}
          providers={['google', 'facebook', 'github', 'twitter']}
          view="sign_in"
          socialLayout="vertical"
          magicLink
        />
      </div>
    </Modal>
  );
};

export default LoginModal;
