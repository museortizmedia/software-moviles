// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'TU_SUPABASE_URL_AQUÍ';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'TU_SUPABASE_KEY_AQUÍ';

if (!supabaseUrl || supabaseUrl.includes('TU_SUPABASE_URL')) {
  console.error('Supabase URL no está configurada. Verifica VITE_SUPABASE_URL en .env');
}

if (!supabaseAnonKey || supabaseAnonKey.includes('TU_SUPABASE_KEY')) {
  console.error('Supabase anon key no está configurada. Verifica VITE_SUPABASE_ANON_KEY en .env');
}

console.debug('Supabase client inicializado con URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);