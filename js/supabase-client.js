import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const cfg = window.JHEYVX_CONFIG || {};
export const cloudReady = /^https:\/\//.test(cfg.supabaseUrl || "") &&
  cfg.supabaseKey && !cfg.supabaseUrl.includes("PEGA_AQUI") && !cfg.supabaseKey.includes("PEGA_AQUI");
export const supabase = cloudReady ? createClient(cfg.supabaseUrl, cfg.supabaseKey) : null;
