// Fun-facts Short. High-res stills in public/shorts/secret-remakes/stills/.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'secret-remakes';
export const title = 'ये hit Hindi film actually Hollywood से आई है #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "This hit Hindi film actually came from Hollywood?",
    text: "ये hit Hindi film असल में Hollywood से आई है?",
    delivery: {sfx: [{word: "Hollywood", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "The third one traces back to Nolan.",
    text: "तीसरी वाली का रिश्ता Nolan से है.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "1991, Dil Hai Ke Manta Nahin. It was inspired by It Happened One Night.",
    text: "1991, Dil Hai Ke Manta Nahin. ये It Happened One Night से inspired थी.",
    delivery: {sfx: [{word: "1991", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: "1995, Akele Hum Akele Tum. It is loosely based on Kramer vs Kramer.",
    text: "1995, Akele Hum Akele Tum. ये Kramer vs Kramer पर loosely based है.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: [2, 3, 4],
    en: "2008, Ghajini. The first Hindi film to reach 100 crore. It is a remake of the Tamil film.",
    text: "2008, Ghajini. पहली Hindi film जो 100 crore तक पहुँची. ये Tamil Ghajini का remake है.",
    delivery: {sfx: [{word: "crore", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3r',
    role: 'reveal',
    en: "And the Tamil one? It was inspired by Nolan's Memento.",
    text: "और Tamil वाली? वो Nolan की Memento से inspired थी.",
    delivery: {sfx: [{word: "Memento", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 3,
    en: "The Hollywood film? Memento. The Hindi hit came through Tamil.",
    text: "वो Hollywood film? Memento. और Hindi hit, Tamil होकर आई.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "A hit Hindi film that came from Hollywood?",
    text: "एक hit Hindi film, जो Hollywood से आई?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Dil_Hai_Ke_Manta_Nahin',
    note: 'Dil Hai Ke Manta Nahin (1991, Mahesh Bhatt). Plot inspired from Capra’s It Happened One Night (1934). Also notes a 1956 Hindi film Chori Chori from the same Hollywood source.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Akele_Hum_Akele_Tum',
    note: 'Akele Hum Akele Tum (1995, Mansoor Khan). Loosely based on Kramer vs. Kramer (1979).',
  },
  {
    url: 'https://www.filmibeat.com/bollywood/features/2008/aamir-khan-interview-ghajini-181208.html',
    note: 'Aamir Khan, Dec 2008: Ghajini is a remake of the Tamil film Ghajini, not a remake of Memento. Keep that distinction in the spoken line.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Ghajini_(2008_film)',
    note: 'Hindi Ghajini (2008) is a remake of the 2005 Tamil film of the same name, itself widely described as inspired by Memento.',
  },
  {
    url: 'https://web.archive.org/web/20181021082345/https://boxofficeindia.com/movie.php?movieid=309',
    note: 'Box Office India (archived 21 Oct 2018): Ghajini India nett ₹1,14,10,00,000. Note: “First film to cross 100 crore nett.”',
  },
];

export const lexicon: Record<string, string> = {
  hindi: 'हिंदी',
  hollywood: 'हॉलीवुड',
  nolan: 'नोलन',
  dil: 'दिल',
  hai: 'है',
  ke: 'के',
  manta: 'मानता',
  nahin: 'नहीं',
  happened: 'हैपंड',
  night: 'नाइट',
  inspired: 'इंस्पायर्ड',
  akele: 'अकेले',
  hum: 'हम',
  tum: 'तुम',
  kramer: 'क्रेमर',
  loosely: 'लूसली',
  based: 'बेस्ड',
  ghajini: 'गजिनी',
  tamil: 'तमिल',
  memento: 'मेमेंटो',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Hindi hit\nHollywood से?',
    accent: ['Hollywood'],
    still: {
      src: 'shorts/secret-remakes/stills/ghajini-hungama.jpg',
      film: 'Ghajini',
      year: 2008,
      credit: 'Geetha Arts',
      focus: '50% 22%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'DHKMN 1991\nCapra वाली',
      accent: ['1991'],
      still: {
        src: 'shorts/secret-remakes/stills/dhkmn-hungama.jpg',
        film: 'Dil Hai Ke Manta Nahin',
        year: 1991,
        credit: 'N. N. Sippy Productions',
        focus: '50% 28%',
      },
      pop: {word: '1991', text: '1991'},
    },
    {
      lines: ['f2'],
      headline: 'Akele Hum\nKramer vs Kramer',
      accent: ['Kramer'],
      still: {
        src: 'shorts/secret-remakes/stills/ahat-hungama.jpg',
        film: 'Akele Hum Akele Tum',
        year: 1995,
        credit: 'United Seven Combines',
        focus: '50% 28%',
      },
    },
    {
      lines: ['f3', 'f3r'],
      headline: 'Ghajini\n₹100 crore',
      accent: ['₹100'],
      still: {
        src: 'shorts/secret-remakes/stills/ghajini-still.jpg',
        film: 'Ghajini',
        year: 2008,
        credit: 'Geetha Arts',
        focus: '50% 35%',
      },
      pop: {word: 'crore', text: '₹100 CR'},
      reveal: {line: 'f3r', headline: 'Tamil ← Memento', accent: ['Memento']},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Memento\nTamil होकर',
    accent: ['Memento'],
    still: {
      src: 'shorts/secret-remakes/stills/memento-iw.jpg',
      film: 'Memento',
      year: 2000,
      credit: 'Newmarket Films',
      focus: '50% 28%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'ये hit Hindi film actually Hollywood से आई है #shorts',
  altTitles: [
    'Ghajini Memento से आई? Tamil होकर #shorts',
    'DHKMN, Akele Hum, Ghajini: Hollywood inspired #shorts',
  ],
  description: `तीन Hindi hits जिनका plot Hollywood से आया — और Ghajini वाला रास्ता Tamil होकर गया.

Published film pages पर commentary; "copy" नहीं, inspired / loosely based / official remake — जैसा source कहता है.

1991 Dil Hai Ke Manta Nahin — inspired from It Happened One Night (1934)
1995 Akele Hum Akele Tum — loosely based on Kramer vs. Kramer (1979)
2008 Ghajini — Aamir: remake of Tamil Ghajini, not of Memento; Tamil film is widely described as inspired by Nolan's Memento. Box Office India: first Hindi film to cross ₹100 crore nett.

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited in this description. Not licensed.

Stills:
Ghajini — Geetha Arts / Bollywood Hungama / Indian Express
Dil Hai Ke Manta Nahin — N. N. Sippy Productions / Bollywood Hungama
Akele Hum Akele Tum — United Seven Combines / Bollywood Hungama
Memento — Newmarket Films / IndieWire

Sources:
Dil Hai Ke Manta Nahin — https://en.wikipedia.org/wiki/Dil_Hai_Ke_Manta_Nahin
Akele Hum Akele Tum — https://en.wikipedia.org/wiki/Akele_Hum_Akele_Tum
Aamir on Ghajini — https://www.filmibeat.com/bollywood/features/2008/aamir-khan-interview-ghajini-181208.html
Ghajini (2008) — https://en.wikipedia.org/wiki/Ghajini_(2008_film)
Box Office India (archive): first film to cross 100 crore nett — https://web.archive.org/web/20181021082345/https://boxofficeindia.com/movie.php?movieid=309

Movie Idiots.

#Ghajini #Memento #AamirKhan #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'ghajini', 'memento', 'aamir khan', 'dil hai ke manta nahin', 'akele hum akele tum',
    'bollywood remakes', 'hindi shorts', 'movie idiots',
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
