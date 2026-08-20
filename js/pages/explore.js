
/* ================= RENDER: EXPLORE ================= */

function renderExplore(){
  document.getElementById('genreGrid').innerHTML = genres.map((g,i) => `
    <div class="gcard"><div class="cover">${coverEl(i+2)}</div><div class="t">${genreI18n[lang][g]||g}</div></div>`).join('');
  document.getElementById('radioGrid').innerHTML = radioStations.map((s,i) => `
    <div class="gcard" onclick='playTrack(${i % tracks.length},"${s}",false)'>
      <div class="cover">${coverEl(i+3)}</div><div class="t">${s}</div><div class="s">${t('radioStationLabel')}</div>
    </div>`).join('');
}


