
/* ================= RENDER: SEARCH ================= */

function renderSearch(q){
  q = (q||'').toLowerCase();
  const results = tracks.map((t,i)=>({t,i})).filter(x => !q || x.t.title.toLowerCase().includes(q) || x.t.artist.toLowerCase().includes(q));
  const el = document.getElementById('searchResults');
  if(!q){ el.innerHTML = `<div class="section-head"><h2>${t('browseAll')}</h2></div>` + tracks.map((t,i)=>trackRowHTML(i,i+1,currentTrack===i)).join(''); return; }
  el.innerHTML = results.length ? results.map(x => trackRowHTML(x.i, x.i+1, currentTrack===x.i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 4px;">No results for "${q}"</div>`;
}



/* ================= RENDER: ARTIST ================= */

function openArtist(name){
  currentArtist = name;
  following = false;
  const a = artists[name];
  document.getElementById('artistHero').style.background = gradCSS(a.tracks[0]);
  document.getElementById('artistHero').querySelector('.wave-sig')?.remove();
  document.getElementById('artistHero').insertAdjacentHTML('beforeend', `<svg class="wave-sig" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;opacity:.5;"><path d="M0 60 Q15 35 30 60 T60 60 T90 60 T120 60" stroke="rgba(255,255,255,.5)" fill="none" stroke-width="1"/></svg>`);
  document.getElementById('artistName').textContent = name;
  document.getElementById('artistFollowers').textContent = a.followers + ' monthly listeners';
  document.getElementById('followBtn').textContent = 'Follow';
  document.getElementById('followBtn').classList.remove('following');
  document.getElementById('artistTracks').innerHTML = a.tracks.map((ti,idx) => trackRowHTML(ti, idx+1, currentTrack===ti)).join('');
  switchScreen('artist');
}
function toggleFollow(){
  following = !following;
  const btn = document.getElementById('followBtn');
  btn.textContent = following ? 'Following' : 'Follow';
  btn.classList.toggle('following', following);
}
function playArtistTop(){
  const a = artists[currentArtist];
  playTrack(a.tracks[0], currentArtist, true);
}



/* ================= PLAYLIST DETAIL ================= */

function playlistCoverHTML(p){
  if(p.customCover) return `<div style="width:100%;height:100%;background:${p.customCover};"></div>`;
  return p.tracks.length ? coverEl(p.tracks[0]) : `<div style="width:100%;height:100%;background:var(--surface-3);"></div>`;
}
function openPlaylist(key, isBuiltin){
  currentPlaylistId = key;
  currentPlaylistIsBuiltin = isBuiltin;
  let name, queue, coverHTML;
  if(isBuiltin){ name = key; queue = builtinPlaylists[key] || []; coverHTML = coverEl(queue.length ? queue[0] : 0); }
  else {
    const p = userPlaylists.find(x=>x.id===key);
    name = p ? p.name : ''; queue = p ? p.tracks : [];
    coverHTML = p ? playlistCoverHTML(p) : coverEl(0);
  }
  document.getElementById('plCover').querySelector('.cover-fill')?.remove();
  document.getElementById('plCover').insertAdjacentHTML('afterbegin', `<div class="cover-fill" style="position:absolute;inset:0;">${coverHTML}</div>`);
  document.getElementById('plName').textContent = name;
  document.getElementById('plMeta').textContent = queue.length + ' ' + t('songs');
  document.getElementById('plAddBtn').style.display = isBuiltin ? 'none' : 'flex';
  document.getElementById('plCoverEditBadge').classList.toggle('hidden', isBuiltin);
  renderPlaylistTracks();
  switchScreen('playlist');
}
function renderPlaylistTracks(){
  const queue = currentPlaylistIsBuiltin ? (builtinPlaylists[currentPlaylistId]||[]) : ((userPlaylists.find(p=>p.id===currentPlaylistId)||{tracks:[]}).tracks);
  const el = document.getElementById('plTracks');
  if(!queue.length){ el.innerHTML = `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">${lang==='fa'?'هنوز آهنگی اضافه نشده':'No songs yet'}</div>`; return; }
  el.innerHTML = queue.map((ti,idx) => currentPlaylistIsBuiltin ? trackRowHTML(ti, idx+1, currentTrack===ti, currentPlaylistId) : plTrackRowHTML(ti, idx+1, queue.length)).join('');
}
function moveTrackInPlaylist(trackIdx, dir){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  const pos = p.tracks.indexOf(trackIdx);
  const newPos = pos + dir;
  if(newPos<0 || newPos>=p.tracks.length) return;
  [p.tracks[pos], p.tracks[newPos]] = [p.tracks[newPos], p.tracks[pos]];
  renderPlaylistTracks();
}
function removeTrackFromPlaylist(i){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.tracks = p.tracks.filter(x=>x!==i);
  renderPlaylistTracks();
  document.getElementById('plMeta').textContent = p.tracks.length + ' ' + t('songs');
}
function removeFromCurrentPlaylist(){ removeTrackFromPlaylist(actionTrackIndex); closeActionSheet(); }



/* ================= ACTION SHEET (per track) ================= */

function openActionSheet(i){
  actionTrackIndex = i;
  const tr = tracks[i];
  document.getElementById('actionCover').innerHTML = coverEl(i);
  document.getElementById('actionTitle').textContent = tr.title;
  document.getElementById('actionArtist').textContent = tr.artist;
  updateActionDownloadUI();
  const inUserPlaylist = document.getElementById('screen-playlist').classList.contains('active') && !currentPlaylistIsBuiltin;
  document.getElementById('actionRemoveRow').classList.toggle('hidden', !inUserPlaylist);
  document.getElementById('actionBackdrop').classList.add('open');
  document.getElementById('actionSheet').classList.add('open');
}
function closeActionSheet(){ document.getElementById('actionBackdrop').classList.remove('open'); document.getElementById('actionSheet').classList.remove('open'); }
function updateActionDownloadUI(){
  const dl = downloads.has(actionTrackIndex);
  document.getElementById('actionDownloadLabel').textContent = dl ? t('removeDownload') : t('download');
  document.getElementById('actionDownloadIcon').innerHTML = dl
    ? '<circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    : '<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"/>';
  document.getElementById('actionDownloadRow').style.color = dl ? 'var(--hires)' : '';
}
function toggleDownloadCurrent(){
  const tr = tracks[actionTrackIndex];

  if(!tr || !tr.audioUrl) return;

  const a = document.createElement('a');
  a.href = tr.audioUrl;
  a.download = tr.title + '.mp3';
  document.body.appendChild(a);
  a.click();
  a.remove();

  downloads.add(actionTrackIndex);
  showToast(t('downloadedToast'));
  updateActionDownloadUI();
  updateDownloadCount();
  closeActionSheet();
  refreshActiveLists();
    }
function updateDownloadCount(){ const el = document.getElementById('downloadCount'); if(el) el.textContent = downloads.size; }
function clearDownloads(){ downloads = new Set(); updateDownloadCount(); showToast(t('removedToast')); refreshActiveLists(); }



/* ================= ADD TO PLAYLIST SHEET ================= */

function openAddToPlaylist(){
  const list = document.getElementById('addPlList');
  list.innerHTML = userPlaylists.length ? userPlaylists.map(p => {
    const has = p.tracks.includes(actionTrackIndex);
    return `<div class="pl-pick-row" onclick="toggleTrackInPlaylist('${p.id}')">
      <div class="pl-dot" style="background:var(--a1)"></div>
      <span style="flex:1;">${p.name}</span>
      ${has ? '<svg class="pl-pick-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`;
  }).join('') : `<div style="color:var(--faint);font-size:13px;padding:6px 14px 16px;">${lang==='fa'?'هنوز پلی‌لیستی نساخته‌اید':'No playlists yet'}</div>`;
  document.getElementById('addPlBackdrop').classList.add('open');
  document.getElementById('addPlSheet').classList.add('open');
}
function closeAddToPlaylist(){ document.getElementById('addPlBackdrop').classList.remove('open'); document.getElementById('addPlSheet').classList.remove('open'); }
function toggleTrackInPlaylist(id){
  const p = userPlaylists.find(x=>x.id===id);
  if(!p) return;
  if(p.tracks.includes(actionTrackIndex)){ p.tracks = p.tracks.filter(x=>x!==actionTrackIndex); }
  else { p.tracks.push(actionTrackIndex); showToast(t('addedToPlaylist')+' '+p.name); }
  openAddToPlaylist();
  refreshActiveLists();
}



/* ================= SHARE SHEET ================= */

function openShare(i, plId){
  shareTargetPlaylistId = plId || null;
  if(i!==null && i!==undefined){
    actionTrackIndex = i;
    document.getElementById('shareTitle').textContent = t('share') + ' — ' + tracks[i].title;
  } else if(plId){
    const name = currentPlaylistIsBuiltin ? plId : ((userPlaylists.find(p=>p.id===plId)||{}).name || '');
    document.getElementById('shareTitle').textContent = t('share') + ' — ' + name;
  }
  document.getElementById('shareBackdrop').classList.add('open');
  document.getElementById('shareSheet').classList.add('open');
}
function closeShare(){ document.getElementById('shareBackdrop').classList.remove('open'); document.getElementById('shareSheet').classList.remove('open'); }
function copyShareLink(){
  const url = shareTargetPlaylistId ? `https://musix.app/playlist/${shareTargetPlaylistId}` : `https://musix.app/track/${actionTrackIndex}`;
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).catch(()=>{}); }
  showToast(t('linkCopied'));
  closeShare();
}



/* ================= COMMENTS ================= */

function openComments(i){
  currentCommentTrack = i;
  document.getElementById('commentsTitle').textContent = 'Comments — ' + tracks[i].title;
  renderComments();
  document.getElementById('commentsBackdrop').classList.add('open');
  document.getElementById('commentsSheet').classList.add('open');
}
function closeComments(){ document.getElementById('commentsBackdrop').classList.remove('open'); document.getElementById('commentsSheet').classList.remove('open'); }
function renderComments(){
  const list = comments[currentCommentTrack] || [];
  const el = document.getElementById('commentsList');
  el.innerHTML = list.length ? list.map(c => `
    <div class="comment-item">
      <div class="comment-avatar" style="background:${c.color}">${c.user[0]}</div>
      <div><div class="comment-name">${c.user}</div><div class="comment-text">${c.text}</div><div class="comment-time">${c.time}</div></div>
    </div>`).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 10px;text-align:center;">No comments yet — be the first</div>`;
}
function postComment(){
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if(!text) return;
  if(!comments[currentCommentTrack]) comments[currentCommentTrack] = [];
  comments[currentCommentTrack].push({user: profile.name, color: profile.color || '#8b5cf6', text, time:'now'});
  input.value = '';
  renderComments();
}


