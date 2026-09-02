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

  try {
    window.bxSupabase = window.supabase.createClient(url, key);
  } catch (e) {
    console.warn("BXMUSIC: Invalid Supabase URL/key — fill in js/config/supabase.js with your real project values.", e);
    return;
  }

  let data, error;
  try {
    ({ data, error } = await window.bxSupabase.auth.getSession());
  } catch (e) {
    console.warn("BXMUSIC: Could not reach Supabase — check js/config/supabase.js.", e);
    return;
  }

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
    return { success: false, error: "Supabase is not initialized." };
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
    return { success: false, error: error.message };
  }

  return { success: true };
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
async function signUpWithEmail(email, password, name = "") {
  if (!window.bxSupabase) {
    console.error("BXMUSIC: Supabase is not initialized.");
    return { success: false, error: "Supabase is not initialized." };
  }

  const { data, error } = await window.bxSupabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        full_name: name.trim()
      }
    }
  });

  if (error) {
    console.error("BXMUSIC: Sign up failed.", error);
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data
  };
}


async function signInWithEmail(email, password) {
  if (!window.bxSupabase) {
    console.error("BXMUSIC: Supabase is not initialized.");
    return { success: false, error: "Supabase is not initialized." };
  }

  const { data, error } = await window.bxSupabase.auth.signInWithPassword({
    email: email.trim(),
    password
  });

  if (error) {
    console.error("BXMUSIC: Sign in failed.", error);
    return { success: false, error: error.message };
  }

  window.BXMUSIC_ACCOUNT.session = data.session;
  window.BXMUSIC_ACCOUNT.user = data.user;

  await loadAccountData();

  if (typeof updateAccountUI === "function") {
    updateAccountUI();
  }

  return {
    success: true,
    data
  };
}


async function resetAccountPassword(email) {
  if (!window.bxSupabase) {
    return {
      success: false,
      error: "Supabase is not initialized."
    };
  }

  const { error } = await window.bxSupabase.auth.resetPasswordForEmail(
    email.trim(),
    {
      redirectTo:
        window.location.origin + window.location.pathname
    }
  );

  if (error) {
    console.error(
      "BXMUSIC: Password reset failed.",
      error
    );

    return {
      success: false,
      error: error.message
    };
  }

  return {
    success: true
  };
}
function handleAccountClick(){
  if(window.BXMUSIC_ACCOUNT && window.BXMUSIC_ACCOUNT.user){
    if(typeof openEditProfile === 'function'){
      openEditProfile();
    }
    return;
  }
  openAuth();
}

async function handleSignOutClick(){
  await signOutAccount();
  updateAccountUI();
  if(typeof showToast === 'function') showToast('Signed out');
}

function updateAccountUI(){
  const account = window.BXMUSIC_ACCOUNT;
  const isLoggedIn = !!(account && account.user);
  const nameEl = document.getElementById('settingsName');
  const subEl = document.getElementById('accountMenuSub');
  const signOutRow = document.getElementById('signOutRow');

  if(isLoggedIn){
    const displayName = account.profile?.full_name || account.user.user_metadata?.full_name || account.user.email || 'Account';
    if(nameEl) nameEl.textContent = displayName;
    if(subEl) subEl.textContent = account.user.email || 'Account & Settings';
    if(signOutRow) signOutRow.classList.remove('hidden');
    if(typeof profile !== 'undefined'){
      profile.name = displayName;
      if(typeof renderProfileHeader === 'function') renderProfileHeader();
    }
  } else {
    if(nameEl) nameEl.textContent = 'Sign in';
    if(subEl) subEl.textContent = 'Account & Settings';
    if(signOutRow) signOutRow.classList.add('hidden');
  }
}
function openAuth(){
  const backdrop=document.getElementById('authBackdrop');
  if(!backdrop)return;
  backdrop.classList.add('open');
  setAuthMode('signup');
}

function closeAuth(){
  const backdrop=document.getElementById('authBackdrop');
  if(!backdrop)return;
  backdrop.classList.remove('open');
}

let authMode='signup';

function setAuthMode(mode){
  authMode=mode;

  const title=document.getElementById('authTitle');
  const subtitle=document.getElementById('authSubtitle');
  const nameField=document.getElementById('authNameField');
  const submit=document.getElementById('authSubmit');
  const switchBtn=document.getElementById('authSwitch');
  const forgot=document.getElementById('authForgot');

  if(!title)return;

  if(mode==='login'){
    title.textContent='Welcome back';
    subtitle.textContent='Sign in to continue to BXMUSIC.';
    nameField.style.display='none';
    submit.textContent='Sign in';
    switchBtn.textContent="Don't have an account? Create one";
    forgot.style.display='block';
  }else{
    title.textContent='Create your account';
    subtitle.textContent='Join BXMUSIC and keep your music with you.';
    nameField.style.display='block';
    submit.textContent='Create account';
    switchBtn.textContent='Already have an account? Sign in';
    forgot.style.display='none';
  }
}

function toggleAuthMode(){
  setAuthMode(authMode==='login'?'signup':'login');

  const message=document.getElementById('authMessage');
  if(message)message.textContent='';
}

async function handleAuthSubmit(event){
  event.preventDefault();

  const email=document.getElementById('authEmail').value.trim();
  const password=document.getElementById('authPassword').value;
  const name=document.getElementById('authName').value.trim();
  const message=document.getElementById('authMessage');
  const submit=document.getElementById('authSubmit');

  if(!email||!password){
    message.textContent='Please enter your email and password.';
    return;
  }

  submit.disabled=true;
  message.textContent='Please wait...';

  let result;

  if(authMode==='login'){
    result=await signInWithEmail(email,password);
  }else{
    result=await signUpWithEmail(email,password,name);
  }

  submit.disabled=false;

  if(!result.success){
    message.textContent=result.error||'Something went wrong.';
    return;
  }

  if(authMode==='signup'){
    message.textContent='Account created. Please check your email to verify your account.';
  }else{
    message.textContent='Signed in successfully.';
    setTimeout(closeAuth,500);
  }
}

async function handleForgotPassword(){
  const email=document.getElementById('authEmail').value.trim();
  const message=document.getElementById('authMessage');

  if(!email){
    message.textContent='Enter your email first.';
    return;
  }

  message.textContent='Sending reset email...';

  const result=await resetAccountPassword(email);

  if(!result.success){
    message.textContent=result.error||'Could not send reset email.';
    return;
  }

  message.textContent='Password reset email sent.';
}
/* ================= ACCOUNT AUTO INIT ================= */

if(!window.__BXMUSIC_ACCOUNT_AUTO_INIT__){
  window.__BXMUSIC_ACCOUNT_AUTO_INIT__=true;

  const bootAccount=()=>{
    if(typeof initAccount==='function')initAccount();
  };

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bootAccount,{once:true});
  }else{
    bootAccount();
  }
}
async function handleGoogleLogin(){
  const message=document.getElementById('authMessage');
  if(message)message.textContent='Connecting to Google...';

  const result=await signInWithGoogle();

  if(!result.success&&message){
    message.textContent=result.error||'Google sign in failed.';
  }
}
