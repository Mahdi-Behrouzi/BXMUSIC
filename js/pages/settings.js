// js/pages/settings.js — basic settings wiring
export function renderSettings(){
  document.getElementById('settingsName').textContent = window.profile?.name || 'User';
  document.getElementById('offlineToggle').classList.toggle('on', window.offlineMode);
}
export function openSettings(){ document.getElementById('settingsBackdrop')?.classList.add('open'); document.getElementById('settingsSheet')?.classList.add('open'); }
export function closeSettings(){ document.getElementById('settingsBackdrop')?.classList.remove('open'); document.getElementById('settingsSheet')?.classList.remove('open'); }
