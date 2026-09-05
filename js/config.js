// ═══════════════════════════════════════════════
// SUPABASE CONFIG
// ═══════════════════════════════════════════════
alert("ETAPE 1 : config.js commence à s'exécuter");

const SUPABASE_URL = "https://jpplgrntcihsptjthita.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwcGxncm50Y2loc3B0anRoaXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5MTExODAsImV4cCI6MjA5NjQ4NzE4MH0.3MUzBoE2b7_PAXKgNjeWx3txfdFOicKqLnr8GStJ4vY";

let currentUser = null;
let userProfile = null;
let isDailyMode = false;
let isDuelMode  = false;
let duelId      = null;
let duelChannel = null;
let lastGameResult = null;
const gameDetailStore = {}; // stockage temporaire des parties pour le détail

alert("ETAPE 2 : variables déclarées, sur le point de créer le client Supabase");

// Init Supabase (SDK chargé en <head>)
window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

alert("ETAPE 3 : client Supabase créé, ajout du listener DOMContentLoaded");

document.addEventListener("DOMContentLoaded", initApp);

alert("ETAPE 4 : listener ajouté, fin de config.js");

async function initApp() {
  alert("ETAPE 5 : initApp() démarre - sur le point d'appeler loadDictionary()");
  loadDictionary();
  alert("ETAPE 6 : loadDictionary() appelée (fonction async, retour immédiat normal)");
  const { data: { session } } = await sb.auth.getSession();
  alert("ETAPE 7 : session Supabase récupérée");
  if (session?.user) {
    currentUser = session.user;
    await loadUserProfile();
    updateProfileUI();
    buildSplash();
    showScreen("splash");
  } else {
    showScreen("auth");
  }
}

const DICT_URL = "dico-fr-5-10.txt";
