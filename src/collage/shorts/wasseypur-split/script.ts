// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still wasseypur-split --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'wasseypur-split';
export const title = 'Wasseypur एक ही film थी, theatres ने काट दी #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    text: 'Wasseypur एक ही film थी, theatres ने काट दी?',
    delivery: {rate: 16, sfx: [{word: 'काट', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    text: 'Cannes में पूरी चली। India में दो टुकड़े।',
    delivery: {rate: 16},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    text: 'Shoot एक साथ हुआ। Total 319 minutes. Part 1 और 2 मिलाके।',
    delivery: {rate: 16, sfx: [{word: '319', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    text: 'May 2012, Cannes Directors Fortnight. पूरी film एक बैठक में।',
    delivery: {rate: 16},
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    text: 'India में 22 June और 8 August, दो release. पाँच घंटे कोई hall नहीं लेता।',
    delivery: {rate: 16, sfx: [{word: 'August', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    text: 'Kashyap कहते हैं, first cut साढ़े सात घंटे था। Motwane ने दो films बचाई।',
    delivery: {rate: 18},
  },
  {
    id: 'loop',
    role: 'loop',
    text: 'एक film theatres ने काट दी?',
    delivery: {rate: 16},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Gangs_of_Wasseypur',
    note: 'Both parts shot as a single 319-minute film; screened in full at Cannes Directors’ Fortnight, May 2012. Split because no Indian theatre would screen a five-hour film. Part 1 released in India 22 June 2012.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Gangs_of_Wasseypur_2',
    note: 'Part 2 running time 159 minutes; India release 8 August 2012 (paid previews 7 August). Combined with Part 1 as the split of the Cannes cut.',
  },
  {
    url: 'https://indianexpress.com/article/entertainment/bollywood/gangs-of-wasseypur-first-cut-seven-hours-long-tigmanshu-dhulia-improvised-tumse-na-ho-payega-line-reveals-anurag-kashyap-8931783/',
    note: 'Indian Express (9 Sep 2023): Kashyap on Cyrus Says — first cut seven and a half hours; he thought it would be three films; Vikramaditya Motwane “saved” it as two.',
  },
];

export const lexicon: Record<string, string> = {
  wasseypur: 'वासेपुर',
  theatres: 'थिएटर्स',
  cannes: 'कान',
  shoot: 'शूट',
  total: 'टोटल',
  part: 'पार्ट',
  directors: 'डायरेक्टर्स',
  fortnight: 'फ़ोर्टनाइट',
  june: 'जून',
  august: 'अगस्त',
  hall: 'हॉल',
  kashyap: 'कश्यप',
  motwane: 'मोतवाने',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'एक film\nकाट दी',
    accent: ['काट'],
    still: {
      src: 'shorts/wasseypur-split/stills/poster.jpg',
      film: 'Gangs of Wasseypur',
      year: 2012,
      credit: 'Viacom18 / Anurag Kashyap Films',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: '319 minutes\nएक shoot',
      accent: ['319'],
      still: {
        src: 'shorts/wasseypur-split/stills/f1.jpg',
        film: 'Gangs of Wasseypur',
        year: 2012,
        credit: 'Viacom18 / Anurag Kashyap Films',
        focus: '50% 40%',
      },
      pop: {word: '319', text: '319 MIN'},
    },
    {
      lines: ['f2'],
      headline: 'Cannes 2012\nपूरी film',
      accent: ['Cannes'],
      still: {
        src: 'shorts/wasseypur-split/stills/f2.jpg',
        film: 'Gangs of Wasseypur',
        year: 2012,
        credit: 'Viacom18 / Anurag Kashyap Films',
        focus: '50% 28%',
      },
    },
    {
      lines: ['f3'],
      headline: 'India:\nदो release',
      accent: ['दो'],
      still: {
        src: 'shorts/wasseypur-split/stills/part2.jpg',
        film: 'Gangs of Wasseypur 2',
        year: 2012,
        credit: 'Viacom18 / Anurag Kashyap Films',
        focus: '50% 28%',
      },
      pop: {word: 'August', text: '8 AUG'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'First cut\n7.5 hours',
    accent: ['7.5'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Wasseypur एक ही film थी, theatres ने काट दी #shorts',
  altTitles: [
    'Gangs of Wasseypur 319 minutes, Cannes में एक film #shorts',
    'Kashyap का first cut साढ़े सात घंटे था #shorts',
  ],
  description: `Gangs of Wasseypur एक shoot थी. Cannes में पूरी चली. India के theatres ने दो भाग कर दिए.

Published pages और Kashyap के interview पर commentary.

Shot as one 319-minute film (160 + 159)
Cannes Directors' Fortnight, May 2012 — screened in full
India: Part 1 on 22 June 2012, Part 2 on 8 August 2012 — no hall would take five hours
Kashyap (2023): first cut 7.5 hours; Motwane saved it as two films

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
Gangs of Wasseypur / Part 2 — Viacom18 Motion Pictures / Anurag Kashyap Films / Filmfare

Sources:
Gangs of Wasseypur — https://en.wikipedia.org/wiki/Gangs_of_Wasseypur
Gangs of Wasseypur 2 — https://en.wikipedia.org/wiki/Gangs_of_Wasseypur_2
Kashyap on first cut — https://indianexpress.com/article/entertainment/bollywood/gangs-of-wasseypur-first-cut-seven-hours-long-tigmanshu-dhulia-improvised-tumse-na-ho-payega-line-reveals-anurag-kashyap-8931783/

Movie Idiots.

#GangsOfWasseypur #AnuragKashyap #NawazuddinSiddiqui #HindiShorts #MovieIdiots`,
  tags: [
    'gangs of wasseypur', 'anurag kashyap', 'nawazuddin siddiqui', 'cannes',
    'hindi shorts', 'movie idiots', 'bollywood trivia',
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
