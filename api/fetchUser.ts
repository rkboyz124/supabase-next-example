import { SupabaseClient } from "@supabase/supabase-js";
import { TUserData } from "../utils/UserType";

type FetchUserType = {
  supabase: SupabaseClient;
  shouldRedirect?: boolean;
  additionalProps?: object;
  redirect?: object;
}

export type TResult = {
  redirect?: object;
  props?: TUserData
}

const fetchUser = async ({
  supabase,
  shouldRedirect = true,
  additionalProps,
  redirect
}: FetchUserType) => {
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
          ...additionalProps,
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

  const result: TResult = {
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
