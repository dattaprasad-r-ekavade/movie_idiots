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
    en: "The biggest female star of the 1930s was a girl from Perth?",
    text: "1930s की सबसे बड़ी female star, Perth की लड़की थी?",
    delivery: {sfx: [{word: "Perth", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "And for her stunts, there was no body double.",
    text: "और उनके stunts के लिए कोई body double नहीं था.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: [0, 1],
    en: "Hunterwali, 1935. She played a princess who becomes a masked vigilante to avenge her father.",
    text: "Hunterwali, 1935. इसमें वो एक princess बनीं, जो पिता का बदला लेने के लिए masked vigilante बन जाती है.",
    delivery: {sfx: [{word: "Hunterwali", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: "A heroine with a whip horrified the financiers, and they pulled out. The Wadia brothers released it themselves, and it ran houseful for weeks.",
    text: "Whip वाली heroine देखकर financiers पीछे हट गए. तो Wadia brothers ने film खुद release की, और ये हफ़्तों houseful चली.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    en: "She came from the circus. Roy Wadia says she swung from chandeliers and jumped thirty feet from a roof, and did every stunt herself.",
    text: "वो circus से आई थीं. Roy Wadia कहते हैं, chandelier पर झूलना, छत से तीस फ़ुट की छलांग, सारे Stunts उन्होंने खुद किए.",
    delivery: {sfx: [{word: "Stunts", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 2],
    en: "Her real name was Mary Ann Evans. On screen she was Fearless Nadia. Now Australia and India are restoring her films together.",
    text: "असली नाम Mary Ann Evans था. Screen पर वो Fearless Nadia थीं. और अब Australia और India मिलकर उनकी films restore कर रहे हैं.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So the biggest female star of the 1930s was a girl from Perth?",
    text: "तो 1930s की सबसे बड़ी female star, Perth की लड़की थी?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Fearless_Nadia',
    note: 'Mary Ann Evans, born Perth, Western Australia, 8 January 1908. Stage name Fearless Nadia. Hunterwali (1935) is the film she is most remembered for; one of the earliest female-led Indian films. Own stunts. Married Homi Wadia in 1961.',
  },
  {
    url: 'https://www.bbc.com/news/world-asia-india-68271363',
    note: 'BBC (18 Feb 2024): per Rosie Thomas, born Perth 1908; theatre and circus before JBH Wadia cast her; top box-office female star of the 1930s and 1940s. Roy Wadia: financiers horrified by a whip-carrying heroine and pulled out; Wadia brothers released Hunterwali themselves; houseful for weeks; chandeliers, 30 ft roof jump, all stunts herself, no body doubles. Hunterwali: avenging princess turned masked vigilante.',
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
  mascot: false,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    // Sharp from frame 0: the masked heroine is the hook.
    blur: 0,
    headline: '1930s की star\nPerth से',
    accent: ['Perth'],
    still: {
      src: 'shorts/fearless-nadia/stills/nadia-brochure-cover-hd.jpg',
      film: 'Hunterwali',
      year: 1935,
      credit: 'Wadia Movietone',
      width: 545,
      aspect: 0.85,
      focus: '50% 30%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Hunterwali\n1935',
      accent: ['1935'],
      still: {
        src: 'shorts/fearless-nadia/stills/poster.jpg',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        width: 545,
        aspect: 0.85,
        focus: '50% 18%',
      },
      pop: {word: 'Hunterwali', text: 'HUNTERWALI'},
    },
    {
      lines: ['f2'],
      headline: 'Financiers\nपीछे हटे',
      accent: ['Financiers'],
      still: {
        src: 'shorts/fearless-nadia/stills/brochure.png',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        width: 545,
        aspect: 0.85,
        focus: '50% 35%',
      },
      // The release half of the line gets its own picture: the 1936 brochure art.
      cuts: [{
        word: 'Wadia',
        src: 'shorts/fearless-nadia/stills/nadia-brochure-page-b.png',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        width: 545,
        aspect: 0.85,
        focus: '50% 18%',
        replace: true,
      }],
    },
    {
      lines: ['f3'],
      headline: 'No body double\nCircus से',
      accent: ['double'],
      still: {
        src: 'shorts/fearless-nadia/stills/still.jpg',
        film: 'Hunterwali',
        year: 1935,
        credit: 'Wadia Movietone',
        width: 545,
        aspect: 0.85,
        focus: '50% 40%',
      },
      pop: {word: 'Stunts', text: 'OWN STUNTS'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Mary Ann Evans\nFearless Nadia',
    accent: ['Nadia'],
    still: {
      src: 'shorts/fearless-nadia/stills/nadia-11oclock-portrait.jpg',
      film: "11 O'Clock",
      year: 1948,
      credit: 'Wadia Movietone',
      width: 545,
      aspect: 0.85,
      focus: '50% 15%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: '1930s की सबसे बड़ी female star, Perth की लड़की थी? #shorts',
  altTitles: [
    'Fearless Nadia: Hunterwali Australia से थी #shorts',
    'Mary Ann Evans, whip वाली Hindi film star #shorts',
  ],
  description: `1930s की सबसे बड़ी female star Perth में पैदा हुई थीं. नाम Mary Ann Evans, screen पर Fearless Nadia.

Published reports पर आधारित commentary. ये screening review नहीं है.

Hunterwali (1935) में वो एक princess बनीं, जो पिता का बदला लेने के लिए masked vigilante बन जाती है.
Whip वाली heroine देखकर financiers पीछे हट गए. Wadia brothers ने film खुद release की, और ये हफ़्तों houseful चली.
वो theatre और circus से आई थीं. Roy Wadia के मुताबिक, chandelier पर झूलना, छत से तीस फ़ुट की छलांग, सारे stunts उन्होंने खुद किए.
Australia का NFSA और India की Film Heritage Foundation मिलकर Hunterwali, Miss Frontier Mail और Diamond Queen restore कर रहे हैं.

Film stills, posters और brochure images Wikimedia Commons से हैं (public domain in India, pre-1966). Credit नीचे दिया गया है.

Sources:
BBC, 18 Feb 2024 (Rosie Thomas, Roy Wadia): https://www.bbc.com/news/world-asia-india-68271363
Fearless Nadia, Wikipedia: https://en.wikipedia.org/wiki/Fearless_Nadia
Indian Link, 5 Aug 2026, restoration: https://www.indianlink.com.au/saving-fearless-nadia-maitri-grants-to-the-rescue/

Movie Idiots.

#FearlessNadia #Hunterwali #WadiaMovietone #IndianCinema #HindiShorts #MovieIdiots`,
  tags: [
    'fearless nadia', 'hunterwali', 'mary ann evans', 'wadia movietone', 'homi wadia', 'jbh wadia',
    'indian cinema history', '1930s bollywood', 'stunt queen', 'hindi shorts', 'movie idiots',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real archival photos and posters, not altered or synthetic)',
    audience: 'Not made for kids',
  },
};
