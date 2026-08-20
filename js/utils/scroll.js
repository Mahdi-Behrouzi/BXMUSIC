// BXMUSIC scroll helpers
function observeFade(root=document){
  const items=root.querySelectorAll('.fade-up');
  if(!('IntersectionObserver' in window)){ items.forEach(el=>el.classList.add('visible')); return; }
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }});
  },{threshold:.08});
  items.forEach(el=>observer.observe(el));
  return observer;
}
function dragScroll(el){
  let down=false,startX=0,scrollLeft=0;
  el.addEventListener('pointerdown',e=>{down=true;startX=e.clientX;scrollLeft=el.scrollLeft;el.setPointerCapture?.(e.pointerId);});
  el.addEventListener('pointerup',()=>down=false);
  el.addEventListener('pointercancel',()=>down=false);
  el.addEventListener('pointermove',e=>{if(!down)return;e.preventDefault();el.scrollLeft=scrollLeft-(e.clientX-startX);});
}
