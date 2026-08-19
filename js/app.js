// js/app.js — bootstrap loader for legacy script and module scaffold
// This file runs as an ES module. It waits for DOMContentLoaded and then
// injects the legacy script (script.js) so the existing global functions
// and initialization run unchanged. This is a safe first step for
// refactoring into modules.

document.addEventListener('DOMContentLoaded', () => {
  // If script.js is already present, avoid double-inserting
  if (!document.querySelector('script[src="script.js"]')) {
    const s = document.createElement('script');
    s.src = 'script.js';
    s.defer = false; // execute immediately when appended
    s.onload = () => console.log('[app] legacy script loaded');
    s.onerror = () => console.error('[app] failed to load legacy script');
    document.body.appendChild(s);
  }
});
