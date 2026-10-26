// "Did you know?" Short, design v2 (marquee). Hook: why are doctors upset with Sunny Deol's new film?
// Facts: Film Information (IMA letter, 23 Oct 2026), Hollywood Reporter India (teaser, 19 Oct 2026),
// The Week (title, director, release date, 12 Oct 2026). The IMA letter has one opened source only;
// the payoff is attributed to reports ("Reports के मुताबिक") for that reason.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'suryaa-doctors';
export const title = 'Sunny Deol की नई film से doctors नाराज़ क्यों? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, neon-bhairav); credited automatically in youtube.txt.
export const topic = 'deol';
export const music = 'neon-bhairav';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Why are doctors upset with Sunny Deol's new film?",
    text: "Sunny Deol की नई film से doctors नाराज़ क्यों?",
    say: "सनी देओल की नई फ़िल्म से डॉक्टर्स नाराज़ क्यों?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [1, 2],
    en: "Sunny Deol's Suryaa releases on 20 November; its teaser is about corruption in medicine.",
    text: "Sunny Deol की Suryaa 20 November को आ रही है, teaser medical corruption पर है.",
    say: "सनी देओल की सूर्या बीस नवंबर को आ रही है, टीज़र मेडिकल करप्शन पर है।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0],
    en: "But after the teaser, the doctors' body, the IMA, got upset.",
    text: "पर teaser देखकर doctors की body, IMA, नाराज़ हो गई.",
    say: "पर टीज़र देखकर डॉक्टर्स की बॉडी, आईएमए, नाराज़ हो गई।",
    delivery: {emotion: 'conspiratorial'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0],
    en: "Reports say the IMA wrote to the I&B minister: the teaser threatens doctors' image and safety.",
    text: "Reports के मुताबिक, IMA ने I&B minister को letter लिखा: teaser doctors की image और safety के लिए ख़तरा है.",
    say: "रिपोर्ट्स के मुताबिक, आईएमए ने आई एंड बी मिनिस्टर को लेटर लिखा: टीज़र डॉक्टर्स की इमेज और सेफ़्टी के लिए ख़तरा है।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Doctors upset... why?",
    text: "Doctors नाराज़ क्यों?",
    say: "डॉक्टर्स नाराज़ क्यों?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://filminformation.com/news/suryaa-in-eye-of-controversy-ima-seeks-review-by-govt-23-october-2026/',
    note: 'Film Information, 23 Oct 2026. IMA national president Dr. Anilkumar J. Nayak wrote on 22 Oct 2026 to I&B minister Ashwini Vaishnaw. The letter says the promo "generalises corruption in the medical profession" and "depicts violence against healthcare workers". It asks the ministry "to urgently review the promotional content", seeks "appropriate corrective measures", and calls for a ban "if justified under the applicable law". Release: 20 Nov. No ministry or producer response reported. Only source opened for the IMA letter.',
  },
  {
    url: 'https://www.hollywoodreporterindia.com/features/insight/suryaa-ant-se-aarambh-tak-teaser-sunny-deol-takes-on-a-corrupt-medical-system',
    note: 'Hollywood Reporter India, updated 19 Oct 2026. Teaser voiceover: trust in doctors has eroded due to "rampant medical negligence and bribery rooted in the system". Film follows Soorya against "a corrupt medical establishment for malpractice". Release 20 Nov 2026.',
  },
  {
    url: 'https://www.theweek.in/news/entertainment/2026/10/12/sunny-deol-suryaa-first-look.amp.html',
    note: 'The Week, 12 Oct 2026. Title "Suryaa: Ant Se Aarambh Tak", director M. Padmakumar, Sunny Deol in the lead, theatrical release on 20 Nov 2026.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  suryaa: 'सूर्या',
  teaser: 'टीज़र',
  corruption: 'करप्शन',
  doctors: 'डॉक्टर्स',
  body: 'बॉडी',
  ima: 'आईएमए',
  minister: 'मिनिस्टर',
  review: 'रिव्यू',
  healthcare: 'हेल्थकेयर',
  workers: 'वर्कर्स',
  reports: 'रिपोर्ट्स',
  objections: 'ऑब्जेक्शन',
  medical: 'मेडिकल',
  system: 'सिस्टम',
  sunny: 'सनी',
  deol: 'देओल',
  letter: 'लेटर',
};

const POSTER = {src: 'shorts/suryaa-doctors/stills/poster.jpg', film: 'Suryaa', year: 2026, credit: 'TMDB: Suryaa (2026) theatrical poster', aspect: 2000 / 3000, focus: '50% 30%'};
const SUNNY = {src: 'shorts/suryaa-doctors/stills/sunny.jpg', film: 'Sunny Deol', year: 2024, credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 1712 / 3308, focus: '50% 15%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Doctors नाराज़\nक्यों हैं?',
    accent: ['नाराज़'],
    still: POSTER,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Teaser का\nmedical corruption',
      accent: ['corruption'],
      layout: 'ticket',
      ticket: {word: 'Suryaa', title: 'SURYAA: ANT SE AARAMBH TAK', figure: '20 Nov', sub: 'Release, 2026'},
      still: POSTER,
    },
    {
      lines: ['f2'],
      headline: 'Doctors की body\nनाराज़ हुई',
      accent: ['नाराज़'],
      layout: 'print',
      still: SUNNY,
      pop: {word: 'नाराज़', text: 'UPSET'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'IMA ने minister को\nletter लिखा',
    accent: ['letter'],
    still: SUNNY,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sunny Deol की नई film से doctors नाराज़ क्यों? #shorts',
  altTitles: [
    'Suryaa के teaser पर IMA ने review माँगा #shorts',
    'Sunny Deol की Suryaa में doctors पर क्या है विवाद? #shorts',
  ],
  description: `Sunny Deol की Suryaa: Ant Se Aarambh Tak (20 नवंबर 2026 release, director M. Padmakumar) का teaser medical corruption पर है. Indian Medical Association ने 22 अक्टूबर 2026 को I&B minister Ashwini Vaishnaw को letter लिखकर promo की urgent review माँगी (Film Information). Teaser में medical negligence और bribery की बात है (Hollywood Reporter India).

Sources:
Suryaa IMA letter, Film Information — https://filminformation.com/news/suryaa-in-eye-of-controversy-ima-seeks-review-by-govt-23-october-2026/
Suryaa teaser, Hollywood Reporter India — https://www.hollywoodreporterindia.com/features/insight/suryaa-ant-se-aarambh-tak-teaser-sunny-deol-takes-on-a-corrupt-medical-system
Suryaa first look, The Week — https://www.theweek.in/news/entertainment/2026/10/12/sunny-deol-suryaa-first-look.amp.html

Images:
Suryaa (2026) theatrical poster, via TMDB — https://www.themoviedb.org/movie/1522938-suryaa. Copyrighted; used as credited commentary on the film.
Sunny Deol on the red carpet of Zee Cine Awards 2024, Bollywood Hungama via Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Sunny_Deol_at_Zee_Cine_Awards_2024.jpg. CC BY 3.0 (https://creativecommons.org/licenses/by/3.0).

Movie Idiots.

#SunnyDeol #Suryaa #IMA #Doctors #NewMovie #HindiShorts #MovieIdiots`,
  tags: [
    'sunny deol', 'suryaa', 'suryaa ant se aarambh tak', 'ima', 'doctors', 'padmakumar',
    'sunny deol new film', 'hindi shorts', 'movie idiots',
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
