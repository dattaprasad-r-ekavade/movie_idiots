// Fun-facts Short, design v2 (velvet, like guide-twins). Batch 2 #2. Hook opens on a famous face;
// 3 facts, no promise line, 28–40 s. Amitabh's reason is reported, not confirmed, so it is said as "कहा जाता है".
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'mr-india';
export const title = 'Mr. India पहले Amitabh को offer हुई थी? #shorts';
export const format = 'fun-facts' as const;
// Real people throughout: plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Was Mr. India first offered to Amitabh?",
    text: "Mr. India पहले Amitabh को offer हुई थी?",
    delivery: {emotion: 'curious', sfx: [{word: "Amitabh", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "Salim-Javed first wrote the role for Rajesh Khanna.",
    text: "Salim-Javed ने ये role पहले Rajesh Khanna के लिए लिखा था.",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [0, 1],
    en: "And Mogambo? It was first Anupam Kher. He says he was dropped without being told.",
    text: "और Mogambo? पहले Anupam Kher थे. उनका कहना है, उन्हें बिना बताए हटा दिया गया.",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'बिना', tag: 'surprised'}], sfx: [{word: "हटा", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3',
    role: 'fact',
    source: 0,
    en: "The film earned about ₹10 crore and became the second-biggest hit of 1987.",
    text: "Film करीब ₹10 करोड़ कमाकर 1987 की दूसरी सबसे बड़ी hit बनी.",
    // The voice reads "₹" badly; say the amount in words.
    say: "फ़िल्म करीब दस करोड़ रुपये कमाकर नाइनटीन एटी सेवन की दूसरी सबसे बड़ी हिट बनी.",
    delivery: {emotion: 'impressed'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 2],
    en: "Amitabh said no. Reportedly, he felt the real hero was the invisible man. Then the role went to Anil Kapoor.",
    text: "Amitabh ने मना कर दिया. कहा जाता है, उनका कहना था कि असली hero तो invisible है. फिर role मिला Anil Kapoor को.",
    delivery: {cues: [{word: 'असली', tag: 'amused'}, {word: 'फिर', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So yes, Mr. India was first offered to Amitabh.",
    text: "तो हाँ, Mr. India पहले Amitabh को offer हुई थी.",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Mr._India_(1987_film)',
    note: 'Written by Salim–Javed for Rajesh Khanna, then offered to Amitabh Bachchan (Chaudhuri 2015). Bachchan quote "The real hero of the film is an invisible character. So why do you need me?" (Stardust, Feb 2005). Mogambo first offered to Anupam Kher (Mumbai Mirror, 4 Feb 2014). Budget ₹3.8 crore; Box Office India estimate ₹10 crore; second highest-grossing film of 1987. Anil Kapoor and Sridevi lead.',
  },
  {
    url: 'https://www.bollywoodhungama.com/news/features/anupam-kher-reveals-best-friend-anil-kapoor-got-fired-mogambo-mr-india',
    note: 'Bollywood Hungama, 22 Jan 2026: Anupam Kher says he was initially cast as Mogambo and removed; "They didn\'t tell me until the end." Credits Anil and Boney Kapoor; says he could not have played it as brilliantly as Amrish Puri.',
  },
  {
    url: 'https://deccanchronicle.com/amp/151102/entertainment-bollywood/article/amitabh-first-choice-mr-india',
    note: 'Deccan Chronicle, 2 Nov 2015: Javed Akhtar at Jio MAMI says the film was first considered with Amitabh Bachchan; "things did not work out with him". No reason given. Use only for the Amitabh-first fact, not the quote.',
  },
];

export const lexicon: Record<string, string> = {
  mr: 'मिस्टर',
  india: 'इंडिया',
  amitabh: 'अमिताभ',
  offer: 'ऑफ़र',
  salim: 'सलीम',
  javed: 'जावेद',
  rajesh: 'राजेश',
  khanna: 'खन्ना',
  role: 'रोल',
  mogambo: 'मोगैम्बो',
  anupam: 'अनुपम',
  kher: 'खेर',
  film: 'फ़िल्म',
  hit: 'हिट',
  hero: 'हीरो',
  invisible: 'इनविज़िबल',
  anil: 'अनिल',
  kapoor: 'कपूर',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  // Design v2, velvet palette (the guide-twins look the owner picked).
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Mr. India पहले\nAmitabh को मिली थी?',
    accent: ['Amitabh'],
    still: {
      src: 'shorts/mr-india/stills/amitabh.jpg',
      film: 'Amitabh Bachchan',
      credit: 'Shrinivaskulkarni1388 / Wikimedia Commons',
      aspect: 1194 / 1655,
      focus: '50% 30%',
    },
    react: {word: 'offer', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'पहली पसंद:\nRajesh Khanna',
      accent: ['Rajesh', 'Khanna'],
      layout: 'print',
      still: {
        src: 'shorts/mr-india/stills/rajesh-khanna.jpg',
        film: 'Rajesh Khanna',
        credit: 'Bollywood Hungama / Wikimedia Commons',
        aspect: 298 / 439,
        focus: '50% 30%',
      },
      pop: {word: 'लिखा', text: 'SALIM–JAVED'},
    },
    {
      lines: ['f2'],
      headline: 'Mogambo:\nपहले Anupam Kher',
      accent: ['Mogambo:'],
      layout: 'stack',
      still: {
        src: 'shorts/mr-india/stills/anupam-kher.jpg',
        film: 'Anupam Kher',
        credit: 'Greg2600 / Wikimedia Commons',
        aspect: 1427 / 1686,
        focus: '50% 30%',
      },
      cuts: [{
        word: 'हटा',
        src: 'shorts/mr-india/stills/amrish-puri.jpg',
        film: 'Amrish Puri',
        credit: 'Bollywood Hungama / Wikimedia Commons',
        aspect: 400 / 533,
        focus: '50% 30%',
        replace: true,
      }],
      react: {word: 'हटा', expression: 'shock', pose: 'shrug'},
    },
    {
      lines: ['f3'],
      headline: '1987 की\nदूसरी बड़ी hit',
      accent: ['hit'],
      layout: 'number',
      number: {word: 'करोड़', value: 10, prefix: '₹', suffix: ' करोड़', label: 'Box Office India estimate'},
      still: {
        src: 'shorts/mr-india/stills/scene.png',
        film: 'Mr. India',
        year: 1987,
        credit: 'Narsimha Enterprises',
        aspect: 451 / 221,
        focus: '50% 40%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'असली hero\ninvisible',
    accent: ['invisible'],
    // Amitabh while his refusal is spoken; Anil Kapoor only once he is named.
    still: {
      src: 'shorts/mr-india/stills/amitabh.jpg',
      film: 'Amitabh Bachchan',
      credit: 'Shrinivaskulkarni1388 / Wikimedia Commons',
      aspect: 1194 / 1655,
      focus: '50% 30%',
    },
    cuts: [{
      word: 'Anil',
      src: 'shorts/mr-india/stills/anil-kapoor.jpg',
      film: 'Anil Kapoor',
      credit: 'U.S. Embassy New Delhi / Wikimedia Commons',
      aspect: 805 / 985,
      focus: '50% 30%',
    }],
    pop: {word: 'Anil', text: 'ANIL KAPOOR'},
    react: {word: 'invisible', expression: 'wink', pose: 'present'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Mr. India पहले Amitabh को offer हुई थी? #shorts',
  altTitles: [
    'Mogambo पहले Anupam Kher थे? #shorts',
    'Mr. India: Rajesh Khanna, Amitabh, फिर Anil Kapoor #shorts',
  ],
  description: `Mr. India (1987) का role पहले किसके लिए था? Salim-Javed ने इसे Rajesh Khanna के लिए लिखा, फिर Amitabh Bachchan को offer हुआ. Mogambo पहले Anupam Kher थे.

Salim-Javed wrote the lead for Rajesh Khanna, then offered it to Amitabh Bachchan (Wikipedia, citing Chaudhuri 2015). Javed Akhtar: the film was first considered with Bachchan (Deccan Chronicle, 2015).
Bachchan's reason is reported, not confirmed: "The real hero of the film is an invisible character" (Stardust, 2005, via Wikipedia).
Mogambo was first Anupam Kher; Kher says he was removed without being told (Bollywood Hungama, Jan 2026).
Box Office India estimate about ₹10 crore; second highest-grossing film of 1987 (Wikipedia).

Images: Creative Commons / public-domain portraits and one copyrighted film frame, credited below; used as commentary support.

Sources:
Mr. India (1987 film) — https://en.wikipedia.org/wiki/Mr._India_(1987_film)
Anupam Kher on Mogambo — https://www.bollywoodhungama.com/news/features/anupam-kher-reveals-best-friend-anil-kapoor-got-fired-mogambo-mr-india
Javed Akhtar on Amitabh — https://deccanchronicle.com/amp/151102/entertainment-bollywood/article/amitabh-first-choice-mr-india

Movie Idiots.

#MrIndia #AnilKapoor #Mogambo #AmitabhBachchan #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'mr india', 'mr india 1987', 'mogambo', 'anil kapoor', 'amitabh bachchan', 'anupam kher',
    'amrish puri', 'salim javed', 'bollywood trivia', 'hindi shorts', 'movie idiots',
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
