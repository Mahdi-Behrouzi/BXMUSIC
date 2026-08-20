
/* ================= RENDER: HOME ================= */

function renderHomeChips(){
  const el = document.getElementById('homeChips');
  const labels = ['All','Music','Podcasts','Videos'];
  const keys = {All:'all',Music:'music',Podcasts:'podcasts',Videos:'videos'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${t(keys[l])}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.onclick = () => showHomeChip(c.dataset.chip));
}
function showHomeChip(label){
  document.querySelectorAll('#homeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  document.getElementById('homeMusicSection').classList.toggle('hidden', !(label==='All'||label==='Music'));
  document.getElementById('homeVideoSection').classList.toggle('hidden', label!=='Videos');
  document.getElementById('homePodcastSection').classList.toggle('hidden', label!=='Podcasts');
}
function renderMadeForYou(){
  document.getElementById('madeForYou').innerHTML = madeForYou.map(m => `
    <div class="hcard" onclick="openPlaylist('${m.name}',true)">
      <div class="cover">${coverEl(m.i)}</div>
      <div class="t">${m.name}</div><div class="s">${m.sub}</div>
    </div>`).join('');
}
function renderRecent(){
  const list = offlineMode ? recent.filter(r => downloads.has(r.i)) : recent;
  document.getElementById('recentStrip').innerHTML = list.length ? list.map(r => `
    <div class="cover" style="width:78px;height:78px;flex:0 0 78px;overflow:hidden;position:relative;" onclick='playTrack(${r.i},"Recently played",false)'>${coverEl(r.i)}</div>`).join('') : `<div style="color:var(--faint);font-size:12px;">No downloaded songs yet</div>`;
}
function renderFeatures(){
  document.getElementById('featStrip').innerHTML = features.map(f => `
    <div class="feat-card">
      <div class="fi" style="background:${f.color}22;"><svg viewBox="0 0 24 24" fill="none" stroke="${f.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg></div>
      <h3>${f.name}</h3><p>${f.desc}</p>
    </div>`).join('');
}
function renderHomeVideos(){
  document.getElementById('homeVideoGrid').innerHTML = tracks.map((t,i) => `
    <div class="gcard" onclick='playTrack(${i},"Videos",true)'>
      <div class="cover">${coverEl(i)}<svg viewBox="0 0 24 24" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;" fill="rgba(255,255,255,.9)"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.4)"/><path d="M10 8l6 4-6 4V8z" fill="#fff"/></svg></div>
      <div class="t">${t.title}</div><div class="s">${t.artist}</div>
    </div>`).join('');
}
function renderHomePodcasts(){
  document.getElementById('homePodcastGrid').innerHTML = podcasts.map(p => `
    <div class="gcard">
      <div class="cover">${coverEl(p.i)}</div>
      <div class="t">${p.title}</div><div class="s">${p.host}</div>
    </div>`).join('');
}


