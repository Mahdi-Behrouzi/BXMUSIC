// js/store/player.js — player state and migration of playback logic
// Gradually taking over audio & playback control from legacy script.

export const state = {
  currentTrack: 0,
  playing: false,
  progress: 0,
  shuffleMode: false,
  repeatMode: 'off',
  queueLabel: '',
};

let legacy = {};
let audioCtx = null;
let masterGain = null;
let analyser = null;
let usingRealAudio = false;
let sequencerTimer = null;
let qualityLowpass = null;
let realAudioEl = null;
let sleepIntervalId = null;

function safeCall(fn, ...args){ if(typeof fn === 'function') return fn(...args); }

function ensureAudioContext(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain(); masterGain.gain.value = 0.16;
  const bass = audioCtx.createBiquadFilter(); bass.type='lowshelf'; bass.frequency.value=200; bass.gain.value=0;
  const mid = audioCtx.createBiquadFilter(); mid.type='peaking'; mid.frequency.value=1000; mid.Q.value=1; mid.gain.value=0;
  const treble = audioCtx.createBiquadFilter(); treble.type='highshelf'; treble.frequency.value=3200; treble.gain.value=0;
  qualityLowpass = audioCtx.createBiquadFilter(); qualityLowpass.type='lowpass'; qualityLowpass.frequency.value = 20000;
  analyser = audioCtx.createAnalyser(); analyser.fftSize = 64;
  bass.connect(mid); mid.connect(treble); treble.connect(qualityLowpass); qualityLowpass.connect(analyser); analyser.connect(masterGain); masterGain.connect(audioCtx.destination);
}

function playNote(freq, dur){
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator(); osc.type='sine'; osc.frequency.value = freq;
  const g = audioCtx.createGain(); g.gain.value = 0;
  osc.connect(g); g.connect(audioCtx.destination); // lightweight: bypass filters for short demo
  const now = audioCtx.currentTime;
  g.gain.linearRampToValueAtTime(0.55, now+0.01);
  g.gain.exponentialRampToValueAtTime(0.001, now+dur);
  osc.start(now); osc.stop(now+dur+0.05);
}

function startSequencer(){
  stopSequencer();
  if(!state.playing) return;
  const scale=[0,3,5,7,10,12,15,10];
  const base = 196 * Math.pow(2, (state.currentTrack%5)/12);
  let step=0;
  sequencerTimer = setInterval(()=>{
    if(!state.playing) return;
    const freq = base * Math.pow(2, scale[step%scale.length]/12);
    playNote(freq, 0.42);
    step++;
  }, 340);
}
function stopSequencer(){ if(sequencerTimer){ clearInterval(sequencerTimer); sequencerTimer = null; } }

// progress loop — keep simple interval to update progress for non-real-audio
let progressInterval = null;
function startProgressLoop(){
  stopProgressLoop();
  progressInterval = setInterval(()=>{
    if(usingRealAudio && realAudioEl && realAudioEl.duration){
      state.progress = (realAudioEl.currentTime/realAudioEl.duration)*100;
      safeCall(legacy.updateProgress, state.progress);
      safeCall(legacy.updateSheet);
    } else if(state.playing){
      state.progress += 0.5;
      if(state.progress>=100){ state.progress = 0; if(state.repeatMode!=='one') safeCall(legacy.nextTrack); }
      safeCall(legacy.updateProgress, state.progress);
    }
  }, 300);
}
function stopProgressLoop(){ if(progressInterval){ clearInterval(progressInterval); progressInterval = null; } }

export function playTrack(i, label, openSheet){
  // prefer using real audio for uploaded tracks; otherwise run sequencer demo
  state.currentTrack = i;
  state.queueLabel = label || state.queueLabel;
  state.playing = true;
  state.progress = 0;

  const tr = window.tracks && window.tracks[i];
  if(tr && tr.isUpload && tr.audioUrl){
    // use real audio element
    usingRealAudio = true;
    if(!realAudioEl) realAudioEl = document.getElementById('realAudioEl');
    if(realAudioEl){
      realAudioEl.src = tr.audioUrl;
      realAudioEl.currentTime = 0;
      realAudioEl.play().catch(()=>{});
    }
    stopSequencer();
  } else {
    usingRealAudio = false;
    if(realAudioEl) try{ realAudioEl.pause(); }catch(e){}
    ensureAudioContext();
    startSequencer();
  }

  // delegate to legacy for UI updates if available
  safeCall(legacy.updateMini);
  safeCall(legacy.updateSheet);
  safeCall(legacy.showMiniplayer);
  if(openSheet) safeCall(legacy.openNowPlaying);
  safeCall(legacy.refreshActiveLists);

  startProgressLoop();
}

export function togglePlay(){
  state.playing = !state.playing;
  if(usingRealAudio && realAudioEl){
    if(state.playing) realAudioEl.play().catch(()=>{}); else realAudioEl.pause();
  } else {
    if(state.playing) startSequencer(); else stopSequencer();
  }
  safeCall(legacy.updatePlayIcons);
}

export function nextTrack(){ safeCall(legacy.nextTrack); }
export function prevTrack(){ safeCall(legacy.prevTrack); }
export function toggleShuffle(){ state.shuffleMode = !state.shuffleMode; safeCall(legacy.toggleShuffle); }
export function cycleRepeat(){ state.repeatMode = state.repeatMode==='off' ? 'all' : state.repeatMode==='all' ? 'one' : 'off'; safeCall(legacy.cycleRepeat); }
export function toggleLike(){ safeCall(legacy.toggleLike); }

export function updateProgress(p){ state.progress = p; }

export function initWithLegacy(){
  // capture legacy functions we still rely on for UI
  legacy.playTrack = window.playTrack || null;
  legacy.togglePlay = window.togglePlay || null;
  legacy.nextTrack = window.nextTrack || null;
  legacy.prevTrack = window.prevTrack || null;
  legacy.toggleShuffle = window.toggleShuffle || null;
  legacy.cycleRepeat = window.cycleRepeat || null;
  legacy.toggleLike = window.toggleLike || null;
  legacy.updateMini = window.updateMini || null;
  legacy.updateSheet = window.updateSheet || null;
  legacy.showMiniplayer = window.showMiniplayer || null;
  legacy.openNowPlaying = window.openNowPlaying || null;
  legacy.refreshActiveLists = window.refreshActiveLists || null;
  legacy.updatePlayIcons = window.updatePlayIcons || null;
  legacy.nextTrack = window.nextTrack || legacy.nextTrack;

  // Replace global handlers with module functions
  window.playTrack = playTrack;
  window.togglePlay = togglePlay;
  window.nextTrack = nextTrack;
  window.prevTrack = prevTrack;
  window.toggleShuffle = toggleShuffle;
  window.cycleRepeat = cycleRepeat;
  window.toggleLike = toggleLike;

  // expose minimal API and state for debugging
  window.playerState = state;
  window.player = {
    playTrack, togglePlay, nextTrack, prevTrack, toggleShuffle, cycleRepeat, toggleLike, updateProgress
  };

  // wire real audio events if element present
  const audio = document.getElementById('realAudioEl');
  if(audio){
    realAudioEl = audio;
    audio.addEventListener('loadedmetadata', () => {
      if(usingRealAudio) safeCall(legacy.updateSheet);
    });
    audio.addEventListener('ended', () => {
      if(usingRealAudio){
        if(state.repeatMode==='one'){ audio.currentTime = 0; audio.play().catch(()=>{}); }
        else safeCall(legacy.nextTrack);
      }
    });
    audio.addEventListener('timeupdate', () => {
      if(usingRealAudio && audio.duration){
        state.progress = (audio.currentTime/audio.duration)*100;
        safeCall(legacy.updateProgress, state.progress);
      }
    });
  }

  console.log('[player] initialized; wrappers installed and legacy captured:', Object.keys(legacy).filter(k=>legacy[k]));
}

export function initPlayer(audioEl){
  if(audioEl) realAudioEl = audioEl;
  console.log('[player] initPlayer called');
}
