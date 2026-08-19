// js/pages/comments.js — comments UI
export function openComments(i){
  window.currentCommentTrack = i;
  document.getElementById('commentsTitle').textContent = 'Comments — ' + (window.tracks && window.tracks[i] && window.tracks[i].title ? window.tracks[i].title : '');
  renderComments();
  document.getElementById('commentsBackdrop')?.classList.add('open');
  document.getElementById('commentsSheet')?.classList.add('open');
}
export function closeComments(){ document.getElementById('commentsBackdrop')?.classList.remove('open'); document.getElementById('commentsSheet')?.classList.remove('open'); }
export function renderComments(){
  const list = window.comments || {}[window.currentCommentTrack] || [];
  const el = document.getElementById('commentsList'); if(!el) return;
  el.innerHTML = (window.comments && window.comments[window.currentCommentTrack]) ? window.comments[window.currentCommentTrack].map(c => `
    <div class="comment-item"><div class="comment-avatar" style="background:${c.color}">${c.user[0]}</div><div><div class="comment-name">${c.user}</div><div class="comment-text">${c.text}</div><div class="comment-time">${c.time}</div></div></div>`).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 10px;text-align:center;">No comments yet — be the first</div>`;
}
export function postComment(){ const input = document.getElementById('commentInput'); if(!input) return; const text = input.value.trim(); if(!text) return; if(!window.comments) window.comments = {}; if(!window.comments[window.currentCommentTrack]) window.comments[window.currentCommentTrack]=[]; window.comments[window.currentCommentTrack].push({user: window.profile?window.profile.name:'User', color: (window.profile&&window.profile.color)||'#8b5cf6', text, time:'now'}); input.value=''; renderComments(); }
