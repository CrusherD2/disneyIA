// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrxlvbuxmqqnhrcxfmob.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyeGx2YnV4bXFxbmhyY3hmbW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MzMxMDMsImV4cCI6MjA0NDIwOTEwM30.gJT7pvrY-ttsjsG2UhsE3Tcm12bUuAC__pTcJ7_Nqks';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);