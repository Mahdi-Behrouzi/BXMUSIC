// js/pages/search.js — search rendering and wiring
import data from '../data/data.js';
import { trackRowHTML, attachTrackRowHandlers } from '../components/trackRow.js';

export function renderSearch(q){
  q = (q||'').toLowerCase();
  const el = document.getElementById('searchResults');
  if(!el) return;
  if(!q){
    el.innerHTML = `<div class="section-head"><h2>Browse all</h2></div>` + (data.tracks||[]).map((t,i)=>trackRowHTML(i,i+1, window.currentTrack===i)).join('');
    attachTrackRowHandlers(el);
    return;
  }
  const results = (data.tracks||[]).map((t,i)=>({t,i})).filter(x => x.t.title.toLowerCase().includes(q) || x.t.artist.toLowerCase().includes(q));
  el.innerHTML = results.length ? results.map(x => trackRowHTML(x.i, x.i+1, window.currentTrack===x.i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 4px;">No results for "${q}"</div>`;
  attachTrackRowHandlers(el);
}
