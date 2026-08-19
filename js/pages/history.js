// js/pages/history.js — play & listen history rendering
// Reads history from the new player API when available

export function renderHistoryList(){
  const el = document.getElementById('historyList');
  if(!el) return;

  // prefer module API, fallback to global arrays
  let log = [];
  if(window.player && typeof window.player.getPlayHistoryLog === 'function'){
    log = window.player.getPlayHistoryLog();
  } else if(window.playHistoryLog){
    log = window.playHistoryLog;
  }

  if(!log || !log.length){
    el.innerHTML = `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">No history yet</div>`;
    return;
  }

  el.innerHTML = log.map(h => {
    const tr = (window.tracks && window.tracks[h.i]) || {};
    const timeLabel = (h.time && (new Date(h.time)).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})) || '';
    return `
      <div class="hist-item" data-track-index="${h.i}">
        <div class="hist-thumb">${tr.cover ? `<img src="${tr.cover}" style="width:100%;height:100%;object-fit:cover;">` : ''}</div>
        <div class="hist-meta"><div class="hist-title">${tr.title||'Unknown'}</div><div class="hist-sub">${tr.artist||''}</div></div>
        <div class="hist-time">${timeLabel}</div>
      </div>`;
  }).join('');

  // attach handlers to play when clicked
  el.querySelectorAll('.hist-item').forEach(item => item.addEventListener('click', () => {
    const idx = parseInt(item.dataset.trackIndex, 10);
    if(typeof window.playTrack === 'function') window.playTrack(idx, 'History', true);
  }));
}
