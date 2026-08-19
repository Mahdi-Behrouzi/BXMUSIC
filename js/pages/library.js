// js/pages/library.js — rendering for Library screen (progressive migration)
import data from '../data/data.js';
import { trackRowHTML, attachTrackRowHandlers } from '../components/trackRow.js';

export function renderLibChips(){
  const el = document.getElementById('libChips');
  if(!el) return;
  const labels = ['Playlists','Songs','Albums','Artists'];
  const keys = {Playlists:'playlistsSec',Songs:'songsTab',Albums:'albums',Artists:'artistsTab'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${(keys[l] && (data.genreI18n ? (data.genreI18n.en[keys[l]]||keys[l]) : keys[l]))||l}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => openLibTab(c.dataset.chip)));
}

export function openLibTab(label){
  switchScreen('library');
  document.querySelectorAll('#libChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  renderLibBody(label);
}

export function renderLibBody(label){
  const el = document.getElementById('libContent');
  if(!el) return;
  if(label==='Playlists'){
    const builtinCards = Object.keys(data.builtinPlaylists).map(name => {
      const q = data.builtinPlaylists[name];
      return `<div class="gcard" data-playlist="${name}"><div class="cover">${coverEl(q[0]||0)}</div><div class="t">${name}</div><div class="s">${q.length} songs</div></div>`;
    }).join('');
    const userCards = (window.userPlaylists||[]).map(p => `
      <div class="gcard" data-playlist="${p.id}"><div class="cover">${playlistCoverHTML(p)}</div><div class="t">${p.name}</div><div class="s">${p.tracks.length} songs</div></div>`).join('');
    el.innerHTML = `<div class="grid2">${builtinCards}${userCards}</div>`;
    el.querySelectorAll('.gcard').forEach(g => g.addEventListener('click', () => {
      const key = g.dataset.playlist;
      if(typeof window.openPlaylist === 'function') window.openPlaylist(key, key in data.builtinPlaylists);
    }));
  } else if(label==='Songs'){
    const idxs = data.tracks.map((tr,i)=>i).filter(i => !window.offlineMode || (window.downloads && window.downloads.has && window.downloads.has(i)));
    const uploadBtn = `<div class="upload-btn" data-action="upload">Upload</div>`;
    el.innerHTML = uploadBtn + (idxs.length ? idxs.map(i => trackRowHTML(i, i+1, window.currentTrack===i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">No songs</div>`);
    attachTrackRowHandlers(el);
    // upload handler
    const up = el.querySelector('[data-action="upload"]'); if(up) up.addEventListener('click', () => { if(typeof window.triggerUpload === 'function') window.triggerUpload(); });
  } else if(label==='Albums'){
    const albumSet = [...new Set(data.tracks.map(t=>t.album))];
    el.innerHTML = `<div class="grid2">${albumSet.map(al => {
      const t = data.tracks.find(x=>x.album===al); const i = data.tracks.indexOf(t);
      return `<div class="gcard" data-artist="${t.artist}"><div class="cover">${coverEl(i)}</div><div class="t">${al}</div><div class="s">${t.artist}</div></div>`;
    }).join('')}</div>`;
    el.querySelectorAll('.gcard').forEach(g => g.addEventListener('click', () => { const artist = g.dataset.artist; if(typeof window.openArtist === 'function') window.openArtist(artist); }));
  } else if(label==='Artists'){
    el.innerHTML = `<div class="grid2">${Object.keys(data.artists).map((name,idx) => `
      <div class="gcard" data-artist="${name}"><div class="cover" style="border-radius:50%;">${coverEl(idx)}</div><div class="t">${name}</div><div class="s">${data.artists[name].followers} monthly listeners</div></div>`).join('')}</div>`;
    el.querySelectorAll('.gcard').forEach(g => g.addEventListener('click', () => { const name = g.dataset.artist; if(typeof window.openArtist === 'function') window.openArtist(name); }));
  }
}

function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-'+name);
  if(el) el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav===name));
  if(name==='library') renderLibBody(document.querySelector('#libChips .chip.active')?.dataset.chip || 'Playlists');
}

function coverEl(i){
  const tr = data.tracks[i];
  if(tr && tr.cover) return `<img src="${tr.cover}" alt="${tr.title}" style="width:100%;height:100%;object-fit:cover;">`;
  const grads = [['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436']];
  const g = grads[i % grads.length];
  return `<div style="width:100%;height:100%;background:linear-gradient(150deg, ${g[0]}55, ${g[1]} 75%);position:relative;"></div>`;
}

function playlistCoverHTML(p){
  if(p.customCover) return `<div style="width:100%;height:100%;background:${p.customCover};"></div>`;
  return p.tracks.length ? coverEl(p.tracks[0]) : `<div style="width:100%;height:100%;background:var(--surface-3);"></div>`;
}
