// js/pages/friends.js — rendering and wiring for Friends screen
import data from '../data/data.js';

export function renderFriendsList(){
  const el = document.getElementById('friendsList');
  if(!el) return;
  const friends = data.friends || [];
  el.innerHTML = friends.map((f,idx) => `
    <div class="friend-row" data-fid="${f.id}">
      <div class="friend-avatar" style="width:44px;height:44px;font-size:15px;background:${data.friendColors[idx%data.friendColors.length]}">${f.name[0]}<span class="dot ${(f.status==='Online'||f.status.startsWith('Listening')) ? 'online' : 'offline'}"></span></div>
      <div class="meta"><div class="fname">${f.name}</div><div class="fstatus">${f.status}</div></div>
      <button class="btn-follow-sm ${ (window.followedFriends && window.followedFriends.has && window.followedFriends.has(f.id)) ? 'following' : '' }" data-action="quick-follow" data-fid="${f.id}">${ (window.followedFriends && window.followedFriends.has && window.followedFriends.has(f.id)) ? 'Following' : 'Follow' }</button>
    </div>`).join('');

  // attach listeners
  el.querySelectorAll('.friend-row').forEach((row, idx) => {
    row.addEventListener('click', () => {
      const fid = row.dataset.fid;
      if(typeof window.openFriendSheet === 'function') return window.openFriendSheet(fid);
      // legacy fallback
      if(typeof window.openFriendSheetLegacy === 'function') return window.openFriendSheetLegacy(fid);
    });
  });

  el.querySelectorAll('[data-action="quick-follow"]').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const fid = btn.dataset.fid;
      if(typeof window.quickToggleFollow === 'function') return window.quickToggleFollow(fid);
      // legacy fallback: toggle followedFriends set
      if(!window.followedFriends) window.followedFriends = new Set();
      if(window.followedFriends.has(fid)) window.followedFriends.delete(fid); else window.followedFriends.add(fid);
      renderFriendsList();
    });
  });
}
