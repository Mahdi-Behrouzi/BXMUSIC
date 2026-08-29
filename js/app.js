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
// ================= HERO SLIDER =================

(function initHeroSlider() {
  function startHeroSlider() {
    const hero = document.getElementById('homeHero');

    if (!hero) return;

    const slides = hero.querySelectorAll('.hero-slide');
    const dots = hero.querySelectorAll('.hero-dot');
    const prev = document.getElementById('heroPrev');
    const next = document.getElementById('heroNext');

    if (!slides.length) return;

    let current = 0;
    let timer = null;

    function showSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      }

      if (index >= slides.length) {
        index = 0;
      }

      current = index;

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === current);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === current);
      });
    }

    function nextSlide() {
      showSlide(current + 1);
    }

    function prevSlide() {
      showSlide(current - 1);
    }

    function startAutoPlay() {
      stopAutoPlay();
      timer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    next?.addEventListener('click', function () {
      nextSlide();
      startAutoPlay();
    });

    prev?.addEventListener('click', function () {
      prevSlide();
      startAutoPlay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', function () {
        showSlide(index);
        startAutoPlay();
      });
    });

    hero.addEventListener('mouseenter', stopAutoPlay);
    hero.addEventListener('mouseleave', startAutoPlay);

    let touchStartX = 0;

    hero.addEventListener(
      'touchstart',
      function (event) {
        touchStartX = event.touches[0].clientX;
        stopAutoPlay();
      },
      { passive: true }
    );

    hero.addEventListener(
      'touchend',
      function (event) {
        const touchEndX = event.changedTouches[0].clientX;
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > 50) {
          if (difference > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }

        startAutoPlay();
      },
      { passive: true }
    );

    showSlide(0);
    startAutoPlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startHeroSlider);
  } else {
    startHeroSlider();
  }
})();
