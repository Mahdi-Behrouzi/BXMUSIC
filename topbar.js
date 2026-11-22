function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const translation = t(key);
    // Prefer updating a child span if present (preserves SVG siblings)
    const textSpan = el.querySelector('span[data-i18n], span:not([class])') || 
                     (el.children.length === 0 ? el : null);
    if (el.tagName === 'SPAN' || el.children.length === 0) {
      el.textContent = translation;
    } else {
      // Element has children (e.g. button with svg + span)
      let target = el.querySelector('[data-i18n]') || el.querySelector('span');
      if (target && target !== el) {
        target.textContent = translation;
      } else {
        // Fallback: keep structure, only replace text nodes
        const svg = el.querySelector('svg');
        const existingSpan = el.querySelector('span');
        if (existingSpan) {
          existingSpan.textContent = translation;
        } else if (svg) {
          // Create a span after svg
          let span = document.createElement('span');
          span.textContent = translation;
          el.appendChild(span);
        } else {
          el.textContent = translation;
        }
      }
    }
  });
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.placeholder = lang === 'fa' ? 'آهنگ، خواننده، آلبوم...' : 'Songs, artists, albums...';
  }
}

function setLang(l){
  lang = l;
  const enBtn = document.getElementById('langEnBtn');
  const faBtn = document.getElementById('langFaBtn');
  if (enBtn) enBtn.classList.toggle('active', l === 'en');
  if (faBtn) faBtn.classList.toggle('active', l === 'fa');
  document.body.classList.toggle('lang-fa', l === 'fa');
  // Fix document direction for RTL languages
  document.documentElement.dir = (l === 'fa') ? 'rtl' : 'ltr';
  document.documentElement.lang = l === 'fa' ? 'fa' : 'en';
  applyI18n();
  if (typeof renderHomeChips === 'function') renderHomeChips();
  if (typeof renderMadeForYou === 'function') renderMadeForYou();
  if (typeof renderExplore === 'function') renderExplore();
  if (typeof renderLibChips === 'function') renderLibChips();
  const searchInput = document.getElementById('searchInput');
  if (typeof renderSearch === 'function' && searchInput) renderSearch(searchInput.value);
  if (typeof updateSheet === 'function') updateSheet();
}

function setTheme(th){
  theme = th;
  document.body.classList.toggle('light', th === 'light');
  const darkBtn = document.getElementById('themeDarkBtn');
  const lightBtn = document.getElementById('themeLightBtn');
  if (darkBtn) darkBtn.classList.toggle('active', th === 'dark');
  if (lightBtn) lightBtn.classList.toggle('active', th === 'light');
}
