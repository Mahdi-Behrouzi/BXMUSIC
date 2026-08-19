// js/components/trackRow.js
// Provides helpers to render track rows without inline onclick handlers
// and installs delegated event listeners so legacy-style rendering can be
// swapped out gradually.

export function trackRowHTML(i, idx, isPlaying, queueName){
  const label = (queueName || (window.tracks && window.tracks[i] && window.tracks[i].album) || '').replace(/"/g,'&quot;');
  const playingHtml = (isPlaying && window.playing) ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx;
  const dl = (window.downloads && window.downloads.has && window.downloads.has(i)) ? true : false;
  return `<div class="trow" data-track-index="${i}" data-queue="${label}">
    <div class="idx">${playingHtml}</div>
    <div class="thumb">${coverInline(i)}</div>
    <div class="meta"><div class="ttl">${(window.tracks&&window.tracks[i]&&window.tracks[i].title)||''}</div><div class="sub">${(window.tracks&&window.tracks[i]&&window.tracks[i].artist)||''}</div></div>
    ${dl ? `<svg class="dl-icon done" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
    <svg class="kebab" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-action="open-action" data-track="${i}"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
  </div>`;
}

export function plTrackRowHTML(i, idx, total){
  const tr = window.tracks && window.tracks[i] || {};
  const playingHtml = (window.currentTrack===i && window.playing) ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx;
  return `<div class="trow" data-track-index="${i}" data-queue="playlist">
    <div class="idx">${playingHtml}</div>
    <div class="thumb">${coverInline(i)}</div>
    <div class="meta"><div class="ttl">${tr.title||''}</div><div class="sub">${tr.artist||''}</div></div>
    <div class="reorder-btns" data-action="reorder" data-track="${i}" style="">
      <button data-dir="-1" class="reorder-btn">▲</button>
      <button data-dir="1" class="reorder-btn">▼</button>
    </div>
    <svg class="rm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-action="remove" data-track="${i}"><path d="M18 6L6 18M6 6l12 12"/></svg>
  </div>`;
}

function coverInline(i){
  const tr = window.tracks && window.tracks[i];
  if(tr && tr.cover) return `<img src="${tr.cover}" alt="${tr.title||''}" style="width:100%;height:100%;object-fit:cover;">`;
  const grads = [['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436']];
  const g = grads[i % grads.length];
  return `<div style="width:100%;height:100%;background:linear-gradient(150deg, ${g[0]}55, ${g[1]} 75%);position:relative;"></div>`;
}

export function attachTrackRowHandlers(root=document){
  // Delegate clicks for track rows
  root.addEventListener('click', (evt) => {
    const trow = evt.target.closest('.trow');
    if(!trow) return;
    // if click originated on a control with data-action, handle it
    const actionEl = evt.target.closest('[data-action]');
    if(actionEl){
      const action = actionEl.dataset.action;
      const idx = parseInt(actionEl.dataset.track || trow.dataset.trackIndex, 10);
      if(action === 'open-action'){
        if(typeof window.openActionSheet === 'function') return window.openActionSheet(idx);
        if(typeof window.openActionSheetLegacy === 'function') return window.openActionSheetLegacy(idx);
      }
      if(action === 'reorder'){
        // handled by buttons inside; ignore container
        return;
      }
      if(action === 'remove'){
        if(typeof window.removeTrackFromPlaylist === 'function') return window.removeTrackFromPlaylist(idx);
      }
      return;
    }
    // If no action, treat as play
    const ti = parseInt(trow.dataset.trackIndex, 10);
    const q = trow.dataset.queue || '';
    if(typeof window.playTrack === 'function') window.playTrack(ti, q, true);
  });

  // handle reorder buttons
  root.addEventListener('click', (evt) => {
    const btn = evt.target.closest('.reorder-btn');
    if(!btn) return;
    evt.stopPropagation();
    const dir = parseInt(btn.dataset.dir, 10) || 0;
    const container = btn.closest('[data-action="reorder"]');
    const idx = parseInt(container && container.dataset.track, 10);
    if(typeof window.moveTrackInPlaylist === 'function') window.moveTrackInPlaylist(idx, dir);
  });
}
