// js/pages/group.js — group listening UI (lightweight)
import data from '../data/data.js';

export function openGroupSheet(){
  if(window.isBlockedOffline && window.isBlockedOffline()) return;
  const elIdle = document.getElementById('groupIdleState');
  const elActive = document.getElementById('groupActiveState');
  if(window.groupActive){ elIdle && elIdle.classList.add('hidden'); elActive && elActive.classList.remove('hidden'); renderGroupParticipants(); }
  else { elIdle && elIdle.classList.remove('hidden'); elActive && elActive.classList.add('hidden'); }
  document.getElementById('groupBackdrop')?.classList.add('open');
  document.getElementById('groupSheet')?.classList.add('open');
}
export function closeGroupSheet(){ document.getElementById('groupBackdrop')?.classList.remove('open'); document.getElementById('groupSheet')?.classList.remove('open'); }

export function startGroupSession(){
  if(typeof window.startGroupSession === 'function') return window.startGroupSession();
  window.groupActive = true; window.groupParticipantIds = [];
  document.getElementById('sessionCodeLabel') && (document.getElementById('sessionCodeLabel').textContent = 'BXMUSIC-' + Math.floor(1000+Math.random()*9000));
  renderGroupParticipants(); updateGroupBadge(); window.showToast && window.showToast('Session started');
  // simulate invites
  let pool = (window.friends || data.friends || []).map(f=>f.id);
  window.groupTimer && clearInterval(window.groupTimer);
  window.groupTimer = setInterval(() => {
    if(!window.groupActive || !pool.length) return;
    const next = pool.splice(Math.floor(Math.random()*pool.length),1)[0];
    window.groupParticipantIds.push(next);
    renderGroupParticipants(); updateGroupBadge();
    window.showToast && window.showToast((data.friends.find(f=>f.id===next)||{name:'Friend'}).name + ' joined the session');
  }, 4000);
}
export function endGroupSession(){ if(typeof window.endGroupSession === 'function') return window.endGroupSession(); window.groupActive=false; clearInterval(window.groupTimer); window.groupTimer=null; window.groupParticipantIds=[]; updateGroupBadge(); closeGroupSheet(); window.showToast && window.showToast('Session ended'); }

export function renderGroupParticipants(){
  const el = document.getElementById('groupParticipants'); if(!el) return;
  if(!window.groupParticipantIds || !window.groupParticipantIds.length){ el.innerHTML = `<div style="color:var(--faint);font-size:12.5px;padding:6px 14px 14px;">Waiting for friends to join…</div>`; return; }
  el.innerHTML = `<div class="friend-strip" style="padding:0 14px 14px;">` + (window.groupParticipantIds||[]).map(id => {
    const idx = (window.friends||data.friends||[]).findIndex(f=>f.id===id);
    const f = (window.friends||data.friends||[])[idx] || {name:'Friend'};
    const color = (data.friendColors||[])[idx % (data.friendColors||[]).length] || '#ccc';
    return `<div class="friend-item"><div class="friend-avatar" style="background:${color}">${f.name[0]}</div><div class="friend-name">${f.name}</div></div>`;
  }).join('') + `</div>`;
}

function updateGroupBadge(){ const badge = document.getElementById('groupBadge'); if(!badge) return; if(!window.groupActive || !(window.groupParticipantIds && window.groupParticipantIds.length)){ badge.classList.add('hidden'); return; } badge.classList.remove('hidden'); document.getElementById('groupCountLabel') && (document.getElementById('groupCountLabel').textContent = 'Listening with ' + window.groupParticipantIds.length); }
