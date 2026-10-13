// Fun-facts Short, design v2 (lagoon). Batch 2 #3. Famous names in the first second (SRK).
// Facts re-read 13 Oct 2026, two sources each where they exist. Wording rules from that check:
// "पहली Hindi film" (not "पहली film"); "30 से ज़्यादा stars" (30 guests + SRK; sources say 30 or 31);
// no crore figures, no nomination count, no Red Chillies VFX award (Wikipedia only).
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'om-shanti-om';
export const title = 'SRK की Om Shanti Om के एक गाने में कितने stars थे? #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "How many stars were in one SRK song?",
    text: "SRK के एक गाने में कितने stars थे?",
    delivery: {emotion: 'curious', sfx: [{word: "stars", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'fact',
    source: [0, 1],
    en: "Om Shanti Om was Deepika Padukone's first Hindi film, and it won her Filmfare Best Female Debut.",
    text: "Om Shanti Om, Deepika Padukone की पहली Hindi film थी, और इसी से उन्हें Filmfare Best Female Debut मिला.",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [0, 2],
    en: "Even the title is borrowed: from Rishi Kapoor's song in Karz, 1980.",
    text: "Title भी उधार का है. ये 1980 की Karz में Rishi Kapoor के गाने से लिया गया था.",
    delivery: {emotion: 'conspiratorial'},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [1, 0],
    en: "Ranbir Kapoor's debut Saawariya released the same day. But Om Shanti Om became 2007's biggest Hindi hit.",
    text: "उसी दिन Ranbir Kapoor की पहली film Saawariya भी release हुई. पर 2007 की सबसे बड़ी Hindi hit बनी Om Shanti Om.",
    delivery: {emotion: 'impressed', cues: [{word: 'पर', tag: 'excited'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [3, 0],
    en: "And Deewangi Deewangi? More than 30 stars, along with SRK.",
    text: "और Deewangi Deewangi में? SRK के साथ 30 से ज़्यादा stars थे.",
    delivery: {cues: [{word: 'ज़्यादा', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So, one song of Om Shanti Om, how many stars? Count them again.",
    text: "तो Om Shanti Om के एक गाने में कितने stars? फिर से गिनिए.",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Om_Shanti_Om',
    note: 'Om Shanti Om (9 Nov 2007, Farah Khan). Deepika Padukone "in her Hindi film debut"; won Filmfare Best Female Debut (53rd Filmfare Awards). Title "borrowed from a song from Subhash Ghai\'s thriller Karz (1980)". "Highest grossing Hindi film of 2007". Lists 30 guest stars in "Deewangi Deewangi".',
  },
  {
    url: 'https://tribuneindia.com/news/when-deepika-padukone-beat-ranbir-kapoor-at-box-office',
    note: 'Tribune, 9 Nov 2024: Deepika\'s first Hindi release; clashed with Ranbir Kapoor\'s debut Saawariya on 9 Nov 2007; highest-grossing Hindi film of 2007; Saawariya a commercial failure.',
  },
  {
    url: 'https://scroll.in/reel/848700/scroll_in',
    note: 'Scroll (Nandini Ramnath), 4 Sep 2017: Rishi Kapoor performs "Om Shanti Om" in Karz (1980), Kishore Kumar\'s voice.',
  },
  {
    url: 'https://www.bollywoodhungama.com/news/features/15-years-om-shanti-om-inside-story-star-studded-song-deewangi-deewangi-shot-shah-rukh-khan-stood-gates-welcome-30-stars-wrote-personaliz/',
    note: 'Bollywood Hungama, 14 Nov 2022 (from Mushtaq Shaikh\'s book The Making of Om Shanti Om): "Deewangi Deewangi" featured "as many as 31 stars, including the lead actor Shah Rukh Khan". Headline says 30 stars.',
  },
];

export const lexicon: Record<string, string> = {
  srk: 'एसआरके',
  om: 'ओम',
  shanti: 'शांति',
  stars: 'स्टार्स',
  deepika: 'दीपिका',
  padukone: 'पादुकोण',
  hindi: 'हिंदी',
  film: 'फ़िल्म',
  filmfare: 'फ़िल्मफ़ेयर',
  best: 'बेस्ट',
  female: 'फ़ीमेल',
  debut: 'डेब्यू',
  title: 'टाइटल',
  karz: 'कर्ज़',
  rishi: 'ऋषि',
  kapoor: 'कपूर',
  ranbir: 'रणबीर',
  saawariya: 'सांवरिया',
  hit: 'हिट',
  deewangi: 'दीवानगी',
};

const OSHO = {film: 'Om Shanti Om', year: 2007, credit: 'Red Chillies Entertainment'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  // Lagoon: not used by any earlier upload.
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: 'एक गाने में\nकितने stars थे?',
    accent: ['stars'],
    still: {
      src: 'shorts/om-shanti-om/stills/osho-srk-deepika.jpg',
      ...OSHO,
      width: 920,
      aspect: 0.8,
      focus: '50% 30%',
    },
    react: {word: 'stars', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Deepika का\nDebut',
      accent: ['Debut'],
      layout: 'stack',
      still: {
        src: 'shorts/om-shanti-om/stills/deepika-portrait.jpg',
        film: 'Deepika Padukone',
        year: 2010,
        credit: 'Bollywood Hungama / Wikimedia Commons',
        // Seated full-length portrait: a wide crop from the top keeps head and shoulders.
        width: 920,
        aspect: 1.3,
        focus: '47% 8%',
      },
      cuts: [{word: 'Filmfare', src: 'shorts/om-shanti-om/stills/osho-srk-deepika.jpg', ...OSHO, width: 920, aspect: 1.2, focus: '52% 30%', replace: true}],
      pop: {word: 'Debut', text: 'BEST FEMALE DEBUT'},
    },
    {
      lines: ['f2'],
      headline: 'Title भी\nउधार का',
      accent: ['उधार'],
      layout: 'versus',
      versus: {
        top: {
          src: 'shorts/om-shanti-om/stills/karz-still.jpg',
          film: 'Karz',
          year: 1980,
          credit: 'Mukta Arts',
          width: 900,
          aspect: 1.6,
          focus: '35% 40%',
        },
        bottom: {
          word: '1980',
          src: 'shorts/om-shanti-om/stills/osho-srk-deepika.jpg',
          ...OSHO,
          width: 900,
          aspect: 1.6,
          focus: '50% 30%',
        },
        middle: '1980 → 2007',
      },
    },
    {
      lines: ['f3'],
      headline: 'Saawariya से\nटक्कर',
      accent: ['Saawariya'],
      layout: 'ticket',
      ticket: {word: '2007', title: 'Om Shanti Om', figure: '#1', sub: '2007 की सबसे बड़ी Hindi hit'},
      still: {
        src: 'shorts/om-shanti-om/stills/osho-poster.jpg',
        ...OSHO,
        width: 760,
        aspect: 0.8,
        focus: '50% 25%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Deewangi:\n30+ stars',
    accent: ['30+'],
    still: {
      src: 'shorts/om-shanti-om/stills/osho-deewangi-1.jpg',
      ...OSHO,
      aspect: 620 / 450,
      focus: '50% 30%',
    },
    cuts: [
      {
        word: 'SRK',
        src: 'shorts/om-shanti-om/stills/osho-deewangi-2.jpg',
        ...OSHO,
        aspect: 620 / 450,
        focus: '55% 35%',
      },
      {
        // Rekha only: the T-Series title text sits on the left of this frame.
        word: 'stars',
        src: 'shorts/om-shanti-om/stills/osho-deewangi-3.jpg',
        film: 'Om Shanti Om',
        year: 2007,
        credit: 'T-Series / Red Chillies Entertainment',
        aspect: 0.7,
        focus: '100% 40%',
      },
    ],
    pop: {word: '30', text: '30+ STARS'},
    react: {word: 'ज़्यादा', expression: 'shock', pose: 'shrug'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'SRK की Om Shanti Om के एक गाने में कितने stars थे? #shorts',
  altTitles: [
    'Deewangi Deewangi: एक गाना, 30 से ज़्यादा stars #shorts',
    'Om Shanti Om vs Saawariya: एक ही दिन release #shorts',
  ],
  description: `Om Shanti Om (2007) के "Deewangi Deewangi" में SRK के साथ 30 से ज़्यादा stars थे.

Published reports पर आधारित commentary.

Deepika Padukone की पहली Hindi film; Filmfare Best Female Debut (53rd Filmfare Awards).
Title Subhash Ghai की Karz (1980) के गाने "Om Shanti Om" से, जिसमें Rishi Kapoor थे.
9 Nov 2007: Ranbir Kapoor की debut film Saawariya के साथ same-day release; Om Shanti Om 2007 की सबसे बड़ी Hindi hit बनी.
"Deewangi Deewangi": Wikipedia 30 guest stars list करती है; Bollywood Hungama (Mushtaq Shaikh की book से) SRK समेत 31 stars बताता है.

Film stills और posters copyrighted publicity images हैं, commentary support के लिए थोड़ी देर इस्तेमाल हुए. Portraits Creative Commons (CC BY 3.0, Bollywood Hungama) हैं. Credits नीचे.

Sources:
Om Shanti Om, Wikipedia: https://en.wikipedia.org/wiki/Om_Shanti_Om
Tribune, 9 Nov 2024: https://tribuneindia.com/news/when-deepika-padukone-beat-ranbir-kapoor-at-box-office
Scroll, 4 Sep 2017: https://scroll.in/reel/848700/scroll_in
Bollywood Hungama, 14 Nov 2022: https://www.bollywoodhungama.com/news/features/15-years-om-shanti-om-inside-story-star-studded-song-deewangi-deewangi-shot-shah-rukh-khan-stood-gates-welcome-30-stars-wrote-personaliz/

Movie Idiots.

#OmShantiOm #ShahRukhKhan #DeepikaPadukone #DeewangiDeewangi #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'om shanti om', 'shah rukh khan', 'srk', 'deepika padukone', 'deewangi deewangi', 'farah khan',
    'karz', 'rishi kapoor', 'saawariya', 'bollywood trivia', 'hindi shorts', 'movie idiots',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real publicity stills and photos with a stylised mascot, not realistic)',
    audience: 'Not made for kids',
  },
};
