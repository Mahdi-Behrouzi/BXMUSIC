import data from './data/data.js';

// app.js — improved bootstrap
// - Exposes demo data to window before loading legacy script so legacy code
//   can continue to read global variables like `tracks`.
// - After legacy script loads, we dynamically import the new player store
//   to initialize lightweight proxies that delegate to legacy functions.

document.addEventListener('DOMContentLoaded', () => {
  // Expose data for legacy script compatibility
  window.tracks = data.tracks;
  window.artists = data.artists;
  window.builtinPlaylists = data.builtinPlaylists;
  window.madeForYou = data.madeForYou;
  window.recent = data.recent;
  window.genres = data.genres;
  window.genreI18n = data.genreI18n;
  window.radioStations = data.radioStations;
  window.podcasts = data.podcasts;
  window.features = data.features;
  window.friends = data.friends;
  window.friendColors = data.friendColors;
  window.devices = data.devices;
  window.tasteMoods = data.tasteMoods;
  window.moodTrackMap = data.moodTrackMap;

  // Load the legacy script (archived copy). If not found, fallback to root script.js
  const legacyPath = 'js/legacy/script.legacy.js';
  const fallback = 'script.js';
  const s = document.createElement('script');
  s.src = legacyPath;
  s.onload = async () => {
    console.log('[app] legacy script loaded from', legacyPath);
    try {
      const mod = await import('./store/player.js');
      if (mod && typeof mod.initWithLegacy === 'function') mod.initWithLegacy();
    } catch (e) {
      console.warn('[app] failed to init player store:', e);
    }
  };
  s.onerror = () => {
    console.warn('[app] failed to load', legacyPath, '- falling back to', fallback);
    const s2 = document.createElement('script');
    s2.src = fallback;
    s2.onload = async () => {
      console.log('[app] legacy script loaded from', fallback);
      try {
        const mod = await import('./store/player.js');
        if (mod && typeof mod.initWithLegacy === 'function') mod.initWithLegacy();
      } catch (e) {
        console.warn('[app] failed to init player store after fallback:', e);
      }
    };
    document.body.appendChild(s2);
  };
  document.body.appendChild(s);
});
