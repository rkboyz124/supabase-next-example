const fetchUser = async ({
  supabase,
  shouldRedirect = true,
  additionalProps,
  redirect
}) => {
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    if (shouldRedirect) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      };
    } else {
      return {
        props: {
          initialSession: null,
          user: null
        }
      };
    }
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session?.user?.id);

  const result = {
    props: {
      ...additionalProps,
      initialSession: session,
      user: { ...session?.user, profile: profile[0] }
    }
  };

  if (redirect) result.redirect = redirect;

  return result;
};

export default fetchUser;
