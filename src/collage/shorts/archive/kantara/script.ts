// Fun-facts Short, design v2 (marquee). Kantara (2022): why did a song from the film reach court?
// The plagiarism claim is an ALLEGATION (Thaikkudam Bridge). Court actions are stated only as the
// sources record them: a Kozhikode interim order (2022), and a Kerala High Court quash on settlement (Oct 2023).
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'kantara';
export const title = 'Kantara का सबसे चर्चित गाना OTT से क्यों हटाया गया? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'mass-entry';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Why was Kantara's biggest song pulled from OTT?",
    text: "Kantara का सबसे चर्चित गाना OTT से क्यों हटाया गया?",
    delivery: {emotion: 'curious', sfx: [{word: "हटाया", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "The song was Varaha Roopam, and in 2022 it was everywhere along with the film.",
    text: "गाना था Varaha Roopam, और 2022 में film के साथ ये भी हर जगह छा गया.",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But the Kerala band Thaikkudam Bridge alleged it was copied from their song Navarasam.",
    text: "पर Kerala के band Thaikkudam Bridge ने आरोप लगाया कि ये उनके गाने Navarasam से copy है.",
    delivery: {emotion: 'serious', cues: [{word: 'आरोप', tag: 'dramatic'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "Then a Kozhikode court ordered a stop, and Amazon Prime removed the original version.",
    text: "फिर Kozhikode की court ने रोक लगाई, और Amazon Prime से original version हटा दिया गया.",
    delivery: {cues: [{word: 'हटा', tag: 'serious'}], sfx: [{word: "रोक", sound: 'stamp.wav', volume: 0.5}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Kantara's biggest song, pulled?",
    text: "Kantara का सबसे चर्चित गाना, हटाया गया?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Kantara_(2022_film)',
    note: 'Music and legal sections: Thaikkudam Bridge alleged "Varaha Roopam" was copied from "Navarasam" (Oct 2022); Kozhikode court interim injunction on streaming without the band\'s permission; Amazon Prime version with new arrangement (24 Nov 2022); case quashed by Kerala HC in 2023 after settlement. Cites TOI (24 Oct 2022) and Verdictum (30 Oct 2023).',
  },
  {
    url: 'https://thesouthfirst.com/keralam/kantara-plagiarism-row-justice-prevails-says-thaikkudam-bridge-after-amazon-prime-removes-varaha-roopam/',
    note: 'South First, 24 Nov 2022: Amazon Prime removed the original version of the song after a Kozhikode court order to stop streaming it; band says "Justice prevails"; band manager says the demand was credit.',
  },
  {
    url: 'https://www.verdictum.in/court-updates/high-courts/kantara-movie-varaharoopam-song-copyright-kerala-hc-quashes-case-against-makers-1501768',
    note: 'Verdictum, 30 Oct 2023: Kerala HC quashed the criminal proceedings (FIR under Section 63, Copyright Act) after the parties settled; court called the dispute "private in nature".',
  },
  {
    url: 'https://www.livelaw.in/amp/tags/varaharoopam',
    note: 'LiveLaw tag page; headline: "Varaharoopam Copyright Row: Kerala High Court Quashes Criminal Case Against Kantara Makers Based On Settlement Between Parties" (Oct 2023). Headline read via search only.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  ott: 'ओटीटी',
  amazon: 'ऐमज़ॉन',
  prime: 'प्राइम',
  kantara: 'कांतारा',
  kozhikode: 'कोझिकोड',
  varaha: 'वराह',
  roopam: 'रूपम',
  thaikkudam: 'थाइक्कुडम',
  navarasam: 'नवरसम',
  settlement: 'सेटलमेंट',
  streaming: 'स्ट्रीमिंग',
  permission: 'परमिशन',
  allegation: 'एलीगेशन',
  court: 'कोर्ट',
  kerala: 'केरल',
  high: 'हाई',
  criminal: 'क्रिमिनल',
  case: 'केस',
  bridge: 'ब्रिज',
  copy: 'कॉपी',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Kantara का गाना\nक्यों हटाया गया?',
    accent: ['हटाया'],
    still: {
      src: 'shorts/kantara/stills/rishab-portrait.jpg',
      film: 'Rishab Shetty',
      credit: 'Rudhra Varma (Flickr) / Wikimedia Commons',
      aspect: 4024 / 6048,
      focus: '50% 30%',
    },
    react: {word: 'क्यों', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'गाना:\nVaraha Roopam',
      accent: ['Varaha', 'Roopam'],
      layout: 'print',
      still: {
        src: 'shorts/kantara/stills/rishab-2023.jpg',
        film: 'Rishab Shetty',
        credit: 'Narendra Modi (YouTube) / Wikimedia Commons',
        aspect: 1069 / 1080,
        focus: '50% 30%',
      },
      pop: {word: 'छा', text: '2022 HIT'},
    },
    {
      lines: ['f2'],
      headline: 'पर band ने\nआरोप लगाया',
      accent: ['आरोप'],
      layout: 'ticket',
      ticket: {word: 'आरोप', title: 'THAIKKUDAM BRIDGE', figure: 'Copy?', sub: 'आरोप: Navarasam vs Varaha Roopam'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Court ने रोका,\nOTT से हटा',
    accent: ['हटा'],
    still: {
      src: 'shorts/kantara/stills/rishab-feb-2023.jpg',
      film: 'Rishab Shetty',
      credit: 'Narendra Modi (YouTube) / Wikimedia Commons',
      aspect: 1905 / 1080,
      focus: '50% 30%',
    },
    pop: {word: 'हटा', text: 'ORIGINAL VERSION REMOVED'},
    react: {word: 'Amazon', expression: 'skeptic', pose: 'point'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Kantara का सबसे चर्चित गाना OTT से क्यों हटाया गया? #shorts',
  altTitles: [
    'Varaha Roopam पर court ने क्यों रोक लगाई? #shorts',
    'Kantara: गाने पर आरोप और court #shorts',
  ],
  description: `Kantara (2022) का "Varaha Roopam" गाना OTT से इसलिए हटाया गया, क्योंकि Kerala के band Thaikkudam Bridge ने आरोप लगाया कि ये उनके गाने "Navarasam" की copy है. ये आरोप है, court का फ़ैसला नहीं.

Thaikkudam Bridge alleged the song was copied from "Navarasam" (Wikipedia, citing The Times of India, 24 Oct 2022).
A Kozhikode court barred streaming of the song without the band's permission; Amazon Prime removed the original version (South First, 24 Nov 2022).
The Kerala High Court quashed the criminal case in October 2023 after the parties settled; the court called the dispute private (Verdictum, 30 Oct 2023).

Sources:
Kantara (2022 film), Wikipedia: https://en.wikipedia.org/wiki/Kantara_(2022_film)
South First, Amazon Prime and Varaha Roopam: https://thesouthfirst.com/keralam/kantara-plagiarism-row-justice-prevails-says-thaikkudam-bridge-after-amazon-prime-removes-varaha-roopam/
Verdictum, Kerala HC quashes case (30 Oct 2023): https://www.verdictum.in/court-updates/high-courts/kantara-movie-varaharoopam-song-copyright-kerala-hc-quashes-case-against-makers-1501768
LiveLaw tag page (headline): https://www.livelaw.in/amp/tags/varaharoopam

Images (used as commentary support; credits here, not on screen):
Rishab Shetty photos: "Rishab Shetty" by Rudhra Varma (Flickr), CC BY-SA 4.0, https://commons.wikimedia.org/wiki/File:Rishab_Shetty.jpg ; "Rishab Shetty in 2023" and "Rishab Shetty (Feb 2023)" by Narendra Modi (YouTube), CC BY 3.0, https://commons.wikimedia.org/wiki/File:Rishab_Shetty_in_2023.jpg and https://commons.wikimedia.org/wiki/File:Rishab_Shetty_(Feb_2023).jpg
Kerala High Court building by Augustus Binu, CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:High_Court_of_Kerala_Building.jpg

Movie Idiots.

#Kantara #VarahaRoopam #RishabShetty #KannadaCinema #Plagiarism #HindiShorts #MovieIdiots`,
  tags: [
    'kantara', 'kantara 2022', 'varaha roopam', 'rishab shetty', 'thaikkudam bridge', 'navarasam',
    'kantara plagiarism', 'kantara court case', 'kannada cinema', 'movie idiots', 'hindi shorts',
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
