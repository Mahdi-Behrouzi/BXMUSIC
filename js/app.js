// BXMUSIC app.js — application entry point
// All feature modules are loaded before this file from index.html.
// Shared state lives in js/store; data lives in js/data.
/* ================= INIT ================= */
initAccount();

setTheme('dark');
setLang('fa');
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
/*
  جایگزین این بلاک با محتوای فعلی js/app.js
  از خط 27 (// ================= HERO SLIDER =================)
  تا خط 145 (آخر فایل) بشه.
  منطق پخش/ذخیره (playTrack, heroSave, openArtist) دست‌نخورده مونده،
  فقط دیگه arrow/dots نداره — به‌جاش تب‌های شماره‌دار + یه waveform
  که واقعاً پیشرفت شمارش معکوس تا اسلاید بعدی رو نشون می‌ده.
*/

// ================= HERO SIGNATURE =================

(function initHeroSignature() {
  const BAR_COUNT = 56;
  const DURATION = 7000; // ms per slide — همون عددی که با startAutoPlay قبلی معادل بود، دلخواه قابل تغییره

  function start() {
    const hero = document.getElementById('homeHero');
    if (!hero) return;

    const slides = hero.querySelectorAll('.hero-slide');
    const tabs = hero.querySelectorAll('.hero-tab');
    const waveform = document.getElementById('heroWaveform');
    if (!slides.length || !waveform) return;

    // build waveform bars once
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = (22 + Math.random() * 64) + '%';
      waveform.appendChild(bar);
    }
    const bars = Array.from(waveform.children);

    let current = 0;
    let timer = null;
    let raf = null;
    let startTime = null;

    function showSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      current = index;

      slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
      tabs.forEach((tab, i) => tab.classList.toggle('active', i === current));

      startProgress();
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function startProgress() {
      cancelAnimationFrame(raf);
      bars.forEach((b) => b.classList.remove('played'));
      startTime = performance.now();

      function step(now) {
        const elapsed = now - startTime;
        const pct = Math.min(1, elapsed / DURATION);
        const filled = Math.floor(pct * BAR_COUNT);
        bars.forEach((b, i) => b.classList.toggle('played', i < filled));
        if (pct < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, DURATION);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function () {
        showSlide(index);
        startAutoPlay();
      });
    });

    hero.addEventListener('mouseenter', () => { stopAutoPlay(); cancelAnimationFrame(raf); });
    hero.addEventListener('mouseleave', startAutoPlay);

    let touchStartX = 0;
    hero.addEventListener('touchstart', function (event) {
      touchStartX = event.touches[0].clientX;
      stopAutoPlay();
    }, { passive: true });

    hero.addEventListener('touchend', function (event) {
      const touchEndX = event.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        showSlide(diff > 0 ? current + 1 : current - 1);
      }
      startAutoPlay();
    }, { passive: true });

    showSlide(0);
    startAutoPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
