// js/pages/playlist.js — playlist detail rendering and actions
import data from '../data/data.js';
import { plTrackRowHTML, attachTrackRowHandlers } from '../components/trackRow.js';

export function openPlaylist(key, isBuiltin){
  window.currentPlaylistId = key;
  window.currentPlaylistIsBuiltin = isBuiltin;
  let name, queue, coverHTML;
  if(isBuiltin){ name = key; queue = data.builtinPlaylists[key] || []; coverHTML = coverEl(queue.length ? queue[0] : 0); }
  else {
    const p = (window.userPlaylists||[]).find(x=>x.id===key);
    name = p ? p.name : ''; queue = p ? p.tracks : [];
    coverHTML = p ? playlistCoverHTML(p) : coverEl(0);
  }
  const plCover = document.getElementById('plCover');
  if(plCover){ plCover.querySelector('.cover-fill')?.remove(); plCover.insertAdjacentHTML('afterbegin', `<div class="cover-fill" style="position:absolute;inset:0;">${coverHTML}</div>`); }
  const plName = document.getElementById('plName'); if(plName) plName.textContent = name;
  const plMeta = document.getElementById('plMeta'); if(plMeta) plMeta.textContent = queue.length + ' songs';
  const plAddBtn = document.getElementById('plAddBtn'); if(plAddBtn) plAddBtn.style.display = isBuiltin ? 'none' : 'flex';
  const plCoverEditBadge = document.getElementById('plCoverEditBadge'); if(plCoverEditBadge) plCoverEditBadge.classList.toggle('hidden', isBuiltin);
  renderPlaylistTracks();
  switchScreen('playlist');
}

export function renderPlaylistTracks(){
  const queue = window.currentPlaylistIsBuiltin ? (data.builtinPlaylists[window.currentPlaylistId]||[]) : ((window.userPlaylists||[]).find(p=>p.id===window.currentPlaylistId)||{tracks:[]}).tracks;
  const el = document.getElementById('plTracks');
  if(!el) return;
  if(!queue.length){ el.innerHTML = `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">No songs yet</div>`; return; }
  el.innerHTML = queue.map((ti,idx) => window.currentPlaylistIsBuiltin ? trackRowShim(ti, idx+1, window.currentTrack===ti, window.currentPlaylistId) : plTrackRowHTML(ti, idx+1, queue.length)).join('');
  attachTrackRowHandlers(el);
}

function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-'+name);
  if(el) el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav===name));
}

function trackRowShim(i, idx, isPlaying, queueName){
  // keep old signature available while using new component internally
  const tr = window.tracks && window.tracks[i] || {};
  const dl = (window.downloads && window.downloads.has && window.downloads.has(i)) ? true : false;
  const playingHtml = (isPlaying && window.playing) ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx;
  return `<div class="trow" data-track-index="${i}" data-queue="${queueName}">
    <div class="idx">${playingHtml}</div>
    <div class="thumb">${coverEl(i)}</div>
    <div class="meta"><div class="ttl">${tr.title||''}</div><div class="sub">${tr.artist||''}</div></div>
    ${dl ? `<svg class="dl-icon done" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
    <svg class="kebab" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-action="open-action" data-track="${i}"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
  </div>`;
}

function coverEl(i){
  const tr = data.tracks && data.tracks[i];
  if(tr && tr.cover) return `<img src="${tr.cover}" alt="${tr.title}" style="width:100%;height:100%;object-fit:cover;">`;
  const grads = [['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436']];
  const g = grads[i % grads.length];
  return `<div style="width:100%;height:100%;background:linear-gradient(150deg, ${g[0]}55, ${g[1]} 75%);position:relative;"></div>`;
}

function playlistCoverHTML(p){
  if(p.customCover) return `<div style="width:100%;height:100%;background:${p.customCover};"></div>`;
  return p.tracks.length ? coverEl(p.tracks[0]) : `<div style="width:100%;height:100%;background:var(--surface-3);"></div>`;
}
