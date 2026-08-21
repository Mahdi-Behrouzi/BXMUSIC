// BXMUSIC app.js — application entry point
// All feature modules are loaded before this file from index.html.
// Shared state lives in js/store; data lives in js/data.
/* ================= INIT ================= */
initAccount();

setTheme('dark');
setLang('en');
updateDownloadCount();
buildVisualizerBars();
updateQualityUI();
renderHomeChips();
renderMadeForYou();
renderRecent();
renderFeatures();
renderHomeVideos();
renderHomePodcasts();
renderExplore();
renderLibChips();
renderSearch('');
updateMini();
updateSheet();
renderWaveProgress();
renderProfileHeader();
updateNotifDot();
document.getElementById('castIcon').style.color = 'var(--dim)';
