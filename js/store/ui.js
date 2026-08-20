// BXMUSIC UI/application state
/* ================= STATE ================= */






let liked = false;
let following = false;
let currentArtist = "Kairo Vale";


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








