// js/pages/home.js — rendering helpers for the Home screen
// These functions are a first step toward moving render logic out of the
// legacy script. They keep the same DOM ids and structure so they can
// be swapped in gradually.

import data from '../data/data.js';

export function renderHome(root){
  if(!root) root = document.getElementById('screen-home');
  renderHomeChips();
  renderMadeForYou();
  renderRecent();
  renderFeatures();
  renderHomeVideos();
  renderHomePodcasts();
}

export function renderHomeChips(){
  const el = document.getElementById('homeChips');
  if(!el) return;
  const labels = ['All','Music','Podcasts','Videos'];
  const keys = {All:'all',Music:'music',Podcasts:'podcasts',Videos:'videos'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${(keys[l] && (data.genreI18n ? (data.genreI18n.en[keys[l]]||keys[l]) : keys[l]))||l}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
    // delegate to legacy handler if present
    if(typeof window.showHomeChip === 'function') window.showHomeChip(c.dataset.chip);
    else showHomeChipLocal(c.dataset.chip);
  }));
}

function showHomeChipLocal(label){
  document.querySelectorAll('#homeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  document.getElementById('homeMusicSection').classList.toggle('hidden', !(label==='All'||label==='Music'));
  document.getElementById('homeVideoSection').classList.toggle('hidden', label!=='Videos');
  document.getElementById('homePodcastSection').classList.toggle('hidden', label!=='Podcasts');
}

export function renderMadeForYou(){
  const el = document.getElementById('madeForYou');
  if(!el) return;
  const list = data.madeForYou || [];
  el.innerHTML = list.map(m => `
    <div class="hcard" data-playlist-name="${m.name}">
      <div class="cover">${coverEl(m.i)}</div>
      <div class="t">${m.name}</div><div class="s">${m.sub}</div>
    </div>`).join('');
  el.querySelectorAll('.hcard').forEach(card => card.addEventListener('click', () => {
    const name = card.dataset.playlistName;
    if(typeof window.openPlaylist === 'function') window.openPlaylist(name, true);
  }));
}

export function renderRecent(){
  const el = document.getElementById('recentStrip');
  if(!el) return;
  const list = data.recent || [];
  el.innerHTML = list.map(r => `
    <div class="cover" style="width:78px;height:78px;flex:0 0 78px;overflow:hidden;position:relative;" data-i="${r.i}">
      ${coverEl(r.i)}
    </div>`).join('');
  el.querySelectorAll('.cover').forEach(c => c.addEventListener('click', () => {
    const i = +c.dataset.i;
    if(typeof window.playTrack === 'function') window.playTrack(i, 'Recently played', false);
  }));
}

export function renderFeatures(){
  const el = document.getElementById('featStrip');
  if(!el) return;
  const list = data.features || [];
  el.innerHTML = list.map(f => `
    <div class="feat-card">
      <div class="fi" style="background:${f.color}22;">&nbsp;</div>
      <h3>${f.name}</h3><p>${f.desc}</p>
    </div>`).join('');
}

export function renderHomeVideos(){
  const el = document.getElementById('homeVideoGrid');
  if(!el) return;
  const list = data.tracks || [];
  el.innerHTML = list.map((t,i) => `
    <div class="gcard" data-i="${i}">
      <div class="cover">${coverEl(i)}</div>
      <div class="t">${t.title}</div><div class="s">${t.artist}</div>
    </div>`).join('');
  el.querySelectorAll('.gcard').forEach(g => g.addEventListener('click', () => {
    const i = +g.dataset.i;
    if(typeof window.playTrack === 'function') window.playTrack(i, 'Videos', true);
  }));
}

export function renderHomePodcasts(){
  const el = document.getElementById('homePodcastGrid');
  if(!el) return;
  const list = data.podcasts || [];
  el.innerHTML = list.map(p => `
    <div class="gcard">
      <div class="cover">${coverEl(p.i)}</div>
      <div class="t">${p.title}</div><div class="s">${p.host}</div>
    </div>`).join('');
}

// small helper used by the cards — renderer of cover fallback
function coverEl(i){
  const tr = data.tracks && data.tracks[i];
  if(tr && tr.cover){
    return `<img src="${tr.cover}" alt="${tr.title}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  const grads = [['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436']];
  const g = grads[i % grads.length];
  return `<div style="width:100%;height:100%;background:linear-gradient(150deg, ${g[0]}55, ${g[1]}75%);position:relative;"></div>`;
}
