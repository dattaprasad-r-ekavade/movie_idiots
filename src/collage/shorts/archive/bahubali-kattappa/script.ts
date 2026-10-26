// "Did you know?" Short, design v2 (marquee). Hook: why did Kattappa kill Baahubali? The answer is
// withheld for two years, until Baahubali 2: The Conclusion (2017). The reason itself is not spelled out
// here; the payoff is the wait and the box office, which is said as "लगभग" (estimates vary by source).
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'bahubali-kattappa';
export const title = 'Baahubali के एक सवाल ने कितना कमाया? #shorts';
export const format = 'fun-facts' as const;
export const topic = 'telugu';
export const music = 'mass-entry';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "How much did one Baahubali question earn?",
    text: "Baahubali के एक सवाल ने कितना कमाया?",
    say: "बाहुबली के एक सवाल ने कितना कमाया?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "Baahubali: The Beginning came out in 2015, and its ending was Kattappa killing Baahubali.",
    text: "Baahubali: The Beginning 2015 में आई, और उसका आख़िरी scene यही था: Kattappa ने Baahubali को मार दिया.",
    say: "बाहुबली: द बिगिनिंग दो हज़ार पंद्रह में आई, और उसका आख़िरी सीन यही था: कट्टप्पा ने बाहुबली को मार दिया।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0],
    en: "But the film never said why, and the question became a marketing catchphrase.",
    text: "पर फ़िल्म ने ये नहीं बताया कि उसने ऐसा क्यों किया, और सवाल marketing का catchphrase बन गया.",
    say: "पर फ़िल्म ने ये नहीं बताया कि उसने ऐसा क्यों किया, और सवाल मार्केटिंग का कैचफ़्रेज़ बन गया।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'नहीं', tag: 'skeptical'}]},
  },
  {
    id: 'f3',
    role: 'tension',
    source: [0, 1],
    en: "Even then, people had to wait for the next film, about two years.",
    text: "फिर भी जवाब के लिए लोगों को अगली film तक, लगभग दो साल, रुकना पड़ा.",
    say: "फिर भी जवाब के लिए लोगों को अगली फ़िल्म तक, लगभग दो साल, रुकना पड़ा।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2],
    en: "Baahubali 2 gave the answer, and worldwide it earned about ₹1,800 crore.",
    text: "Baahubali 2 में इसका जवाब आया, और film ने worldwide लगभग ₹1,800 करोड़ कमाए.",
    say: "बाहुबली टू में इसका जवाब आया, और फ़िल्म ने वर्ल्डवाइड लगभग अठारह सौ करोड़ रुपये कमाए।",
    delivery: {emotion: 'proud', cues: [{word: 'लगभग', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "One Baahubali question: how much?",
    text: "Baahubali का एक सवाल... कितना कमाया?",
    say: "बाहुबली का एक सवाल... कितना कमाया?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Baahubali:_The_Beginning',
    note: 'Release 10 July 2015, directed by SS Rajamouli. The film ends with Kattappa confessing that he murdered Baahubali. "Why did Kattappa kill Baahubali" was the marketing catchphrase (coined by Spice PR). The sequel came out 28 April 2017, about two years later. The plot summary does not say the film answers the question.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Baahubali_2:_The_Conclusion',
    note: 'Original Telugu release 28 April 2017. Worldwide box office ₹1,810.60 crore (estimated; footnote credits Bollywood Hungama and Box Office India). The film addresses why Kattappa killed Baahubali.',
  },
  {
    url: 'https://gulfnews.com/entertainment/south-indian/baahubali-2-becomes-indias-highest-grossing-movie-1.2024276',
    note: 'Gulf News, May 2017: Baahubali 2 became the first Indian film to cross ₹1,000 crore internationally. Trajectory only; not the final lifetime total.',
  },
  {
    url: 'https://screenanarchy.com/2015/07/review-ss-rajamoulis-baahubali---the-beginning-is-a-world-class-epic.html',
    note: 'ScreenAnarchy review, July 2015: Baahubali: The Beginning reviewed on release. Supports the 2015 date.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  kattappa: 'कट्टप्पा',
  baahubali: 'बाहुबली',
  beginning: 'बिगिनिंग',
  conclusion: 'कॉन्क्लूज़न',
  catchphrase: 'कैचफ़्रेज़',
  marketing: 'मार्केटिंग',
  worldwide: 'वर्ल्डवाइड',
  seen: 'सीन',
  film: 'फ़िल्म',
};

const BEGIN = {film: 'Baahubali: The Beginning', year: 2015, credit: 'Arka Media Works'};
const CONCL = {film: 'Baahubali 2: The Conclusion', year: 2017, credit: 'Arka Media Works'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Baahubali के एक सवाल\nने कितना कमाया?',
    accent: ['कितना'],
    // Official theatrical poster of the film that ends on the question, sharp from the first frame.
    still: {src: 'shorts/bahubali-kattappa/stills/beginning-poster.jpg', ...BEGIN, aspect: 263 / 380, focus: '50% 30%'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: '2015 का\nआख़िरी scene',
      accent: ['2015'],
      layout: 'ticket',
      ticket: {word: '2015', title: 'BAAHUBALI', figure: '10 जुलाई', sub: 'The Beginning, 2015'},
      still: {src: 'shorts/bahubali-kattappa/stills/beginning-poster.jpg', ...BEGIN, aspect: 263 / 380, focus: '50% 30%'},
    },
    {
      lines: ['f2'],
      headline: 'जवाब नहीं,\nसिर्फ़ मार्केटिंग',
      accent: ['नहीं'],
      layout: 'print',
      still: {src: 'shorts/bahubali-kattappa/stills/beginning-poster.jpg', ...BEGIN, aspect: 263 / 380, focus: '50% 30%'},
      pop: {word: 'नहीं', text: 'NO ANSWER'},
    },
    {
      lines: ['f3'],
      headline: 'जवाब के लिए\nलंबा इंतज़ार',
      accent: ['इंतज़ार'],
      layout: 'number',
      number: {word: 'दो', value: 2, suffix: ' साल', label: 'इंतज़ार'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'जवाब आया,\nकमाई ₹1,800 करोड़',
    accent: ['₹1,800'],
    still: {src: 'shorts/bahubali-kattappa/stills/conclusion-poster.jpg', ...CONCL, aspect: 258 / 386, focus: '50% 30%'},
    pop: {word: '₹1,800', text: 'लगभग ₹1,800 CR'},
  },
  loop: {lines: ['loop']},
  numbered: true,
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Baahubali के एक सवाल ने कितना कमाया? #shorts',
  altTitles: [
    'Kattappa ने Baahubali को क्यों मारा? 2 साल का इंतज़ार #shorts',
    'एक सवाल, दो साल, ₹1,800 करोड़: Baahubali #shorts',
  ],
  description: `Baahubali: The Beginning (2015) एक सवाल पर ख़त्म हुई: Kattappa ने Baahubali को क्यों मारा? जवाब के लिए लगभग दो साल इंतज़ार करना पड़ा, और Baahubali 2: The Conclusion (2017) ने worldwide लगभग ₹1,800 करोड़ कमाए.

Box-office figures estimates हैं: Wikipedia ₹1,810.60 crore (citing Bollywood Hungama and Box Office India); दूसरे estimates ₹1,737 crore के आसपास.

Sources:
Baahubali: The Beginning, Wikipedia: https://en.wikipedia.org/wiki/Baahubali:_The_Beginning
Baahubali 2: The Conclusion, Wikipedia: https://en.wikipedia.org/wiki/Baahubali_2:_The_Conclusion
Gulf News, May 2017: https://gulfnews.com/entertainment/south-indian/baahubali-2-becomes-indias-highest-grossing-movie-1.2024276

Posters copyrighted हैं (Arka Media Works), commentary support के लिए थोड़ी देर इस्तेमाल हुए.

Movie Idiots.

#Baahubali #Kattappa #Prabhas #SSRajamouli #BoxOffice #HindiShorts #MovieIdiots`,
  tags: ['baahubali', 'baahubali 2', 'kattappa', 'why kattappa killed baahubali', 'prabhas', 'ss rajamouli', 'box office', 'hindi shorts', 'movie idiots'],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real posters with a stylised mascot, not realistic)',
    audience: 'Not made for kids',
  },
};
