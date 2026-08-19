// js/pages/artist.js — rendering for artist screen
import data from '../data/data.js';
import { trackRowHTML, attachTrackRowHandlers } from '../components/trackRow.js';

export function openArtist(name){
  window.currentArtist = name;
  window.following = false;
  const a = data.artists[name] || {tracks: []};
  const hero = document.getElementById('artistHero');
  if(hero) hero.style.background = `linear-gradient(150deg, #8b5cf655, #2a1a4a 75%)`;
  const artistNameEl = document.getElementById('artistName'); if(artistNameEl) artistNameEl.textContent = name;
  const followersEl = document.getElementById('artistFollowers'); if(followersEl) followersEl.textContent = (a.followers||'0') + ' monthly listeners';
  const followBtn = document.getElementById('followBtn'); if(followBtn){ followBtn.textContent = 'Follow'; followBtn.classList.remove('following'); }
  const tracksEl = document.getElementById('artistTracks');
  if(tracksEl){
    tracksEl.innerHTML = (a.tracks||[]).map((ti,idx) => trackRowHTML(ti, idx+1, window.currentTrack===ti)).join('');
    attachTrackRowHandlers(tracksEl);
  }
  switchScreen('artist');
}

function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-'+name);
  if(el) el.classList.add('active');
}
