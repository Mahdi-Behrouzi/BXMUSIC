// js/data/data.js — centralized data exported for incremental refactor
// This module holds the demo data (tracks, artists, playlists, etc.) and
// is imported by js/app.js then applied to window so the legacy script
// can continue to use global variables while we migrate.

const tracks = [
  {
    title: "Khooneye Man",
    artist: "Koorosh x Arta",
    album: "Khooneye Man",
    lyrics: [],
    isUpload: true,
    audioUrl: "audio/Khooneye Man.mp3",
    cover: "images/IMG_20260818_154419_634.jpg"
  },
  { title: "Glass Horizon", artist: "Kairo Vale", dur: "3:32", plays: "9.7M", album: "Night Sirens", lyrics: ["Standing at the edge of what we knew","Every skyline bending back to you","Glass horizon, ca..."] },
  { title: "Static Bloom", artist: "Kairo Vale", dur: "3:34", plays: "4.5M", album: "Night Sirens", lyrics: ["Static in the wires, bloom of sound","Every heartbeat echoes underground","We were paper plan..."] },
  { title: "Low Tide Diaries", artist: "Kairo Vale", dur: "3:40", plays: "12.6M", album: "Night Sirens", lyrics: ["Wrote your name in sand before the wave","Low tide diaries, everything we save","Salt an..."] },
  { title: "Amber Radio", artist: "Kairo Vale", dur: "3:08", plays: "6.8M", album: "Night Sirens", lyrics: ["Turn the dial to amber, find the fade","Every station plays the choice we made","Amber radio, ..."] },
  { title: "Paper Cities", artist: "Nova Rey", dur: "3:20", plays: "8.1M", album: "Paper Cities", lyrics: ["Paper cities fold beneath the rain","Skylines drawn in pencil, wash away","We built these walls..."] },
  { title: "Halflight", artist: "Selene Marsh", dur: "3:57", plays: "5.3M", album: "Halflight", lyrics: ["Halflight on the water, dim and blue","I keep tracing shapes that look like you","Nothing's fully..."] },
  { title: "Solstice", artist: "Dax Holloway", dur: "3:15", plays: "3.9M", album: "Solstice", lyrics: ["Longest day, we chased the setting sun","Solstice calling, tell me we're not done","Shadows shrink ..."] },
  { title: "Analog Warmth", artist: "Wren Blackwood", dur: "2:58", plays: "2.1M", album: "Analog Warmth", lyrics: ["Vinyl crackle, honest and unclean","Analog warmth, the softest in-between","Nothing dig..."] }
];

const artists = {
  "Kairo Vale": { followers: "28.4M", tracks: [0,1,2,3,4] },
  "Nova Rey": { followers: "9.1M", tracks: [5] },
  "Selene Marsh": { followers: "6.4M", tracks: [6] },
  "Dax Holloway": { followers: "4.2M", tracks: [7] },
  "Wren Blackwood": { followers: "3.8M", tracks: [8] }
};

const builtinPlaylists = {
  "Daily Mix 1": [0,5,6,1,7],
  "Chill Vibes": [4,6,8,2],
  "Focus Flow": [8,4,2,6],
  "Liked Songs": [0,6,5],
  "Workout Mix": [1,3,7,0],
  "Late Night Drive": [6,4,8]
};

const madeForYou = [
  { name: "Daily Mix 1", sub: "Kairo Vale, Nova Rey and more", i: 0 },
  { name: "Chill Vibes", sub: "Relax and unwind", i: 4 },
  { name: "Focus Flow", sub: "Deep focus, no distractions", i: 2 }
];

const recent = [
  { name: "Night Sirens", i: 0 },{ name: "Halflight", i: 6 },{ name: "Paper Cities", i: 5 },
  { name: "Solstice", i: 7 },{ name: "Amber Radio", i: 4 },{ name: "Low Tide Diaries", i: 3 },{ name: "Static Bloom", i: 2 }
];

const genres = ["Mood","Workout","Chill","Focus","Party","Rock"];

const genreI18n = {
  en: { Mood: "Mood", Workout: "Workout", Chill: "Chill", Focus: "Focus", Party: "Party", Rock: "Rock" },
  fa: { Mood: "حس‌وحال", Workout: "ورزش", Chill: "آرامش", Focus: "تمرکز", Party: "مهمونی", Rock: "راک" }
};

const radioStations = ["Kairo Vale Radio","Late Night Frequencies","Deep Focus FM","Indie Reverie Radio"];

const podcasts = [
  { title: "Studio Notes", host: "Weekly interviews with producers", i: 1 },
  { title: "Low End Theory", host: "Deep dives into sound design", i: 3 },
  { title: "On Repeat", host: "New release breakdowns", i: 5 },
  { title: "The Mix Room", host: "Engineers talk craft", i: 7 }
];

const features = [
  { name: "Hi-Res Lossless", desc: "Studio-master streaming up to 24-bit — inspired by Tidal & Qobuz.", color: 'var(--hires)' },
  { name: "Spatial Audio", desc: "Immersive mixes on any headphones — inspired by Apple Music.", color: 'var(--spatial)' },
  { name: "Smart Playlists", desc: "Daily Mixes matched to your taste — inspired by Spotify.", color: 'var(--a1)' },
  { name: "Music Videos", desc: "Official videos & visualizers — inspired by YouTube Music.", color: '#f5b942' },
  { name: "Full Booklets", desc: "Liner notes & credits on every release — inspired by Qobuz.", color: '#f5567a' }
];

const friendColors = ['#8b5cf6','#ec4899','#34d1a0','#5cc8f2','#f5b942','#f97316'];
const friends = [
  { id: 'f1', name: 'Sina', status: 'Online' },
  { id: 'f2', name: 'Ava', status: 'Listening to Halflight' },
  { id: 'f3', name: 'Reza', status: 'Offline' },
  { id: 'f4', name: 'Niloofar', status: 'Online' },
  { id: 'f5', name: 'Kian', status: 'Offline' }
];

const devices = [
  { id: 'd1', name: 'This phone', icon: 'phone' },
  { id: 'd2', name: 'Living Room TV', icon: 'tv' },
  { id: 'd3', name: 'Kitchen Speaker', icon: 'speaker' },
  { id: 'd4', name: 'Bedroom Speaker', icon: 'speaker' }
];

const tasteMoods = ['Chill','Focus','Party','Rock','Indie','Electronic','Late night','Morning'];

const moodTrackMap = {
  'Chill': [4,6,8], 'Focus': [8,4,2], 'Party': [3,1,7], 'Rock': [1,0,3],
  'Indie': [5,6,8], 'Electronic': [2,4,8], 'Late night': [6,0,4], 'Morning': [7,5,3]
};

export default {
  tracks,
  artists,
  builtinPlaylists,
  madeForYou,
  recent,
  genres,
  genreI18n,
  radioStations,
  podcasts,
  features,
  friendColors,
  friends,
  devices,
  tasteMoods,
  moodTrackMap
};
