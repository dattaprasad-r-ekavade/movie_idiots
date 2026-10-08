// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still alam-ara --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'alam-ara';
export const title = 'India की पहली talking film आज कोई देख नहीं सकता #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "India's first talkie. And nobody can watch it today?",
    text: "India की पहली talking film. आज कोई देख नहीं सकता?",
    delivery: {sfx: [{word: "talking", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "No print. No record. Only posters.",
    text: "कोई print नहीं. कोई record नहीं. बस posters.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "14 March 1931, Majestic Cinema, Bombay. The tagline read: all living, breathing, 100 percent talking.",
    text: "14 March 1931, Majestic Cinema, Bombay. Tagline था: All living. Breathing. 100 percent talking.",
    delivery: {sfx: [{word: "1931", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    en: "It was shot near a train station, between 1 and 4 in the morning, to avoid the train noise.",
    text: "Train station के पास shoot हुई, रात 1 से 4 बजे के बीच. Train की आवाज़ से बचने के लिए.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 0,
    en: "Ruby Myers, known as Sulochana, could not speak Hindustani. The role went to Zubeida.",
    text: "Ruby Myers, यानी Sulochana, Hindustani नहीं बोल सकीं. तो ये role Zubeida को मिला.",
    delivery: {sfx: [{word: "Zubeida", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "The NFAI never had a print. BFI calls it India's most important lost film.",
    text: "NFAI के पास print कभी था ही नहीं. BFI इसे India की सबसे अहम lost film कहती है.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So the first talking film still cannot be watched?",
    text: "तो पहली talking film, आज भी कोई देख नहीं सकता?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Alam_Ara_(1931_film)',
    note: 'Alam Ara (Ardeshir Irani), released 14 March 1931, first Indian sound film. Shot at night because of train noise. Zubeida replaced Ruby Myers (Sulochana), who could not speak Hindustani. No print or gramophone record known to survive. P. K. Nair: the 2003 NFAI fire story is false; it was already lost before the archive opened in 1964. BFI (2017) called it the most important lost film produced in India.',
  },
  {
    url: 'https://www.bbc.co.uk/news/world-asia-india-61404876',
    note: 'BBC (15 May 2022): Film Heritage Foundation recovered Irani’s Bell & Howell printer, described as the only surviving artefact of Alam Ara, found in a sari shop. Police had to control crowds at the 1931 release.',
  },
];

export const lexicon: Record<string, string> = {
  talking: 'टॉकिंग',
  print: 'प्रिंट',
  record: 'रिकॉर्ड',
  posters: 'पोस्टर्स',
  march: 'मार्च',
  majestic: 'मजेस्टिक',
  bombay: 'बॉम्बे',
  tagline: 'टैगलाइन',
  percent: 'परसेंट',
  train: 'ट्रेन',
  station: 'स्टेशन',
  ruby: 'रूबी',
  myers: 'मायर्स',
  sulochana: 'सुलोचना',
  hindustani: 'हिंदुस्तानी',
  zubeida: 'ज़ुबेदा',
  nfai: 'एन एफ़ ए आई',
  bfi: 'बी एफ़ आई',
  lost: 'लॉस्ट',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'पहली talkie\nगायब',
    accent: ['गायब'],
    still: {
      src: 'shorts/alam-ara/stills/poster.jpg',
      film: 'Alam Ara',
      year: 1931,
      credit: 'Imperial Film Company',
      focus: '50% 30%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: '14 March 1931\nMajestic',
      accent: ['1931'],
      still: {
        src: 'shorts/alam-ara/stills/ad.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        focus: '50% 30%',
      },
      pop: {word: '1931', text: '1931'},
    },
    {
      lines: ['f2'],
      headline: 'Shoot:\nरात 1–4',
      accent: ['रात'],
      still: {
        src: 'shorts/alam-ara/stills/irani.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        focus: '50% 30%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Sulochana\nनहीं बोल सकीं',
      accent: ['Sulochana'],
      still: {
        src: 'shorts/alam-ara/stills/zubeida.png',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        focus: '35% 40%',
      },
      pop: {word: 'Zubeida', text: 'ZUBEIDA'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Lost film\nprint नहीं',
    accent: ['Lost'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'India की पहली talking film आज कोई देख नहीं सकता #shorts',
  altTitles: [
    'Alam Ara 1931: print गायब, posters बचे #shorts',
    'पहली Indian talkie lost film क्यों है? #shorts',
  ],
  description: `Alam Ara, 14 March 1931 — India की पहली sound feature. आज कोई print नहीं.

"First Indian sound film" usual claim है; 40 सेकंड में दूसरे 1931 talkies से लड़ाई नहीं.

Majestic Cinema, Bombay — 100 percent talking; crowds, police
Night shoot 1–4 a.m. because of trains
Ruby Myers (Sulochana) dropped; Zubeida took the role
NFAI never held a print (2003 fire story is a myth, P. K. Nair). BFI: most important lost Indian film. BBC 2022: Irani's printer found in a sari shop.

Stills from Wikimedia Commons. Public domain in India (published before 1 January 1966). Credited on screen.

Stills:
Alam Ara poster, Majestic ad, Ardeshir Irani recording, Zubeida publicity — Imperial Film Company / NFAI Great Indian Film Hunt

Sources:
Alam Ara (1931) — https://en.wikipedia.org/wiki/Alam_Ara_(1931_film)
BBC, lost film / printer — https://www.bbc.co.uk/news/world-asia-india-61404876

Movie Idiots.

#AlamAra #IndianCinema #LostFilm #HindiShorts #MovieIdiots`,
  tags: [
    'alam ara', 'ardeshir irani', 'first indian talkie', 'lost film',
    'hindi shorts', 'movie idiots', 'indian cinema history',
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
