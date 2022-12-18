import { supabase } from '../../lib/initSupabase'

const getProfiles = async (req, res) => {
  const token = req.headers.token
  const { data: user, error } = await supabase.auth.api.getUser(token)

  if (error) return res.status(401).json({ error: error.message })

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id);
  
  const { data } = await supabase
    .from('profiles')
    .select();
  
  return res.status(200).json(profiles[0].role === 2 ? data : [])
}

export default getProfiles
