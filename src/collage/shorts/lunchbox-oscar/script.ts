// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still lunchbox-oscar --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'lunchbox-oscar';
export const title = 'Cannes hit film India ने Oscars पे नहीं भेजी #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "A Cannes hit, yet India never sent it to the Oscars?",
    text: "Cannes hit, फिर भी India ने Oscars पे नहीं भेजी?",
    delivery: {sfx: [{word: "Oscars", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "Here is how the Oscar pick works, and where it went wrong.",
    text: "Oscar pick कैसे होता है, और गड़बड़ कहाँ हुई, ये देखिए.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "The Lunchbox premiered at Cannes Critics Week in 2013 and got a standing ovation.",
    text: "2013 में The Lunchbox, Cannes Critics Week में दिखी. Standing ovation मिला.",
    delivery: {sfx: [{word: "Cannes", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: "Sony Pictures Classics then bought the North America rights.",
    text: "फिर Sony Pictures Classics ने North America के rights ले लिए.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: [2, 3],
    en: "Each country can send only one film to the Oscars. India's committee picked The Good Road, a Gujarati film.",
    text: "हर देश से सिर्फ़ एक film Oscars में जाती है. India की committee ने Gujarati film The Good Road को चुना.",
    delivery: {sfx: [{word: "Road", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3r',
    role: 'reveal',
    source: 4,
    en: "Gautam Ghose said The Lunchbox was his personal first pick. But the committee decided together.",
    text: "Gautam Ghose ने कहा, The Lunchbox उनकी personal first pick थी. पर फ़ैसला committee ने मिलकर किया.",
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    en: "The Good Road was never nominated. The Lunchbox never reached the Oscars at all.",
    text: "The Good Road को nomination नहीं मिला. The Lunchbox तो Oscars तक पहुँची ही नहीं.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So India never sent The Lunchbox to the Oscars?",
    text: "तो India ने The Lunchbox को Oscars पे भेजा ही नहीं?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/The_Lunchbox_(film)',
    note: 'The Lunchbox screened in Critics’ Week at Cannes 2013; standing ovation reported; won the Critics’ Week Viewers Choice Award (Grand Rail d’Or).',
  },
  {
    url: 'https://variety.com/2013/film/news/sony-pictures-classics-picks-up-lunchbox-exclusive-1200487504/',
    note: 'Variety (24 May 2013): Sony Pictures Classics acquired all North American rights after Cannes Critics’ Week.',
  },
  {
    url: 'https://variety.com/2013/film/awards/india-makes-surprise-oscar-choice-1200656684/',
    note: 'Variety (21 Sep 2013): Film Federation of India selected The Good Road over The Lunchbox as the official Oscar entry.',
  },
  {
    url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/the-lunchbox-was-my-oscar-choice-ghose/articleshow/23046768.cms',
    note: 'TOI (25 Sep 2013): jury chair Goutam Ghose said The Lunchbox was on top of his personal list; a 16-member panel chose The Good Road. Later clarification: collective choice, not a chairman veto.',
  },
  {url: 'https://www.npr.org/2014/01/18/263106196/lunch-gets-boxed-out-indias-oscar-pick-controversy', note: 'NPR (18 Jan 2014): background on the Oscar pick controversy.'},
];

export const lexicon: Record<string, string> = {
  cannes: 'कान',
  oscars: 'ऑस्कर्स',
  sony: 'सोनी',
  classics: 'क्लासिक्स',
  lunchbox: 'लंचबॉक्स',
  critics: 'क्रिटिक्स',
  week: 'वीक',
  standing: 'स्टैंडिंग',
  ovation: 'ओवेशन',
  pictures: 'पिक्चर्स',
  north: 'नॉर्थ',
  america: 'अमेरिका',
  rights: 'राइट्स',
  jury: 'जूरी',
  gujarati: 'गुजराती',
  good: 'गुड',
  road: 'रोड',
  ghose: 'घोष',
  personal: 'पर्सनल',
  nominated: 'नॉमिनेटेड',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Oscars पे\nभेजी नहीं',
    accent: ['Oscars'],
    still: {
      src: 'shorts/lunchbox-oscar/stills/pair.jpg',
      film: 'The Lunchbox',
      year: 2013,
      credit: 'Sikhya Entertainment',
      focus: '50% 40%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Cannes 2013\nCritics Week',
      accent: ['Cannes'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/irrfan.jpg',
        film: 'The Lunchbox',
        year: 2013,
        credit: 'Sikhya Entertainment',
        focus: '50% 40%',
      },
      pop: {word: 'Cannes', text: 'CANNES'},
    },
    {
      lines: ['f2'],
      headline: 'Sony Classics\nNorth America',
      accent: ['Sony'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/nimrat.jpg',
        film: 'The Lunchbox',
        year: 2013,
        credit: 'Sikhya Entertainment',
        focus: '50% 40%',
      },
    },
    {
      lines: ['f3', 'f3r'],
      headline: 'Entry:\nThe Good Road',
      accent: ['Road'],
      still: {
        src: 'shorts/lunchbox-oscar/stills/good-road.jpg',
        film: 'The Good Road',
        year: 2013,
        credit: 'NFDC',
        focus: '50% 30%',
      },
      pop: {word: 'Road', text: 'GOOD ROAD'},
      reveal: {line: 'f3r', headline: 'Ghose: personal first', accent: ['first']},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Nominated\nनहीं हुई',
    accent: ['नहीं'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Cannes hit film India ने Oscars पे नहीं भेजी? #shorts',
  altTitles: [
    'The Lunchbox Oscars पे क्यों नहीं गई? #shorts',
    'The Good Road vs The Lunchbox: 2013 Oscar entry #shorts',
  ],
  description: `The Lunchbox एक Cannes hit थी, और Sony Pictures Classics ने इसके North America rights लिए. फिर भी India ने 2013 में Oscars के लिए The Good Road भेजी.

The Good Road पर कोई joke नहीं है. Joke उस process पर है जिससे entry चुनी गई.

Published reports और interviews पर आधारित commentary. ये screening review नहीं है.

2013: The Lunchbox, Cannes Critics Week में दिखी. Standing ovation मिला.
Sony Pictures Classics ने North America rights लिए.
हर देश से सिर्फ़ एक film Oscars में जाती है. India की committee ने Gujarati film The Good Road को चुना.
Gautam Ghose ने कहा, The Lunchbox उनकी personal first pick थी. पर फ़ैसला committee ने मिलकर किया.
The Good Road को nomination नहीं मिला.

Film stills और posters copyrighted publicity images हैं. इन्हें commentary के लिए, credit के साथ इस्तेमाल किया गया है. ये licensed नहीं हैं.

Sources:
The Lunchbox, Wikipedia: https://en.wikipedia.org/wiki/The_Lunchbox_(film)
Sony Pictures Classics, Variety, 24 May 2013: https://variety.com/2013/film/news/sony-pictures-classics-picks-up-lunchbox-exclusive-1200487504/
India's Oscar choice, Variety, 21 Sep 2013: https://variety.com/2013/film/awards/india-makes-surprise-oscar-choice-1200656684/
Gautam Ghose, Times of India, 25 Sep 2013: https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/the-lunchbox-was-my-oscar-choice-ghose/articleshow/23046768.cms
Background, NPR, 18 Jan 2014: https://www.npr.org/2014/01/18/263106196/lunch-gets-boxed-out-indias-oscar-pick-controversy

Movie Idiots.

#TheLunchbox #Oscars #IrrfanKhan #TheGoodRoad #HindiShorts #MovieIdiots`,
  tags: [
    'the lunchbox', 'irrfan khan', 'nimrat kaur', 'oscars', 'the good road', 'cannes',
    'ritesh batra', 'gautam ghose', 'hindi shorts', 'movie idiots', 'indian cinema facts',
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
