// js/store/player.js — player state and lightweight wrappers
// This module will gradually take ownership of player logic.
// For now it initializes by capturing the legacy global functions
// and replacing them with wrappers that update module state and
// delegate to the original implementations.

export const state = {
  currentTrack: 0,
  playing: false,
  progress: 0,
  shuffleMode: false,
  repeatMode: 'off',
  queueLabel: '',
};

let legacy = {};

function safeCall(fn, ...args){ if(typeof fn === 'function') return fn(...args); }

export function playTrack(i, label, openSheet){
  state.currentTrack = i;
  state.queueLabel = label || state.queueLabel;
  state.playing = true;
  state.progress = 0;
  // delegate to legacy behavior so UI updates immediately
  safeCall(legacy.playTrack, i, label, openSheet);
}

export function togglePlay(){
  state.playing = !state.playing;
  safeCall(legacy.togglePlay);
}

export function nextTrack(){
  safeCall(legacy.nextTrack);
}

export function prevTrack(){
  safeCall(legacy.prevTrack);
}

export function toggleShuffle(){
  state.shuffleMode = !state.shuffleMode;
  safeCall(legacy.toggleShuffle);
}

export function cycleRepeat(){
  // rotate off -> all -> one -> off
  state.repeatMode = state.repeatMode === 'off' ? 'all' : state.repeatMode === 'all' ? 'one' : 'off';
  safeCall(legacy.cycleRepeat);
}

export function toggleLike(){
  safeCall(legacy.toggleLike);
}

export function updateProgress(p){
  state.progress = p;
}

export function initWithLegacy(){
  // capture existing globals (legacy implementation)
  legacy.playTrack = window.playTrack || null;
  legacy.togglePlay = window.togglePlay || null;
  legacy.nextTrack = window.nextTrack || null;
  legacy.prevTrack = window.prevTrack || null;
  legacy.toggleShuffle = window.toggleShuffle || null;
  legacy.cycleRepeat = window.cycleRepeat || null;
  legacy.toggleLike = window.toggleLike || null;

  // replace globals with module wrappers so HTML onclicks call module functions
  window.playTrack = playTrack;
  window.togglePlay = togglePlay;
  window.nextTrack = nextTrack;
  window.prevTrack = prevTrack;
  window.toggleShuffle = toggleShuffle;
  window.cycleRepeat = cycleRepeat;
  window.toggleLike = toggleLike;

  // expose state for debugging
  window.playerState = state;

  console.log('[player] initialized wrappers; legacy captured:', Object.keys(legacy).filter(k=>legacy[k]));
}

export function initPlayer(audioEl){
  // optional hook — legacy handles audio by default until we fully migrate
  if(audioEl) window._realAudioEl = audioEl;
  console.log('[player] initPlayer called');
}
