// Fun-facts Short, design v2 (lagoon). Batch 3 #3 (`flop-fee` in docs/shorts-ideas.md): the FEE, not the box office
// (budget-vs-box-office covers that). Every fee is a press report: no official source confirmed one, so the figure
// is said as reported ("Reports के मुताबिक"). The ₹150 crore reports are left out on purpose (they conflict).
// The Suriya/Kanguva contrast from the idea is cut: it does not push toward the answer.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'flop-fee';
export const title = 'Adipurush में Prabhas की fee ₹100 करोड़ थी? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'pahadi-winter';
// Real people throughout: plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Was Prabhas's Adipurush fee really ₹100 crore?",
    text: "Adipurush में Prabhas की fee सच में ₹100 करोड़ थी?",
    say: "आदिपुरुष में प्रभास की फ़ीस सच में सौ करोड़ थी?",
    delivery: {emotion: 'curious', sfx: [{word: "सच", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: 0,
    en: "Prabhas played Raghava in Adipurush, the film that came out in 2023.",
    text: "Prabhas ने Adipurush में Raghava का role किया था, वही film जो 2023 में आई.",
    say: "प्रभास ने आदिपुरुष में राघव का रोल किया था, वही फ़िल्म जो दो हज़ार तेईस में आई.",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [1, 2],
    en: "But the fee never came from anyone official. It only came through news reports, year after year.",
    text: "पर ये fee कभी official source से नहीं आई, बस news reports में घूमती रही.",
    say: "पर ये फ़ीस कभी ऑफ़िशियल सोर्स से नहीं आई, बस न्यूज़ रिपोर्ट्स में घूमती रही.",
    delivery: {emotion: 'matter-of-fact', cues: [{word: 'बस', tag: 'skeptical'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2],
    en: "Reportedly, yes, ₹100 crore. But no official source has confirmed it.",
    text: "Reports के मुताबिक, हाँ, ₹100 करोड़. पर किसी official source ने इसे confirm नहीं किया.",
    say: "रिपोर्ट्स के मुताबिक, हाँ, सौ करोड़. पर किसी ऑफ़िशियल सोर्स ने इसे कन्फ़र्म नहीं किया.",
    delivery: {emotion: 'playful', cues: [{word: 'Reports', tag: 'amused'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So was the Adipurush fee really ₹100 crore?",
    text: "तो Adipurush की fee सच में ₹100 करोड़ थी?",
    say: "तो आदिपुरुष की फ़ीस सच में सौ करोड़ थी?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://newsable.asianetnews.com/gallery/entertainment/know-how-much-prabhas-charged-for-playing-lord-ram-in-adipurush-his-fees-will-blow-your-mind-drb-rj9pl3',
    note: 'Asianet Newsable, 5 Oct 2022: "If reports are to be believed, the actor has charged a whopping amount of Rs 100 crore for Adipurush." Unnamed reports, not confirmed.',
  },
  {
    url: 'https://www.ibtimes.co.in/prabhas-take-home-whopping-rs-100-cr-adipurush-reports-841389',
    note: 'IBTimes India, 7 Oct 2021: "There are reports that Prabhas has charged Rs 100 crore for Adipurush." Reported, no named source. The makers statement in the article is about rumours on a co-star, not the fee.',
  },
  {
    url: 'https://filmibeat.com/top-listing/check-out-the-fees-charged-by-the-cast-of-the-movie-adipurush-7-1407.html',
    note: 'Filmibeat, 20 May 2023: "According to reports the actor who charges Rs 100 crores as remuneration for his upcoming movie Adipurush." Reported, not confirmed.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Adipurush',
    note: 'Wikipedia: cast list "Prabhas as Raghava"; released 16 June 2023. Used for the role name and release year only.',
  },
  {
    url: 'https://www.etvbharat.com/english/sitara/cinema/prabhas-highest-paid-actor-in-india-with-his-rs-150-cr-paycheck/na20211124131215607',
    note: 'ETV Bharat, 24 Nov 2021: "If reports are to be believed, the actor will be taking home ₹150 crores for ... Adipurush." Higher figure from reports. Conflicts with the ₹100 crore reports, so not spoken; mentioned in the description only as a caveat.',
  },
];

export const lexicon: Record<string, string> = {
  adipurush: 'आदिपुरुष',
  prabhas: 'प्रभास',
  raghava: 'राघव',
  fee: 'फ़ीस',
  reports: 'रिपोर्ट्स',
  official: 'ऑफ़िशियल',
  source: 'सोर्स',
  confirm: 'कन्फ़र्म',
  role: 'रोल',
  film: 'फ़िल्म',
  news: 'न्यूज़',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: 'Prabhas की fee\n₹100 करोड़ थी?',
    accent: ['Prabhas'],
    still: {
      src: 'shorts/flop-fee/stills/prabhas.jpg',
      film: 'Prabhas',
      credit: 'Gage Skidmore / Wikimedia Commons',
      aspect: 2820 / 3559,
      focus: '50% 25%',
    },
    react: {word: 'सच', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Raghava का role:\nAdipurush',
      accent: ['Raghava'],
      layout: 'print',
      still: {
        src: 'shorts/flop-fee/stills/adipurush-poster.jpg',
        film: 'Adipurush',
        year: 2023,
        credit: 'T-Series (poster), via Wikipedia',
        aspect: 282 / 353,
        focus: '50% 30%',
      },
    },
    {
      lines: ['f2'],
      headline: 'आँकड़ा बस\nreports से आया',
      accent: ['reports'],
      layout: 'ticket',
      ticket: {word: 'reports', title: 'Adipurush · Prabhas fee', figure: 'REPORTED', sub: 'news reports, 2021–2023'},
      still: {
        src: 'shorts/flop-fee/stills/prabhas.jpg',
        film: 'Prabhas',
        credit: 'Gage Skidmore / Wikimedia Commons',
        aspect: 2820 / 3559,
        focus: '50% 15%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Reports कहती हैं ₹100 करोड़,\nपर confirm नहीं',
    accent: ['confirm'],
    still: {
      src: 'shorts/flop-fee/stills/prabhas.jpg',
      film: 'Prabhas',
      credit: 'Gage Skidmore / Wikimedia Commons',
      aspect: 2820 / 3559,
      focus: '50% 25%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Adipurush में Prabhas की fee ₹100 करोड़ थी? #shorts',
  altTitles: [
    'Prabhas की Adipurush fee: reports क्या कहती हैं? #shorts',
    'Adipurush की fee पर official confirmation है? #shorts',
  ],
  description: `Adipurush में Prabhas की fee ₹100 करोड़ बताई गई थी. पर ये figure official तौर पर confirm नहीं हुई, सिर्फ़ news reports में आई.

Prabhas's ₹100 crore fee for Adipurush is reported, not confirmed: IBTimes (Oct 2021), Asianet Newsable (Oct 2022), Filmibeat (May 2023). Some outlets reported a higher figure (ETV Bharat, Nov 2021); none is confirmed.
Adipurush: Prabhas played Raghava; released 16 June 2023 (Wikipedia).

Images: Prabhas, Gage Skidmore, CC BY-SA 3.0, via Wikimedia Commons (cropped only). The Adipurush poster (copyright T-Series) is used as credited commentary on the film, per Wikipedia's fair-use note.

Sources:
Asianet Newsable (Adipurush fee, 2022) — https://newsable.asianetnews.com/gallery/entertainment/know-how-much-prabhas-charged-for-playing-lord-ram-in-adipurush-his-fees-will-blow-your-mind-drb-rj9pl3
IBTimes (Adipurush fee, 2021) — https://www.ibtimes.co.in/prabhas-take-home-whopping-rs-100-cr-adipurush-reports-841389
Filmibeat (Adipurush cast fees, 2023) — https://filmibeat.com/top-listing/check-out-the-fees-charged-by-the-cast-of-the-movie-adipurush-7-1407.html
ETV Bharat (higher reported figure, 2021) — https://www.etvbharat.com/english/sitara/cinema/prabhas-highest-paid-actor-in-india-with-his-rs-150-cr-paycheck/na20211124131215607
Adipurush (Wikipedia) — https://en.wikipedia.org/wiki/Adipurush

Movie Idiots.

#Adipurush #Prabhas #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'adipurush', 'prabhas', 'adipurush fee', 'prabhas fee', 'bollywood trivia', 'south cinema',
    'hindi shorts', 'movie idiots',
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
