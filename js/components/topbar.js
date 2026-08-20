function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const svg = el.querySelector('svg');
    el.textContent = t(key);
    if(svg) el.appendChild(svg);
  });
  document.getElementById('searchInput').placeholder = lang==='fa' ? 'آهنگ، خواننده، آلبوم...' : 'Songs, artists, albums...';
}
function setLang(l){
  lang = l;
  document.getElementById('langEnBtn').classList.toggle('active', l==='en');
  document.getElementById('langFaBtn').classList.toggle('active', l==='fa');
  document.body.classList.toggle('lang-fa', l==='fa');
  applyI18n();
  renderHomeChips(); renderMadeForYou(); renderExplore(); renderLibChips(); renderSearch(document.getElementById('searchInput').value);
  updateSheet();
}
function setTheme(th){
  theme = th;
  document.body.classList.toggle('light', th==='light');
  document.getElementById('themeDarkBtn').classList.toggle('active', th==='dark');
  document.getElementById('themeLightBtn').classList.toggle('active', th==='light');
}
