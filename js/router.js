/* ================= NAV / SCREENS ================= */

// track current active screen name so other modules can react
window.currentScreen = window.currentScreen || 'home';

function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-'+name);
  if (el) el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav===name));
  // expose current screen name for other code
  window.currentScreen = name;
  if(name==='library') renderLibBody(document.querySelector('#libChips .chip.active')?.dataset.chip || 'Playlists');
  if(name==='profile') renderProfile();
  if(name==='friends') renderFriendsList();
  if(name==='history') renderHistoryList();
}
function openDrawer(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawerBackdrop').classList.add('open');

  const btn = document.querySelector('.menu-btn');
  if (btn) btn.classList.add('active');
}

function closeDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawerBackdrop').classList.remove('open');

  const btn = document.querySelector('.menu-btn');
  if (btn) btn.classList.remove('active');
}

function toggleDrawerMenu(){
  const drawer = document.getElementById('drawer');

  if (drawer.classList.contains('open')) {
    closeDrawer();
  } else {
    openDrawer();
  }
}
