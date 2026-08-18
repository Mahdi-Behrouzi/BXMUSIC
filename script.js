/* ================= DATA ================= */
const grads = [
  ['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436'],
  ['#f5b942','#3a2a0e'],['#f5567a','#3a0e1c'],['#7c6ef2','#1c1a3a'],['#42d1c9','#0e2b2b'],
  ['#c026d3','#2a0e2b'],['#f97316','#3a1e0e']
];
function gradCSS(i){const g=grads[i%grads.length];return `linear-gradient(150deg, ${g[0]}55, ${g[1]} 75%)`;}
function coverEl(i){
  return `<div style="width:100%;height:100%;background:${gradCSS(i)};position:relative;">
    <svg class="wave-sig" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;opacity:.55;"><path d="M0 55 Q15 30 30 55 T60 55 T90 55 T120 55"/><path d="M0 68 Q15 48 30 68 T60 68 T90 68 T120 68" style="stroke:rgba(255,255,255,.28)"/></svg>
  </div>`;
}

const tracks = [
  {
  title:"Khooneye Man",
  artist:"Mahdi",
  dur:"0:00",
  plays:"—",
  album:"Khooneye Man",
  lyrics:[],
  isUpload:true,
  audioUrl:"audio/Khooneye Man.mp3",
  cover:"images/IMG_20260818_154419_634.jpg"
},
  {title:"Glass Horizon", artist:"Kairo Vale", dur:"3:32", plays:"9.7M", album:"Night Sirens", lyrics:["Standing at the edge of what we knew","Every skyline bending back to you","Glass horizon, catch me if you can","I've been drifting since the storm began"]},
  {title:"Static Bloom", artist:"Kairo Vale", dur:"3:34", plays:"4.5M", album:"Night Sirens", lyrics:["Static in the wires, bloom of sound","Every heartbeat echoes underground","We were paper planes in a hurricane","Static bloom, I'm calling out your name"]},
  {title:"Low Tide Diaries", artist:"Kairo Vale", dur:"3:40", plays:"12.6M", album:"Night Sirens", lyrics:["Wrote your name in sand before the wave","Low tide diaries, everything we save","Salt and silence, footprints disappear","Still I hear you calling, low and clear"]},
  {title:"Amber Radio", artist:"Kairo Vale", dur:"3:08", plays:"6.8M", album:"Night Sirens", lyrics:["Turn the dial to amber, find the fade","Every station plays the choice we made","Amber radio, static in between","Nothing's quite as loud as what's unseen"]},
  {title:"Paper Cities", artist:"Nova Rey", dur:"3:20", plays:"8.1M", album:"Paper Cities", lyrics:["Paper cities fold beneath the rain","Skylines drawn in pencil, wash away","We built these walls from wishes, thin as air","Paper cities, still I meet you there"]},
  {title:"Halflight", artist:"Selene Marsh", dur:"3:57", plays:"5.3M", album:"Halflight", lyrics:["Halflight on the water, dim and blue","I keep tracing shapes that look like you","Nothing's fully dark, nothing's fully clear","Halflight holds me steady, holds me here"]},
  {title:"Solstice", artist:"Dax Holloway", dur:"3:15", plays:"3.9M", album:"Solstice", lyrics:["Longest day, we chased the setting sun","Solstice calling, tell me we're not done","Shadows shrink to nothing at your feet","Solstice keeps the summer obsolete"]},
  {title:"Analog Warmth", artist:"Wren Blackwood", dur:"2:58", plays:"2.1M", album:"Analog Warmth", lyrics:["Vinyl crackle, honest and unclean","Analog warmth, the softest in-between","Nothing digital could hold this tone","Analog warmth, the sound of coming home"]},
];

const artists = {
  "Kairo Vale":{followers:"28.4M", tracks:[0,1,2,3,4]},
  "Nova Rey":{followers:"9.1M", tracks:[5]},
  "Selene Marsh":{followers:"6.4M", tracks:[6]},
  "Dax Holloway":{followers:"4.2M", tracks:[7]},
  "Wren Blackwood":{followers:"3.8M", tracks:[8]},
};

const builtinPlaylists = {
  "Daily Mix 1":[0,5,6,1,7], "Chill Vibes":[4,6,8,2], "Focus Flow":[8,4,2,6],
  "Liked Songs":[0,6,5], "Workout Mix":[1,3,7,0], "Late Night Drive":[6,4,8],
};
const madeForYou = [
  {name:"Daily Mix 1", sub:"Kairo Vale, Nova Rey and more", i:0},
  {name:"Chill Vibes", sub:"Relax and unwind", i:4},
  {name:"Focus Flow", sub:"Deep focus, no distractions", i:2},
];
const recent = [
  {name:"Night Sirens", i:0},{name:"Halflight", i:6},{name:"Paper Cities", i:5},
  {name:"Solstice", i:7},{name:"Amber Radio", i:4},{name:"Low Tide Diaries", i:3},{name:"Static Bloom", i:2},
];
const genres = ["Mood","Workout","Chill","Focus","Party","Rock"];
const genreI18n = {
  en:{Mood:"Mood",Workout:"Workout",Chill:"Chill",Focus:"Focus",Party:"Party",Rock:"Rock"},
  fa:{Mood:"حس‌وحال",Workout:"ورزش",Chill:"آرامش",Focus:"تمرکز",Party:"مهمونی",Rock:"راک"}
};
const radioStations = ["Kairo Vale Radio","Late Night Frequencies","Deep Focus FM","Indie Reverie Radio"];
const podcasts = [
  {title:"Studio Notes", host:"Weekly interviews with producers", i:1},
  {title:"Low End Theory", host:"Deep dives into sound design", i:3},
  {title:"On Repeat", host:"New release breakdowns", i:5},
  {title:"The Mix Room", host:"Engineers talk craft", i:7},
];

const features = [
  {name:"Hi-Res Lossless", desc:"Studio-master streaming up to 24-bit — inspired by Tidal & Qobuz.", color:'var(--hires)'},
  {name:"Spatial Audio", desc:"Immersive mixes on any headphones — inspired by Apple Music.", color:'var(--spatial)'},
  {name:"Smart Playlists", desc:"Daily Mixes matched to your taste — inspired by Spotify.", color:'var(--a1)'},
  {name:"Music Videos", desc:"Official videos & visualizers — inspired by YouTube Music.", color:'#f5b942'},
  {name:"Full Booklets", desc:"Liner notes & credits on every release — inspired by Qobuz.", color:'#f5567a'},
];

const friendColors = ['#8b5cf6','#ec4899','#34d1a0','#5cc8f2','#f5b942','#f97316'];
const friends = [
  {id:'f1', name:'Sina', status:'Online'},
  {id:'f2', name:'Ava', status:'Listening to Halflight'},
  {id:'f3', name:'Reza', status:'Offline'},
  {id:'f4', name:'Niloofar', status:'Online'},
  {id:'f5', name:'Kian', status:'Offline'},
];
const devices = [
  {id:'d1', name:'This phone', icon:'phone'},
  {id:'d2', name:'Living Room TV', icon:'tv'},
  {id:'d3', name:'Kitchen Speaker', icon:'speaker'},
  {id:'d4', name:'Bedroom Speaker', icon:'speaker'},
];
const tasteMoods = ['Chill','Focus','Party','Rock','Indie','Electronic','Late night','Morning'];
const moodTrackMap = {
  'Chill':[4,6,8], 'Focus':[8,4,2], 'Party':[3,1,7], 'Rock':[1,0,3],
  'Indie':[5,6,8], 'Electronic':[2,4,8], 'Late night':[6,0,4], 'Morning':[7,5,3],
};

/* ================= STATE ================= */
let currentTrack = 0;
let shuffleMode = false;
let repeatMode = 'off';
let currentQueue = [0,1,2,3,4];
let queueLabel = "Night Sirens";
let playing = false;
let liked = false;
let following = false;
let currentArtist = "Kairo Vale";
let progress = 38;
let downloads = new Set();
let userPlaylists = [];
let nextPlaylistId = 1;
let currentPlaylistId = null;
let currentPlaylistIsBuiltin = false;
let actionTrackIndex = null;
let shareTargetPlaylistId = null;
let theme = 'dark';
let lang = 'en';
let listenHistory = [];
let playHistoryLog = [];
let currentCommentTrack = null;
const comments = {
  0: [{user:'Ava', color:'#ec4899', text:'This one hits different at night 🌙', time:'2d ago'}, {user:'Sina', color:'#34d1a0', text:'The bridge on this is so good', time:'1d ago'}],
  3: [{user:'Reza', color:'#5cc8f2', text:'Low Tide Diaries is criminally underrated', time:'5h ago'}],
};
let followedFriends = new Set();
let currentFriendId = null;
let castDeviceId = 'd1';
let groupActive = false;
let groupParticipantIds = [];
let groupTimer = null;
let selectedMoods = new Set();
let profile = {name:'Mahdi', bio:'', color:null, emoji:''};
const avatarColors = ['#8b5cf6','#ec4899','#34d1a0','#5cc8f2','#f5b942','#f97316','#f5567a','#22c55e'];
const avatarEmojis = ['🎧','🎵','🔥','🌙','⭐','🎸','🎹','🌊'];
let offlineMode = false;
let notifications = [
  {id:1, icon:'🎵', text:'New album "Solstice" just dropped from Dax Holloway', time:'2h ago', read:false},
  {id:2, icon:'👥', text:'Ava started following you', time:'5h ago', read:false},
  {id:3, icon:'❤️', text:'Niloofar liked your playlist "Chill Vibes"', time:'1d ago', read:true},
  {id:4, icon:'🎧', text:'Sina started a Listen Together session', time:'2d ago', read:true},
];

const i18n = {
  en:{home:"Home",explore:"Explore",library:"Library",search:"Search",yourLibrary:"Your Library",
    madeForYou:"Made for you",recentlyPlayed:"Recently played",everythingOnePlayer:"Everything, one player",
    seeAll:"See all",playNow:"Play Now",popular:"Popular",follow:"Follow",following:"Following",
    playingFrom:"PLAYING FROM",lyrics:"Lyrics",settings:"Settings",account:"Account",appearance:"Appearance",
    theme:"Theme",dark:"Dark",light:"Light",language:"Language",storage:"Storage",downloaded:"Downloaded songs",
    clearDownloads:"Clear all downloads",download:"Download",removeDownload:"Remove download",
    addToPlaylist:"Add to Playlist",share:"Share",removeFromPlaylist:"Remove from this playlist",
    newPlaylist:"New Playlist",copyLink:"Copy link",addSongs:"Add songs",linkCopied:"Link copied",
    downloadedToast:"Downloaded for offline",removedToast:"Removed from downloads",addedToPlaylist:"Added to",
    playlistCreated:"Playlist created",songs:"songs",yourPlaylist:"Your playlist",
    all:"All",music:"Music",discover:"Discover",videos:"Videos",radio:"Radio",songsTab:"Songs",albums:"Albums",artistsTab:"Artists",
    podcasts:"Podcasts",playlistsSec:"Playlists",likedSongs:"Liked Songs",genresMoods:"Genres & moods",
    radioStations:"Radio stations",radioStationLabel:"Radio station",tuneYourTaste:"Tune your taste",
    pickMoods:"Pick a few moods for smarter picks",browseAll:"Browse all",friends:"Friends",
    editProfile:"Edit profile",followers:"Followers",yourPlaylists:"Your playlists",premium:"Premium",
    playHistory:"Play history",notifications:"Notifications",drivingMode:"Driving mode",
    yourListeningStats:"Your listening stats",nothingPlayedYet:"Nothing played yet this session",
    noSongsYet:"No songs yet",offlineMode:"Offline mode",yourLibraryTitle:"Your Library"},
  fa:{home:"خانه",explore:"اکسپلور",library:"کتابخانه",search:"جستجو",yourLibrary:"کتابخانه شما",
    madeForYou:"ساخته‌شده برای شما",recentlyPlayed:"اخیراً پخش‌شده",everythingOnePlayer:"همه‌چیز، یک پلیر",
    seeAll:"مشاهده همه",playNow:"پخش",popular:"محبوب‌ترین‌ها",follow:"دنبال کردن",following:"دنبال می‌کنید",
    playingFrom:"در حال پخش از",lyrics:"متن آهنگ",settings:"تنظیمات",account:"حساب کاربری",appearance:"ظاهر",
    theme:"تم",dark:"تیره",light:"روشن",language:"زبان",storage:"حافظه",downloaded:"آهنگ‌های دانلودشده",
    clearDownloads:"حذف همه دانلودها",download:"دانلود",removeDownload:"حذف دانلود",
    addToPlaylist:"افزودن به پلی‌لیست",share:"اشتراک‌گذاری",removeFromPlaylist:"حذف از این پلی‌لیست",
    newPlaylist:"پلی‌لیست جدید",copyLink:"کپی لینک",addSongs:"افزودن آهنگ",linkCopied:"لینک کپی شد",
    downloadedToast:"برای آفلاین دانلود شد",removedToast:"از دانلودها حذف شد",addedToPlaylist:"افزوده شد به",
    playlistCreated:"پلی‌لیست ساخته شد",songs:"آهنگ",yourPlaylist:"پلی‌لیست شما",
    discover:"کشف",all:"همه",music:"موزیک",videos:"ویدیوها",radio:"رادیو",songsTab:"آهنگ‌ها",albums:"آلبوم‌ها",artistsTab:"هنرمندان",
    podcasts:"پادکست‌ها",playlistsSec:"پلی‌لیست‌ها",likedSongs:"آهنگ‌های پسندیده",genresMoods:"ژانر و حال‌وهوا",
    radioStations:"ایستگاه‌های رادیویی",radioStationLabel:"ایستگاه رادیویی",tuneYourTaste:"سلیقه‌ت رو تنظیم کن",
    pickMoods:"چند حس‌وحال انتخاب کن برای پیشنهاد بهتر",browseAll:"مرور همه",friends:"دوستان",
    editProfile:"ویرایش پروفایل",followers:"دنبال‌کننده",yourPlaylists:"پلی‌لیست‌های شما",premium:"پرمیوم",
    playHistory:"تاریخچه پخش",notifications:"اعلان‌ها",drivingMode:"حالت رانندگی",
    yourListeningStats:"آمار شنیدن شما",nothingPlayedYet:"چیزی تو این نشست پخش نشده",
    noSongsYet:"هنوز آهنگی نیست",offlineMode:"حالت آفلاین",yourLibraryTitle:"کتابخانه شما"}
};
function t(key){ return i18n[lang][key] || key; }
function applyI18n(){
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const svg = el.querySelector('svg');
    el.textContent = t(key);
    if(svg) el.appendChild(svg);
  });
  document.getElementById('searchInput').placeholder = lang==='fa' ? 'آهنگ، خواننده، آلبوم...' : 'Songs, artists, albums...';
}
function setLang(l){
  lang = l;
  document.getElementById('langEnBtn').classList.toggle('active', l==='en');
  document.getElementById('langFaBtn').classList.toggle('active', l==='fa');
  document.body.classList.toggle('lang-fa', l==='fa');
  applyI18n();
  renderHomeChips(); renderMadeForYou(); renderExplore(); renderLibChips(); renderSearch(document.getElementById('searchInput').value);
  updateSheet();
}
function setTheme(th){
  theme = th;
  document.body.classList.toggle('light', th==='light');
  document.getElementById('themeDarkBtn').classList.toggle('active', th==='dark');
  document.getElementById('themeLightBtn').classList.toggle('active', th==='light');
}
function showToast(msg){
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

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

/* ================= RENDER: EXPLORE ================= */
function renderExplore(){
  document.getElementById('genreGrid').innerHTML = genres.map((g,i) => `
    <div class="gcard"><div class="cover">${coverEl(i+2)}</div><div class="t">${genreI18n[lang][g]||g}</div></div>`).join('');
  document.getElementById('radioGrid').innerHTML = radioStations.map((s,i) => `
    <div class="gcard" onclick='playTrack(${i % tracks.length},"${s}",false)'>
      <div class="cover">${coverEl(i+3)}</div><div class="t">${s}</div><div class="s">${t('radioStationLabel')}</div>
    </div>`).join('');
}

/* ================= RENDER: LIBRARY ================= */
function renderLibChips(){
  const el = document.getElementById('libChips');
  const labels = ['Playlists','Songs','Albums','Artists'];
  const keys = {Playlists:'playlistsSec',Songs:'songsTab',Albums:'albums',Artists:'artistsTab'};
  el.innerHTML = labels.map((l,i) => `<div class="chip ${i===0?'active':''}" data-chip="${l}">${t(keys[l])}</div>`).join('');
  el.querySelectorAll('.chip').forEach(c => c.onclick = () => openLibTab(c.dataset.chip));
  renderLibBody('Playlists');
}
function openLibTab(label){
  switchScreen('library');
  document.querySelectorAll('#libChips .chip').forEach(c => c.classList.toggle('active', c.dataset.chip===label));
  renderLibBody(label);
}
function renderLibBody(label){
  const el = document.getElementById('libContent');
  if(label==='Playlists'){
    const builtinCards = Object.keys(builtinPlaylists).map(name => {
      const q = builtinPlaylists[name];
      return `<div class="gcard" onclick="openPlaylist('${name}',true)"><div class="cover">${coverEl(q[0]||0)}</div><div class="t">${name}</div><div class="s">${q.length} ${t('songs')}</div></div>`;
    }).join('');
    const userCards = userPlaylists.map(p => `
      <div class="gcard" onclick="openPlaylist('${p.id}',false)"><div class="cover">${playlistCoverHTML(p)}</div><div class="t">${p.name}</div><div class="s">${p.tracks.length} ${t('songs')}</div></div>`).join('');
    el.innerHTML = `<div class="grid2">${builtinCards}${userCards}</div>`;
  } else if(label==='Songs'){
    const idxs = tracks.map((tr,i)=>i).filter(i => !offlineMode || downloads.has(i));
    const uploadBtn = `<div class="upload-btn" onclick="triggerUpload()"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>Upload your own music</div>`;
    el.innerHTML = uploadBtn + (idxs.length ? idxs.map(i => trackRowHTML(i, i+1, currentTrack===i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">No downloaded songs yet</div>`);
  } else if(label==='Albums'){
    const albumSet = [...new Set(tracks.map(t=>t.album))];
    el.innerHTML = `<div class="grid2">${albumSet.map(al => {
      const t = tracks.find(x=>x.album===al); const i = tracks.indexOf(t);
      return `<div class="gcard" onclick="openArtist('${t.artist}')"><div class="cover">${coverEl(i)}</div><div class="t">${al}</div><div class="s">${t.artist}</div></div>`;
    }).join('')}</div>`;
  } else if(label==='Artists'){
    el.innerHTML = `<div class="grid2">${Object.keys(artists).map((name,idx) => `
      <div class="gcard" onclick="openArtist('${name}')"><div class="cover" style="border-radius:50%;">${coverEl(idx)}</div><div class="t">${name}</div><div class="s">${artists[name].followers} listeners</div></div>`).join('')}</div>`;
  }
}

/* ================= RENDER: SEARCH ================= */
function renderSearch(q){
  q = (q||'').toLowerCase();
  const results = tracks.map((t,i)=>({t,i})).filter(x => !q || x.t.title.toLowerCase().includes(q) || x.t.artist.toLowerCase().includes(q));
  const el = document.getElementById('searchResults');
  if(!q){ el.innerHTML = `<div class="section-head"><h2>${t('browseAll')}</h2></div>` + tracks.map((t,i)=>trackRowHTML(i,i+1,currentTrack===i)).join(''); return; }
  el.innerHTML = results.length ? results.map(x => trackRowHTML(x.i, x.i+1, currentTrack===x.i)).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 4px;">No results for "${q}"</div>`;
}

/* ================= RENDER: ARTIST ================= */
function openArtist(name){
  currentArtist = name;
  following = false;
  const a = artists[name];
  document.getElementById('artistHero').style.background = gradCSS(a.tracks[0]);
  document.getElementById('artistHero').querySelector('.wave-sig')?.remove();
  document.getElementById('artistHero').insertAdjacentHTML('beforeend', `<svg class="wave-sig" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;opacity:.5;"><path d="M0 60 Q15 35 30 60 T60 60 T90 60 T120 60" stroke="rgba(255,255,255,.5)" fill="none" stroke-width="1"/></svg>`);
  document.getElementById('artistName').textContent = name;
  document.getElementById('artistFollowers').textContent = a.followers + ' monthly listeners';
  document.getElementById('followBtn').textContent = 'Follow';
  document.getElementById('followBtn').classList.remove('following');
  document.getElementById('artistTracks').innerHTML = a.tracks.map((ti,idx) => trackRowHTML(ti, idx+1, currentTrack===ti)).join('');
  switchScreen('artist');
}
function toggleFollow(){
  following = !following;
  const btn = document.getElementById('followBtn');
  btn.textContent = following ? 'Following' : 'Follow';
  btn.classList.toggle('following', following);
}
function playArtistTop(){
  const a = artists[currentArtist];
  playTrack(a.tracks[0], currentArtist, true);
}

/* ================= PLAYLIST DETAIL ================= */
function playlistCoverHTML(p){
  if(p.customCover) return `<div style="width:100%;height:100%;background:${p.customCover};"></div>`;
  return p.tracks.length ? coverEl(p.tracks[0]) : `<div style="width:100%;height:100%;background:var(--surface-3);"></div>`;
}
function openPlaylist(key, isBuiltin){
  currentPlaylistId = key;
  currentPlaylistIsBuiltin = isBuiltin;
  let name, queue, coverHTML;
  if(isBuiltin){ name = key; queue = builtinPlaylists[key] || []; coverHTML = coverEl(queue.length ? queue[0] : 0); }
  else {
    const p = userPlaylists.find(x=>x.id===key);
    name = p ? p.name : ''; queue = p ? p.tracks : [];
    coverHTML = p ? playlistCoverHTML(p) : coverEl(0);
  }
  document.getElementById('plCover').querySelector('.cover-fill')?.remove();
  document.getElementById('plCover').insertAdjacentHTML('afterbegin', `<div class="cover-fill" style="position:absolute;inset:0;">${coverHTML}</div>`);
  document.getElementById('plName').textContent = name;
  document.getElementById('plMeta').textContent = queue.length + ' ' + t('songs');
  document.getElementById('plAddBtn').style.display = isBuiltin ? 'none' : 'flex';
  document.getElementById('plCoverEditBadge').classList.toggle('hidden', isBuiltin);
  renderPlaylistTracks();
  switchScreen('playlist');
}
function renderPlaylistTracks(){
  const queue = currentPlaylistIsBuiltin ? (builtinPlaylists[currentPlaylistId]||[]) : ((userPlaylists.find(p=>p.id===currentPlaylistId)||{tracks:[]}).tracks);
  const el = document.getElementById('plTracks');
  if(!queue.length){ el.innerHTML = `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">${lang==='fa'?'هنوز آهنگی اضافه نشده':'No songs yet'}</div>`; return; }
  el.innerHTML = queue.map((ti,idx) => currentPlaylistIsBuiltin ? trackRowHTML(ti, idx+1, currentTrack===ti, currentPlaylistId) : plTrackRowHTML(ti, idx+1, queue.length)).join('');
}
function moveTrackInPlaylist(trackIdx, dir){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  const pos = p.tracks.indexOf(trackIdx);
  const newPos = pos + dir;
  if(newPos<0 || newPos>=p.tracks.length) return;
  [p.tracks[pos], p.tracks[newPos]] = [p.tracks[newPos], p.tracks[pos]];
  renderPlaylistTracks();
}
function removeTrackFromPlaylist(i){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.tracks = p.tracks.filter(x=>x!==i);
  renderPlaylistTracks();
  document.getElementById('plMeta').textContent = p.tracks.length + ' ' + t('songs');
}
function removeFromCurrentPlaylist(){ removeTrackFromPlaylist(actionTrackIndex); closeActionSheet(); }

/* ================= PLAYLIST COVER PICKER ================= */
function openCoverPicker(){
  if(currentPlaylistIsBuiltin) return;
  document.getElementById('coverColorGrid').innerHTML = avatarColors.map(c => `<div class="cover-color-preview" style="background:${c};cursor:pointer;" onclick="setPlaylistCoverColor('${c}')"></div>`).join('');
  document.getElementById('coverPickBackdrop').classList.add('open');
  document.getElementById('coverPickSheet').classList.add('open');
}
function closeCoverPicker(){ document.getElementById('coverPickBackdrop').classList.remove('open'); document.getElementById('coverPickSheet').classList.remove('open'); }
function setPlaylistCoverColor(c){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = c;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
}
function resetPlaylistCover(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  p.customCover = null;
  closeCoverPicker();
  openPlaylist(currentPlaylistId, false);
}

function openAddSongsPicker(){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  document.getElementById('pickerList').innerHTML = tracks.map((tr,i) => {
    const has = p.tracks.includes(i);
    return `<div class="pl-pick-row" onclick="togglePickerTrack(${i})">
      <div class="thumb" style="width:36px;height:36px;border-radius:7px;overflow:hidden;position:relative;">${coverEl(i)}</div>
      <div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${tr.title}</div><div style="font-size:11px;color:var(--faint);">${tr.artist}</div></div>
      ${has ? '<svg class="pl-pick-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`;
  }).join('');
  document.getElementById('pickerBackdrop').classList.add('open');
  document.getElementById('pickerSheet').classList.add('open');
}
function closeAddSongsPicker(){ document.getElementById('pickerBackdrop').classList.remove('open'); document.getElementById('pickerSheet').classList.remove('open'); }
function togglePickerTrack(i){
  const p = userPlaylists.find(x=>x.id===currentPlaylistId);
  if(!p) return;
  if(p.tracks.includes(i)) p.tracks = p.tracks.filter(x=>x!==i); else p.tracks.push(i);
  openAddSongsPicker();
  renderPlaylistTracks();
  document.getElementById('plMeta').textContent = p.tracks.length + ' ' + t('songs');
}

/* ================= NEW PLAYLIST ================= */
function createPlaylist(fromAddSheet){
  const name = prompt(lang==='fa' ? 'نام پلی‌لیست را وارد کنید' : 'Playlist name');
  if(!name) return;
  const p = {id:'up'+(nextPlaylistId++), name:name, tracks:[], customCover:null};
  userPlaylists.push(p);
  if(fromAddSheet && actionTrackIndex!==null){
    p.tracks.push(actionTrackIndex);
    showToast(t('playlistCreated'));
    closeAddToPlaylist(); closeActionSheet();
    refreshActiveLists();
  } else {
    showToast(t('playlistCreated'));
    openLibTab('Playlists');
  }
}

/* ================= ACTION SHEET (per track) ================= */
function openActionSheet(i){
  actionTrackIndex = i;
  const tr = tracks[i];
  document.getElementById('actionCover').innerHTML = coverEl(i);
  document.getElementById('actionTitle').textContent = tr.title;
  document.getElementById('actionArtist').textContent = tr.artist;
  updateActionDownloadUI();
  const inUserPlaylist = document.getElementById('screen-playlist').classList.contains('active') && !currentPlaylistIsBuiltin;
  document.getElementById('actionRemoveRow').classList.toggle('hidden', !inUserPlaylist);
  document.getElementById('actionBackdrop').classList.add('open');
  document.getElementById('actionSheet').classList.add('open');
}
function closeActionSheet(){ document.getElementById('actionBackdrop').classList.remove('open'); document.getElementById('actionSheet').classList.remove('open'); }
function updateActionDownloadUI(){
  const dl = downloads.has(actionTrackIndex);
  document.getElementById('actionDownloadLabel').textContent = dl ? t('removeDownload') : t('download');
  document.getElementById('actionDownloadIcon').innerHTML = dl
    ? '<circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
    : '<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16"/>';
  document.getElementById('actionDownloadRow').style.color = dl ? 'var(--hires)' : '';
}
function toggleDownloadCurrent(){
  if(downloads.has(actionTrackIndex)){ downloads.delete(actionTrackIndex); showToast(t('removedToast')); }
  else { downloads.add(actionTrackIndex); showToast(t('downloadedToast')); }
  updateActionDownloadUI();
  updateDownloadCount();
  closeActionSheet();
  refreshActiveLists();
}
function updateDownloadCount(){ const el = document.getElementById('downloadCount'); if(el) el.textContent = downloads.size; }
function clearDownloads(){ downloads = new Set(); updateDownloadCount(); showToast(t('removedToast')); refreshActiveLists(); }

/* ================= ADD TO PLAYLIST SHEET ================= */
function openAddToPlaylist(){
  const list = document.getElementById('addPlList');
  list.innerHTML = userPlaylists.length ? userPlaylists.map(p => {
    const has = p.tracks.includes(actionTrackIndex);
    return `<div class="pl-pick-row" onclick="toggleTrackInPlaylist('${p.id}')">
      <div class="pl-dot" style="background:var(--a1)"></div>
      <span style="flex:1;">${p.name}</span>
      ${has ? '<svg class="pl-pick-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`;
  }).join('') : `<div style="color:var(--faint);font-size:13px;padding:6px 14px 16px;">${lang==='fa'?'هنوز پلی‌لیستی نساخته‌اید':'No playlists yet'}</div>`;
  document.getElementById('addPlBackdrop').classList.add('open');
  document.getElementById('addPlSheet').classList.add('open');
}
function closeAddToPlaylist(){ document.getElementById('addPlBackdrop').classList.remove('open'); document.getElementById('addPlSheet').classList.remove('open'); }
function toggleTrackInPlaylist(id){
  const p = userPlaylists.find(x=>x.id===id);
  if(!p) return;
  if(p.tracks.includes(actionTrackIndex)){ p.tracks = p.tracks.filter(x=>x!==actionTrackIndex); }
  else { p.tracks.push(actionTrackIndex); showToast(t('addedToPlaylist')+' '+p.name); }
  openAddToPlaylist();
  refreshActiveLists();
}

/* ================= SHARE SHEET ================= */
function openShare(i, plId){
  shareTargetPlaylistId = plId || null;
  if(i!==null && i!==undefined){
    actionTrackIndex = i;
    document.getElementById('shareTitle').textContent = t('share') + ' — ' + tracks[i].title;
  } else if(plId){
    const name = currentPlaylistIsBuiltin ? plId : ((userPlaylists.find(p=>p.id===plId)||{}).name || '');
    document.getElementById('shareTitle').textContent = t('share') + ' — ' + name;
  }
  document.getElementById('shareBackdrop').classList.add('open');
  document.getElementById('shareSheet').classList.add('open');
}
function closeShare(){ document.getElementById('shareBackdrop').classList.remove('open'); document.getElementById('shareSheet').classList.remove('open'); }
function copyShareLink(){
  const url = shareTargetPlaylistId ? `https://musix.app/playlist/${shareTargetPlaylistId}` : `https://musix.app/track/${actionTrackIndex}`;
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(url).catch(()=>{}); }
  showToast(t('linkCopied'));
  closeShare();
}

/* ================= TRACK ROW HTML ================= */
function trackRowHTML(i, idx, isPlaying, queueName){
  const tr = tracks[i];
  const dl = downloads.has(i);
  const label = (queueName || tr.album).replace(/"/g,'&quot;');
  return `<div class="trow" onclick='playTrack(${i},"${label}",true)'>
    <div class="idx">${isPlaying && playing ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx}</div>
    <div class="thumb">${coverEl(i)}</div>
    <div class="meta"><div class="ttl">${tr.title}</div><div class="sub">${tr.artist}</div></div>
    ${dl ? `<svg class="dl-icon done" viewBox="0 0 24 24" stroke-width="2"><circle cx="12" cy="12" r="10" fill="none"/><path d="M8 12l2.5 2.5L16 9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ''}
    <svg class="kebab" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" onclick='event.stopPropagation();openActionSheet(${i})'><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/></svg>
  </div>`;
}
function plTrackRowHTML(i, idx, total){
  const tr = tracks[i];
  return `<div class="trow" onclick='playTrack(${i},"playlist",true)'>
    <div class="idx">${currentTrack===i && playing ? '<div class="mini-wave"><span></span><span></span><span></span><span></span></div>' : idx}</div>
    <div class="thumb">${coverEl(i)}</div>
    <div class="meta"><div class="ttl">${tr.title}</div><div class="sub">${tr.artist}</div></div>
    <div class="reorder-btns" onclick="event.stopPropagation()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="${idx===1?'opacity:.2;pointer-events:none;':''}" onclick="moveTrackInPlaylist(${i},-1)"><path d="M18 15l-6-6-6 6"/></svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="${idx===total?'opacity:.2;pointer-events:none;':''}" onclick="moveTrackInPlaylist(${i},1)"><path d="M6 9l6 6 6-6"/></svg>
    </div>
    <svg class="rm-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" onclick='event.stopPropagation();removeTrackFromPlaylist(${i})'><path d="M18 6L6 18M6 6l12 12"/></svg>
  </div>`;
}

/* ================= NAV / SCREENS ================= */
function switchScreen(name){
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-'+name).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.nav===name));
  if(name==='library') renderLibBody(document.querySelector('#libChips .chip.active')?.dataset.chip || 'Playlists');
  if(name==='profile') renderProfile();
  if(name==='friends') renderFriendsList();
  if(name==='history') renderHistoryList();
}
function openDrawer(){ document.getElementById('drawer').classList.add('open'); document.getElementById('drawerBackdrop').classList.add('open'); }
function closeDrawer(){ document.getElementById('drawer').classList.remove('open'); document.getElementById('drawerBackdrop').classList.remove('open'); }

/* ================= PLAYER ================= */
function playTrack(i, label, openSheet){
  if(offlineMode && !downloads.has(i) && !(tracks[i] && tracks[i].isUpload)){
    showToast(lang==='fa' ? 'این آهنگ دانلود نشده' : "This song isn't downloaded");
    return;
  }
  currentTrack = i;
  queueLabel = label || tracks[i].album;
  playing = true;
  progress = 0;
  updateMini();
  updateSheet();
  showMiniplayer();
  if(openSheet) openNowPlaying();
  refreshActiveLists();
  const tr = tracks[i];
  const realAudio = document.getElementById('realAudioEl');
  if(tr.isUpload){
    usingRealAudio = true;
    stopSequencer();
    realAudio.src = tr.audioUrl;
    realAudio.currentTime = 0;
    realAudio.play().catch(()=>{});
  } else {
    usingRealAudio = false;
    realAudio.pause();
    ensureAudio();
    startSequencer();
  }
  listenHistory.push(i);
  if(listenHistory.length>30) listenHistory.shift();
  playHistoryLog.unshift({i, time:new Date()});
  if(playHistoryLog.length>100) playHistoryLog.pop();
  updateBecauseSection();
}
function refreshActiveLists(){
  if(document.getElementById('screen-artist').classList.contains('active')) openArtist(currentArtist);
  if(document.getElementById('screen-library').classList.contains('active')) renderLibBody(document.querySelector('#libChips .chip.active')?.dataset.chip || 'Playlists');
  if(document.getElementById('screen-playlist').classList.contains('active')) renderPlaylistTracks();
  if(document.getElementById('screen-search').classList.contains('active') && document.getElementById('searchInput').value) renderSearch(document.getElementById('searchInput').value);
}
function nextTrack(){
  let next;
  if(shuffleMode && tracks.length>1){
    do { next = Math.floor(Math.random()*tracks.length); } while(next===currentTrack);
  } else {
    next = (currentTrack+1)%tracks.length;
  }
  playTrack(next, queueLabel, true);
}
function prevTrack(){ playTrack((currentTrack-1+tracks.length)%tracks.length, queueLabel, true); }
function toggleShuffle(){
  shuffleMode = !shuffleMode;
  document.getElementById('shuffleIcon').classList.toggle('active', shuffleMode);
  showToast(shuffleMode ? (lang==='fa'?'پخش درهم روشن شد':'Shuffle on') : (lang==='fa'?'پخش درهم خاموش شد':'Shuffle off'));
}
function cycleRepeat(){
  repeatMode = repeatMode==='off' ? 'all' : repeatMode==='all' ? 'one' : 'off';
  document.getElementById('repeatIcon').classList.toggle('active', repeatMode!=='off');
  document.getElementById('repeatOneBadge').classList.toggle('hidden', repeatMode!=='one');
  const label = repeatMode==='off' ? (lang==='fa'?'تکرار خاموش':'Repeat off') : repeatMode==='one' ? (lang==='fa'?'تکرار یک آهنگ':'Repeat one') : (lang==='fa'?'تکرار همه':'Repeat all');
  showToast(label);
}
function togglePlay(){
  playing = !playing;
  updatePlayIcons();
  if(playing) showMiniplayer();
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(playing) realAudio.play().catch(()=>{}); else realAudio.pause();
  } else if(playing){ ensureAudio(); startSequencer(); } else { stopSequencer(); }
}
function showMiniplayer(){
  document.getElementById('miniplayer').classList.add('show');
}
function closeMiniplayer(){
  document.getElementById('miniplayer').classList.remove('show');
  playing = false;
  updatePlayIcons();
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(realAudio) realAudio.pause();
  } else {
    stopSequencer();
  }
}
function toggleLike(){
  liked = !liked;
  document.getElementById('npHeart').classList.toggle('liked', liked);
  document.getElementById('mpHeart').classList.toggle('liked', liked);
}
function updateMini(){
  const t = tracks[currentTrack];
  document.getElementById('mpThumb').innerHTML = coverEl(currentTrack);
  document.getElementById('mpTitle').textContent = t.title;
  document.getElementById('mpArtist').textContent = t.artist;
  updatePlayIcons();
}
function updateSheet(){
  const tr = tracks[currentTrack];
  document.getElementById('npCover').innerHTML = coverEl(currentTrack);
  document.getElementById('npTitle').textContent = tr.title;
  document.getElementById('npArtistName').textContent = tr.artist;
  document.getElementById('npQueueLabel').textContent = queueLabel;
  document.getElementById('npTot').textContent = tr.dur;
  document.getElementById('npLyricsBody').innerHTML = tr.lyrics.map((l,i) => `<div class="${i===1?'cur':''}">${l}</div>`).join('');
  document.getElementById('npLyricsPreview').textContent = tr.lyrics[1] || tr.lyrics[0] || '';
  document.getElementById('npLyricsBody').classList.remove('show');
  document.getElementById('npLyricsPreview').style.display = 'block';
  updatePlayIcons();
  applyDynamicTheme(currentTrack);
}
function applyDynamicTheme(i){
  const g = grads[i % grads.length];
  document.getElementById('npBgBlur').style.background = `radial-gradient(circle at 30% 15%, ${g[0]}, ${g[1]} 70%)`;
  const npSheetEl = document.getElementById('npSheet');
  npSheetEl.style.setProperty('--grad', `linear-gradient(135deg, ${g[0]}, ${g[1]})`);
  npSheetEl.style.setProperty('--a1', g[0]);
  document.getElementById('miniplayer').style.setProperty('--grad', `linear-gradient(135deg, ${g[0]}, ${g[1]})`);
}
function updatePlayIcons(){
  const pause = '<path d="M7 5h4v14H7zM13 5h4v14h-4z"/>';
  const play = '<path d="M8 5v14l11-7z"/>';
  document.getElementById('mpPlayIcon').innerHTML = playing ? pause : play;
  document.getElementById('npPlayIcon').innerHTML = playing ? pause : play;
  const dpIcon = document.getElementById('drivingPlayIcon');
  if(dpIcon) dpIcon.innerHTML = playing ? pause : play;
}
function openNowPlaying(){ document.getElementById('npSheet').classList.add('open'); }
function closeNowPlaying(){ document.getElementById('npSheet').classList.remove('open'); }
function toggleLyrics(){
  const body = document.getElementById('npLyricsBody');
  const preview = document.getElementById('npLyricsPreview');
  body.classList.toggle('show');
  preview.style.display = body.classList.contains('show') ? 'none' : 'block';
}

/* ================= AUDIO ENGINE (generative synth demo — no licensed audio) ================= */
let audioCtx=null, masterGain=null, analyser=null, bassFilter=null, midFilter=null, trebleFilter=null, qualityLowpass=null;
let sequencerTimer=null;
let quality='hires';

function ensureAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  masterGain = audioCtx.createGain(); masterGain.gain.value = 0.16;
  bassFilter = audioCtx.createBiquadFilter(); bassFilter.type='lowshelf'; bassFilter.frequency.value=200; bassFilter.gain.value=0;
  midFilter = audioCtx.createBiquadFilter(); midFilter.type='peaking'; midFilter.frequency.value=1000; midFilter.Q.value=1; midFilter.gain.value=0;
  trebleFilter = audioCtx.createBiquadFilter(); trebleFilter.type='highshelf'; trebleFilter.frequency.value=3200; trebleFilter.gain.value=0;
  qualityLowpass = audioCtx.createBiquadFilter(); qualityLowpass.type='lowpass'; qualityLowpass.frequency.value = quality==='hires' ? 20000 : 8000;
  analyser = audioCtx.createAnalyser(); analyser.fftSize=64;
  bassFilter.connect(midFilter); midFilter.connect(trebleFilter); trebleFilter.connect(qualityLowpass);
  qualityLowpass.connect(analyser); analyser.connect(masterGain); masterGain.connect(audioCtx.destination);
  buildVisualizerBars();
  requestAnimationFrame(renderVisualizer);
}
function playNote(freq, dur){
  if(!audioCtx) return;
  const osc = audioCtx.createOscillator(); osc.type='sine'; osc.frequency.value=freq;
  const g = audioCtx.createGain(); g.gain.value=0;
  osc.connect(g); g.connect(bassFilter);
  const now = audioCtx.currentTime;
  g.gain.linearRampToValueAtTime(0.55, now+0.03);
  g.gain.exponentialRampToValueAtTime(0.001, now+dur);
  osc.start(now); osc.stop(now+dur+0.05);
}
function startSequencer(){
  stopSequencer();
  const scale=[0,3,5,7,10,12,15,10];
  const base = 196 * Math.pow(2, (currentTrack%5)/12);
  let step=0;
  sequencerTimer = setInterval(() => {
    if(!playing) return;
    const freq = base * Math.pow(2, scale[step%scale.length]/12);
    playNote(freq, 0.42);
    step++;
  }, 340);
}
function stopSequencer(){ if(sequencerTimer){ clearInterval(sequencerTimer); sequencerTimer=null; } }
function buildVisualizerBars(){
  const el = document.getElementById('eqVisualizer');
  if(el.children.length) return;
  el.innerHTML = Array.from({length:24}).map(()=>'<div class="bar"></div>').join('');
}
function renderVisualizer(){
  if(analyser){
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    document.querySelectorAll('#eqVisualizer .bar').forEach((b,i) => {
      const v = data[i % data.length] || 0;
      b.style.height = (playing ? Math.max(3,(v/255)*34) : 3) + 'px';
    });
  }
  requestAnimationFrame(renderVisualizer);
}

/* ================= EQUALIZER ================= */
function openEqSheet(){ ensureAudio(); document.getElementById('eqBackdrop').classList.add('open'); document.getElementById('eqSheet').classList.add('open'); }
function closeEqSheet(){ document.getElementById('eqBackdrop').classList.remove('open'); document.getElementById('eqSheet').classList.remove('open'); }
function updateEQ(band, val){
  ensureAudio(); val = parseFloat(val);
  if(band==='bass'){ bassFilter.gain.value=val; document.getElementById('eqBassVal').textContent=val+'dB'; }
  if(band==='mid'){ midFilter.gain.value=val; document.getElementById('eqMidVal').textContent=val+'dB'; }
  if(band==='treble'){ trebleFilter.gain.value=val; document.getElementById('eqTrebleVal').textContent=val+'dB'; }
}
function resetEQ(){
  ['eqBass','eqMid','eqTreble'].forEach(id => document.getElementById(id).value = 0);
  updateEQ('bass',0); updateEQ('mid',0); updateEQ('treble',0);
}

/* ================= QUALITY ================= */
function openQualitySheet(){ updateQualityUI(); document.getElementById('qualityBackdrop').classList.add('open'); document.getElementById('qualitySheet').classList.add('open'); }
function closeQualitySheet(){ document.getElementById('qualityBackdrop').classList.remove('open'); document.getElementById('qualitySheet').classList.remove('open'); }
function setQuality(q){
  quality = q; ensureAudio();
  qualityLowpass.frequency.value = q==='hires' ? 20000 : 8000;
  document.getElementById('qualityPill').textContent = q==='hires' ? 'HI-RES' : 'STANDARD';
  updateQualityUI();
  showToast(q==='hires' ? 'Hi-Res Lossless enabled' : 'Standard quality enabled');
  closeQualitySheet();
}
function updateQualityUI(){
  document.getElementById('qcardStandard').classList.toggle('selected', quality==='standard');
  document.getElementById('qcardHires').classList.toggle('selected', quality==='hires');
}

/* ================= SLEEP TIMER ================= */
let sleepEndTime=null, sleepIntervalId=null;
function openSleepSheet(){ document.getElementById('sleepBackdrop').classList.add('open'); document.getElementById('sleepSheet').classList.add('open'); }
function closeSleepSheet(){ document.getElementById('sleepBackdrop').classList.remove('open'); document.getElementById('sleepSheet').classList.remove('open'); }
function setSleepTimer(mins){
  clearInterval(sleepIntervalId); sleepIntervalId=null;
  if(mins===0){ sleepEndTime=null; document.getElementById('sleepBadge').classList.add('hidden'); closeSleepSheet(); showToast('Sleep timer off'); return; }
  sleepEndTime = Date.now() + mins*60000;
  document.getElementById('sleepBadge').classList.remove('hidden');
  updateSleepBadge();
  sleepIntervalId = setInterval(() => {
    const remain = sleepEndTime - Date.now();
    if(remain<=0){
      clearInterval(sleepIntervalId); sleepIntervalId=null;
      playing=false; updatePlayIcons(); stopSequencer();
      document.getElementById('sleepBadge').classList.add('hidden');
      showToast('Sleep timer ended — playback paused');
      return;
    }
    updateSleepBadge();
  }, 1000);
  closeSleepSheet();
  showToast('Sleep timer set: '+mins+' min');
}
function updateSleepBadge(){
  if(!sleepEndTime) return;
  const remain = Math.max(0, sleepEndTime-Date.now());
  const m = Math.floor(remain/60000), s = Math.floor((remain%60000)/1000);
  const elBadge = document.getElementById('sleepRemain');
  if(elBadge) elBadge.textContent = m+':'+String(s).padStart(2,'0');
}

/* ================= KARAOKE ================= */
let karaokeIntervalId=null, karaokeLineIdx=0;
function openKaraoke(){
  const tr = tracks[currentTrack];
  document.getElementById('karaokeTrackName').textContent = tr.title + ' — ' + tr.artist;
  karaokeLineIdx = 0;
  renderKaraokeLines();
  document.getElementById('karaokeView').classList.add('open');
  clearInterval(karaokeIntervalId);
  karaokeIntervalId = setInterval(() => {
    karaokeLineIdx = (karaokeLineIdx+1) % tracks[currentTrack].lyrics.length;
    renderKaraokeLines();
  }, 3200);
}
function closeKaraoke(){
  document.getElementById('karaokeView').classList.remove('open');
  clearInterval(karaokeIntervalId); karaokeIntervalId=null;
}
function renderKaraokeLines(){
  const lyr = tracks[currentTrack].lyrics;
  document.getElementById('karaokeLines').innerHTML = lyr.map((l,i) => `<div class="kline ${i===karaokeLineIdx?'cur':''}">${l}</div>`).join('');
}

/* ================= WAVE PROGRESS BAR (original Musix signature UI) ================= */
let wavePhase = 0;
let usingRealAudio = false;
function formatTime(sec){
  if(!isFinite(sec) || sec<0) return '0:00';
  const m = Math.floor(sec/60), s = Math.floor(sec%60);
  return m+':'+String(s).padStart(2,'0');
}
const WAVE_W = 300, WAVE_H = 36, WAVE_POINTS = 46, WAVE_AMP = 9, WAVE_CYCLES = 5;
function waveY(i){
  const t = i / WAVE_POINTS;
  return WAVE_H/2 + Math.sin(t*Math.PI*2*WAVE_CYCLES + wavePhase) * WAVE_AMP;
}
function buildWavePath(){
  let d = '';
  for(let i=0;i<=WAVE_POINTS;i++){
    const x = (i/WAVE_POINTS)*WAVE_W;
    const y = waveY(i);
    d += (i===0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(2) + ' ';
  }
  return d;
}
function renderWaveProgress(){
  const d = buildWavePath();
  document.getElementById('waveBgPath').setAttribute('d', d);
  document.getElementById('waveFgPath').setAttribute('d', d);
  const clipW = (progress/100) * WAVE_W;
  document.getElementById('waveClipRect').setAttribute('width', clipW.toFixed(1));
  const dotT = (progress/100) * WAVE_POINTS;
  const dotX = (progress/100) * WAVE_W;
  const dotY = waveY(dotT);
  const dot = document.getElementById('waveDot');
  dot.setAttribute('cx', dotX.toFixed(1));
  dot.setAttribute('cy', dotY.toFixed(2));
}
function seekFromWave(evt){
  const svg = document.getElementById('waveProgress');
  const rect = svg.getBoundingClientRect();
  const x = evt.clientX - rect.left;
  progress = Math.max(0, Math.min(100, (x/rect.width)*100));
  if(usingRealAudio){
    const realAudio = document.getElementById('realAudioEl');
    if(realAudio.duration) realAudio.currentTime = (progress/100)*realAudio.duration;
  }
  renderWaveProgress();
}

document.getElementById('realAudioEl').addEventListener('loadedmetadata', function(){
  if(usingRealAudio) document.getElementById('npTot').textContent = formatTime(this.duration);
});
document.getElementById('realAudioEl').addEventListener('ended', () => {
  if(!usingRealAudio) return;
  if(repeatMode==='one'){
    const realAudio = document.getElementById('realAudioEl');
    realAudio.currentTime = 0;
    realAudio.play().catch(()=>{});
  } else {
    nextTrack();
  }
});

setInterval(() => {
  wavePhase += playing ? 0.09 : 0.015;
  const realAudio = document.getElementById('realAudioEl');
  if(usingRealAudio && realAudio.duration){
    progress = (realAudio.currentTime/realAudio.duration)*100;
    document.getElementById('npCur').textContent = formatTime(realAudio.currentTime);
  } else if(playing){
    progress += 0.5;
    if(progress>=100){
      progress = 0;
      if(repeatMode!=='one'){ nextTrack(); return; }
    }
  }
  renderWaveProgress();
}, 300);

document.getElementById('searchInput').addEventListener('input', e => renderSearch(e.target.value));

/* ================= PROFILE / FRIENDS ================= */
function renderProfile(){
  document.getElementById('statPlaylists').textContent = userPlaylists.length;
  document.getElementById('statFollowing').textContent = followedFriends.size;
  document.getElementById('friendStripProfile').innerHTML = friends.map((f,idx) => friendAvatarHTML(f, idx)).join('');
  document.querySelectorAll('#friendStripProfile .friend-item').forEach((el,idx) => el.onclick = () => openFriendSheet(friends[idx].id));
  const builtinCards = Object.keys(builtinPlaylists).map(name => {
    const q = builtinPlaylists[name];
    return `<div class="gcard" onclick="openPlaylist('${name}',true)"><div class="cover">${coverEl(q[0]||0)}</div><div class="t">${name}</div><div class="s">${q.length} ${t('songs')}</div></div>`;
  }).join('');
  const userCards = userPlaylists.map(p => `<div class="gcard" onclick="openPlaylist('${p.id}',false)"><div class="cover">${p.tracks.length?coverEl(p.tracks[0]):`<div style="width:100%;height:100%;background:var(--surface-3);"></div>`}</div><div class="t">${p.name}</div><div class="s">${p.tracks.length} ${t('songs')}</div></div>`).join('');
  document.getElementById('profilePlaylists').innerHTML = builtinCards + userCards;
  renderProfileHeader();
}

/* ================= PROFILE PERSONALIZATION ================= */
function renderProfileHeader(){
  const bg = profile.color || 'var(--grad)';
  const label = profile.emoji || (profile.name[0] || 'M').toUpperCase();
  document.getElementById('drawerAvatar').style.background = bg;
  document.getElementById('drawerAvatar').textContent = label;
  document.getElementById('drawerName').textContent = profile.name;
  document.getElementById('profileAvatar').style.background = bg;
  document.getElementById('profileAvatarText').textContent = label;
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileBio').textContent = profile.bio;
  document.getElementById('profileBio').style.display = profile.bio ? 'block' : 'none';
  document.getElementById('settingsAvatar').style.background = bg;
  document.getElementById('settingsAvatar').textContent = label;
  document.getElementById('settingsName').textContent = profile.name;
}
function openEditProfile(){
  document.getElementById('editNameInput').value = profile.name;
  document.getElementById('editBioInput').value = profile.bio;
  renderAvatarPickers();
  document.getElementById('editProfileBackdrop').classList.add('open');
  document.getElementById('editProfileSheet').classList.add('open');
}
function closeEditProfile(){ document.getElementById('editProfileBackdrop').classList.remove('open'); document.getElementById('editProfileSheet').classList.remove('open'); }
function renderAvatarPickers(){
  const previewLabel = profile.emoji || (document.getElementById('editNameInput').value[0] || 'M').toUpperCase();
  document.getElementById('editAvatarPreview').style.background = profile.color || 'var(--grad)';
  document.getElementById('editAvatarPreview').textContent = previewLabel;
  document.getElementById('avatarColorRow').innerHTML = avatarColors.map(c => `<div class="color-swatch ${profile.color===c?'selected':''}" style="background:${c}" onclick="pickAvatarColor('${c}')"></div>`).join('');
  document.getElementById('avatarEmojiRow').innerHTML = `<div class="emoji-swatch ${!profile.emoji?'selected':''}" onclick="pickAvatarEmoji('')">Aa</div>` +
    avatarEmojis.map(e => `<div class="emoji-swatch ${profile.emoji===e?'selected':''}" onclick="pickAvatarEmoji('${e}')">${e}</div>`).join('');
}
function pickAvatarColor(c){ profile.color = c; renderAvatarPickers(); }
function pickAvatarEmoji(e){ profile.emoji = e; renderAvatarPickers(); }
function saveProfile(){
  const name = document.getElementById('editNameInput').value.trim();
  profile.name = name || profile.name;
  profile.bio = document.getElementById('editBioInput').value.trim();
  renderProfileHeader();
  closeEditProfile();
  showToast('Profile updated');
}
function friendAvatarHTML(f, idx){
  const online = f.status==='Online' || f.status.startsWith('Listening');
  return `<div class="friend-item">
    <div class="friend-avatar" style="background:${friendColors[idx%friendColors.length]}">${f.name[0]}<span class="dot ${online?'online':'offline'}"></span></div>
    <div class="friend-name">${f.name}</div>
  </div>`;
}
function renderFriendsList(){
  document.getElementById('friendsList').innerHTML = friends.map((f,idx) => `
    <div class="friend-row" onclick="openFriendSheet('${f.id}')">
      <div class="friend-avatar" style="width:44px;height:44px;font-size:15px;background:${friendColors[idx%friendColors.length]}">${f.name[0]}<span class="dot ${f.status==='Online'||f.status.startsWith('Listening')?'online':'offline'}" style="width:10px;height:10px;"></span></div>
      <div class="meta"><div class="fname">${f.name}</div><div class="fstatus">${f.status}</div></div>
      <button class="btn-follow-sm ${followedFriends.has(f.id)?'following':''}" onclick="event.stopPropagation();quickToggleFollow('${f.id}')">${followedFriends.has(f.id)?'Following':'Follow'}</button>
    </div>`).join('');
}
function quickToggleFollow(id){
  if(followedFriends.has(id)) followedFriends.delete(id); else followedFriends.add(id);
  renderFriendsList();
}
function openFriendSheet(id){
  currentFriendId = id;
  const idx = friends.findIndex(f=>f.id===id);
  const f = friends[idx];
  document.getElementById('friendSheetAvatar').style.background = friendColors[idx%friendColors.length];
  document.getElementById('friendSheetAvatar').textContent = f.name[0];
  document.getElementById('friendSheetName').textContent = f.name;
  document.getElementById('friendSheetStatus').textContent = f.status;
  const btn = document.getElementById('friendSheetFollowBtn');
  btn.textContent = followedFriends.has(id) ? 'Following' : 'Follow';
  btn.classList.toggle('following', followedFriends.has(id));
  const topPicks = [idx, (idx+2)%tracks.length, (idx+5)%tracks.length];
  document.getElementById('friendSheetTracks').innerHTML = topPicks.map((ti,i) => trackRowHTML(ti, i+1, currentTrack===ti)).join('');
  document.getElementById('friendBackdrop').classList.add('open');
  document.getElementById('friendSheet').classList.add('open');
}
function closeFriendSheet(){ document.getElementById('friendBackdrop').classList.remove('open'); document.getElementById('friendSheet').classList.remove('open'); }
function toggleFriendFollow(){
  if(!currentFriendId) return;
  if(followedFriends.has(currentFriendId)) followedFriends.delete(currentFriendId); else followedFriends.add(currentFriendId);
  openFriendSheet(currentFriendId);
}

/* ================= CAST ================= */
function openCastSheet(){ if(isBlockedOffline()) return; renderDeviceList(); document.getElementById('castBackdrop').classList.add('open'); document.getElementById('castSheet').classList.add('open'); }
function closeCastSheet(){ document.getElementById('castBackdrop').classList.remove('open'); document.getElementById('castSheet').classList.remove('open'); }
function renderDeviceList(){
  const icons = {
    phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    tv:'<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    speaker:'<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="14" r="1.4"/><circle cx="12" cy="6" r=".8"/>',
  };
  document.getElementById('deviceList').innerHTML = devices.map(d => `
    <div class="device-row ${d.id===castDeviceId?'active':''}" onclick="selectDevice('${d.id}','${d.name.replace(/'/g,"")}')">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${icons[d.icon]}</svg>
      <span style="flex:1;">${d.name}</span>
      ${d.id===castDeviceId ? '<svg style="width:16px;height:16px;stroke:var(--a1);" viewBox="0 0 24 24" fill="none" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>' : ''}
    </div>`).join('');
}
function selectDevice(id, name){
  castDeviceId = id;
  const badge = document.getElementById('castBadge');
  const icon = document.getElementById('castIcon');
  if(id==='d1'){ badge.classList.add('hidden'); icon.style.color='var(--dim)'; showToast('Playing on this phone'); }
  else { badge.classList.remove('hidden'); document.getElementById('castDeviceName').textContent = name; icon.style.color='var(--a1)'; showToast('Casting to '+name); }
  closeCastSheet();
}

/* ================= GROUP LISTEN ================= */
function openGroupSheet(){
  if(isBlockedOffline()) return;
  document.getElementById('groupIdleState').classList.toggle('hidden', groupActive);
  document.getElementById('groupActiveState').classList.toggle('hidden', !groupActive);
  if(groupActive) renderGroupParticipants();
  document.getElementById('groupBackdrop').classList.add('open');
  document.getElementById('groupSheet').classList.add('open');
}
function closeGroupSheet(){ document.getElementById('groupBackdrop').classList.remove('open'); document.getElementById('groupSheet').classList.remove('open'); }
function startGroupSession(){
  groupActive = true;
  groupParticipantIds = [];
  document.getElementById('sessionCodeLabel').textContent = 'BXMUSIC-' + Math.floor(1000+Math.random()*9000);
  document.getElementById('groupIdleState').classList.add('hidden');
  document.getElementById('groupActiveState').classList.remove('hidden');
  renderGroupParticipants();
  updateGroupBadge();
  showToast('Session started');
  clearInterval(groupTimer);
  let pool = friends.map(f=>f.id);
  groupTimer = setInterval(() => {
    if(!groupActive || !pool.length) return;
    const next = pool.splice(Math.floor(Math.random()*pool.length),1)[0];
    groupParticipantIds.push(next);
    renderGroupParticipants();
    updateGroupBadge();
    showToast(friends.find(f=>f.id===next).name + ' joined the session');
    if(document.getElementById('groupSheet').classList.contains('open')) renderGroupParticipants();
  }, 4000);
}
function endGroupSession(){
  groupActive = false;
  clearInterval(groupTimer); groupTimer=null;
  groupParticipantIds = [];
  document.getElementById('groupBadge').classList.add('hidden');
  closeGroupSheet();
  showToast('Session ended');
}
function renderGroupParticipants(){
  const el = document.getElementById('groupParticipants');
  if(!groupParticipantIds.length){ el.innerHTML = `<div style="color:var(--faint);font-size:12.5px;padding:6px 14px 14px;">Waiting for friends to join…</div>`; return; }
  el.innerHTML = `<div class="friend-strip" style="padding:0 14px 14px;">` + groupParticipantIds.map(id => {
    const idx = friends.findIndex(f=>f.id===id);
    return friendAvatarHTML(friends[idx], idx);
  }).join('') + `</div>`;
}
function updateGroupBadge(){
  const badge = document.getElementById('groupBadge');
  if(!groupActive || !groupParticipantIds.length){ badge.classList.add('hidden'); return; }
  badge.classList.remove('hidden');
  document.getElementById('groupCountLabel').textContent = 'Listening with ' + groupParticipantIds.length;
}

/* ================= SMART RECOMMENDATIONS ================= */
function updateBecauseSection(){
  if(listenHistory.length < 2) return;
  const counts = {};
  listenHistory.forEach(i => { const artist = tracks[i].artist; counts[artist] = (counts[artist]||0)+1; });
  const topArtist = Object.keys(counts).sort((a,b) => counts[b]-counts[a])[0];
  const picks = tracks.map((tr,i)=>({tr,i})).filter(x => x.tr.artist===topArtist && !listenHistory.slice(-3).includes(x.i));
  const finalPicks = picks.length ? picks : tracks.map((tr,i)=>({tr,i})).slice(0,4);
  document.getElementById('becauseTitle').textContent = 'Because you listened to ' + topArtist;
  document.getElementById('becauseStrip').innerHTML = finalPicks.map(x => `
    <div class="hcard" onclick='playTrack(${x.i},"Because you listened",true)'><div class="cover">${coverEl(x.i)}</div><div class="t">${x.tr.title}</div><div class="s">${x.tr.artist}</div></div>`).join('');
  document.getElementById('becauseSection').classList.remove('hidden');
}
function openTasteSheet(){
  document.getElementById('tasteChips').innerHTML = tasteMoods.map(m => `<div class="chip ${selectedMoods.has(m)?'active':''}" data-mood="${m}">${m}</div>`).join('');
  document.querySelectorAll('#tasteChips .chip').forEach(c => c.onclick = () => {
    const m = c.dataset.mood;
    if(selectedMoods.has(m)) selectedMoods.delete(m); else selectedMoods.add(m);
    c.classList.toggle('active');
  });
  document.getElementById('tasteBackdrop').classList.add('open');
  document.getElementById('tasteSheet').classList.add('open');
}
function closeTasteSheet(){ document.getElementById('tasteBackdrop').classList.remove('open'); document.getElementById('tasteSheet').classList.remove('open'); }
function generateRecommendations(){
  if(!selectedMoods.size){ showToast('Pick at least one mood'); return; }
  let picks = new Set();
  selectedMoods.forEach(m => (moodTrackMap[m]||[]).forEach(i => picks.add(i)));
  const finalPicks = [...picks].slice(0,6);
  document.getElementById('recommendedTitle').textContent = 'Picked for: ' + [...selectedMoods].join(', ');
  document.getElementById('recommendedStrip').innerHTML = finalPicks.map(i => `
    <div class="hcard" onclick='playTrack(${i},"Recommended for you",true)'><div class="cover">${coverEl(i)}</div><div class="t">${tracks[i].title}</div><div class="s">${tracks[i].artist}</div></div>`).join('');
  document.getElementById('recommendedSection').classList.remove('hidden');
  closeTasteSheet();
  showToast('Recommendations updated');
}

/* ================= NOTIFICATIONS ================= */
function updateNotifDot(){
  const hasUnread = notifications.some(n => !n.read);
  document.getElementById('notifDot').classList.toggle('hidden', !hasUnread);
  document.getElementById('notifDotSettings').classList.toggle('hidden', !hasUnread);
}
function openNotifications(){
  document.getElementById('notifList').innerHTML = notifications.map(n => `
    <div class="notif-item">
      <div class="notif-icon">${n.icon}</div>
      <div><div class="notif-text">${n.text}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
  notifications.forEach(n => n.read = true);
  updateNotifDot();
  document.getElementById('notifBackdrop').classList.add('open');
  document.getElementById('notifSheet').classList.add('open');
}
function closeNotifications(){ document.getElementById('notifBackdrop').classList.remove('open'); document.getElementById('notifSheet').classList.remove('open'); }

/* ================= STATS / WRAPPED ================= */
function openStats(){
  const plays = listenHistory.length;
  const unique = new Set(listenHistory).size;
  const minutes = Math.round(plays * 3.4);
  const trackCounts = {};
  listenHistory.forEach(i => { trackCounts[i] = (trackCounts[i]||0)+1; });
  let topTrackIdx = null, topTrackCount = 0;
  Object.keys(trackCounts).forEach(k => { if(trackCounts[k]>topTrackCount){ topTrackCount=trackCounts[k]; topTrackIdx=parseInt(k); } });
  const artistCounts = {};
  listenHistory.forEach(i => { const a = tracks[i].artist; artistCounts[a] = (artistCounts[a]||0)+1; });
  let topArtist = null, topArtistCount = 0;
  Object.keys(artistCounts).forEach(k => { if(artistCounts[k]>topArtistCount){ topArtistCount=artistCounts[k]; topArtist=k; } });
  document.getElementById('wrappedTopArtist').textContent = topArtist || '—';
  document.getElementById('wrappedTopArtistSub').textContent = topArtist ? (topArtistCount + ' plays this session') : 'Keep listening to find out';
  document.getElementById('wrappedPlays').textContent = plays;
  document.getElementById('wrappedMinutes').textContent = minutes;
  document.getElementById('wrappedUnique').textContent = unique;
  document.getElementById('wrappedTopTrack').textContent = topTrackIdx!==null ? tracks[topTrackIdx].title : '—';
  document.getElementById('statsBackdrop').classList.add('open');
  document.getElementById('statsSheet').classList.add('open');
}
function closeStats(){ document.getElementById('statsBackdrop').classList.remove('open'); document.getElementById('statsSheet').classList.remove('open'); }

/* ================= OFFLINE MODE ================= */
function isBlockedOffline(){
  if(offlineMode){ showToast(lang==='fa' ? 'در حالت آفلاین در دسترس نیست' : 'Not available offline'); return true; }
  return false;
}
function toggleOfflineMode(){
  offlineMode = !offlineMode;
  document.getElementById('offlineToggle').classList.toggle('on', offlineMode);
  document.getElementById('offlineBanner').classList.toggle('show', offlineMode);
  showToast(offlineMode ? (lang==='fa'?'حالت آفلاین روشن شد':'Offline mode on') : (lang==='fa'?'حالت آفلاین خاموش شد':'Offline mode off'));
  renderMadeForYou(); renderRecent();
  refreshActiveLists();
}

/* ================= COMMENTS ================= */
function openComments(i){
  currentCommentTrack = i;
  document.getElementById('commentsTitle').textContent = 'Comments — ' + tracks[i].title;
  renderComments();
  document.getElementById('commentsBackdrop').classList.add('open');
  document.getElementById('commentsSheet').classList.add('open');
}
function closeComments(){ document.getElementById('commentsBackdrop').classList.remove('open'); document.getElementById('commentsSheet').classList.remove('open'); }
function renderComments(){
  const list = comments[currentCommentTrack] || [];
  const el = document.getElementById('commentsList');
  el.innerHTML = list.length ? list.map(c => `
    <div class="comment-item">
      <div class="comment-avatar" style="background:${c.color}">${c.user[0]}</div>
      <div><div class="comment-name">${c.user}</div><div class="comment-text">${c.text}</div><div class="comment-time">${c.time}</div></div>
    </div>`).join('') : `<div style="color:var(--faint);font-size:13px;padding:20px 10px;text-align:center;">No comments yet — be the first</div>`;
}
function postComment(){
  const input = document.getElementById('commentInput');
  const text = input.value.trim();
  if(!text) return;
  if(!comments[currentCommentTrack]) comments[currentCommentTrack] = [];
  comments[currentCommentTrack].push({user: profile.name, color: profile.color || '#8b5cf6', text, time:'now'});
  input.value = '';
  renderComments();
}

/* ================= DRIVING MODE ================= */
function openDrivingMode(){
  const tr = tracks[currentTrack];
  document.getElementById('drivingCover').innerHTML = coverEl(currentTrack);
  document.getElementById('drivingTitle').textContent = tr.title;
  document.getElementById('drivingArtist').textContent = tr.artist;
  updatePlayIcons();
  document.getElementById('drivingMode').classList.add('open');
}
function closeDrivingMode(){ document.getElementById('drivingMode').classList.remove('open'); }

/* ================= PLAY HISTORY ================= */
function renderHistoryList(){
  const el = document.getElementById('historyList');
  el.innerHTML = playHistoryLog.length ? playHistoryLog.map(h => `
    <div class="hist-item" onclick='playTrack(${h.i},"History",true)'>
      <div class="hist-thumb">${coverEl(h.i)}</div>
      <div class="hist-meta"><div class="hist-title">${tracks[h.i].title}</div><div class="hist-sub">${tracks[h.i].artist}</div></div>
      <div class="hist-time">${h.time.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
    </div>`).join('') : `<div style="color:var(--faint);font-size:13px;padding:24px 4px;text-align:center;">${t('nothingPlayedYet')}</div>`;
}

/* ================= PERSONAL UPLOAD ================= */
function triggerUpload(){ document.getElementById('uploadInput').click(); }
function handleUpload(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const url = URL.createObjectURL(file);
  const title = file.name.replace(/\.[^/.]+$/, '');
  const newIndex = tracks.length;
  tracks.push({title:title, artist:'You', dur:'0:00', plays:'—', album:'My Uploads', lyrics:[], isUpload:true, audioUrl:url});
  downloads.add(newIndex);
  showToast('Added "'+title+'" to your library');
  evt.target.value = '';
  refreshActiveLists();
  playTrack(newIndex, 'My Uploads', true);
}

/* ================= INIT ================= */
setTheme('dark');
setLang('en');
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
