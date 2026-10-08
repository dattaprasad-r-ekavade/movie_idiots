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
    en: "Coolie's climax changed because of one punch?",
    text: "Coolie का climax एक punch से बदल गया?",
    delivery: {sfx: [{word: "punch", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "And that punch is frozen in the film.",
    text: "और वो punch film में freeze है.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "26 July 1982, Bangalore University. During the fight, Bachchan was hurt on the edge of a table.",
    text: "26 July 1982, Bangalore University. Fight के दौरान table के कोने से चोट लगी.",
    delivery: {sfx: [{word: "1982", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    en: "On 2 August, Bachchan was clinically dead for a few minutes. He later called it his second birthday.",
    text: "2 August को Bachchan कुछ मिनट के लिए clinically dead रहे. बाद में उन्होंने इसे अपना second birthday कहा.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    en: "Puneet Issar says he got no work for years. Bachchan walked him to the hospital gate.",
    text: "Puneet Issar कहते हैं, उन्हें सालों तक काम नहीं मिला. Bachchan उन्हें hospital के gate तक छोड़ने आए.",
    delivery: {sfx: [{word: "Puneet", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [2, 3],
    en: "The script had Iqbal dying. Desai changed the ending, so he lives.",
    text: "Script में Iqbal मरता था. Desai ने ending बदल दी, तो अब वो बचता है.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "The climax changed because of one punch?",
    text: "Climax एक punch से बदल गया?",
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
  title: 'Coolie का climax एक punch से बदल गया? #shorts',
  altTitles: [
    'Amitabh Bachchan Coolie accident: ending बदल गई #shorts',
    'Iqbal मरता था, Desai ने climax बदल दिया #shorts',
  ],
  description: `Coolie का climax एक punch से बदल गया. 26 July 1982, Bangalore University, Puneet Issar के साथ fight के दौरान.

Published film histories और interviews पर आधारित commentary. ये screening review नहीं है.

26 July 1982: Fight में table के कोने से चोट लगी.
2 August: Bachchan कुछ मिनट के लिए clinically dead रहे. बाद में उन्होंने इसे अपना second birthday कहा.
Puneet Issar कहते हैं, उन्हें सालों तक काम नहीं मिला.
Script में Iqbal मरता था. Desai ने ending बदल दी, तो अब वो बचता है.

Film stills और posters copyrighted publicity images हैं. इन्हें commentary के लिए, credit के साथ इस्तेमाल किया गया है. ये licensed नहीं हैं.

Sources:
Wikipedia, Coolie filming accident: https://en.wikipedia.org/wiki/Coolie_filming_accident
Indian Express, 19 Apr 2025, Puneet Issar: https://indianexpress.com/article/entertainment/bollywood/puneet-issar-whose-accidental-punch-left-amitabh-bachchan-clinically-dead-says-he-lost-all-his-films-after-the-incident-people-were-scared-9953024/
Wikipedia, Coolie (1983 Hindi film): https://en.wikipedia.org/wiki/Coolie_(1983_Hindi_film)
Indian Express, 22 Jul 2023, Desai on the ending: https://indianexpress.com/article/entertainment/bollywood/manmohan-desai-changed-coolie-climax-after-amitabh-bachchan-accident-redefined-stardom-8852622/

Movie Idiots.

#Coolie #AmitabhBachchan #ManmohanDesai #PuneetIssar #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'coolie', 'coolie 1983', 'amitabh bachchan', 'manmohan desai', 'puneet issar', 'coolie accident',
    'bollywood trivia', 'hindi shorts', 'movie idiots', 'bollywood facts', 'bachchan coolie climax',
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
