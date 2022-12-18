import { supabase } from '../../lib/initSupabase'

// Example of how to verify and get user data server-side.
const getUser = async (req, res) => {
  const token = req.headers.token

  const { data: user, error } = await supabase.auth.api.getUser(token)

  if (error) return res.status(401).json({ error: error.message })
  
  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id);

  return res.status(200).json({...user, profile: profiles[0] })
}

export default getUser
