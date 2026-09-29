// =========================================================
// CONEXIÓN CON SUPABASE
// =========================================================

const SUPABASE_URL =
    "https://sqrvjohfhektbkncvkws.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_Zne2jj7TBBtmgbpnbzgL3Q_7SaBlN92";


window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
