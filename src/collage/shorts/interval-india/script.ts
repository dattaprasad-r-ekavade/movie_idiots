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
    text: 'Hollywood film भारत में बीच में interval लग जाता है?',
    delivery: {rate: 16, sfx: [{word: 'interval', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    text: 'Reel की वजह से शुरू हुआ. Samosa ने बचा के रखा।',
    delivery: {rate: 16},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    text: 'पुरानी cinema में reel बदलने के लिए break लगता था. हर जगह।',
    delivery: {rate: 16, sfx: [{word: 'reel', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    text: 'Hindi writers interval point लिखते हैं. Beginning, interval, climax।',
    delivery: {rate: 16},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [0, 2],
    text: 'Theatre का पैसा popcorn से आता है. Ticket बंट जाता है, snacks नहीं।',
    delivery: {rate: 16, sfx: [{word: 'popcorn', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [3, 0],
    text: 'Sangam में दो interval थे. Digital के बाद भी Hollywood पे यहाँ cut लगता है।',
    delivery: {rate: 18},
  },
  {
    id: 'loop',
    role: 'loop',
    text: 'बीच में interval लग जाता है?',
    delivery: {rate: 16},
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
  title: 'Hollywood film भारत में बीच में interval लग जाता है #shorts',
  altTitles: [
    'Interval samosa के लिए है? Reel से शुरू हुआ #shorts',
    'Sangam में दो interval थे #shorts',
  ],
  description: `Hollywood film भारत के hall में आती है और बीच में interval लग जाता है. Reel change से शुरू हुआ, snacks ने रखा.

Published exhibition history पर commentary.

पुरानी cinema — reel बदलने का break, दुनिया भर में
Hindi writers — beginning / interval / climax (Parsi theatre legacy, as told to historians)
Theatre economics — F&B is the exhibitor's own money
Sangam (1964) had two intervals; digital projection killed the technical need; Indian halls still cut Hollywood films

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
Sangam — R.K. Films / Bollywood Hungama / Indian Express

Sources:
Intermission, Wikipedia — https://en.wikipedia.org/wiki/Intermission
TOI / Chintamani / Dungarpur — https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/hitchcock-to-cameron-hollywood-to-bollywood-how-the-intermission-divides-opinions-not-just-screenings/articleshow/96700431.cms
The Hindu — https://www.thehindu.com/entertainment/movies/who-wants-a-washroom-break/article25203118.ece
Sangam two intervals — https://www.news18.com/entertainment/bollywood/why-sangam-the-raj-kapoor-film-had-two-intervals-7635391.html

Movie Idiots.

#Bollywood #Interval #Hollywood #HindiShorts #MovieIdiots`,
  tags: [
    'bollywood interval', 'intermission', 'sangam', 'hindi shorts', 'movie idiots',
    'why interval in indian movies',
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
