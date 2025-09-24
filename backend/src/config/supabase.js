import { createClient } from '@supabase/supabase-js';

export const supabase = (env) => {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error('Variables de entorno de Supabase no configuradas');
  }
  
  return createClient(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_KEY || env.SUPABASE_ANON_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};