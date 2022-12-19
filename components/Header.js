'use client';

import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const DEFAULT_LINKS = [
  {
    link: '/profile',
    label: 'Profile'
  },
  {
    link: '/items',
    label: 'Items List'
  },
  {
    link: '/users',
    label: 'Users Panel'
  }
];

const Header = ({ user }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };

  const renderLink = ({ link, label }) => (
    <Link
      href={link}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
      key={link}
    >
      {label}
    </Link>
  );

  const renderLinks = () => (
    <div className="hidden sm:ml-6 sm:block">
      <div className="flex space-x-4">
        {renderLink({
          link: '/home',
          label: 'Home'
        })}
        {renderLink({
          link: '/profile',
          label: 'Profile'
        })}
        {renderLink({
          link: '/items',
          label: 'Items List'
        })}
        {user.profile.role === 2 &&
          renderLink({ link: '/users', label: 'Users Panel' })}
        <button
          type="submit"
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full p-8">
      <div className="flex-auto w-full flex flex-row place-content-between">
        <div className="flex flex-row">
          <h2 className="mr-5">Booths2Go</h2>
          <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
        </div>
        {user && renderLinks()}
      </div>
    </div>
  );
};

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

export default Header;
