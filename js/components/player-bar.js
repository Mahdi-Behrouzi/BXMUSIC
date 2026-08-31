
/* ================= PLAYER ================= */

function playTrack(i, label, openSheet){
  if(offlineMode && !downloads.has(i) && !(tracks[i] && tracks[i].isUpload)){
    showToast(lang==='fa' ? 'این آهنگ دانلود نشده' : "This song isn't downloaded");
    return;
  }
  currentTrack = i;
  queueLabel = label || tracks[i].album;
  playing = true;
  progress = 0;
  updateMini();
  updateSheet();
  showMiniplayer();
  if(openSheet) openNowPlaying();
  refreshActiveLists();
  const tr = tracks[i];
  const realAudio = document.getElementById('realAudioEl');
  if(tr.isUpload){
    usingRealAudio = true;
    stopSequencer();
    realAudio.src = tr.audioUrl;
    realAudio.currentTime = 0;
    realAudio.play().catch(()=>{});
  } else {
    usingRealAudio = false;
    realAudio.pause();
    ensureAudio();
    startSequencer();
  }
  listenHistory.push(i);
  if(listenHistory.length>30) listenHistory.shift();
  playHistoryLog.unshift({i, time:new Date()});
  if(playHistoryLog.length>100) playHistoryLog.pop();
  updateBecauseSection();
}
function refreshActiveLists(){
  if(document.getElementById('screen-artist').classList.contains('active')) openArtist(currentArtist);
  if(document.getElementById('screen-library').classList.contains('active')) renderLibBody(document.querySelector('#libChips .chip.active')?.dataset.chip || 'Playlists');
  if(document.getElementById('screen-playlist').classList.contains('active')) renderPlaylistTracks();
  if(document.getElementById('screen-search').classList.contains('active') && document.getElementById('searchInput').value) renderSearch(document.getElementById('searchInput').value);
}
function nextTrack(){
  let next;
  if(shuffleMode && tracks.length>1){
    do { next = Math.floor(Math.random()*tracks.length); } while(next===currentTrack);
  } else {
    next = (currentTrack+1)%tracks.length;
  }
  playTrack(next, queueLabel, true);
}
function prevTrack(){ playTrack((currentTrack-1+tracks.length)%tracks.length, queueLabel, true); }
function toggleShuffle(){
  shuffleMode = !shuffleMode;
  document.getElementById('shuffleIcon').classList.toggle('active', shuffleMode);
  showToast(shuffleMode ? (lang==='fa'?'پخش درهم روشن شد':'Shuffle on') : (lang==='fa'?'پخش درهم خاموش شد':'Shuffle off'));
}
function cycleRepeat(){
  repeatMode = repeatMode==='off' ? 'all' : repeatMode==='all' ? 'one' : 'off';
  document.getElementById('repeatIcon').classList.toggle('active', repeatMode!=='off');
  document.getElementById('repeatOneBadge').classList.toggle('hidden', repeatMode!=='one');
  const label = repeatMode==='off' ? (lang==='fa'?'تکرار خاموش':'Repeat off') : repeatMode==='one' ? (lang==='fa'?'تکرار یک آهنگ':'Repeat one') : (lang==='fa'?'تکرار همه':'Repeat all');
  showToast(label);
}
function togglePlay(){
  playing = !playing;
  updatePlayIcons();
  if(playing) showMiniplayer();
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(playing) realAudio.play().catch(()=>{}); else realAudio.pause();
  } else if(playing){ ensureAudio(); startSequencer(); } else { stopSequencer(); }
}
function showMiniplayer(){
  document.getElementById('miniplayer').classList.add('show');
}
function closeMiniplayer(){
  document.getElementById('miniplayer').classList.remove('show');
  playing = false;
  updatePlayIcons();
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(realAudio) realAudio.pause();
  } else {
    stopSequencer();
  }
}
function toggleLike(){
  liked = !liked;
  document.getElementById('npHeart').classList.toggle('liked', liked);
  document.getElementById('mpHeart').classList.toggle('liked', liked);
}
function updateMini(){
  const t = tracks[currentTrack];
  document.getElementById('mpThumb').innerHTML = coverEl(currentTrack);
  document.getElementById('mpTitle').textContent = t.title;
  document.getElementById('mpArtist').textContent = t.artist;
  updatePlayIcons();
}
function updateSheet(){
  const tr = tracks[currentTrack];
  document.getElementById('npCover').innerHTML = coverEl(currentTrack);
  document.getElementById('npTitle').textContent = tr.title;
  document.getElementById('npArtistName').textContent = tr.artist;
  document.getElementById('npQueueLabel').textContent = queueLabel;
  document.getElementById('npTot').textContent = tr.dur;
  document.getElementById('npLyricsBody').innerHTML = tr.lyrics.map((l,i) => `<div class="${i===1?'cur':''}">${l}</div>`).join('');
  document.getElementById('npLyricsPreview').textContent = tr.lyrics[1] || tr.lyrics[0] || '';
  document.getElementById('npLyricsBody').classList.remove('show');
  document.getElementById('npLyricsPreview').style.display = 'block';
  updatePlayIcons();
  applyDynamicTheme(currentTrack);
}
function applyDynamicTheme(i){
  const g = grads[i % grads.length];
  document.getElementById('npBgBlur').style.background = `radial-gradient(circle at 30% 15%, ${g[0]}, ${g[1]} 70%)`;
  const npSheetEl = document.getElementById('npSheet');
  npSheetEl.style.setProperty('--grad', `linear-gradient(135deg, ${g[0]}, ${g[1]})`);
  npSheetEl.style.setProperty('--a1', g[0]);
  document.getElementById('miniplayer').style.setProperty('--grad', `linear-gradient(135deg, ${g[0]}, ${g[1]})`);
}
function updatePlayIcons(){
  const pause = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
  const play = '<path d="M8 5v14l11-7z"/>';
  document.getElementById('mpPlayIcon').innerHTML = playing ? pause : play;
  document.getElementById('npPlayIcon').innerHTML = playing ? pause : play;
  const dpIcon = document.getElementById('drivingPlayIcon');
  if(dpIcon) dpIcon.innerHTML = playing ? pause : play;
}
function openNowPlaying(){
  document.getElementById('npSheet').classList.add('open');
  if(audioCtx) startVisualizerLoop();
}
function closeNowPlaying(){
  document.getElementById('npSheet').classList.remove('open');
  stopVisualizerLoop();
}
function toggleLyrics(){
  const body = document.getElementById('npLyricsBody');
  const preview = document.getElementById('npLyricsPreview');
  body.classList.toggle('show');
  preview.style.display = body.classList.contains('show') ? 'none' : 'block';
}



/* ================= AUDIO ENGINE (generative synth demo — no licensed audio) ================= */

let audioCtx=null, masterGain=null, analyser=null, bassFilter=null, midFilter=null, trebleFilter=null, qualityLowpass=null;
let sequencerTimer=null;
let quality='hires';

function ensureAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  masterGain = audioCtx.createGain(); masterGain.gain.value = 0.16;
  bassFilter = audioCtx.createBiquadFilter(); bassFilter.type='lowshelf'; bassFilter.frequency.value=200; bassFilter.gain.value=0;
  midFilter = audioCtx.createBiquadFilter(); midFilter.type='peaking'; midFilter.frequency.value=1000; midFilter.Q.value=1; midFilter.gain.value=0;
  trebleFilter = audioCtx.createBiquadFilter(); trebleFilter.type='highshelf'; trebleFilter.frequency.value=3200; trebleFilter.gain.value=0;
  qualityLowpass = audioCtx.createBiquadFilter(); qualityLowpass.type='lowpass'; qualityLowpass.frequency.value = quality==='hires' ? 20000 : 8000;
  analyser = audioCtx.createAnalyser(); analyser.fftSize=64;
  bassFilter.connect(midFilter); midFilter.connect(trebleFilter); trebleFilter.connect(qualityLowpass);
  qualityLowpass.connect(analyser); analyser.connect(masterGain); masterGain.connect(audioCtx.destination);
  buildVisualizerBars();
  startVisualizerLoop();
}
function playNote(freq, dur){
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator(); osc.type='sine'; osc.frequency.value=freq;
  const g = audioCtx.createGain(); g.gain.value=0;
  osc.connect(g); g.connect(bassFilter);
  const now = audioCtx.currentTime;
  g.gain.linearRampToValueAtTime(0.55, now+0.03);
  g.gain.exponentialRampToValueAtTime(0.001, now+dur);
  osc.start(now); osc.stop(now+dur+0.05);
}
function startSequencer(){
  stopSequencer();
  const scale=[0,3,5,7,10,12,15,10];
  const base = 196 * Math.pow(2, (currentTrack%5)/12);
  let step=0;
  sequencerTimer = setInterval(() => {
    if(!playing) return;
    const freq = base * Math.pow(2, scale[step%scale.length]/12);
    playNote(freq, 0.42);
    step++;
  }, 340);
}
function stopSequencer(){ if(sequencerTimer){ clearInterval(sequencerTimer); sequencerTimer=null; } }
function buildVisualizerBars(){
  const el = document.getElementById('eqVisualizer');
  if(el.children.length) return;
  el.innerHTML = Array.from({length:24}).map(()=>'<div class="bar"></div>').join('');
}
let visualizerRAF = null;

function startVisualizerLoop(){
  if(visualizerRAF) return;
  visualizerRAF = requestAnimationFrame(renderVisualizer);
}
function stopVisualizerLoop(){
  if(visualizerRAF){ cancelAnimationFrame(visualizerRAF); visualizerRAF = null; }
}
function renderVisualizer(){
  if(!document.getElementById('npSheet').classList.contains('open')){
    visualizerRAF = null;
    return;
  }
  if(analyser){
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    document.querySelectorAll('#eqVisualizer .bar').forEach((b,i) => {
      const v = data[i % data.length] || 0;
      b.style.height = (playing ? Math.max(3,(v/255)*34) : 3) + 'px';
    });
  }
  visualizerRAF = requestAnimationFrame(renderVisualizer);
}



/* ================= EQUALIZER ================= */

function openEqSheet(){ ensureAudio(); document.getElementById('eqBackdrop').classList.add('open'); document.getElementById('eqSheet').classList.add('open'); }
function closeEqSheet(){ document.getElementById('eqBackdrop').classList.remove('open'); document.getElementById('eqSheet').classList.remove('open'); }
function updateEQ(band, val){
  ensureAudio(); val = parseFloat(val);
  if(band==='bass'){ bassFilter.gain.value=val; document.getElementById('eqBassVal').textContent=val+'dB'; }
  if(band==='mid'){ midFilter.gain.value=val; document.getElementById('eqMidVal').textContent=val+'dB'; }
  if(band==='treble'){ trebleFilter.gain.value=val; document.getElementById('eqTrebleVal').textContent=val+'dB'; }
}
function resetEQ(){
  ['eqBass','eqMid','eqTreble'].forEach(id => document.getElementById(id).value = 0);
  updateEQ('bass',0); updateEQ('mid',0); updateEQ('treble',0);
}



/* ================= QUALITY ================= */

function openQualitySheet(){ updateQualityUI(); document.getElementById('qualityBackdrop').classList.add('open'); document.getElementById('qualitySheet').classList.add('open'); }
function closeQualitySheet(){ document.getElementById('qualityBackdrop').classList.remove('open'); document.getElementById('qualitySheet').classList.remove('open'); }
function setQuality(q){
  quality = q; ensureAudio();
  qualityLowpass.frequency.value = q==='hires' ? 20000 : 8000;
  document.getElementById('qualityPill').textContent = q==='hires' ? 'HI-RES' : 'STANDARD';
  updateQualityUI();
  showToast(q==='hires' ? 'Hi-Res Lossless enabled' : 'Standard quality enabled');
  closeQualitySheet();
}
function updateQualityUI(){
  document.getElementById('qcardStandard').classList.toggle('selected', quality==='standard');
  document.getElementById('qcardHires').classList.toggle('selected', quality==='hires');
}



/* ================= SLEEP TIMER ================= */

let sleepEndTime=null, sleepIntervalId=null;
function openSleepSheet(){ document.getElementById('sleepBackdrop').classList.add('open'); document.getElementById('sleepSheet').classList.add('open'); }
function closeSleepSheet(){ document.getElementById('sleepBackdrop').classList.remove('open'); document.getElementById('sleepSheet').classList.remove('open'); }
function setSleepTimer(mins){
  clearInterval(sleepIntervalId); sleepIntervalId=null;
  if(mins===0){ sleepEndTime=null; document.getElementById('sleepBadge').classList.add('hidden'); closeSleepSheet(); showToast('Sleep timer off'); return; }
  sleepEndTime = Date.now() + mins*60000;
  document.getElementById('sleepBadge').classList.remove('hidden');
  updateSleepBadge();
  sleepIntervalId = setInterval(() => {
    const remain = sleepEndTime - Date.now();
    if(remain<=0){
      clearInterval(sleepIntervalId); sleepIntervalId=null;
      playing=false; updatePlayIcons(); stopSequencer();
      document.getElementById('sleepBadge').classList.add('hidden');
      showToast('Sleep timer ended — playback paused');
      return;
    }
    updateSleepBadge();
  }, 1000);
  closeSleepSheet();
  showToast('Sleep timer set: '+mins+' min');
}
function updateSleepBadge(){
  if(!sleepEndTime) return;
  const remain = Math.max(0, sleepEndTime-Date.now());
  const m = Math.floor(remain/60000), s = Math.floor((remain%60000)/1000);
  const elBadge = document.getElementById('sleepRemain');
  if(elBadge) elBadge.textContent = m+':'+String(s).padStart(2,'0');
}



/* ================= KARAOKE ================= */

let karaokeIntervalId=null, karaokeLineIdx=0;
function openKaraoke(){
  const tr = tracks[currentTrack];
  document.getElementById('karaokeTrackName').textContent = tr.title + ' — ' + tr.artist;
  karaokeLineIdx = 0;
  renderKaraokeLines();
  document.getElementById('karaokeView').classList.add('open');
  clearInterval(karaokeIntervalId);
  karaokeIntervalId = setInterval(() => {
    karaokeLineIdx = (karaokeLineIdx+1) % tracks[currentTrack].lyrics.length;
    renderKaraokeLines();
  }, 3200);
}
function closeKaraoke(){
  document.getElementById('karaokeView').classList.remove('open');
  clearInterval(karaokeIntervalId); karaokeIntervalId=null;
}
function renderKaraokeLines(){
  const lyr = tracks[currentTrack].lyrics;
  document.getElementById('karaokeLines').innerHTML = lyr.map((l,i) => `<div class="kline ${i===karaokeLineIdx?'cur':''}">${l}</div>`).join('');
}



/* ================= WAVE PROGRESS BAR (original Musix signature UI) ================= */
let usingRealAudio = false;
function formatTime(sec){
  if(!isFinite(sec) || sec<0) return '0:00';
  const m = Math.floor(sec/60), s = Math.floor(sec%60);
  return m+':'+String(s).padStart(2,'0');
}
const EQ_BARS = 80;
let eqBarsBuilt = false;
let eqBaseH = [];
let eqDragging = false;

function buildEqBars(){
  const track = document.getElementById('waveProgress');
  if(!track || eqBarsBuilt) return;
  track.innerHTML = '';
  eqBaseH = [];
  for(let i=0;i<EQ_BARS;i++){
    const bar = document.createElement('div');
    bar.className = 'eq-bar';
    const h = 0.18 + Math.abs(Math.sin(i*0.5 + 0.3)) * 0.55;
    eqBaseH.push(h);
    bar.style.setProperty('--h', h.toFixed(2));
    track.appendChild(bar);
  }
  eqBarsBuilt = true;
  track.addEventListener('mousedown', e => { eqDragging = true; seekFromWave(e); });
  window.addEventListener('mousemove', e => { if(eqDragging) seekFromWave(e); });
  window.addEventListener('mouseup', () => eqDragging = false);
  track.addEventListener('touchstart', e => { eqDragging = true; seekFromWave(e.touches[0]); }, {passive:true});
  track.addEventListener('touchmove', e => { if(eqDragging) seekFromWave(e.touches[0]); }, {passive:true});
  window.addEventListener('touchend', () => eqDragging = false);
}

function renderWaveProgress(){
  buildEqBars();
  const bars = document.querySelectorAll('#waveProgress .eq-bar');
  const activeCount = Math.round((progress/100) * bars.length);
  let freqData = null;
  if(analyser && playing){
    freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);
  }
  bars.forEach((b,i) => {
    b.classList.toggle('played', i < activeCount);
    b.classList.toggle('head', i === activeCount - 1);
    if(freqData){
      const v = freqData[i % freqData.length] || 0;
      const h = Math.min(1, eqBaseH[i] + (v/255) * 0.55);
      b.style.setProperty('--h', h.toFixed(2));
    } else {
      b.style.setProperty('--h', eqBaseH[i].toFixed(2));
    }
  });
}

function seekFromWave(evt){
  const track = document.getElementById('waveProgress');
  const rect = track.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  progress = Math.max(0, Math.min(100, (x/rect.width)*100));
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(realAudio.duration) realAudio.currentTime = (progress/100)*realAudio.duration;
  }
  renderWaveProgress();
}
document.getElementById('realAudioEl').addEventListener('loadedmetadata', function(){
  if(usingRealAudio) document.getElementById('npTot').textContent = formatTime(this.duration);
});
document.getElementById('realAudioEl').addEventListener('ended', () => {
  if(!usingRealAudio) return;
  if(repeatMode==='one'){
    const realAudio = document.getElementById('realAudioEl');
    realAudio.currentTime = 0;
    realAudio.play().catch(()=>{});
  } else {
    nextTrack();
  }
});

setInterval(() => {
  const realAudio = document.getElementById('realAudioEl');
  const isOpen = document.getElementById('npSheet').classList.contains('open');
  if(usingRealAudio && realAudio.duration){
    progress = (realAudio.currentTime/realAudio.duration)*100;
    if(isOpen) document.getElementById('npCur').textContent = formatTime(realAudio.currentTime);
  } else if(playing){
    progress += 0.5;
    if(progress>=100){
      progress = 0;
      if(repeatMode!=='one'){ nextTrack(); return; }
    }
  }
  if(isOpen) renderWaveProgress();
}, 300);
