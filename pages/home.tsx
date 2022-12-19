import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next'

import fetchUser from '../api/fetchUser';

const Home = ({ user }) => (
  <div className="w-full px-8">
    <div className="px-8 flex flex-col justify-center">
      <h1 className="text-2xl w-full text-center mb-5">
        Welcome to Booths2Go:
      </h1>
      <div className="flex flex-row justify-center">
        <img
          src={user.profile.avatar_url}
          alt="Picture of the author"
          className="rounded-full"
          width={40}
          height={40}
        />
        <span className="text-2xl ml-4 text-center font-bold">
          {user.profile.full_name}
        </span>
      </div>
    </div>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const result = await fetchUser({ supabase });

  return result;
};

export default Home;
