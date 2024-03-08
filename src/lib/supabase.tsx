import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://cklupufziatbsmidhueh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrbHVwdWZ6aWF0YnNtaWRodWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4NzI4MjcsImV4cCI6MjAyNTQ0ODgyN30.tvnqPlJrknZcFR9UvPj9Rj5Pr2wc2k5yZjB62grTF-w";
const supabase = createClient(supabaseUrl, supabaseKey);
