/* ================= DATA ================= */
const grads = [
  ['#8b5cf6','#2a1a4a'],['#ec4899','#3a1030'],['#34d1a0','#0e2b24'],['#5cc8f2','#0e2436'],
  ['#f5b942','#3a2a0e'],['#f5567a','#3a0e1c'],['#7c6ef2','#1c1a3a'],['#42d1c9','#0e2b2b'],
  ['#c026d3','#2a0e2b'],['#f97316','#3a1e0e']
];
function gradCSS(i){const g=grads[i%grads.length];return `linear-gradient(150deg, ${g[0]}55, ${g[1]} 75%)`;}
function coverEl(i){
  const tr = tracks[i];

  if(tr && tr.cover){
    return `<img src="${tr.cover}" alt="${tr.title}" style="width:100%;height:100%;object-fit:cover;">`;
  }

  return `<div style="width:100%;height:100%;background:${gradCSS(i)};position:relative;">
    <svg class="wave-sig" viewBox="0 0 100 100" preserveAspectRatio="none" style="position:absolute;inset:0;opacity:.55;">
      <path d="M0 55 Q15 30 30 55 T60 55 T90 55 T120 55"/>
      <path d="M0 68 Q15 48 30 68 T60 68 T90 68 T120 68" style="stroke:rgba(255,255,255,.28)"/>
    </svg>
  </div>`;
}
const tracks = [
  {
    title:"Khooneye Man",
    artist:"Koorosh x Arta",
    album:"Khooneye Man",
    lyrics:[],
    isUpload:true,
    audioUrl:"audio/Khooneye Man.mp3",
    cover:"images/IMG_20260818_154419_634.jpg"
  },
  {title:"Glass Horizon", artist:"Kairo Vale", dur:"3:32", plays:"9.7M", album:"Night Sirens", lyrics:["Standing at the edge of what we knew","Every skyline bending back to you","Glass horizon, ca[...]"},
  {title:"Static Bloom", artist:"Kairo Vale", dur:"3:34", plays:"4.5M", album:"Night Sirens", lyrics:["Static in the wires, bloom of sound","Every heartbeat echoes underground","We were paper plan[...]"},
  {title:"Low Tide Diaries", artist:"Kairo Vale", dur:"3:40", plays:"12.6M", album:"Night Sirens", lyrics:["Wrote your name in sand before the wave","Low tide diaries, everything we save","Salt an[...]"},
  {title:"Amber Radio", artist:"Kairo Vale", dur:"3:08", plays:"6.8M", album:"Night Sirens", lyrics:["Turn the dial to amber, find the fade","Every station plays the choice we made","Amber radio, [...]"]},
  {title:"Paper Cities", artist:"Nova Rey", dur:"3:20", plays:"8.1M", album:"Paper Cities", lyrics:["Paper cities fold beneath the rain","Skylines drawn in pencil, wash away","We built these walls[...]"},
  {title:"Halflight", artist:"Selene Marsh", dur:"3:57", plays:"5.3M", album:"Halflight", lyrics:["Halflight on the water, dim and blue","I keep tracing shapes that look like you","Nothing's fully[...]"},
  {title:"Solstice", artist:"Dax Holloway", dur:"3:15", plays:"3.9M", album:"Solstice", lyrics:["Longest day, we chased the setting sun","Solstice calling, tell me we're not done","Shadows shrink [...]"]},
  {title:"Analog Warmth", artist:"Wren Blackwood", dur:"2:58", plays:"2.1M", album:"Analog Warmth", lyrics:["Vinyl crackle, honest and unclean","Analog warmth, the softest in-between","Nothing dig[...]"}
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
  el.innerHTML = labels.map((l,i) => `<div class=", 