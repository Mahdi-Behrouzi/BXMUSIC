// BXMUSIC playlist and discovery data
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
  {name:"Night Sirens", i:1},{name:"Halflight", i:6},{name:"Paper Cities", i:5},
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

const tasteMoods = ['Chill','Focus','Party','Rock','Indie','Electronic','Late night','Morning'];
const moodTrackMap = {
  'Chill':[4,6,8], 'Focus':[8,4,2], 'Party':[3,1,7], 'Rock':[1,0,3],
  'Indie':[5,6,8], 'Electronic':[2,4,8], 'Late night':[6,0,4], 'Morning':[7,5,3],
};
