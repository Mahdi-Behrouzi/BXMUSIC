// js/pages/notifications.js — notifications UI
import data from '../data/data.js';

export function openNotifications(){
  const el = document.getElementById('notifList'); if(!el) return;
  const notes = window.notifications || data.notifications || [];
  el.innerHTML = notes.map(n => `
    <div class="notif-item">
      <div class="notif-icon">${n.icon}</div>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
  if(window.notifications) window.notifications.forEach(n=>n.read=true);
  document.getElementById('notifBackdrop')?.classList.add('open');
  document.getElementById('notifSheet')?.classList.add('open');
}
export function closeNotifications(){ document.getElementById('notifBackdrop')?.classList.remove('open'); document.getElementById('notifSheet')?.classList.remove('open'); }
export function updateNotifDot(){ const hasUnread = (window.notifications||[]).some(n=>!n.read); document.getElementById('notifDot')?.classList.toggle('hidden', !hasUnread); document.getElementById('notifDotSettings')?.classList.toggle('hidden', !hasUnread); }
