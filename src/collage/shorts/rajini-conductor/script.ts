// "Did you know?" Short, design v2 (marquee). Fresh hook: Jailer 2 (released 15 Oct 2026) and its box office;
// payoff: Rajinikanth was a Bangalore bus conductor before films (Wikipedia; The News Minute). See `sources`.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'rajini-conductor';
export const title = 'Jailer 2 के hero पहले bus conductor थे? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'tamil';
export const music = 'mass-entry';
// Real people are verb subjects (रजनीकांत कर रहे हैं / थे): singular masculine verbs are flagged (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Was the hero of Jailer 2 once a bus conductor?",
    text: "Jailer 2 के hero पहले bus conductor थे?",
    say: "जेलर टू के हीरो पहले बस कंडक्टर थे?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [2, 3],
    en: "Jailer 2 earned ₹477 crore worldwide in just five days.",
    text: "Jailer 2 ने सिर्फ़ 5 दिन में दुनिया भर से ₹477 करोड़ कमा लिए.",
    say: "जेलर टू ने सिर्फ़ पाँच दिन में दुनिया भर से चार सौ सतहत्तर करोड़ कमा लिए।",
    delivery: {emotion: 'excited'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0],
    en: "But before films, Rajinikanth's job was nowhere near cinema.",
    text: "पर films से पहले, Rajinikanth की नौकरी cinema से बहुत दूर थी.",
    say: "पर फ़िल्मों से पहले, रजनीकांत की नौकरी सिनेमा से बहुत दूर थी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'दूर', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "Yes! He was a bus conductor in Bangalore, cutting tickets every day.",
    text: "हाँ! वो Bangalore में bus conductor थे. रोज़ bus में tickets काटते थे.",
    say: "हाँ! वो बैंगलोर में बस कंडक्टर थे। रोज़ बस में टिकट काटते थे।",
    delivery: {emotion: 'proud', cues: [{word: 'conductor', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Jailer 2's hero... a bus conductor?",
    text: "Jailer 2 के hero... bus conductor?",
    say: "जेलर टू के हीरो... बस कंडक्टर?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Rajinikanth',
    note: 'Born Shivaji Rao Gaikwad, 12 Dec 1950, Bangalore. "getting a job in the Bangalore Transport Service as a bus conductor." Took "an acting course in the newly formed Madras Film Institute"; "he was noticed by the Tamil film director K. Balachander." Film career began with Apoorva Raagangal (1975). Career spans over five decades; predominantly Tamil cinema.',
  },
  {
    url: 'https://www.thenewsminute.com/karnataka/rajinikanth-makes-surprise-visit-bmtc-bus-depot-bengaluru-181672',
    note: 'The News Minute, 29 Aug 2023 (BMTC depot visit): "he worked as a bus conductor on route 10A, running between Majestic to Srinagar, before getting into acting." Confirms the Bangalore bus conductor job; the article names BMTC, not the older Bangalore Transport Service.',
  },
  {
    url: 'https://www.businesstoday.in/trending/box-office/story/jailer-2-day-5-collection-rajinikanth-film-races-towards-rs500-crore-worldwide-enters-us-weekend-top-10-562605-2026-10-20',
    note: 'Business Today, 20 Oct 2026: Jailer 2 released 15 Oct; after five days worldwide gross ₹477.75 crore (India gross ₹283.75 crore).',
  },
  {
    url: 'https://www.sacnilk.com/news/jailer-2-box-office-rajinikanths-sequel-crosses-500-crore-worldwide-in-record-6-days-becomes-fastest-tamil-movie-to-do',
    note: 'Sacnilk, 20 Oct 2026: five-day worldwide gross ₹477.75 crore; ₹500 crore+ counting day-6 advance bookings; "fastest Tamil film" to the mark.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  rajinikanth: 'रजनीकांत',
  films: 'फ़िल्में',
  tamil: 'तमिल',
  madras: 'मद्रास',
  institute: 'इंस्टिट्यूट',
  acting: 'एक्टिंग',
  bangalore: 'बैंगलोर',
  conductor: 'कंडक्टर',
  bus: 'बस',
  film: 'फ़िल्म',
  cinema: 'सिनेमा',
  decades: 'दशक',
  route: 'रूट',
  majestic: 'मैजेस्टिक',
  srinagar: 'श्रीनगर',
};

const RAJINI_PHOTO = {src: 'shorts/rajini-conductor/stills/hook.jpg', film: 'Rajinikanth', credit: 'Dani Charles, Silverscreen Media (CC BY-SA 3.0)', aspect: 1200 / 1800, focus: '50% 25%'};
const JAILER2 = {src: 'shorts/rajini-conductor/stills/jailer2.jpg', film: 'Jailer 2', year: 2026, credit: 'Sun Pictures', aspect: 2000 / 3000, focus: '50% 45%'};
const BMTC_BUS = {src: 'shorts/rajini-conductor/stills/bus.jpg', film: 'BMTC bus, Bangalore', year: 2014, credit: 'Ramesh NG / Flickr (CC BY-SA 2.0)', aspect: 3173 / 1833, focus: '50% 50%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Jailer 2 के hero\nbus conductor थे?',
    accent: ['conductor'],
    // Official poster, 2000×3000: sharp from the first frame.
    still: JAILER2,
  },
  facts: [
    {
      lines: ['f1'],
      headline: '5 दिन में\n₹477 करोड़',
      accent: ['₹477'],
      layout: 'ticket',
      ticket: {word: '₹477', title: 'JAILER 2', figure: '₹477 करोड़', sub: '5 दिन, worldwide gross'},
      still: JAILER2,
    },
    {
      lines: ['f2'],
      headline: 'पहली नौकरी\ncinema से दूर',
      accent: ['दूर'],
      layout: 'print',
      still: RAJINI_PHOTO,
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Bangalore में\nbus conductor',
    accent: ['conductor'],
    still: BMTC_BUS,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Jailer 2 के hero पहले bus conductor थे? #shorts',
  altTitles: [
    'Jailer 2: 5 दिन में ₹477 करोड़, और hero कभी bus conductor थे #shorts',
    'Rajinikanth की पहली job क्या थी? #shorts',
  ],
  description: `Jailer 2 (15 Oct 2026) ने पाँच दिन में worldwide ₹477.75 करोड़ gross कमाए (Business Today; Sacnilk, 20 Oct 2026). Rajinikanth (Shivaji Rao Gaikwad) films में आने से पहले Bangalore Transport Service में bus conductor थे (Wikipedia; The News Minute, 29 Aug 2023). Madras Film Institute में acting सीखते समय K. Balachander ने उन्हें देखा, और उनकी film debut Apoorva Raagangal (1975) थी (Wikipedia).

Sources:
Jailer 2 day 5 collection, Business Today, 20 Oct 2026 — https://www.businesstoday.in/trending/box-office/story/jailer-2-day-5-collection-rajinikanth-film-races-towards-rs500-crore-worldwide-enters-us-weekend-top-10-562605-2026-10-20
Jailer 2 crosses 500 crore worldwide, Sacnilk, 20 Oct 2026 — https://www.sacnilk.com/news/jailer-2-box-office-rajinikanths-sequel-crosses-500-crore-worldwide-in-record-6-days-becomes-fastest-tamil-movie-to-do
Rajinikanth, Wikipedia — https://en.wikipedia.org/wiki/Rajinikanth
Rajinikanth makes surprise visit to BMTC bus depot, The News Minute, 29 Aug 2023 — https://www.thenewsminute.com/karnataka/rajinikanth-makes-surprise-visit-bmtc-bus-depot-bengaluru-181672

Images:
Jailer 2 official poster, Sun Pictures (https://www.themoviedb.org/movie/1234139-2). Copyrighted; used as credited commentary on the film.
Rajinikanth at the Inauguration of MGR Statue, Dani Charles / Silverscreen Media, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Rajinikanth_at_the_Inauguration_of_MGR_Statue.jpg). CC BY-SA 3.0 (https://creativecommons.org/licenses/by-sa/3.0).
Bangalore BMTC BIG 10 Bus, Ramesh NG via Flickr and Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Bangalore_BMTC_BIG_10_Bus.jpg). CC BY-SA 2.0 (https://creativecommons.org/licenses/by-sa/2.0).

Movie Idiots.

#Jailer2 #Rajinikanth #Tamil #KollywoodTrivia #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'jailer 2', 'jailer 2 box office', 'rajinikanth', 'rajinikanth bus conductor', 'rajinikanth bangalore', 'madras film institute',
    'apoorva raagangal', 'k balachander', 'tamil cinema', 'hindi shorts', 'movie idiots',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (stylised original animation, not realistic)',
    audience: 'Not made for kids',
  },
};
