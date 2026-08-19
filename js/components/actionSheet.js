// js/components/actionSheet.js — simple action sheet controls
export function openActionSheet(i){
  window.actionTrackIndex = i;
  const tr = window.tracks && window.tracks[i];
  const actionCover = document.getElementById('actionCover'); if(actionCover) actionCover.innerHTML = tr ? (tr.cover ? `<img src="${tr.cover}" style="width:100%;height:100%;object-fit:cover;">` : '') : '';
  const actionTitle = document.getElementById('actionTitle'); if(actionTitle) actionTitle.textContent = tr ? tr.title : '';
  const actionArtist = document.getElementById('actionArtist'); if(actionArtist) actionArtist.textContent = tr ? tr.artist : '';
  updateActionDownloadUI();
  document.getElementById('actionBackdrop')?.classList.add('open');
  document.getElementById('actionSheet')?.classList.add('open');
}
export function closeActionSheet(){ document.getElementById('actionBackdrop')?.classList.remove('open'); document.getElementById('actionSheet')?.classList.remove('open'); }
export function updateActionDownloadUI(){
  const dl = (window.downloads && window.downloads.has && window.downloads.has(window.actionTrackIndex));
  const label = document.getElementById('actionDownloadLabel'); if(label) label.textContent = dl ? 'Remove download' : 'Download';
}
export function toggleDownloadCurrent(){
  const i = window.actionTrackIndex;
  const tr = window.tracks && window.tracks[i];
  if(!tr || !tr.audioUrl) return;
  const a = document.createElement('a'); a.href = tr.audioUrl; a.download = (tr.title||'track') + '.mp3'; document.body.appendChild(a); a.click(); a.remove();
  if(!window.downloads) window.downloads = new Set(); window.downloads.add(i);
  updateActionDownloadUI();
  if(typeof window.updateDownloadCount === 'function') window.updateDownloadCount();
  closeActionSheet();
}
