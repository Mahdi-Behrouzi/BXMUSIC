// js/pages/cast.js — casting UI and wiring
import data from '../data/data.js';

export function renderDeviceList(){
  const el = document.getElementById('deviceList'); if(!el) return;
  const icons = {
    phone:'<rect x="7" y="2" width="10" height="20" rx="2"/>',
    tv:'<rect x="2" y="4" width="20" height="13" rx="2"/>',
    speaker:'<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="14" r="4"/>'
  };
  const devices = window.devices || data.devices || [];
  el.innerHTML = devices.map(d => `
    <div class="device-row ${d.id===window.castDeviceId?'active':''}" data-id="${d.id}" data-name="${d.name}">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[d.icon]||''}</svg>
      <span style="flex:1;">${d.name}</span>
      ${d.id===window.castDeviceId ? '<svg style="width:16px;height:16px;stroke:var(--a1);" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2"/></svg>' : ''}
    </div>`).join('');

  el.querySelectorAll('.device-row').forEach(row => row.addEventListener('click', () => {
    const id = row.dataset.id; const name = row.dataset.name;
    if(typeof window.selectDevice === 'function') return window.selectDevice(id, name);
    // fallback behavior
    window.castDeviceId = id;
    const badge = document.getElementById('castBadge'); if(!badge) return;
    if(id==='d1'){ badge.classList.add('hidden'); document.getElementById('castIcon').style.color='var(--dim)'; window.showToast && window.showToast('Playing on this device'); }
    else { badge.classList.remove('hidden'); document.getElementById('castDeviceName').textContent = name; document.getElementById('castIcon').style.color='var(--a1)'; window.showToast && window.showToast('Casting to '+name); }
    // close sheet if present
    document.getElementById('castBackdrop')?.classList.remove('open'); document.getElementById('castSheet')?.classList.remove('open');
  }));
}

export function openCastSheet(){ if(window.isBlockedOffline && window.isBlockedOffline()) return; renderDeviceList(); document.getElementById('castBackdrop')?.classList.add('open'); document.getElementById('castSheet')?.classList.add('open'); }
export function closeCastSheet(){ document.getElementById('castBackdrop')?.classList.remove('open'); document.getElementById('castSheet')?.classList.remove('open'); }
