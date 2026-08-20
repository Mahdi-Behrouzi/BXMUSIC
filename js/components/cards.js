
/* ================= TRACK ROW HTML ================= */

function trackRowHTML(i, idx, isPlaying, queueName){
  const tr = tracks[i];
  const dl = downloads.has(i);
  const label = (queueName || tr.album).replace(/"/g,'&quot;');
  return `<div class="trow" onclick='playTrack(${i},"${label}",true)'>
    <div class="idx">${isPlaying && playing ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx}</div>
    <div class="thumb">${coverEl(i)}</div>
    <div class="meta"><div class="ttl">${tr.title}</div><div class="sub">${tr.artist}</div></div>
    ${dl ? `<svg class="dl-icon done" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
    <svg class="kebab" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" onclick='event.stopPropagation();openActionSheet(${i})'><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/></svg>
  </div>`;
}
function plTrackRowHTML(i, idx, total){
  const tr = tracks[i];
  return `<div class="trow" onclick='playTrack(${i},"playlist",true)'>
    <div class="idx">${currentTrack===i && playing ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx}</div>
    <div class="thumb">${coverEl(i)}</div>
    <div class="meta"><div class="ttl">${tr.title}</div><div class="sub">${tr.artist}</div></div>
    <div class="reorder-btns" onclick="event.stopPropagation()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="${idx===1?'opacity:.2;pointer-events:none;':''}" onclick="moveTrackInPlaylist(${i},-1)"><path d="M18 15l-6-6-6 6"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="${idx===total?'opacity:.2;pointer-events:none;':''}" onclick="moveTrackInPlaylist(${i},1)"><path d="M6 9l6 6 6-6"/></svg>
    </div>
    <svg class="rm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" onclick='event.stopPropagation();removeTrackFromPlaylist(${i})'><path d="M18 6L6 18M6 6l12 12"/></svg>
  </div>`;
}


