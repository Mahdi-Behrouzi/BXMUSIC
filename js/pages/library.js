
/* ================= RENDER: LIBRARY ================= */

function renderLibChips(){
  const el = document.getElementById('libChips');
  const labels = ['Playlists','Songs','Albums','Artists'];
  const keys = {Playlists:'playlistsSec',Songs:'songsTab',Albums:'albums',Artists:'artistsTab'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${t(keys[l])}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.onclick = () => openLibTab(c.dataset.chip));
  renderLibBody('Playlists');
}
function openLibTab(label){
  switchScreen('library');
  document.querySelectorAll('#libChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  renderLibBody(label);
}
function renderLibBody(label){
  const el = document.getElementById('libContent');
  if(label==='Playlists'){
    const builtinCards = Object.keys(builtinPlaylists).map(name => {
      const q = builtinPlaylists[name];
      return `<div class="gcard" onclick="openPlaylist('${name}',true)"><div class="cover">${coverEl(q[0]||0)}</div><div class="t">${name}</div><div class="s">${q.length} ${t('songs')}</div></div>`;
    }).join('');
    const userCards = userPlaylists.map(p => `
      <div class="gcard" onclick="openPlaylist('${p.id}',false)"><div class="cover">${playlistCoverHTML(p)}</div><div class="t">${p.name}</div><div class="s">${p.tracks.length} ${t('songs')}</div></div>`).join('');
    el.innerHTML = `<div class="grid2">${builtinCards}${userCards}</div>`;
  } else if(label==='Songs'){
    const idxs = tracks.map((tr,i)=>i).filter(i => !offlineMode || downloads.has(i));
    const uploadBtn = `<div class="upload-btn" onclick="triggerUpload()"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>Upload your own music</div>`;
    el.innerHTML = uploadBtn + (idxs.length ? idxs.map(i => trackRowHTML(i, i+1, currentTrack===i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">No downloaded songs yet</div>`);
  } else if(label==='Albums'){
    const albumSet = [...new Set(tracks.map(t=>t.album))];
    el.innerHTML = `<div class="grid2">${albumSet.map(al => {
      const t = tracks.find(x=>x.album===al); const i = tracks.indexOf(t);
      return `<div class="gcard" onclick="openArtist('${t.artist}')"><div class="cover">${coverEl(i)}</div><div class="t">${al}</div><div class="s">${t.artist}</div></div>`;
    }).join('')}</div>`;
  } else if(label==='Artists'){
    el.innerHTML = `<div class="grid2">${Object.keys(artists).map((name,idx) => `
      <div class="gcard" onclick="openArtist('${name}')"><div class="cover" style="border-radius:50%;">${coverEl(idx)}</div><div class="t">${name}</div><div class="s">${artists[name].followers} listeners</div></div>`).join('')}</div>`;
  }
}


