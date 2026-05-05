import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = (import.meta.env.VITE_SUPABASE_URL  as string) ?? 'https://anrqssuiivuhqmbzvryt.supabase.co';
const supabaseAnon = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucnFzc3VpaXZ1aHFtYnp2cnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjExMDAsImV4cCI6MjA5MzQ5NzEwMH0.womEHZvl4vrIelti3WqCeoMpUX2-TnMKlWEbCUMq-XY';

export const supabase = createClient(supabaseUrl, supabaseAnon);
