// js/components/playerBar.js — miniplayer component
// Keeps UI updates in one place and delegates actions to window.player

export function updateMini(){
  const t = (window.tracks && window.tracks[window.currentTrack]) || {};
  const mpThumb = document.getElementById('mpThumb'); if(mpThumb) mpThumb.innerHTML = t ? (t.cover ? `<img src="${t.cover}" style="width:100%;height:100%;object-fit:cover;">` : '') : '';
  const mpTitle = document.getElementById('mpTitle'); if(mpTitle) mpTitle.textContent = t.title || '';
  const mpArtist = document.getElementById('mpArtist'); if(mpArtist) mpArtist.textContent = t.artist || '';
  updatePlayIcons();
}

export function updatePlayIcons(){
  const pause = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
  const play = '<path d="M8 5v14l11-7z"/>';
  const mpPlayIcon = document.getElementById('mpPlayIcon'); if(mpPlayIcon) mpPlayIcon.innerHTML = window.playing ? pause : play;
  const npPlayIcon = document.getElementById('npPlayIcon'); if(npPlayIcon) npPlayIcon.innerHTML = window.playing ? pause : play;
}

export function attachPlayerBarHandlers(root=document){
  // Play/pause
  root.addEventListener('click', (evt) => {
    const btn = evt.target.closest('#mpPlayBtn, #npPlayBtn');
    if(!btn) return;
    evt.preventDefault();
    if(typeof window.togglePlay === 'function') window.togglePlay();
  });
  // Open now playing
  root.addEventListener('click', (evt) => {
    const el = evt.target.closest('#mpOpenBtn'); if(!el) return; if(typeof window.openNowPlaying === 'function') window.openNowPlaying();
  });
}
