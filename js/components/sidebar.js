
/* ================= PROFILE / FRIENDS ================= */

function renderProfile(){
  document.getElementById('statPlaylists').textContent = userPlaylists.length;
  document.getElementById('statFollowing').textContent = followedFriends.size;
  document.getElementById('friendStripProfile').innerHTML = friends.map((f,idx) => friendAvatarHTML(f, idx)).join('');
  document.querySelectorAll('#friendStripProfile .friend-item').forEach((el,idx) => el.onclick = () => openFriendSheet(friends[idx].id));
  const builtinCards = Object.keys(builtinPlaylists).map(name => {
    const q = builtinPlaylists[name];
    return `<div class="gcard" onclick="openPlaylist('${name}',true)"><div class="cover">${coverEl(q[0]||0)}</div><div class="t">${name}</div><div class="s">${q.length} ${t('songs')}</div></div>`;
  }).join('');
  const userCards = userPlaylists.map(p => `<div class="gcard" onclick="openPlaylist('${p.id}',false)"><div class="cover">${p.tracks.length?coverEl(p.tracks[0]):`<div style="width:100%;height:100%;background:var(--surface-3);"></div>`}</div><div class="t">${p.name}</div><div class="s">${p.tracks.length} ${t('songs')}</div></div>`).join('');
  document.getElementById('profilePlaylists').innerHTML = builtinCards + userCards;
  renderProfileHeader();
}



/* ================= CAST ================= */

function openCastSheet(){ if(isBlockedOffline()) return; renderDeviceList(); document.getElementById('castBackdrop').classList.add('open'); document.getElementById('castSheet').classList.add('open'); }
function closeCastSheet(){ document.getElementById('castBackdrop').classList.remove('open'); document.getElementById('castSheet').classList.remove('open'); }
function renderDeviceList(){
  const icons = {
    phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    tv:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    speaker:'<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="14" r="1.4"/><circle cx="12" cy="6" r=".8"/>',
  };
  document.getElementById('deviceList').innerHTML = devices.map(d => `
    <div class="device-row ${d.id===castDeviceId?'active':''}" onclick="selectDevice('${d.id}','${d.name.replace(/'/g,"")}')">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[d.icon]}</svg>
      <span style="flex:1;">${d.name}</span>
      ${d.id===castDeviceId ? '<svg style="width:16px;height:16px;stroke:var(--a1);" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`).join('');
}
function selectDevice(id, name){
  castDeviceId = id;
  const badge = document.getElementById('castBadge');
  const icon = document.getElementById('castIcon');
  if(id==='d1'){ badge.classList.add('hidden'); icon.style.color='var(--dim)'; showToast('Playing on this phone'); }
  else { badge.classList.remove('hidden'); document.getElementById('castDeviceName').textContent = name; icon.style.color='var(--a1)'; showToast('Casting to '+name); }
  closeCastSheet();
}



/* ================= GROUP LISTEN ================= */

function openGroupSheet(){
  if(isBlockedOffline()) return;
  document.getElementById('groupIdleState').classList.toggle('hidden', groupActive);
  document.getElementById('groupActiveState').classList.toggle('hidden', !groupActive);
  if(groupActive) renderGroupParticipants();
  document.getElementById('groupBackdrop').classList.add('open');
  document.getElementById('groupSheet').classList.add('open');
}
function closeGroupSheet(){ document.getElementById('groupBackdrop').classList.remove('open'); document.getElementById('groupSheet').classList.remove('open'); }
function startGroupSession(){
  groupActive = true;
  groupParticipantIds = [];
  document.getElementById('sessionCodeLabel').textContent = 'BXMUSIC-' + Math.floor(1000+Math.random()*9000);
  document.getElementById('groupIdleState').classList.add('hidden');
  document.getElementById('groupActiveState').classList.remove('hidden');
  renderGroupParticipants();
  updateGroupBadge();
  showToast('Session started');
  clearInterval(groupTimer);
  let pool = friends.map(f=>f.id);
  groupTimer = setInterval(() => {
    if(!groupActive || !pool.length) return;
    const next = pool.splice(Math.floor(Math.random()*pool.length),1)[0];
    groupParticipantIds.push(next);
    renderGroupParticipants();
    updateGroupBadge();
    showToast(friends.find(f=>f.id===next).name + ' joined the session');
    if(document.getElementById('groupSheet').classList.contains('open')) renderGroupParticipants();
  }, 4000);
}
function endGroupSession(){
  groupActive = false;
  clearInterval(groupTimer); groupTimer=null;
  groupParticipantIds = [];
  document.getElementById('groupBadge').classList.add('hidden');
  closeGroupSheet();
  showToast('Session ended');
}
function renderGroupParticipants(){
  const el = document.getElementById('groupParticipants');
  if(!groupParticipantIds.length){ el.innerHTML = `<div style="color:var(--faint);font-size:12.5px;padding:6px 14px 14px;">Waiting for friends to join…</div>`; return; }
  el.innerHTML = `<div class="friend-strip" style="padding:0 14px 14px;">` + groupParticipantIds.map(id => {
    const idx = friends.findIndex(f=>f.id===id);
    return friendAvatarHTML(friends[idx], idx);
  }).join('') + `</div>`;
}
function updateGroupBadge(){
  const badge = document.getElementById('groupBadge');
  if(!groupActive || !groupParticipantIds.length){ badge.classList.add('hidden'); return; }
  badge.classList.remove('hidden');
  document.getElementById('groupCountLabel').textContent = 'Listening with ' + groupParticipantIds.length;
}



/* ================= NOTIFICATIONS ================= */

function updateNotifDot(){
  const hasUnread = notifications.some(n => !n.read);
  document.getElementById('notifDot').classList.toggle('hidden', !hasUnread);
  document.getElementById('notifDotSettings').classList.toggle('hidden', !hasUnread);
}
function openNotifications(){
  document.getElementById('notifList').innerHTML = notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon">${n.icon}</div>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
  notifications.forEach(n => n.read = true);
  updateNotifDot();
  document.getElementById('notifBackdrop').classList.add('open');
  document.getElementById('notifSheet').classList.add('open');
}
function closeNotifications(){ document.getElementById('notifBackdrop').classList.remove('open'); document.getElementById('notifSheet').classList.remove('open'); }



/* ================= STATS / WRAPPED ================= */

function openStats(){
  const plays = listenHistory.length;
  const unique = new Set(listenHistory).size;
  const minutes = Math.round(plays * 3.4);
  const trackCounts = {};
  listenHistory.forEach(i => { trackCounts[i] = (trackCounts[i]||0)+1; });
  let topTrackIdx = null, topTrackCount = 0;
  Object.keys(trackCounts).forEach(k => { if(trackCounts[k]>topTrackCount){ topTrackCount=trackCounts[k]; topTrackIdx=parseInt(k); } });
  const artistCounts = {};
  listenHistory.forEach(i => { const a = tracks[i].artist; artistCounts[a] = (artistCounts[a]||0)+1; });
  let topArtist = null, topArtistCount = 0;
  Object.keys(artistCounts).forEach(k => { if(artistCounts[k]>topArtistCount){ topArtistCount=artistCounts[k]; topArtist=k; } });
  document.getElementById('wrappedTopArtist').textContent = topArtist || '—';
  document.getElementById('wrappedTopArtistSub').textContent = topArtist ? (topArtistCount + ' plays this session') : 'Keep listening to find out';
  document.getElementById('wrappedPlays').textContent = plays;
  document.getElementById('wrappedMinutes').textContent = minutes;
  document.getElementById('wrappedUnique').textContent = unique;
  document.getElementById('wrappedTopTrack').textContent = topTrackIdx!==null ? tracks[topTrackIdx].title : '—';
  document.getElementById('statsBackdrop').classList.add('open');
  document.getElementById('statsSheet').classList.add('open');
}
function closeStats(){ document.getElementById('statsBackdrop').classList.remove('open'); document.getElementById('statsSheet').classList.remove('open'); }



/* ================= OFFLINE MODE ================= */

function isBlockedOffline(){
  if(offlineMode){ showToast(lang==='fa' ? 'در حالت آفلاین در دسترس نیست' : 'Not available offline'); return true; }
  return false;
}
function toggleOfflineMode(){
  offlineMode = !offlineMode;
  document.getElementById('offlineToggle').classList.toggle('on', offlineMode);
  document.getElementById('offlineBanner').classList.toggle('show', offlineMode);
  showToast(offlineMode ? (lang==='fa'?'حالت آفلاین روشن شد':'Offline mode on') : (lang==='fa'?'حالت آفلاین خاموش شد':'Offline mode off'));
  renderMadeForYou(); renderRecent();
  refreshActiveLists();
}



/* ================= DRIVING MODE ================= */

function openDrivingMode(){
  const tr = tracks[currentTrack];
  document.getElementById('drivingCover').innerHTML = coverEl(currentTrack);
  document.getElementById('drivingTitle').textContent = tr.title;
  document.getElementById('drivingArtist').textContent = tr.artist;
  updatePlayIcons();
  document.getElementById('drivingMode').classList.add('open');
}
function closeDrivingMode(){ document.getElementById('drivingMode').classList.remove('open'); }



/* ================= PLAY HISTORY ================= */

function renderHistoryList(){
  const el = document.getElementById('historyList');
  el.innerHTML = playHistoryLog.length ? playHistoryLog.map(h => `
    <div class="hist-item" onclick='playTrack(${h.i},"History",true)'>
      <div class="hist-thumb">${coverEl(h.i)}</div>
      <div class="hist-meta"><div class="hist-title">${tracks[h.i].title}</div><div class="hist-sub">${tracks[h.i].artist}</div></div>
      <div class="hist-time">${h.time.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
    </div>`).join('') : `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">${t('nothingPlayedYet')}</div>`;
}



/* ================= PERSONAL UPLOAD ================= */

function triggerUpload(){ document.getElementById('uploadInput').click(); }
function handleUpload(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  const title = file.name.replace(/\.[^/.]+$/, '');
  const newIndex = tracks.length;
  tracks.push({title:title, artist:'You', dur:'0:00', plays:'—', album:'My Uploads', lyrics:[], isUpload:true, audioUrl:url});
  downloads.add(newIndex);
  showToast('Added "'+title+'" to your library');
  evt.target.value = '';
  refreshActiveLists();
  playTrack(newIndex, 'My Uploads', true);
}


