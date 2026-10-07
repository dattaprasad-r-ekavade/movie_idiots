// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still coolie-accident --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'coolie-accident';
export const title = 'Coolie का climax एक punch से बदल गया #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    text: 'Coolie का climax एक punch से बदल गया?',
    delivery: {rate: 16, sfx: [{word: 'punch', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    text: 'और वो punch film में freeze है।',
    delivery: {rate: 16},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    text: '26 July 1982, Bangalore University. Fight में table की कोने लगी।',
    delivery: {rate: 16, sfx: [{word: '1982', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    text: '2 August को Bachchan clinically dead रहे, कुछ मिनट। वो कहते हैं, second birthday।',
    delivery: {rate: 16},
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    text: 'Puneet Issar सालों work नहीं मिला। Bachchan ने hospital में कहा, गलती नहीं थी।',
    delivery: {rate: 16, sfx: [{word: 'Puneet', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [2, 3],
    text: 'Script में Iqbal मरता था। Desai ने ending बदल दी। अब वो बचता है।',
    delivery: {rate: 18},
  },
  {
    id: 'loop',
    role: 'loop',
    text: 'Climax एक punch से बदल गया?',
    delivery: {rate: 16},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Coolie_filming_accident',
    note: '26 July 1982, Bangalore University campus, fight with Puneet Issar, table edge, splenic rupture. 2 August 1982: declared clinically dead for several minutes; Bachchan has called 2 August his second birthday.',
  },
  {
    url: 'https://indianexpress.com/article/entertainment/bollywood/puneet-issar-whose-accidental-punch-left-amitabh-bachchan-clinically-dead-says-he-lost-all-his-films-after-the-incident-people-were-scared-9953024/',
    note: 'Indian Express (19 Apr 2025): Puneet Issar on lost work after the accident; Bachchan told him in hospital it was an accident.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Coolie_(1983_Hindi_film)',
    note: 'Original script: Iqbal dies after Kader Khan’s Zafar shoots him. After the injury, Manmohan Desai changed the ending so Iqbal recovers. The fight is frozen with an on-screen caption marking the injury shot.',
  },
  {
    url: 'https://indianexpress.com/article/entertainment/bollywood/manmohan-desai-changed-coolie-climax-after-amitabh-bachchan-accident-redefined-stardom-8852622/',
    note: 'Indian Express (22 Jul 2023): Desai in Filmfare — audiences would have been disappointed if Amitabh was shown dying after the accident.',
  },
];

export const lexicon: Record<string, string> = {
  coolie: 'कूली',
  punch: 'पंच',
  bangalore: 'बैंगलोर',
  university: 'यूनिवर्सिटी',
  fight: 'फ़ाइट',
  table: 'टेबल',
  august: 'अगस्त',
  bachchan: 'बच्चन',
  clinically: 'क्लिनिकली',
  dead: 'डेड',
  birthday: 'बर्थडे',
  puneet: 'पुनीत',
  issar: 'इस्सर',
  hospital: 'हॉस्पिटल',
  iqbal: 'इकबाल',
  desai: 'देसाई',
  ending: 'एंडिंग',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Climax\nबदल गया',
    accent: ['Climax'],
    still: {
      src: 'shorts/coolie-accident/stills/poster.jpg',
      film: 'Coolie',
      year: 1983,
      credit: 'MKD Films',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: '26 July 1982\nBangalore',
      accent: ['1982'],
      still: {
        src: 'shorts/coolie-accident/stills/still1.jpg',
        film: 'Coolie',
        year: 1983,
        credit: 'MKD Films',
        focus: '50% 40%',
      },
      pop: {word: '1982', text: '1982'},
    },
    {
      lines: ['f2'],
      headline: '2 August:\nsecond birthday',
      accent: ['birthday'],
      still: {
        src: 'shorts/coolie-accident/stills/still2.jpg',
        film: 'Coolie',
        year: 1983,
        credit: 'MKD Films',
        focus: '50% 35%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Puneet:\nwork बंद',
      accent: ['Puneet'],
      still: {
        src: 'shorts/coolie-accident/stills/wiki-poster.jpg',
        film: 'Coolie',
        year: 1983,
        credit: 'MKD Films',
        focus: '50% 30%',
      },
      pop: {word: 'Puneet', text: 'PUNEET'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Iqbal\nबचता है',
    accent: ['बचता'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Coolie का climax एक punch से बदल गया #shorts',
  altTitles: [
    'Amitabh Bachchan Coolie accident: ending ही बदल गई #shorts',
    'Iqbal मरता था, Desai ने climax बदल दिया #shorts',
  ],
  description: `Coolie का climax एक punch से बदल गया. 26 July 1982, Bangalore University, Puneet Issar के साथ fight.

Published film histories और interviews पर commentary; first-hand screening नहीं है.

26 July 1982 — table की कोने, near-fatal injury
2 August — Bachchan ने लिखा, clinically dead, second birthday
Puneet Issar — सालों work नहीं मिला; Bachchan ने hospital में कहा accident था
Original script: Iqbal मरता है. Desai ने ending बदल दी. Film में वो shot freeze है.

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
Coolie — MKD Films / Bollywood Hungama / Indian Express

Sources:
Coolie filming accident — https://en.wikipedia.org/wiki/Coolie_filming_accident
Puneet Issar, Indian Express — https://indianexpress.com/article/entertainment/bollywood/puneet-issar-whose-accidental-punch-left-amitabh-bachchan-clinically-dead-says-he-lost-all-his-films-after-the-incident-people-were-scared-9953024/
Coolie (1983) — https://en.wikipedia.org/wiki/Coolie_(1983_Hindi_film)
Desai climax rewrite — https://indianexpress.com/article/entertainment/bollywood/manmohan-desai-changed-coolie-climax-after-amitabh-bachchan-accident-redefined-stardom-8852622/

Movie Idiots.

#Coolie #AmitabhBachchan #PuneetIssar #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'coolie 1983', 'amitabh bachchan', 'puneet issar', 'manmohan desai',
    'bollywood trivia', 'hindi shorts', 'movie idiots',
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
