import { Auth } from "@supabase/auth-ui-react/dist/esm/src/types"
import { Database } from "./supabase"

export type TProfile = Database['public']['Tables']['profiles']['Row'];

export interface IUser extends Auth {
  profile: TProfile
}