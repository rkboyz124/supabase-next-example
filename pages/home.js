import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import fetchUser from '../api/fetchUser';

const Home = ({ user }) => (
  <div className="w-full px-8">
    <div className="px-8">
      <h1 className="text-2xl">
        Welcome to Booths2Go,{' '}
        <span className="font-bold">{user.profile.full_name}</span>
      </h1>
    </div>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const result = await fetchUser({ supabase });

  return result;
};

export default Home;
