import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vecslxbrfcdvdefarnbd.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlY3NseGJyZmNkdmRlZmFybmJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NjQ2NDUsImV4cCI6MjA5NjM0MDY0NX0.rDdxsw7on62AKDWCUQdZlewsbnT8s4RWKM_nN9MRX-Q"
);