// Fun-facts Short. Claims from published pages only (see `sources`).
// Stills: Wikimedia Commons, public domain in India (published before 1 Jan 1966). Ledger: public/shorts/alam-ara/stills/stills.json.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

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
    en: "No print survived. All that is left are these posters.",
    text: "इसका एक भी print नहीं बचा. बचे हैं बस ये posters.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: [0, 1],
    en: "14 March 1931, Majestic Cinema, Bombay. The ad copy read: all living, breathing, 100 percent talking.",
    text: "14 मार्च 1931, Majestic Cinema, Bombay. Ad पर लिखा था: All living, breathing, 100 percent talking.",
    delivery: {sfx: [{word: "1931", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    en: "Most of it was shot at night, 1 to 4 a.m., to avoid the noise of active trains.",
    text: "Film का ज़्यादातर हिस्सा रात 1 से 4 बजे के बीच shoot हुआ, ट्रेनों के शोर से बचने के लिए.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 0,
    en: "Ruby Myers, known as Sulochana, could not speak Hindustani. The role went to Zubeida.",
    text: "Ruby Myers, यानी Sulochana, Hindustani नहीं बोल सकीं. तो ये रोल Zubeida को मिला.",
    delivery: {sfx: [{word: "Zubeida", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 0,
    en: "The print was lost even before NFAI was set up. In 2017 the BFI called it India's most important lost film.",
    text: "Print तो NFAI बनने से पहले ही खो गया था. 2017 में BFI ने इसे India की सबसे अहम lost film कहा.",
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
    note: 'Alam Ara (Ardeshir Irani), premiered 14 March 1931 at Majestic Cinema, Bombay; Hindustani-language film. Shot mostly 1:00–4:00 am to avoid noise from active trains. Ruby Myers was unable to join the cast because she could not speak the film’s language; Zubeida was cast in the title role. No print known to survive. P. K. Nair: the film was lost before the NFAI archive was established in 1964; the 2003 fire story is wrong. In 2017 the BFI declared it the most important of any lost films produced in India.',
  },
  {
    url: 'https://www.outlookindia.com/national/the-ghost-who-talked-news-281007',
    note: 'Outlook: ad copy “All Living, Breathing 100 per cent Talking …”; Alam Ara opened 14 March 1931 at Bombay’s Majestic Cinema.',
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
  ad: 'एड',
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
  mascot: false,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'पहली talkie\nगायब',
    accent: ['गायब'],
    still: {
      src: 'shorts/alam-ara/stills/ad.jpg',
      film: 'Alam Ara',
      year: 1931,
      credit: 'Imperial Film Company',
      width: 600,
      aspect: 0.92,
      focus: '50% 30%',
    },
    pop: {line: 'promise', word: 'posters', text: 'POSTERS'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: '14 March 1931\nMajestic',
      accent: ['1931'],
      still: {
        src: 'shorts/alam-ara/stills/poster.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        width: 520,
        aspect: 0.8,
        focus: '50% 30%',
      },
      cuts: [{
        word: 'Majestic',
        src: 'shorts/alam-ara/stills/ad.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        width: 600,
        aspect: 0.92,
        focus: '50% 30%',
        replace: true,
      }],
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
        width: 860,
        aspect: 1.3,
        focus: '50% 25%',
      },
      // Punch-in on the same recording still as the night-shoot line lands.
      cuts: [{
        word: 'रात',
        src: 'shorts/alam-ara/stills/irani.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        width: 560,
        aspect: 0.85,
        focus: '50% 15%',
        push: [1.2, 1.3],
        tilt: 2,
        replace: true,
      }],
    },
    {
      lines: ['f3'],
      headline: 'Sulochana\nनहीं बोल सकीं',
      accent: ['Sulochana'],
      still: {
        src: 'shorts/alam-ara/stills/zubeida.png',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company / NFAI Great Indian Film Hunt',
        width: 940,
        aspect: 1.4,
        focus: '35% 40%',
      },
      cuts: [{
        word: 'Hindustani',
        src: 'shorts/alam-ara/stills/ad.jpg',
        film: 'Alam Ara',
        year: 1931,
        credit: 'Imperial Film Company',
        width: 600,
        aspect: 0.92,
        focus: '50% 30%',
        replace: true,
      }],
      pop: {word: 'Zubeida', text: 'ZUBEIDA'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Lost film\nprint नहीं',
    accent: ['Lost'],
    pop: {word: '2017', text: '2017'},
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


Majestic Cinema, Bombay — ad copy: "All living, breathing, 100 per cent talking"
Night shoot 1–4 a.m. to avoid train noise
Ruby Myers (Sulochana) could not speak the film's language; Zubeida took the role
NFAI never held a print (lost before the archive opened in 1964; the 2003 fire story is wrong, per P. K. Nair). BFI (2017): most important lost Indian film.

Stills from Wikimedia Commons. Public domain in India (published before 1 January 1966). Credited on screen.

Stills:
Alam Ara poster, Majestic ad, Ardeshir Irani recording, Zubeida publicity — Imperial Film Company / NFAI Great Indian Film Hunt

Sources:
Alam Ara (1931) — https://en.wikipedia.org/wiki/Alam_Ara_(1931_film)
Outlook, ad copy and opening — https://www.outlookindia.com/national/the-ghost-who-talked-news-281007

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
