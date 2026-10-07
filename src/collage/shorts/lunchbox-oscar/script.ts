// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still lunchbox-oscar --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'lunchbox-oscar';
export const title = 'Cannes hit film India ने Oscars पे नहीं भेजी #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    text: 'Cannes hit film India ने Oscars पे नहीं भेजी?',
    delivery: {rate: 16, sfx: [{word: 'Oscars', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    text: 'Sony Classics तक ले गई, फिर भी।',
    delivery: {rate: 16},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    text: '2013, The Lunchbox. Cannes Critics Week. Standing ovation।',
    delivery: {rate: 16, sfx: [{word: 'Cannes', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    text: 'Sony Pictures Classics ने North America rights ले लिए।',
    delivery: {rate: 16},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [2, 3],
    text: 'India की jury ने Gujarati film The Good Road चुनी।',
    delivery: {rate: 16, sfx: [{word: 'Road', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3r',
    role: 'reveal',
    text: 'Ghose ने कहा, Lunchbox उनकी personal first थी।',
    delivery: {rate: 16},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    text: 'The Good Road nominated नहीं हुई। Lunchbox Oscars पे गई ही नहीं।',
    delivery: {rate: 18},
  },
  {
    id: 'loop',
    role: 'loop',
    text: 'Oscars पे नहीं भेजी?',
    delivery: {rate: 16},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/The_Lunchbox_(film)',
    note: 'The Lunchbox screened in Critics’ Week at Cannes 2013; standing ovation reported; won the Critics’ Week Viewers Choice Award (Grand Rail d’Or).',
  },
  {
    url: 'https://variety.com/2013/film/news/sony-pictures-classics-picks-up-lunchbox-exclusive-1200487504/',
    note: 'Variety (24 May 2013): Sony Pictures Classics acquired all North American rights after Cannes Critics’ Week.',
  },
  {
    url: 'https://variety.com/2013/film/awards/india-makes-surprise-oscar-choice-1200656684/',
    note: 'Variety (21 Sep 2013): Film Federation of India selected The Good Road over The Lunchbox as the official Oscar entry.',
  },
  {
    url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/the-lunchbox-was-my-oscar-choice-ghose/articleshow/23046768.cms',
    note: 'TOI (25 Sep 2013): jury chair Goutam Ghose said The Lunchbox was on top of his personal list; a 16-member panel chose The Good Road. Later clarification: collective choice, not a chairman veto.',
  },
];

export const lexicon: Record<string, string> = {
  cannes: 'कान',
  oscars: 'ऑस्कर्स',
  sony: 'सोनी',
  classics: 'क्लासिक्स',
  lunchbox: 'लंचबॉक्स',
  critics: 'क्रिटिक्स',
  week: 'वीक',
  standing: 'स्टैंडिंग',
  ovation: 'ओवेशन',
  pictures: 'पिक्चर्स',
  north: 'नॉर्थ',
  america: 'अमेरिका',
  rights: 'राइट्स',
  jury: 'जूरी',
  gujarati: 'गुजराती',
  good: 'गुड',
  road: 'रोड',
  ghose: 'घोष',
  personal: 'पर्सनल',
  nominated: 'नॉमिनेटेड',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Oscars पे\nभेजी नहीं',
    accent: ['Oscars'],
    still: {
      src: 'shorts/lunchbox-oscar/stills/pair.jpg',
      film: 'The Lunchbox',
      year: 2013,
      credit: 'Sikhya Entertainment',
      focus: '50% 40%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Cannes 2013\nCritics Week',
      accent: ['Cannes'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/irrfan.jpg',
        film: 'The Lunchbox',
        year: 2013,
        credit: 'Sikhya Entertainment',
        focus: '50% 40%',
      },
      pop: {word: 'Cannes', text: 'CANNES'},
    },
    {
      lines: ['f2'],
      headline: 'Sony Classics\nNorth America',
      accent: ['Sony'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/nimrat.jpg',
        film: 'The Lunchbox',
        year: 2013,
        credit: 'Sikhya Entertainment',
        focus: '50% 40%',
      },
    },
    {
      lines: ['f3', 'f3r'],
      headline: 'Entry:\nThe Good Road',
      accent: ['Road'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/good-road.jpg',
        film: 'The Good Road',
        year: 2013,
        credit: 'NFDC',
        focus: '50% 30%',
      },
      pop: {word: 'Road', text: 'GOOD ROAD'},
      reveal: {line: 'f3r', headline: 'Ghose: personal first', accent: ['first']},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Nominated\nनहीं हुई',
    accent: ['नहीं'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Cannes hit film India ने Oscars पे नहीं भेजी #shorts',
  altTitles: [
    'The Lunchbox Oscars पे क्यों नहीं गई? #shorts',
    'The Good Road vs The Lunchbox: 2013 Oscar entry #shorts',
  ],
  description: `The Lunchbox Cannes hit थी, Sony Classics तक गई — India ने Oscars पे The Good Road भेजी.

The Good Road को नीचा नहीं दिखाना. Joke process का है, film का नहीं.

2013 The Lunchbox — Cannes Critics' Week, standing ovation, Grand Rail d'Or
Sony Pictures Classics — North America rights
FFI 16-member jury — The Good Road as official entry; Ghose later said Lunchbox was his personal first
The Good Road was not nominated

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
The Lunchbox — Sikhya Entertainment / Indian Express / Filmfare
The Good Road — NFDC

Sources:
The Lunchbox — https://en.wikipedia.org/wiki/The_Lunchbox_(film)
Sony Classics, Variety — https://variety.com/2013/film/news/sony-pictures-classics-picks-up-lunchbox-exclusive-1200487504/
India Oscar choice, Variety — https://variety.com/2013/film/awards/india-makes-surprise-oscar-choice-1200656684/
Ghose, TOI — https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/the-lunchbox-was-my-oscar-choice-ghose/articleshow/23046768.cms

Movie Idiots.

#TheLunchbox #Oscars #IrrfanKhan #TheGoodRoad #HindiShorts #MovieIdiots`,
  tags: [
    'the lunchbox', 'irrfan khan', 'oscars', 'the good road', 'cannes',
    'ritesh batra', 'hindi shorts', 'movie idiots',
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
