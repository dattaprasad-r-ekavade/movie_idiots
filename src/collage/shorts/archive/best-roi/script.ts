// Fun-facts Short, design v2 (newsprint). Batch 3 #4 (`best-roi` in docs/shorts-ideas.md).
// Money only: budget vs worldwide gross for Kantara (2022). Manjummel Boys and The Kashmir Files left out
// (one budget source for Manjummel; The Kashmir Files is politically charged). The song court case is in
// another Short and is not mentioned here.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'best-roi';
export const title = 'Kantara ₹16 करोड़ में बनी, कितना कमाया? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'spring-dream';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Kantara was made for ₹16 crore. How much did it earn?",
    text: "Kantara ₹16 करोड़ में बनी, कितना कमाया?",
    say: "कांतारा सोलह करोड़ में बनी, कितना कमाया?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 3],
    en: "Rishab Shetty wrote and directed this Kannada film, and played the lead himself.",
    text: "ये Kannada film Rishab Shetty ने लिखी, direct की, और lead role भी खुद किया.",
    say: "ये कन्नड़ फ़िल्म ऋषभ शेट्टी ने लिखी, डायरेक्ट की, और लीड रोल भी ख़ुद किया।",
    delivery: {emotion: 'warm'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 4, 5],
    en: "But at first it released only in Kannada. The Hindi version came two weeks later, once the rest of India started talking.",
    text: "पर पहले ये सिर्फ़ Kannada में release हुई. Hindi version दो हफ़्ते बाद आया, जब बाक़ी states में भी चर्चा होने लगी.",
    say: "पर पहले ये सिर्फ़ कन्नड़ में रिलीज़ हुई। हिंदी वर्ज़न दो हफ़्ते बाद आया, जब बाक़ी स्टेट्स में भी चर्चा होने लगी।",
    delivery: {emotion: 'storytelling', cues: [{word: 'सिर्फ़', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2],
    en: "Worldwide, it crossed ₹400 crore. That is about 25 times the budget.",
    text: "Worldwide कमाई ₹400 करोड़ से ज़्यादा रही. यानी budget का करीब 25 गुना.",
    say: "वर्ल्डवाइड कमाई चार सौ करोड़ से ज़्यादा रही। यानी बजट का करीब पच्चीस गुना।",
    delivery: {emotion: 'proud'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Made for ₹16 crore. How much did it earn?",
    text: "₹16 करोड़ में बनी... कितना कमाया?",
    say: "सोलह करोड़ में बनी... कितना कमाया?",
    delivery: {emotion: 'playful'},
  },
];

export const honorific = false;

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Kantara_(2022_film)',
    note: 'Infobox: budget ₹16 crore (citing Deccan Herald); Kannada; released 30 Sep 2022; directed by and written by Rishab Shetty, who also starred; box office infobox ₹400–450 crore (footnote: ₹400 crore from India Today and TOI, ₹450 crore from others). Body: "crosses the 400 crore mark in 53 days" (Zee News, 22 Nov 2022).',
  },
  {
    url: 'https://sacnilk.com/tag/Kantara_2022',
    note: 'Budget ₹16.00 Cr; worldwide gross ₹407.82 Cr (trade data; Sacnilk says figures can differ from producer figures).',
  },
  {
    url: 'https://filmibeat.com/kannada/news/2022/rishab-shetty-s-kantara-becomes-the-higest-grosser-in-karnataka-enters-rs-400-crore-club-343618.html',
    note: 'Filmibeat, 30 Nov 2022: "Kantara has clocked Rs 400 Crore mark at the global box office"; Wikipedia figure ~Rs 406.75 crore as on 30 Nov; "decent budget of Rs 16 Crore".',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Rishab_Shetty',
    note: 'Career section: Kantara is the film in which he "also starred as the lead" for his next directorial with Hombale Films.',
  },
  {
    url: 'https://t2online.in/screen/south-indian/after-creating-waves-in-the-south-kantara-releases-in-hindi-on-october-14/139641',
    note: 'T2 Online, 12 Oct 2022 (headline): "Kantara releases in Hindi on October 14". Wikipedia: Kannada 30 Sep 2022 in 250+ theatres across Karnataka; Hindi 14 Oct, Telugu/Tamil 15 Oct.',
  },
  {
    url: 'https://www.businesstoday.in/amp/trending/box-office/story/kantara-box-office-collection-rishab-shetty-starrer-refuses-to-slow-down-on-day-5-350301-2022-10-19',
    note: 'Business Today, 19 Oct 2022: Taran Adarsh: Hindi version "raked in Rs 11.15 crore ... within just five days"; holds "due to extremely positive word of mouth".',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  kantara: 'कांतारा',
  kannada: 'कन्नड़',
  rishab: 'रिषभ',
  shetty: 'शेट्टी',
  budget: 'बजट',
  worldwide: 'वर्ल्डवाइड',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: 'Kantara ने\nकितना कमाया?',
    accent: ['कमाया'],
    still: {
      src: 'shorts/best-roi/stills/kantara-poster.jpg',
      film: 'Kantara',
      year: 2022,
      credit: 'Theatrical poster, via Wikipedia',
      aspect: 264 / 378,
      focus: '50% 30%',
    },
    react: {word: 'कितना', expression: 'shock', pose: 'shrug'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Rishab Shetty ने\nलिखी, direct की',
      accent: ['Rishab'],
      layout: 'stack',
      still: {
        src: 'shorts/best-roi/stills/kantara-poster.jpg',
        film: 'Kantara',
        year: 2022,
        credit: 'Theatrical poster, via Wikipedia',
        aspect: 264 / 378,
        focus: '50% 30%',
      },
      cuts: [{
        word: 'direct',
        src: 'shorts/best-roi/stills/rishab-portrait.jpg',
        film: 'Rishab Shetty',
        credit: 'Rudhra Varma / Flickr (CC BY-SA 4.0)',
        aspect: 2 / 3,
        focus: '50% 25%',
        offset: [260, 40],
        tilt: -4,
      }],
    },
    {
      lines: ['f2'],
      headline: 'पहले सिर्फ़\nKannada में आई',
      accent: ['Kannada'],
      layout: 'ticket',
      ticket: {word: 'Hindi', title: 'Kantara · Hindi', figure: '+2 हफ़्ते', sub: 'Kannada 30 Sep → Hindi 14 Oct 2022'},
      still: {
        src: 'shorts/best-roi/stills/rishab-portrait.jpg',
        film: 'Rishab Shetty',
        credit: 'Rudhra Varma / Flickr (CC BY-SA 4.0)',
        aspect: 2 / 3,
        focus: '50% 25%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '16 करोड़ का\n25 गुना कमाया',
    accent: ['25'],
    still: {
      src: 'shorts/best-roi/stills/kantara-poster.jpg',
      film: 'Kantara',
      year: 2022,
      credit: 'Theatrical poster, via Wikipedia',
      aspect: 264 / 378,
      focus: '50% 30%',
    },
    react: {word: 'Worldwide', expression: 'happy', pose: 'thumbsUp'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Kantara ₹16 करोड़ में बनी, कितना कमाया? #shorts',
  altTitles: [
    'Kantara: ₹16 करोड़ का budget, ₹400 करोड़ से ज़्यादा की कमाई #shorts',
    'एक Kannada film जिसने budget का 25 गुना कमाया #shorts',
  ],
  description: `Kantara (2022) को budget ₹16 करोड़ में बनाया गया था. Worldwide कमाई ₹400 करोड़ से ज़्यादा रही, यानी budget का करीब 25 गुना.

Budget ₹16 crore (Sacnilk; Wikipedia citing Deccan Herald). Worldwide gross ₹407.82 crore (Sacnilk; trade data, figures can differ from producer numbers). Wikipedia puts the gross at ₹400–450 crore. Box-office figures are press and trade estimates.
पहले film सिर्फ़ Kannada में आई (30 Sep 2022); Hindi version 14 Oct 2022 को आया, और word of mouth से चला (Wikipedia; T2 Online; Business Today).

Sources:
Kantara (2022) on Wikipedia — https://en.wikipedia.org/wiki/Kantara_(2022_film)
Kantara box office, Sacnilk — https://sacnilk.com/tag/Kantara_2022
Kantara enters Rs 400 crore club, Filmibeat, 30 Nov 2022 — https://filmibeat.com/kannada/news/2022/rishab-shetty-s-kantara-becomes-the-higest-grosser-in-karnataka-enters-rs-400-crore-club-343618.html
Rishab Shetty on Wikipedia — https://en.wikipedia.org/wiki/Rishab_Shetty
Kantara releases in Hindi on October 14, T2 Online, 12 Oct 2022 — https://t2online.in/screen/south-indian/after-creating-waves-in-the-south-kantara-releases-in-hindi-on-october-14/139641
Hindi version box office and word of mouth, Business Today, 19 Oct 2022 — https://www.businesstoday.in/amp/trending/box-office/story/kantara-box-office-collection-rishab-shetty-starrer-refuses-to-slow-down-on-day-5-350301-2022-10-19

Images:
Kantara theatrical release poster, via Wikipedia (https://en.wikipedia.org/wiki/File:Kantara_poster.jpeg). Copyrighted; used as credited commentary on the film's box office.
Rishab Shetty portrait by Rudhra Varma, Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Rishab_Shetty.jpg), CC BY-SA 4.0.

Movie Idiots.

#Kantara #RishabShetty #BoxOffice #KannadaCinema #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'kantara', 'kantara 2022', 'rishab shetty', 'kantara box office', 'kannada film', 'budget vs box office',
    'south indian cinema', 'hindi shorts', 'movie idiots',
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
