
/* ================= PLAYLIST COVER PICKER ================= */

function openCoverPicker(){
  if(currentPlaylistIsBuiltin) return;
  document.getElementById('coverColorGrid').innerHTML = avatarColors.map(c => `<div class="cover-color-preview" style="background:${c};cursor:pointer;" onclick="setPlaylistCoverColor('${c}')"></div>`).join('');
  document.getElementById('coverPickBackdrop').classList.add('open');
  document.getElementById('coverPickSheet').classList.add('open');
}
function closeCoverPicker(){ document.getElementById('coverPickBackdrop').classList.remove('open'); document.getElementById('coverPickSheet').classList.remove('open'); }
function setPlaylistCoverColor(c){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = c;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
}
function resetPlaylistCover(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = null;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
}

function openAddSongsPicker(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  document.getElementById('pickerList').innerHTML = tracks.map((tr,i) => {
    const has = p.tracks.includes(i);
    return `<div class="pl-pick-row" onclick="togglePickerTrack(${i})">
      <div class="thumb" style="width:36px;height:36px;border-radius:7px;overflow:hidden;position:relative;">${coverEl(i)}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tr.title}</div><div style="font-size:11px;color:var(--faint);">${tr.artist}</div></div>
      ${has ? '<svg class="pl-pick-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`;
  }).join('');
  document.getElementById('pickerBackdrop').classList.add('open');
  document.getElementById('pickerSheet').classList.add('open');
}
function closeAddSongsPicker(){ document.getElementById('pickerBackdrop').classList.remove('open'); document.getElementById('pickerSheet').classList.remove('open'); }
function togglePickerTrack(i){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  if(p.tracks.includes(i)) p.tracks = p.tracks.filter(x=>x!==i); else p.tracks.push(i);
  openAddSongsPicker();
  renderPlaylistTracks();
  document.getElementById('plMeta').textContent = p.tracks.length + ' ' + t('songs');
}



/* ================= NEW PLAYLIST ================= */

function createPlaylist(fromAddSheet){
  const name = prompt(lang==='fa' ? 'نام پلی‌لیست را وارد کنید' : 'Playlist name');
  if(!name) return;
  const p = {id:'up'+(nextPlaylistId++), name:name, tracks:[], customCover:null};
  userPlaylists.push(p);
  if(fromAddSheet && actionTrackIndex!==null){
    p.tracks.push(actionTrackIndex);
    showToast(t('playlistCreated'));
    closeAddToPlaylist(); closeActionSheet();
    refreshActiveLists();
  } else {
    showToast(t('playlistCreated'));
    openLibTab('Playlists');
  }
}



/* ================= PROFILE PERSONALIZATION ================= */

function renderProfileHeader(){
  const bg = profile.color || 'var(--grad)';
  const label = profile.emoji || (profile.name[0] || 'M').toUpperCase();
  document.getElementById('drawerAvatar').style.background = bg;
  document.getElementById('drawerAvatar').textContent = label;
  document.getElementById('drawerName').textContent = profile.name;
  document.getElementById('profileAvatar').style.background = bg;
  document.getElementById('profileAvatarText').textContent = label;
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileBio').textContent = profile.bio;
  document.getElementById('profileBio').style.display = profile.bio ? 'block' : 'none';
  document.getElementById('settingsAvatar').style.background = bg;
  document.getElementById('settingsAvatar').textContent = label;
  document.getElementById('settingsName').textContent = profile.name;
}
function openEditProfile(){
  document.getElementById('editNameInput').value = profile.name;
  document.getElementById('editBioInput').value = profile.bio;
  renderAvatarPickers();
  document.getElementById('editProfileBackdrop').classList.add('open');
  document.getElementById('editProfileSheet').classList.add('open');
}
function closeEditProfile(){ document.getElementById('editProfileBackdrop').classList.remove('open'); document.getElementById('editProfileSheet').classList.remove('open'); }
function renderAvatarPickers(){
  const previewLabel = profile.emoji || (document.getElementById('editNameInput').value[0] || 'M').toUpperCase();
  document.getElementById('editAvatarPreview').style.background = profile.color || 'var(--grad)';
  document.getElementById('editAvatarPreview').textContent = previewLabel;
  document.getElementById('avatarColorRow').innerHTML = avatarColors.map(c => `<div class="color-swatch ${profile.color===c?'selected':''}" style="background:${c}" onclick="pickAvatarColor('${c}')"></div>`).join('');
  document.getElementById('avatarEmojiRow').innerHTML = `<div class="emoji-swatch ${!profile.emoji?'selected':''}" onclick="pickAvatarEmoji('')">Aa</div>` +
    avatarEmojis.map(e => `<div class="emoji-swatch ${profile.emoji===e?'selected':''}" onclick="pickAvatarEmoji('${e}')">${e}</div>`).join('');
}
function pickAvatarColor(c){ profile.color = c; renderAvatarPickers(); }
function pickAvatarEmoji(e){ profile.emoji = e; renderAvatarPickers(); }
function saveProfile(){
  const name = document.getElementById('editNameInput').value.trim();
  profile.name = name || profile.name;
  profile.bio = document.getElementById('editBioInput').value.trim();
  renderProfileHeader();
  closeEditProfile();
  showToast('Profile updated');
}
function friendAvatarHTML(f, idx){
  const online = f.status==='Online' || f.status.startsWith('Listening');
  return `<div class="friend-item">
    <div class="friend-avatar" style="background:${friendColors[idx%friendColors.length]}">${f.name[0]}<span class="dot ${online?'online':'offline'}"></span></div>
    <div class="friend-name">${f.name}</div>
  </div>`;
}
function renderFriendsList(){
  document.getElementById('friendsList').innerHTML = friends.map((f,idx) => `
    <div class="friend-row" onclick="openFriendSheet('${f.id}')">
      <div class="friend-avatar" style="width:44px;height:44px;font-size:15px;background:${friendColors[idx%friendColors.length]}">${f.name[0]}<span class="dot ${f.status==='Online'||f.status.startsWith('Listening')?'online':'offline'}" style="width:10px;height:10px;"></span></div>
      <div class="meta"><div class="fname">${f.name}</div><div class="fstatus">${f.status}</div></div>
      <button class="btn-follow-sm ${followedFriends.has(f.id)?'following':''}" onclick="event.stopPropagation();quickToggleFollow('${f.id}')">${followedFriends.has(f.id)?'Following':'Follow'}</button>
    </div>`).join('');
}
function quickToggleFollow(id){
  if(followedFriends.has(id)) followedFriends.delete(id); else followedFriends.add(id);
  renderFriendsList();
}
function openFriendSheet(id){
  currentFriendId = id;
  const idx = friends.findIndex(f=>f.id===id);
  const f = friends[idx];
  document.getElementById('friendSheetAvatar').style.background = friendColors[idx%friendColors.length];
  document.getElementById('friendSheetAvatar').textContent = f.name[0];
  document.getElementById('friendSheetName').textContent = f.name;
  document.getElementById('friendSheetStatus').textContent = f.status;
  const btn = document.getElementById('friendSheetFollowBtn');
  btn.textContent = followedFriends.has(id) ? 'Following' : 'Follow';
  btn.classList.toggle('following', followedFriends.has(id));
  const topPicks = [idx, (idx+2)%tracks.length, (idx+5)%tracks.length];
  document.getElementById('friendSheetTracks').innerHTML = topPicks.map((ti,i) => trackRowHTML(ti, i+1, currentTrack===ti)).join('');
  document.getElementById('friendBackdrop').classList.add('open');
  document.getElementById('friendSheet').classList.add('open');
}
function closeFriendSheet(){ document.getElementById('friendBackdrop').classList.remove('open'); document.getElementById('friendSheet').classList.remove('open'); }
function toggleFriendFollow(){
  if(!currentFriendId) return;
  if(followedFriends.has(currentFriendId)) followedFriends.delete(currentFriendId); else followedFriends.add(currentFriendId);
  openFriendSheet(currentFriendId);
}


