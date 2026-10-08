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
    en: "Gangs of Wasseypur was one film. Did theatres cut it in two?",
    text: "Wasseypur एक ही film थी. Theatres ने उसे काट दिया?",
    delivery: {sfx: [{word: "काट", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "At Cannes it was shown whole. In India it came out in two parts.",
    text: "Cannes में ये पूरी दिखाई गई. India में ये दो हिस्सों में आई.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "It was shot as one film, 319 minutes long in total, both parts together.",
    text: "ये एक साथ shoot हुई, कुल 319 minutes, दोनों parts मिलाकर.",
    delivery: {sfx: [{word: "319", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    en: "In May 2012 it was screened as one whole film at Cannes Directors Fortnight.",
    text: "मई 2012 में Cannes के Directors Fortnight में, पूरी film एक बार में दिखाई गई.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    en: "In India it was released in two parts, on 22 June and 8 August 2012. No theatre would take a five-hour film.",
    text: "India में ये दो हिस्सों में release हुई, 22 June और 8 August 2012 को. पाँच घंटे की film कोई theatre नहीं लेता था.",
    delivery: {sfx: [{word: "August", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    en: "Kashyap says the first cut ran seven and a half hours. Motwane cut it down.",
    text: "Kashyap कहते हैं, पहला cut साढ़े सात घंटे का था. Motwane ने उसे छोटा किया.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "One film, yet theatres cut it up?",
    text: "एक ही film थी, फिर भी theatres ने उसे काट दिया?",
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
  title: 'Wasseypur एक ही film थी, theatres ने काट दी? #shorts',
  altTitles: [
    'Gangs of Wasseypur 319 minutes, Cannes में एक film #shorts',
    'Kashyap का first cut साढ़े सात घंटे का था #shorts',
  ],
  description: `Gangs of Wasseypur एक ही film थी. Cannes में ये पूरी दिखाई गई. India में theatres ने इसे दो हिस्सों में release किया.

Published reports और Kashyap के interview पर आधारित commentary. ये screening review नहीं है.

Shoot एक साथ हुआ, कुल 319 minutes (160 + 159).
May 2012: Cannes Directors' Fortnight में पूरी film दिखाई गई.
India में Part 1 22 June 2012 को, Part 2 8 August 2012 को release हुआ. कोई theatre पाँच घंटे की film नहीं लेना चाहता था.
Kashyap के मुताबिक (2023), पहला cut साढ़े सात घंटे का था. Motwane ने उसे छोटा किया.

Film stills और posters copyrighted publicity images हैं. इन्हें commentary के लिए, credit के साथ इस्तेमाल किया गया है. ये licensed नहीं हैं.

Sources:
Gangs of Wasseypur, Wikipedia: https://en.wikipedia.org/wiki/Gangs_of_Wasseypur
Gangs of Wasseypur 2, Wikipedia: https://en.wikipedia.org/wiki/Gangs_of_Wasseypur_2
Kashyap on the first cut, Indian Express, 2023: https://indianexpress.com/article/entertainment/bollywood/gangs-of-wasseypur-first-cut-seven-hours-long-tigmanshu-dhulia-improvised-tumse-na-ho-payega-line-reveals-anurag-kashyap-8931783/

Movie Idiots.

#GangsOfWasseypur #AnuragKashyap #NawazuddinSiddiqui #HindiShorts #MovieIdiots`,
  tags: [
    'gangs of wasseypur', 'gangs of wasseypur 2', 'anurag kashyap', 'nawazuddin siddiqui',
    'cannes', 'hindi shorts', 'movie idiots', 'bollywood trivia', 'bollywood facts',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real film stills and photos, not altered or synthetic)',
    audience: 'Not made for kids',
  },
};
