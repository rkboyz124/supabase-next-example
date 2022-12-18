import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

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

export default Home;
