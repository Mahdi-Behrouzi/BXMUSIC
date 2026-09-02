
/* ================= NAV / SCREENS ================= */

function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav===name));
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

