import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "CRITICAL: Missing Supabase environment variables (URL or Service Key). Exiting."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
