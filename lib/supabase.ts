import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Guest {
  id: number;
  name: string;
  group_name: string;
  created_at?: string;
}

export interface GuestResponse {
  id?: number;
  guest_id: number;
  is_attending: boolean;
  dietary_notes?: string;
  transport_method?: string;
  has_plus_one?: boolean;
  plus_one_name?: string;
  plus_one_dietary_notes?: string;
  submitted_at?: string;
}

export interface SongRequest {
  id?: number;
  song_name: string;
  submitted_by?: string;
  created_at?: string;
}
