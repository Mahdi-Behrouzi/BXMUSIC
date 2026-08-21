window.BXMUSIC_ACCOUNT = {
  user: null,
  session: null,
  profile: null,
  settings: null,
  initialized: false
};

async function initAccount() {
  if (!window.supabase || !window.BXMUSIC_SUPABASE) {
    console.warn("BXMUSIC: Supabase is not configured.");
    return;
  }

  const { url, key } = window.BXMUSIC_SUPABASE;

  if (!url || !key) {
    console.warn("BXMUSIC: Supabase URL or key is missing.");
    return;
  }

  window.bxSupabase = window.supabase.createClient(url, key);

  const { data, error } = await window.bxSupabase.auth.getSession();

  if (error) {
    console.error("BXMUSIC: Could not get session.", error);
    return;
  }

  window.BXMUSIC_ACCOUNT.session = data.session || null;
  window.BXMUSIC_ACCOUNT.user = data.session?.user || null;

  if (window.BXMUSIC_ACCOUNT.user) {
    await loadAccountData();
  }

  window.bxSupabase.auth.onAuthStateChange(async (_event, session) => {
    window.BXMUSIC_ACCOUNT.session = session || null;
    window.BXMUSIC_ACCOUNT.user = session?.user || null;

    if (session?.user) {
      await loadAccountData();
    } else {
      window.BXMUSIC_ACCOUNT.profile = null;
      window.BXMUSIC_ACCOUNT.settings = null;
    }

    if (typeof updateAccountUI === "function") {
      updateAccountUI();
    }
  });

  window.BXMUSIC_ACCOUNT.initialized = true;
}


async function loadAccountData() {
  const user = window.BXMUSIC_ACCOUNT.user;

  if (!user || !window.bxSupabase) return;

  const userId = user.id;

  const [profileResult, settingsResult] = await Promise.all([
    window.bxSupabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle(),

    window.bxSupabase
      .from("user_settings")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
  ]);

  if (profileResult.error) {
    console.error(
      "BXMUSIC: Could not load profile.",
      profileResult.error
    );
  }

  if (settingsResult.error) {
    console.error(
      "BXMUSIC: Could not load settings.",
      settingsResult.error
    );
  }

  window.BXMUSIC_ACCOUNT.profile = profileResult.data || null;
  window.BXMUSIC_ACCOUNT.settings = settingsResult.data || null;
}


async function signInWithGoogle() {
  if (!window.bxSupabase) {
    console.error("BXMUSIC: Supabase is not initialized.");
    return;
  }

  const { error } = await window.bxSupabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });

  if (error) {
    console.error(
      "BXMUSIC: Google sign-in failed.",
      error
    );
  }
}


async function signOutAccount() {
  if (!window.bxSupabase) return;

  const { error } = await window.bxSupabase.auth.signOut();

  if (error) {
    console.error(
      "BXMUSIC: Sign out failed.",
      error
    );
  }
}


function isLoggedIn() {
  return !!window.BXMUSIC_ACCOUNT.user;
}


function getCurrentUser() {
  return window.BXMUSIC_ACCOUNT.user;
}


function getCurrentProfile() {
  return window.BXMUSIC_ACCOUNT.profile;
}


function getAccountSettings() {
  return window.BXMUSIC_ACCOUNT.settings;
}
