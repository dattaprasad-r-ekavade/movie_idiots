// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still interval-india --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'interval-india';
export const title = 'Hollywood film भारत में बीच में interval लग जाता है #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Hollywood films come to India, so why is there an interval in the middle?",
    text: "Hollywood film India में आती है, फिर बीच में interval क्यों?",
    delivery: {sfx: [{word: "interval", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "It began with the reel. Snacks kept it alive.",
    text: "ये reel की वजह से शुरू हुआ. और snacks ने इसे बचाए रखा.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "In early cinema, the projectionist had to change the reel, so there was a break.",
    text: "पुराने cinema में projection के लिए reel बदलनी पड़ती थी. मतलब हर जगह एक break.",
    delivery: {sfx: [{word: "reel", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: "Hindi writers still plan an interval point: beginning, interval, climax.",
    text: "Hindi writers आज भी interval point लिखते हैं. Beginning, interval, climax.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: [0, 2],
    en: "The ticket money is shared with the film. The popcorn money stays with the theatre.",
    text: "Ticket का पैसा film के साथ बंटता है. पर popcorn का पैसा theatre अपने पास रखता है.",
    delivery: {sfx: [{word: "popcorn", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [3, 0],
    en: "Sangam had two intervals. Even after digital, Hollywood films still get a cut here.",
    text: "Sangam में दो interval थे. Digital आने के बाद भी, यहाँ Hollywood films पर भी cut लगता है.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So the interval still lands in the middle?",
    text: "तो बीच में interval अब भी लग जाता है?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Intermission',
    note: 'Intermissions began as reel changes. They remain common in India for concession revenue. Forced intermissions are common when western films play in India. Sangam and Mera Naam Joker had two intermissions each. A few Hindi films screened without one (Dhobi Ghat, Delhi Belly, Trapped).',
  },
  {
    url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/hitchcock-to-cameron-hollywood-to-bollywood-how-the-intermission-divides-opinions-not-just-screenings/articleshow/96700431.cms',
    note: 'TOI: film historian Gautam Chintamani on Hollywood intervals until the 1970s; archivist Shivendra Singh Dungarpur on Parsi theatre legacy and writers planning beginning / interval / climax (Salim–Javed, Gulzar cited in that piece).',
  },
  {
    url: 'https://www.thehindu.com/entertainment/movies/who-wants-a-washroom-break/article25203118.ece',
    note: 'The Hindu (12 Oct 2018): interval is no longer a technical need; it remains a commercial window. Some films dropped it.',
  },
  {
    url: 'https://www.news18.com/entertainment/bollywood/why-sangam-the-raj-kapoor-film-had-two-intervals-7635391.html',
    note: 'News18 (25 Apr 2023): Sangam (1964) originally had two intervals because of length; Raj Kapoor later edited it down to one.',
  },
];

export const lexicon: Record<string, string> = {
  hollywood: 'हॉलीवुड',
  interval: 'इंटरवल',
  reel: 'रील',
  samosa: 'समोसा',
  cinema: 'सिनेमा',
  break: 'ब्रेक',
  writers: 'राइटर्स',
  beginning: 'बिगिनिंग',
  climax: 'क्लाइमैक्स',
  theatre: 'थिएटर',
  popcorn: 'पॉपकॉर्न',
  ticket: 'टिकट',
  snacks: 'स्नैक्स',
  sangam: 'संगम',
  digital: 'डिजिटल',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Forced\ninterval',
    accent: ['interval'],
    still: {
      src: 'shorts/interval-india/stills/poster.jpg',
      film: 'Sangam',
      year: 1964,
      credit: 'R.K. Films',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Reel change\nसे शुरू',
      accent: ['Reel'],
      still: {
        src: 'shorts/interval-india/stills/pair.jpg',
        film: 'Sangam',
        year: 1964,
        credit: 'R.K. Films',
        focus: '50% 40%',
      },
      pop: {word: 'reel', text: 'REEL'},
    },
    {
      lines: ['f2'],
      headline: 'Writers:\ninterval point',
      accent: ['interval'],
      still: {
        src: 'shorts/interval-india/stills/vyjayanthi.jpg',
        film: 'Sangam',
        year: 1964,
        credit: 'R.K. Films',
        focus: '40% 55%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Popcorn\nका पैसा',
      accent: ['Popcorn'],
      still: {
        src: 'shorts/interval-india/stills/wiki-poster.jpg',
        film: 'Sangam',
        year: 1964,
        credit: 'R.K. Films',
        focus: '50% 28%',
      },
      pop: {word: 'popcorn', text: 'POPCORN'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Sangam:\nदो interval',
    accent: ['दो'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Hollywood film भारत में बीच में interval क्यों लगता है? #shorts',
  altTitles: [
    'Interval samosa के लिए है? Reel से शुरू हुआ #shorts',
    'Sangam में दो interval थे #shorts',
  ],
  description: `Hollywood film भारत के hall में आती है, और बीच में interval लग जाता है. ये reel बदलने से शुरू हुआ, और snacks ने इसे बचाए रखा.

Published exhibition history पर आधारित commentary. ये screening review नहीं है.

पुराने cinema में reel बदलने के लिए break होता था.
Hindi writers आज भी interval point लिखते हैं: beginning, interval, climax.
Ticket का पैसा film के साथ बंटता है. पॉपकॉर्न का पैसा theatre अपने पास रखता है.
Sangam (1964) में दो interval थे. Digital projection के बाद technical ज़रूरत खत्म हुई, पर Indian halls अब भी Hollywood films में cut लगाते हैं.

Film stills और posters copyrighted publicity images हैं. इन्हें commentary के लिए, credit के साथ इस्तेमाल किया गया है. ये licensed नहीं हैं.

Sources:
Intermission, Wikipedia: https://en.wikipedia.org/wiki/Intermission
Times of India, Chintamani और Dungarpur पर intermission: https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/hitchcock-to-cameron-hollywood-to-bollywood-how-the-intermission-divides-opinions-not-just-screenings/articleshow/96700431.cms
The Hindu, 2018: https://www.thehindu.com/entertainment/movies/who-wants-a-washroom-break/article25203118.ece
News18, Sangam के दो intervals: https://www.news18.com/entertainment/bollywood/why-sangam-the-raj-kapoor-film-had-two-intervals-7635391.html

Movie Idiots.

#Bollywood #Interval #Hollywood #HindiShorts #MovieIdiots`,
  tags: [
    'bollywood interval', 'intermission', 'sangam', 'hollywood in india', 'hindi shorts',
    'movie idiots', 'indian cinema facts', 'why interval in indian movies',
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
