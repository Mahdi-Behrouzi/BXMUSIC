
/* ================= RENDER: HOME ================= */

function renderHomeChips(){
  const el = document.getElementById('homeChips');
  const labels = ['All','Music','Podcasts','Videos'];
  const keys = {All:'all',Music:'music',Podcasts:'podcasts',Videos:'videos'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${t(keys[l])}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.onclick = () => showHomeChip(c.dataset.chip));
}
function showHomeChip(label){
  document.querySelectorAll('#homeChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  document.getElementById('homeMusicSection').classList.toggle('hidden', !(label==='All'||label==='Music'));
  document.getElementById('homeVideoSection').classList.toggle('hidden', label!=='Videos');
  document.getElementById('homePodcastSection').classList.toggle('hidden', label!=='Podcasts');
}
function renderMadeForYou(){
  document.getElementById('madeForYou').innerHTML = madeForYou.map(m => `
    <div class="hcard" onclick="openPlaylist('${m.name}',true)">
      <div class="cover">${coverEl(m.i)}</div>
      <div class="t">${m.name}</div><div class="s">${m.sub}</div>
    </div>`).join('');
}
/* ================= NEW HOME MUSIC SECTIONS ================= */

const homeSectionData = {
  recommendedSongs: [
    { name: 'آهنگ پیشنهادی', sub: 'برای شما' },
    { name: 'موسیقی شب', sub: 'پیشنهاد شده برای شما' },
    { name: 'حال خوب', sub: 'انتخاب امروز' },
    { name: 'آرامش', sub: 'برای گوش دادن' },
    { name: 'ضربان شب', sub: 'موسیقی منتخب' },
    { name: 'میکس محبوب', sub: 'پیشنهاد BXMUSIC' }
  ],

  todayRecommendations: [
    { name: 'پیشنهاد امروز', sub: 'منتخب برای شما' },
    { name: 'امروز گوش بده', sub: 'انتخاب روز' },
    { name: 'میکس تازه', sub: 'برای امروز' },
    { name: 'حال امروز', sub: 'موسیقی منتخب' },
    { name: 'امشب', sub: 'پیشنهاد ویژه' },
    { name: 'انتخاب امروز', sub: 'BXMUSIC' }
  ],

  bestArtistWorks: [
    { name: 'بهترین آثار', sub: 'هنرمندان محبوب' },
    { name: 'برترین‌ها', sub: 'منتخب هنرمندان' },
    { name: 'آثار ماندگار', sub: 'موسیقی برتر' },
    { name: 'Top Hits', sub: 'محبوب‌ترین‌ها' },
    { name: 'Golden Hits', sub: 'آثار منتخب' },
    { name: 'Best Of', sub: 'مجموعه برتر' }
  ],

  popularRadio: [
    { name: 'رادیوی محبوب', sub: 'پخش مداوم' },
    { name: 'Radio Mix', sub: 'میکس محبوب' },
    { name: 'Daily Radio', sub: 'هر روز' },
    { name: 'Music Radio', sub: 'موسیقی بی‌وقفه' },
    { name: 'Night Radio', sub: 'برای شب' },
    { name: 'Chill Radio', sub: 'آرام و دلنشین' }
  ],

  basedOnListening: [
    { name: 'بر اساس گوش دادن شما', sub: 'شاید دوست داشته باشید' },
    { name: 'ادامه بده', sub: 'بر اساس سلیقه شما' },
    { name: 'برای شما', sub: 'انتخاب هوشمند' },
    { name: 'شاید خوشتان بیاید', sub: 'پیشنهاد شخصی' },
    { name: 'بیشتر شبیه این', sub: 'بر اساس شنیده‌ها' },
    { name: 'انتخاب هوشمند', sub: 'BXMUSIC' }
  ],

  throwback: [
    { name: 'بازگشت به گذشته', sub: 'خاطرات قدیمی' },
    { name: 'نوستالژی', sub: 'آهنگ‌های خاطره‌انگیز' },
    { name: 'Old Favorites', sub: 'محبوب‌های قدیمی' },
    { name: 'خاطره‌ها', sub: 'یک سفر به گذشته' },
    { name: 'Classic Hits', sub: 'آثار ماندگار' },
    { name: 'یاد قدیم', sub: 'موسیقی خاطره‌انگیز' }
  ],

  customForUser: [
    { name: 'میکس مخصوص شما', sub: 'شخصی‌سازی شده' },
    { name: 'انتخاب شخصی', sub: 'برای شما' },
    { name: 'سلیقه شما', sub: 'منتخب اختصاصی' },
    { name: 'Your Mix', sub: 'ساخته شده برای شما' },
    { name: 'Personal Mix', sub: 'مخصوص شما' },
    { name: 'Daily Mix', sub: 'بر اساس سلیقه شما' }
  ],

  newMusic: [
    { name: 'موسیقی جدید', sub: 'تازه منتشر شده' },
    { name: 'Fresh Music', sub: 'تازه‌ها' },
    { name: 'جدیدترین‌ها', sub: 'موسیقی تازه' },
    { name: 'New Releases', sub: 'انتشارهای جدید' },
    { name: 'تازه رسیده', sub: 'همین امروز' },
    { name: 'New Hits', sub: 'آثار جدید' }
  ],

  happyMusic: [
    { name: 'شاد', sub: 'برای حال خوب' },
    { name: 'Happy Hits', sub: 'انرژی مثبت' },
    { name: 'میکس شاد', sub: 'لبخند بزن' },
    { name: 'Good Vibes', sub: 'حال خوب' },
    { name: 'Dance', sub: 'وقت رقص' },
    { name: 'Feel Good', sub: 'انرژی مثبت' }
  ],

  singAlong: [
    { name: 'آواز جمعی', sub: 'با هم بخونیم' },
    { name: 'Sing Along', sub: 'همه با هم' },
    { name: 'همخوانی', sub: 'آهنگ‌های محبوب' },
    { name: 'با صدای بلند', sub: 'وقت خوندنه' },
    { name: 'همراه با همه', sub: 'آوازهای خاطره‌انگیز' },
    { name: 'Sing It', sub: 'با هم بخون' }
  ],

  partyMusic: [
    { name: 'مهمانی', sub: 'وقت جشنه' },
    { name: 'Party Mix', sub: 'موسیقی مهمانی' },
    { name: 'Dance Party', sub: 'برای رقص' },
    { name: 'Party Hits', sub: 'آهنگ‌های پرانرژی' },
    { name: 'Tonight', sub: 'امشب' },
    { name: 'Let’s Party', sub: 'شروع کنیم' }
  ]
};


function renderHomeMusicSection(id, items) {

  const el = document.getElementById(id);

  if (!el) return;

  el.innerHTML = items.map((item, index) => {

    /*
      فعلاً از coverEl استفاده می‌کنیم تا کارت‌ها
      با سیستم تصویری فعلی BXMUSIC هماهنگ باشند.
    */

    const imageIndex = index % tracks.length;

    return `
      <div class="hcard"
           onclick="playTrack(${imageIndex},'${item.name}',true)">

        <div class="cover">
          ${coverEl(imageIndex)}
        </div>

        <div class="t">${item.name}</div>
        <div class="s">${item.sub}</div>

      </div>
    `;

  }).join('');
}


function renderNewHomeSections() {

  Object.entries(homeSectionData).forEach(([id, items]) => {
    renderHomeMusicSection(id, items);
  });

}


/* اجرای بخش‌های جدید صفحه اصلی */
renderNewHomeSections();

function renderRecent(){
  const list = offlineMode ? recent.filter(r => downloads.has(r.i)) : recent;
  document.getElementById('recentStrip').innerHTML = list.length ? list.map(r => `
    <div class="cover" style="width:78px;height:78px;flex:0 0 78px;overflow:hidden;position:relative;" onclick='playTrack(${r.i},"Recently played",false)'>${coverEl(r.i)}</div>`).join('') : `<div style="color:var(--faint);font-size:12px;">No downloaded songs yet</div>`;
}
function renderFeatures(){
  document.getElementById('featStrip').innerHTML = features.map(f => `
    <div class="feat-card">
      <div class="fi" style="background:${f.color}22;"><svg viewBox="0 0 24 24" fill="none" stroke="${f.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg></div>
      <h3>${f.name}</h3><p>${f.desc}</p>
    </div>`).join('');
}
function renderHomeVideos(){
  document.getElementById('homeVideoGrid').innerHTML = tracks.map((t,i) => `
    <div class="gcard" onclick='playTrack(${i},"Videos",true)'>
      <div class="cover">${coverEl(i)}<svg viewBox="0 0 24 24" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:30px;height:30px;" fill="rgba(255,255,255,.9)"><circle cx="12" cy="12" r="11" fill="rgba(0,0,0,.4)"/><path d="M10 8l6 4-6 4V8z" fill="#fff"/></svg></div>
      <div class="t">${t.title}</div><div class="s">${t.artist}</div>
    </div>`).join('');
}
function renderHomePodcasts(){
  document.getElementById('homePodcastGrid').innerHTML = podcasts.map(p => `
    <div class="gcard">
      <div class="cover">${coverEl(p.i)}</div>
      <div class="t">${p.title}</div><div class="s">${p.host}</div>
    </div>`).join('');
}


