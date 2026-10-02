/* ================= HELPERS ================= */

function L(fa, en){ return lang === 'fa' ? fa : en; }

function escHTML(s){
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// اولین کاراکتر امن (ایموجی و surrogate pair را نمی‌شکند)
function firstChar(s){
  const arr = [...String(s || '')];
  return arr.length ? arr[0] : '';
}

function songsLabel(n){
  return (n === 1 && lang !== 'fa') ? 'song' : t('songs');
}

function isFriendOnline(f){
  const s = f && f.status ? String(f.status) : '';
  return s === 'Online' || s.startsWith('Listening');
}

function refreshLibraryViews(){
  if (typeof refreshActiveLists === 'function') refreshActiveLists();
}

/* ================= PLAYLIST COVER PICKER ================= */

function openCoverPicker(){
  if(currentPlaylistIsBuiltin) return;
  document.getElementById('coverColorGrid').innerHTML = avatarColors.map(c =>
    `<div class="cover-color-preview" style="background:${escHTML(c)};cursor:pointer;" data-color="${escHTML(c)}" onclick="setPlaylistCoverColor(this.dataset.color)"></div>`
  ).join('');
  document.getElementById('coverPickBackdrop').classList.add('open');
  document.getElementById('coverPickSheet').classList.add('open');
}
function closeCoverPicker(){
  document.getElementById('coverPickBackdrop').classList.remove('open');
  document.getElementById('coverPickSheet').classList.remove('open');
}
function setPlaylistCoverColor(c){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = c;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
  refreshLibraryViews();
}
function resetPlaylistCover(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = null;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
  refreshLibraryViews();
}

/* ================= ADD SONGS PICKER ================= */

const PICK_CHECK_SVG = '<svg class="pl-pick-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';

function openAddSongsPicker(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  document.getElementById('pickerList').innerHTML = tracks.map((tr,i) => {
    const has = p.tracks.includes(i);
    return `<div class="pl-pick-row" data-i="${i}" onclick="togglePickerTrack(${i})">
      <div class="thumb" style="width:36px;height:36px;border-radius:7px;overflow:hidden;position:relative;">${coverEl(i)}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(tr.title)}</div><div style="font-size:11px;color:var(--faint);">${escHTML(tr.artist)}</div></div>
      ${has ? PICK_CHECK_SVG : ''}
    </div>`;
  }).join('');
  document.getElementById('pickerBackdrop').classList.add('open');
  document.getElementById('pickerSheet').classList.add('open');
}
function closeAddSongsPicker(){
  document.getElementById('pickerBackdrop').classList.remove('open');
  document.getElementById('pickerSheet').classList.remove('open');
}
function togglePickerTrack(i){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  const had = p.tracks.includes(i);
  if(had) p.tracks = p.tracks.filter(x=>x!==i); else p.tracks.push(i);

  // فقط همان ردیف را آپدیت کن تا اسکرول لیست نپرد
  const row = document.querySelector(`#pickerList .pl-pick-row[data-i="${i}"]`);
  if(row){
    const check = row.querySelector('.pl-pick-check');
    if(had && check) check.remove();
    if(!had && !check) row.insertAdjacentHTML('beforeend', PICK_CHECK_SVG);
  }

  renderPlaylistTracks();
  document.getElementById('plMeta').textContent = p.tracks.length + ' ' + songsLabel(p.tracks.length);
  refreshLibraryViews();
}

/* ================= NEW PLAYLIST ================= */

function createPlaylist(fromAddSheet){
  const raw = prompt(L('نام پلی‌لیست را وارد کنید', 'Playlist name'));
  const name = raw ? raw.trim() : '';
  if(!name) return;

  const p = {id:'up'+(nextPlaylistId++), name:name, tracks:[], customCover:null};
  userPlaylists.push(p);

  if(fromAddSheet && actionTrackIndex != null){
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

// پیش‌نویس رنگ و ایموجی؛ تا وقتی Save نزنی روی profile اصلی اعمال نمی‌شود
let profileDraft = { color: null, emoji: '' };

function renderProfileHeader(){
  const name  = profile.name || '';
  const bio   = profile.bio || '';
  const bg    = profile.color || 'var(--grad)';
  const label = profile.emoji || (firstChar(name) || 'M').toUpperCase();

  document.getElementById('drawerAvatar').style.background = bg;
  document.getElementById('drawerAvatar').textContent = label;
  document.getElementById('drawerName').textContent = name;
  document.getElementById('profileAvatar').style.background = bg;
  document.getElementById('profileAvatarText').textContent = label;
  document.getElementById('profileName').textContent = name;
  document.getElementById('profileBio').textContent = bio;
  document.getElementById('profileBio').style.display = bio ? 'block' : 'none';
  document.getElementById('settingsAvatar').style.background = bg;
  document.getElementById('settingsAvatar').textContent = label;
  document.getElementById('settingsName').textContent = name;
}

function openEditProfile(){
  profileDraft = { color: profile.color || null, emoji: profile.emoji || '' };
  document.getElementById('editNameInput').value = profile.name || '';
  document.getElementById('editBioInput').value = profile.bio || '';
  renderAvatarPickers();
  document.getElementById('editProfileBackdrop').classList.add('open');
  document.getElementById('editProfileSheet').classList.add('open');
}
function closeEditProfile(){
  document.getElementById('editProfileBackdrop').classList.remove('open');
  document.getElementById('editProfileSheet').classList.remove('open');
}

function renderAvatarPickers(){
  const nameVal = document.getElementById('editNameInput').value;
  const previewLabel = profileDraft.emoji || (firstChar(nameVal) || 'M').toUpperCase();
  const preview = document.getElementById('editAvatarPreview');
  preview.style.background = profileDraft.color || 'var(--grad)';
  preview.textContent = previewLabel;

  document.getElementById('avatarColorRow').innerHTML = avatarColors.map(c =>
    `<div class="color-swatch ${profileDraft.color===c?'selected':''}" style="background:${escHTML(c)}" data-color="${escHTML(c)}" onclick="pickAvatarColor(this.dataset.color)"></div>`
  ).join('');

  document.getElementById('avatarEmojiRow').innerHTML =
    `<div class="emoji-swatch ${!profileDraft.emoji?'selected':''}" onclick="pickAvatarEmoji('')">Aa</div>` +
    avatarEmojis.map(e =>
      `<div class="emoji-swatch ${profileDraft.emoji===e?'selected':''}" data-emoji="${escHTML(e)}" onclick="pickAvatarEmoji(this.dataset.emoji)">${escHTML(e)}</div>`
    ).join('');
}

function pickAvatarColor(color){
  profileDraft.color = color;
  renderAvatarPickers();
}

function pickAvatarEmoji(emoji){
  profileDraft.emoji = emoji || '';
  renderAvatarPickers();
}

async function saveProfile(){
  const nameInput = document.getElementById('editNameInput');
  const bioInput  = document.getElementById('editBioInput');

  const name = nameInput ? nameInput.value.trim() : '';
  const bio  = bioInput  ? bioInput.value.trim()  : '';

  // حالا تغییرات پیش‌نویس روی پروفایل اصلی اعمال می‌شود
  profile.name  = name || profile.name;
  profile.bio   = bio;
  profile.color = profileDraft.color || null;
  profile.emoji = profileDraft.emoji || '';

  const color = profile.color;
  const emoji = profile.emoji || null;

  renderProfileHeader();
  closeEditProfile();

  if (!window.bxSupabase || !window.BXMUSIC_ACCOUNT) {
    console.warn('BXMUSIC: Supabase is not available.');
    showToast(L('پروفایل روی دستگاه تغییر کرد', 'Profile updated on this device'));
    return;
  }

  const user = window.BXMUSIC_ACCOUNT.user;
  if (!user) {
    showToast(L('لطفاً ابتدا وارد حساب شوید', 'Please sign in first'));
    return;
  }

  try {
    const { data, error } = await window.bxSupabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: profile.name,
        bio: profile.bio,
        color: color,
        emoji: emoji
      }, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('BXMUSIC: Could not save profile:', error);
      showToast(L('خطا در ذخیره پروفایل؛ تغییرات فقط روی این دستگاه است', 'Could not save profile; changes are only on this device'));
      return;
    }

    window.BXMUSIC_ACCOUNT.profile = data || {
      id: user.id,
      full_name: profile.name,
      bio: profile.bio,
      color: color,
      emoji: emoji
    };

    showToast(L('پروفایل با موفقیت ذخیره شد', 'Profile saved'));

  } catch (err) {
    console.error('BXMUSIC: Profile save exception:', err);
    showToast(L('خطا در ذخیره پروفایل؛ تغییرات فقط روی این دستگاه است', 'Could not save profile; changes are only on this device'));
  }
}

/* ================= FRIENDS ================= */

function friendAvatarHTML(f, idx){
  const online = isFriendOnline(f);
  return `<div class="friend-item">
    <div class="friend-avatar" style="background:${friendColors[idx%friendColors.length]}">${escHTML(firstChar(f.name))}<span class="dot ${online?'online':'offline'}"></span></div>
    <div class="friend-name">${escHTML(f.name)}</div>
  </div>`;
}

function renderFriendsList(){
  document.getElementById('friendsList').innerHTML = friends.map((f,idx) => {
    const following = followedFriends.has(f.id);
    return `
    <div class="friend-row" data-id="${escHTML(f.id)}" onclick="openFriendSheet(this.dataset.id)">
      <div class="friend-avatar" style="width:44px;height:44px;font-size:15px;background:${friendColors[idx%friendColors.length]}">${escHTML(firstChar(f.name))}<span class="dot ${isFriendOnline(f)?'online':'offline'}" style="width:10px;height:10px;"></span></div>
      <div class="meta"><div class="fname">${escHTML(f.name)}</div><div class="fstatus">${escHTML(f.status)}</div></div>
      <button class="btn-follow-sm ${following?'following':''}" data-id="${escHTML(f.id)}" onclick="event.stopPropagation();quickToggleFollow(this.dataset.id)">${following ? L('دنبال می‌کنید','Following') : L('دنبال کردن','Follow')}</button>
    </div>`;
  }).join('');
}

function quickToggleFollow(id){
  if(followedFriends.has(id)) followedFriends.delete(id); else followedFriends.add(id);
  renderFriendsList();
}

function openFriendSheet(id){
  const idx = friends.findIndex(f=>f.id===id);
  if(idx < 0) return;                 // دوست پیدا نشد
  currentFriendId = id;
  const f = friends[idx];

  document.getElementById('friendSheetAvatar').style.background = friendColors[idx%friendColors.length];
  document.getElementById('friendSheetAvatar').textContent = firstChar(f.name);
  document.getElementById('friendSheetName').textContent = f.name || '';
  document.getElementById('friendSheetStatus').textContent = f.status || '';

  const following = followedFriends.has(id);
  const btn = document.getElementById('friendSheetFollowBtn');
  btn.textContent = following ? L('دنبال می‌کنید','Following') : L('دنبال کردن','Follow');
  btn.classList.toggle('following', following);

  let topPicks = [];
  if(tracks.length > 0){
    const n = tracks.length;
    topPicks = [...new Set([idx % n, (idx+2) % n, (idx+5) % n])];   // بدون تکرار و بدون خروج از آرایه
  }
  document.getElementById('friendSheetTracks').innerHTML =
    topPicks.map((ti,i) => trackRowHTML(ti, i+1, currentTrack===ti)).join('');

  document.getElementById('friendBackdrop').classList.add('open');
  document.getElementById('friendSheet').classList.add('open');
}

function closeFriendSheet(){
  document.getElementById('friendBackdrop').classList.remove('open');
  document.getElementById('friendSheet').classList.remove('open');
}

function toggleFriendFollow(){
  if(!currentFriendId) return;
  if(followedFriends.has(currentFriendId)) followedFriends.delete(currentFriendId); else followedFriends.add(currentFriendId);
  openFriendSheet(currentFriendId);
  renderFriendsList();               // لیست پشت شیت هم آپدیت شود
}
