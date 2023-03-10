'use client';
import React from 'react';
import Link from 'next/link';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { IUser } from '../types/IProfile';

const Header = ({ user }: { user: IUser }) => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };

  const renderLink = ({ link, label }: { link: string; label: string }) => (
    <Link
      // @ts-ignore
      href={link}
      className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
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
          link: '/items',
          label: 'Items List'
        })}
        {user &&
          renderLink({
            link: '/profile',
            label: 'Profile'
          })}
        {renderLink({ link: '/users', label: 'Users Panel' })}
        {user && (
          <button
            type="submit"
            className="text-gray-500 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full p-8">
      <div className="flex-auto w-full flex flex-row place-content-between">
        <div className="flex flex-row">
          <h2 className="mr-5 text-2xl">Booths2Go</h2>
          <img src="https://app.supabase.io/img/supabase-dark.svg" width="96" />
        </div>
        {renderLinks()}
      </div>
    </div>
  );
};

export default Header;
