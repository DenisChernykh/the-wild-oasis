import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://qhogqiwcycfbqbukgglw.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFob2dxaXdjeWNmYnFidWtnZ2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTY0NTQsImV4cCI6MjA0NTI3MjQ1NH0.SGU4Jz7pGnL9s2_uUvF1pRIYiP9uyHnPz4sThqb8zaE';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
