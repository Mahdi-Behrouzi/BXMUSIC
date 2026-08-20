
/* ================= SMART RECOMMENDATIONS ================= */

function updateBecauseSection(){
  if(listenHistory.length < 2) return;
  const counts = {};
  listenHistory.forEach(i => { const artist = tracks[i].artist; counts[artist] = (counts[artist]||0)+1; });
  const topArtist = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
  const picks = tracks.map((tr,i)=>({tr,i})).filter(x => x.tr.artist===topArtist && !listenHistory.slice(-3).includes(x.i));
  const finalPicks = picks.length ? picks : tracks.map((tr,i)=>({tr,i})).slice(0,4);
  document.getElementById('becauseTitle').textContent = 'Because you listened to ' + topArtist;
  document.getElementById('becauseStrip').innerHTML = finalPicks.map(x => `
    <div class="hcard" onclick='playTrack(${x.i},"Because you listened",true)'><div class="cover">${coverEl(x.i)}</div><div class="t">${x.tr.title}</div><div class="s">${x.tr.artist}</div></div>`).join('');
  document.getElementById('becauseSection').classList.remove('hidden');
}
function openTasteSheet(){
  document.getElementById('tasteChips').innerHTML = tasteMoods.map(m => `<div class="chip ${selectedMoods.has(m)?'active':''}" data-mood="${m}">${m}</div>`).join('');
  document.querySelectorAll('#tasteChips .chip').forEach(c => c.onclick = () => {
    const m = c.dataset.mood;
    if(selectedMoods.has(m)) selectedMoods.delete(m); else selectedMoods.add(m);
    c.classList.toggle('active');
  });
  document.getElementById('tasteBackdrop').classList.add('open');
  document.getElementById('tasteSheet').classList.add('open');
}
function closeTasteSheet(){ document.getElementById('tasteBackdrop').classList.remove('open'); document.getElementById('tasteSheet').classList.remove('open'); }
function generateRecommendations(){
  if(!selectedMoods.size){ showToast('Pick at least one mood'); return; }
  let picks = new Set();
  selectedMoods.forEach(m => (moodTrackMap[m]||[]).forEach(i => picks.add(i)));
  const finalPicks = [...picks].slice(0,6);
  document.getElementById('recommendedTitle').textContent = 'Picked for: ' + [...selectedMoods].join(', ');
  document.getElementById('recommendedStrip').innerHTML = finalPicks.map(i => `
    <div class="hcard" onclick='playTrack(${i},"Recommended for you",true)'><div class="cover">${coverEl(i)}</div><div class="t">${tracks[i].title}</div><div class="s">${tracks[i].artist}</div></div>`).join('');
  document.getElementById('recommendedSection').classList.remove('hidden');
  closeTasteSheet();
  showToast('Recommendations updated');
}


