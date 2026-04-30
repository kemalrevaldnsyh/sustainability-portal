import { createClient } from "@supabase/supabase-js";

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store",
};

function getClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  const supabaseKey = supabaseServiceRoleKey || supabaseAnonKey;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = getClient();
  if (!supabase) {
    return res.status(500).setHeader("Content-Type", "application/json").end(
      JSON.stringify({
        error: "Supabase env variables are missing (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY)",
      })
    );
  }

  const { category } = req.query;

  let query = supabase.from("documents").select("*").order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return res.status(500).setHeader("Content-Type", "application/json").end(
      JSON.stringify({
        error: error.message,
      })
    );
  }

  res.status(200).setHeader("Content-Type", "application/json").setHeader("Cache-Control", headers["Cache-Control"]).end(
    JSON.stringify({ data })
  );
}
