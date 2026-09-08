/* ================= MENISCUS BOTTOM NAV ================= */
(function(){
  const dock = document.getElementById('bottomnav');
  if(!dock) return;
  const bead = document.getElementById('mnBead');
  const beadIcon = document.getElementById('mnBeadIcon');
  const ring = document.getElementById('mnRing');
  let dragging = false;

  function tabs(){ return Array.from(dock.querySelectorAll('.nav-btn')); }

  function tabCenter(tab){
    const dockRect = dock.getBoundingClientRect();
    const r = tab.getBoundingClientRect();
    return (r.left - dockRect.left) + r.width/2;
  }

  function placeBead(x, accent){
    bead.style.left = x + 'px';
    ring.style.left = x + 'px';
    if(accent) dock.style.setProperty('--accent', accent);
  }

  function pulseRing(){
    ring.classList.remove('pulse');
    void ring.offsetWidth;
    ring.classList.add('pulse');
  }

  function squishBead(){
    bead.classList.add('squish');
    setTimeout(() => bead.classList.remove('squish'), 220);
  }

  function syncBeadToActive(animate){
    const active = dock.querySelector('.nav-btn.active') || tabs()[0];
    if(!active) return;
    beadIcon.innerHTML = active.querySelector('svg').innerHTML;
    placeBead(tabCenter(active), active.dataset.color);
    if(animate){ pulseRing(); squishBead(); }
  }
  window.updateMeniscusNav = function(animate){ syncBeadToActive(animate !== false); };

  function nearestTab(x){
    let best = tabs()[0], bestD = Infinity;
    tabs().forEach(t => { const d = Math.abs(tabCenter(t) - x); if(d < bestD){ bestD = d; best = t; } });
    return best;
  }

  bead.addEventListener('pointerdown', e => {
    dragging = true;
    bead.classList.add('dragging');
    bead.setPointerCapture(e.pointerId);
  });
  bead.addEventListener('pointermove', e => {
    if(!dragging) return;
    const dockRect = dock.getBoundingClientRect();
    const ts = tabs();
    let x = e.clientX - dockRect.left;
    x = Math.max(tabCenter(ts[0]), Math.min(tabCenter(ts[ts.length-1]), x));
    placeBead(x, nearestTab(x).dataset.color);
  });
  bead.addEventListener('pointerup', e => {
    if(!dragging) return;
    dragging = false;
    bead.classList.remove('dragging');
    const dockRect = dock.getBoundingClientRect();
    const ts = tabs();
    let x = e.clientX - dockRect.left;
    x = Math.max(tabCenter(ts[0]), Math.min(tabCenter(ts[ts.length-1]), x));
    const target = nearestTab(x);
    const current = dock.querySelector('.nav-btn.active');
    if(target !== current && target.dataset.nav){
      switchScreen(target.dataset.nav);
    } else {
      syncBeadToActive(false);
    }
  });

  window.addEventListener('resize', () => syncBeadToActive(false));
  requestAnimationFrame(() => syncBeadToActive(false));
})();
