// js/pages/profile.js — rendering for profile screen
import data from '../data/data.js';

export function renderProfile(){
  const statPlaylists = document.getElementById('statPlaylists'); if(statPlaylists) statPlaylists.textContent = (window.userPlaylists||[]).length;
  const statFollowing = document.getElementById('statFollowing'); if(statFollowing) statFollowing.textContent = (window.followedFriends? window.followedFriends.size : 0);
  const friendStrip = document.getElementById('friendStripProfile');
  if(friendStrip){
    const friends = data.friends || [];
    friendStrip.innerHTML = friends.map((f,idx) => `<div class="friend-item" data-fid="${f.id}"><div class="friend-avatar" style="background:${data.friendColors[idx%data.friendColors.length]}">${f.name[0]}<span class="dot ${(f.status==='Online' || f.status.startsWith('Listening')) ? 'online' : 'offline'}"></span></div><div class="friend-name">${f.name}</div></div>`).join('');
    friendStrip.querySelectorAll('.friend-item').forEach((el,idx) => el.addEventListener('click', () => { if(typeof window.openFriendSheet === 'function') window.openFriendSheet(friends[idx].id); }));
  }
  renderProfileHeader();
}

export function renderProfileHeader(){
  const profile = window.profile || {name:'User', bio:'', color:null, emoji:''};
  const bg = profile.color || 'var(--grad)';
  const label = profile.emoji || (profile.name && profile.name[0].toUpperCase()) || 'M';
  const drawerAvatar = document.getElementById('drawerAvatar'); if(drawerAvatar){ drawerAvatar.style.background = bg; drawerAvatar.textContent = label; }
  const drawerName = document.getElementById('drawerName'); if(drawerName) drawerName.textContent = profile.name;
  const profileAvatar = document.getElementById('profileAvatar'); if(profileAvatar){ profileAvatar.style.background = bg; document.getElementById('profileAvatarText').textContent = label; }
  const profileName = document.getElementById('profileName'); if(profileName) profileName.textContent = profile.name;
  const profileBio = document.getElementById('profileBio'); if(profileBio){ profileBio.textContent = profile.bio; profileBio.style.display = profile.bio ? 'block' : 'none'; }
}
