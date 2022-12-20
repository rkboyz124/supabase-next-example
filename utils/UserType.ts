import { Session, User } from "@supabase/supabase-js";


export type TUserWithProfile = User & {
  profile: {
    username: string;
    full_name: string;
    role: number;
  }
};

export type TUserData = {
  initialSession?: Session;
  user?: TUserWithProfile;
};