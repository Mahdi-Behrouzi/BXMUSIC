// BXMUSIC shared helpers
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
