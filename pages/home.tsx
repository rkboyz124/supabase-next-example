import React from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';

import fetchUser, { TResult } from '../api/fetchUser';
import { IUser } from '../types/IProfile';

const Home = ({ user }: { user: IUser }) => (
  <div className="w-full px-8">
    <div className="px-8 flex flex-col justify-center">
      <h1 className="text-2xl w-full text-center mb-5">
        Welcome to Booths2Go:
      </h1>
      <div className="flex flex-row justify-center">
        {user.profile.avatar_url && (
          <img
            src={user.profile.avatar_url}
            alt="Picture of the author"
            className="rounded-full"
            width={40}
            height={40}
          />
        )}
        <span className="text-2xl ml-4 text-center font-bold">
          {user.profile.full_name}
        </span>
      </div>
    </div>
  </div>
);

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const supabase = createServerSupabaseClient(context);
  const result = await fetchUser({ supabase });

  return result;
};

export default Home;
