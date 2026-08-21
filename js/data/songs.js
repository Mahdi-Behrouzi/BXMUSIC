/*
 * BXMUSIC song catalog
 *
 * ADD NEW SONGS ONLY AT THE END of this list.
 * Keep the existing order because artists/playlists currently reference songs by index.
 *
 * Required: title, artist, album
 * Optional: dur, plays, lyrics, audioUrl, cover, isUpload
 *
 * Example:
 * {
 *   title:"My New Song",
 *   artist:"Artist Name",
 *   album:"Album Name",
 *   dur:"3:24",
 *   plays:"0",
 *   lyrics:[],
 *   audioUrl:"audio/My New Song.mp3",
 *   cover:"images/my-new-song.jpg"
 * },
 */
const tracks = window.BXMUSIC_SONGS = [
  {
    title:"Khooneye Man",
    artist:"Koorosh x Arta",
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

// Add stable IDs without changing the existing index-based relationships.
// The rest of the app can keep using numeric indexes for now.
tracks.forEach((tr, i) => {
  if (!tr.id) {
    const base = `${tr.artist}-${tr.title}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    tr.id = base || `track-${i + 1}`;
  }
  if (!Array.isArray(tr.lyrics)) tr.lyrics = [];
});

const _songIds = new Set();
tracks.forEach((tr, i) => {
  if (_songIds.has(tr.id)) console.warn(`[BXMUSIC] Duplicate song id at index ${i}: ${tr.id}`);
  _songIds.add(tr.id);
  if (!tr.title || !tr.artist || !tr.album) {
    console.warn(`[BXMUSIC] Incomplete song at index ${i}:`, tr);
  }
});

window.BXMUSIC_SONGS = tracks;
