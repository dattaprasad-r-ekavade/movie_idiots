// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still fearless-nadia --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'fearless-nadia';
export const title = '1935 की action star Perth की लड़की थी #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "The biggest action star of 1935 was a girl from Perth.",
    text: "1935 की सबसे बड़ी action star, Perth की लड़की थी.",
    delivery: {sfx: [{word: "Perth", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "A whip, a cape, and her own stunts. Distributors still said no.",
    text: "Whip, cape, और अपने खुद के Stunts. पर Distributors ने film लेने से मना कर दिया.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "Hunterwali, 1935. A masked heroine with a whip, a vigilante.",
    text: "Hunterwali, 1935. एक masked heroine, हाथ में whip, एक vigilante.",
    delivery: {sfx: [{word: "Hunterwali", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: "Distributors refused it. The Wadia brothers released it themselves, and it played to full houses.",
    text: "Distributors ने मना कर दिया. फिर Wadia brothers ने खुद release किया, और theatres houseful चले.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: [0, 1],
    en: "She came from the circus. In her screen test she was asked if she could lift a man. She did her own stunts.",
    text: "वो circus से आई थीं. Screen test में पूछा गया, क्या आदमी उठा सकती हो? और Stunts उन्होंने खुद किए.",
    delivery: {sfx: [{word: "Stunts", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 2],
    en: "Her real name was Mary Ann Evans. On screen she was Fearless Nadia. Her films are being restored now.",
    text: "असली नाम Mary Ann Evans था. Screen पे वो Fearless Nadia थीं. उनकी films अब restore हो रही हैं.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So the action star was a girl from Perth?",
    text: "तो action star Perth की एक लड़की थी?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Fearless_Nadia',
    note: 'Mary Ann Evans, born Perth, Western Australia, 8 January 1908. Stage name Fearless Nadia. Hunterwali (1935) is the film she is most remembered for; one of the earliest female-led Indian films. Own stunts. Married Homi Wadia in 1961.',
  },
  {
    url: 'https://www.bbc.com/news/world-asia-india-68271363',
    note: 'BBC (18 Feb 2024): Hunterwali distributors pulled out; Wadia brothers released it themselves; houseful for weeks. Catchphrase “hey-y-y”. BBC: perhaps the first foreigner to attain cult status in Bollywood.',
  },
  {
    url: 'https://www.indianlink.com.au/saving-fearless-nadia-maitri-grants-to-the-rescue/',
    note: 'Indian Link (5 Aug 2026): NFSA + Film Heritage Foundation Maitri grant to restore Hunterwali (1935), Miss Frontier Mail (1936) and Diamond Queen (1940). Re-check status at production time.',
  },
];

export const lexicon: Record<string, string> = {
  perth: 'पर्थ',
  whip: 'व्हिप',
  cape: 'केप',
  distributors: 'डिस्ट्रिब्यूटर्स',
  hunterwali: 'हंटरवाली',
  masked: 'मास्क्ड',
  princess: 'प्रिंसेस',
  vigilante: 'विजिलैंटी',
  wadia: 'वाडिया',
  houseful: 'हाउसफ़ुल',
  circus: 'सर्कस',
  screen: 'स्क्रीन',
  test: 'टेस्ट',
  mary: 'मेरी',
  ann: 'ऐन',
  evans: 'एवंस',
  fearless: 'फ़ियरलेस',
  nadia: 'नादिया',
  restore: 'रिस्टोर',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Action star\nPerth से',
    accent: ['Perth'],
    still: {
      src: 'shorts/fearless-nadia/stills/poster.jpg',
      film: 'Hunterwali',
      year: 1935,
      credit: 'Wadia Movietone',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Hunterwali\n1935',
      accent: ['1935'],
      still: {
        src: 'shorts/fearless-nadia/stills/whip.jpg',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        focus: '50% 40%',
      },
      pop: {word: 'Hunterwali', text: 'HUNTERWALI'},
    },
    {
      lines: ['f2'],
      headline: 'Distributors\nनहीं',
      accent: ['नहीं'],
      still: {
        src: 'shorts/fearless-nadia/stills/still.jpg',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        focus: '50% 30%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Own stunts\nCircus से',
      accent: ['stunts'],
      still: {
        src: 'shorts/fearless-nadia/stills/brochure.png',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        focus: '50% 28%',
      },
      pop: {word: 'Stunts', text: 'OWN STUNTS'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Mary Ann Evans\nFearless Nadia',
    accent: ['Nadia'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: '1935 की action star Perth की लड़की थी #shorts',
  altTitles: [
    'Fearless Nadia: Hunterwali Australian थी #shorts',
    'Mary Ann Evans, whip वाली Hindi superstar #shorts',
  ],
  description: `1935 की सबसे बड़ी action star Perth से आई — Mary Ann Evans, screen पे Fearless Nadia.

Hunterwali (1935) — masked princess, whip, own stunts
Distributors refused a blonde heroine; Wadia Movietone released it; houseful
Circus → screen test ("can you lift a man?")
NFSA + Film Heritage Foundation restoring Hunterwali, Miss Frontier Mail, Diamond Queen (re-check at upload)

Stills from Wikimedia Commons. Public domain in India (published before 1 January 1966). Credited on screen.

Stills:
Hunterwali poster, action still, 1936 brochure, whip two-shot — Wadia Movietone / NFAI Great Indian Film Hunt

Sources:
Fearless Nadia — https://en.wikipedia.org/wiki/Fearless_Nadia
BBC — https://www.bbc.com/news/world-asia-india-68271363
Restoration, Indian Link — https://www.indianlink.com.au/saving-fearless-nadia-maitri-grants-to-the-rescue/

Movie Idiots.

#FearlessNadia #Hunterwali #IndianCinema #HindiShorts #MovieIdiots`,
  tags: [
    'fearless nadia', 'hunterwali', 'wadia movietone', 'indian cinema',
    'hindi shorts', 'movie idiots', 'stuntwoman',
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
