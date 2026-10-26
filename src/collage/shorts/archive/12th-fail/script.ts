// Fun-facts Short, design v2 (marquee). Batch 3 #5 (`12th-fail-day-one` in docs/shorts-ideas.md).
// Finished in FilmCraft (grade, light leaks, shake) after the Remotion render; see docs/collage-shorts.md.
// Day 1 vs India lifetime is India-to-India gross (Sacnilk). Amounts are read from Devanagari `say` lines.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = '12th-fail';
export const title = '12th Fail ने पहले दिन सिर्फ़ ₹1.32 करोड़ कमाए थे? #shorts';
export const format = 'fun-facts' as const;
// Real people (Manoj Kumar Sharma, Vikrant Massey): plural verbs.
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "12th Fail earned only ₹1.32 crore in India on day one?",
    text: "12th Fail ने पहले दिन India में सिर्फ़ ₹1.32 करोड़ कमाए?",
    say: "ट्वेल्थ फ़ेल ने पहले दिन इंडिया में सिर्फ़ एक करोड़ बत्तीस लाख कमाए?",
    delivery: {emotion: 'curious', sfx: [{word: "सिर्फ़", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'fact',
    source: [1, 2],
    en: "It is the real story of IPS officer Manoj Kumar Sharma.",
    text: "ये IPS officer Manoj Kumar Sharma की असली कहानी पर बनी है.",
    delivery: {emotion: 'warm'},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [0, 1],
    en: "The budget was about ₹20 crore, but day one in India brought just ₹1.32 crore.",
    text: "Budget करीब ₹20 करोड़ था, पर पहले दिन India में कमाई बस ₹1.32 करोड़ हुई.",
    say: "बजट करीब बीस करोड़ था, पर पहले दिन इंडिया में कमाई बस एक करोड़ बत्तीस लाख हुई.",
    delivery: {emotion: 'matter-of-fact', cues: [{word: 'बस', tag: 'disappointed'}]},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [0, 1],
    en: "Then it became a sleeper hit, and India earnings crossed ₹66 crore.",
    text: "फिर film sleeper hit बन गई, और India में कमाई ₹66 करोड़ से ज़्यादा पहुँच गई.",
    say: "फिर फ़िल्म स्लीपर हिट बन गई, और इंडिया में कमाई छियासठ करोड़ से ज़्यादा पहुँच गई.",
    delivery: {emotion: 'excited', sfx: [{word: "पहुँच", sound: 'coin.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "That is about fifty times day one. And Vikrant Massey won the Best Actor National Award for this role.",
    text: "यानी पहले दिन से करीब 50 गुना. और Vikrant Massey को इसी role के लिए Best Actor का National Award मिला.",
    delivery: {emotion: 'proud', cues: [{word: 'Vikrant', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "And day one? Just ₹1.32 crore.",
    text: "और पहले दिन? सिर्फ़ ₹1.32 करोड़.",
    say: "और पहले दिन? सिर्फ़ एक करोड़ बत्तीस लाख.",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.sacnilk.com/news/12th_Fail_2023_Box_Office_Collection_Day_Wise_Worldwide?hl=en',
    note: 'Sacnilk (updated 4 Feb 2024): day 1 (27 Oct 2023) India gross ₹1.32 crore (net ₹1.11 crore); India gross lifetime ₹66.55 crore; overseas ₹3.50 crore; worldwide gross ₹70.05 crore. 66.55 / 1.32 ≈ 50.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/12th_Fail',
    note: 'Based on Anurag Pathak\'s 2019 non-fiction book (Indian Express). Released 27 Oct 2023. Budget ₹20 crore (ABP News). Worldwide ₹69.64 crore estimate (Bollywood Hungama). "Sleeper hit". 69th Filmfare: Best Film. 71st National Film Awards: Best Feature Film and Best Actor (Vikrant Massey) (News18).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Manoj_Kumar_Sharma',
    note: 'IPS officer, 2005 batch, Maharashtra cadre. His journey was chronicled in Anurag Pathak\'s book Twelfth Fail, adapted into the 2023 film with Vikrant Massey as Sharma. Married to IRS officer Shraddha Joshi.',
  },
];

export const lexicon: Record<string, string> = {
  ips: 'आईपीएस',
  officer: 'ऑफ़िसर',
  manoj: 'मनोज',
  kumar: 'कुमार',
  sharma: 'शर्मा',
  vikrant: 'विक्रांत',
  massey: 'मैसी',
  role: 'रोल',
  national: 'नेशनल',
  award: 'अवॉर्ड',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: '12th Fail ने\nकितना कमाया?',
    accent: ['12th', 'Fail'],
    still: {
      src: 'shorts/12th-fail/stills/vikrant.jpg',
      film: 'Vikrant Massey',
      credit: 'Bollywood Hungama / Wikimedia Commons',
      aspect: 1,
      focus: '50% 12%',
    },
    react: {word: 'सिर्फ़', expression: 'shock', pose: 'shrug'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'असली कहानी:\nIPS Manoj Sharma',
      accent: ['IPS'],
      layout: 'print',
      // Premiere photo: the real Manoj Kumar Sharma and Shraddha Joshi with the film's leads.
      still: {
        src: 'shorts/12th-fail/stills/premiere.jpg',
        film: '12th Fail premiere',
        year: 2023,
        credit: 'Bollywood Hungama / Wikimedia Commons',
        aspect: 585 / 540,
        focus: '50% 35%',
      },
      pop: {word: 'असली', text: 'TRUE STORY'},
    },
    {
      lines: ['f2'],
      headline: 'Budget ~₹20 करोड़,\nDay 1 पर कितना आया?',
      accent: ['Day'],
      layout: 'ticket',
      ticket: {word: 'पहले', title: '12th Fail · Day 1', figure: '₹1.32 Cr', sub: 'India gross · Sacnilk'},
      still: {
        src: 'shorts/12th-fail/stills/poster.jpg',
        film: '12th Fail',
        year: 2023,
        credit: 'Vinod Chopra Films / Zee Studios',
        aspect: 1.1,
        focus: '50% 30%',
      },
    },
    {
      lines: ['f3'],
      headline: 'फिर बनी\nsleeper hit',
      accent: ['sleeper'],
      layout: 'number',
      number: {word: 'कमाई', value: 66, prefix: '₹', suffix: ' करोड़+', label: 'India gross · Sacnilk'},
      still: {
        src: 'shorts/12th-fail/stills/premiere.jpg',
        film: '12th Fail premiere',
        year: 2023,
        credit: 'Bollywood Hungama / Wikimedia Commons',
        aspect: 1.4,
        focus: '50% 40%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '50 गुना\nऔर Best Actor',
    accent: ['50'],
    still: {
      src: 'shorts/12th-fail/stills/poster.jpg',
      film: '12th Fail',
      year: 2023,
      credit: 'Vinod Chopra Films / Zee Studios',
      aspect: 282 / 353,
      focus: '50% 40%',
    },
    // "50x" is an EffectCraft sting overlaid in FilmCraft on the word "50" (projects/shorts/12th-fail/fx).
    cuts: [{
      word: 'Vikrant',
      src: 'shorts/12th-fail/stills/national-award.jpg',
      film: '71st National Film Awards',
      year: 2025,
      credit: "President's Secretariat (GODL-India)",
      aspect: 1,
      focus: '50% 0%',
    }],
    react: {word: 'National', expression: 'happy', pose: 'thumbsUp'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: '12th Fail ने पहले दिन सिर्फ़ ₹1.32 करोड़ कमाए थे? #shorts',
  altTitles: [
    '12th Fail: ₹1.32 करोड़ से ₹66 करोड़ तक #shorts',
    'Vikrant Massey की 12th Fail कैसे बनी sleeper hit? #shorts',
  ],
  description: `12th Fail ने पहले दिन India में सिर्फ़ ₹1.32 करोड़ (gross) कमाए. फिर film sleeper hit बनी और कमाई पहुँची करीब ₹66.55 करोड़ — पहले दिन से करीब 50 गुना.

Day 1 (27 Oct 2023) India gross ₹1.32 crore; India lifetime gross ₹66.55 crore; worldwide ₹70.05 crore (Sacnilk, updated 4 Feb 2024).
Budget about ₹20 crore (Wikipedia, citing ABP News). Called a sleeper hit (Wikipedia, citing Bollywood Hungama).
Based on Anurag Pathak's book about IPS officer Manoj Kumar Sharma (Wikipedia).
Vikrant Massey won Best Actor at the 71st National Film Awards; the film won Best Feature Film and Filmfare Best Film (Wikipedia).

Box-office figures are trade estimates and differ slightly between sources.

Sources:
Sacnilk box office — https://www.sacnilk.com/news/12th_Fail_2023_Box_Office_Collection_Day_Wise_Worldwide?hl=en
12th Fail — https://en.wikipedia.org/wiki/12th_Fail
Manoj Kumar Sharma — https://en.wikipedia.org/wiki/Manoj_Kumar_Sharma

Movie Idiots.

#12thFail #VikrantMassey #ManojKumarSharma #BoxOffice #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    '12th fail', 'vikrant massey', 'manoj kumar sharma', '12th fail box office', 'sleeper hit',
    'vidhu vinod chopra', 'bollywood trivia', 'hindi shorts', 'movie idiots',
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
