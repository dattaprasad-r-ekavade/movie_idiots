// Fun-facts Short, design v2 (velvet). Batch 3 #2 (`budget-vs-box-office` in docs/shorts-ideas.md).
// Budget is reported (Bollywood Hungama, Wikipedia); the gross is Sacnilk and Wikipedia agreeing at about ₹393 crore.
// Pre-release "recovery" (₹432 crore) in the Bollywood Hungama piece is not box office, so it is not used.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'budget-vs-box-office';
export const title = 'Adipurush ₹500 करोड़ में बनी, वापस कितना आया? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'neon-bhairav';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    source: 0,
    en: "Adipurush was made for ₹500 crore. How much came back?",
    text: "Adipurush ₹500 करोड़ में बनी थी, वापस कितना आया?",
    say: "आदिपुरुष पाँच सौ करोड़ में बनी थी, वापस कितना आया?",
    delivery: {emotion: 'curious', sfx: [{word: "वापस", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "Prabhas, Kriti Sanon and Saif Ali Khan: the film released on 16 June 2023.",
    text: "Prabhas, Kriti Sanon और Saif Ali Khan वाली ये film 16 June 2023 को release हुई.",
    say: "प्रभास, कृति सेनन और सैफ़ अली ख़ान वाली ये फ़िल्म सोलह जून दो हज़ार तेईस को रिलीज़ हुई।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: 1,
    en: "But after release, the VFX and dialogues drew so much anger that the makers had to change some lines.",
    text: "पर release के बाद VFX और dialogues पर इतनी नाराज़गी हुई, कि makers को कुछ dialogues बदलने पड़े.",
    say: "पर रिलीज़ के बाद वीएफ़एक्स और डायलॉग्स पर इतनी नाराज़गी हुई, कि मेकर्स को कुछ डायलॉग्स बदलने पड़े।",
    delivery: {emotion: 'serious', cues: [{word: 'नाराज़गी', tag: 'dramatic'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2],
    en: "In the end the worldwide gross was about ₹393 crore: less than the reported budget.",
    text: "आख़िर में worldwide gross लगभग ₹393 करोड़ रहा, यानी बताए गए budget से भी कम.",
    say: "आख़िर में वर्ल्डवाइड ग्रॉस लगभग तीन सौ तिरानवे करोड़ रहा, यानी बताए गए बजट से भी कम।",
    delivery: {emotion: 'serious'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Adipurush: ₹500 crore in, how much back?",
    text: "Adipurush... ₹500 करोड़ में बनी, वापस कितना?",
    say: "आदिपुरुष... पाँच सौ करोड़ में बनी, वापस कितना?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.bollywoodhungama.com/news/features/prabhas-starrer-adipurush-made-budget-rs-500-cr-recovers-rs-432-cr-release/',
    note: 'Bollywood Hungama (2 June 2023): "Made on a budget of Rs. 500 cr." The same piece\'s ₹432 crore is pre-release recovery (non-theatrical and South MG), not gross, so it is not used. Film opened 16 June 2023.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Adipurush',
    note: 'Infobox: budget "est. ₹500−700 crore"; worldwide box office "est. ₹392.70 crore". Box office section cites a News18 Telugu figure of ₹388.35 crore after 14 days and a production claim of ₹450 crore.',
  },
  {
    url: 'https://sacnilk.com/news/Adipurush_Final_Worldwide_Box_Office_Collection_and_Records',
    note: 'Sacnilk final: worldwide ₹393.00 crore (India gross ₹343 crore, India net ~₹288.15 crore, overseas ₹50 crore). Used for the rounded ₹393 crore; Wikipedia agrees (₹392.70 crore).',
  },
];

export const lexicon: Record<string, string> = {
  adipurush: 'आदिपुरुष',
  prabhas: 'प्रभास',
  budget: 'बजट',
  worldwide: 'वर्ल्डवाइड',
  gross: 'ग्रॉस',
  profit: 'प्रॉफ़िट',
  wikipedia: 'विकिपीडिया',
  theatres: 'थिएटर्स',
  film: 'फ़िल्म',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Adipurush ₹500 करोड़ में बनी,\nवापस कितना आया?',
    accent: ['₹500', 'वापस'],
    still: {
      src: 'shorts/budget-vs-box-office/stills/poster.jpg',
      film: 'Adipurush',
      year: 2023,
      credit: 'Bollywood Hungama (poster art: T-Series)',
      aspect: 585 / 732,
      focus: '50% 30%',
    },
    react: {word: 'वापस', expression: 'shock', pose: 'shrug'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Release:\n16 June 2023',
      accent: ['June'],
      layout: 'print',
      still: {
        src: 'shorts/budget-vs-box-office/stills/prabhas-sdcc.jpg',
        film: 'Prabhas, San Diego Comic-Con',
        year: 2023,
        credit: 'Gage Skidmore / Wikimedia Commons',
        aspect: 1.2,
        focus: '30% 40%',
      },
      pop: {word: 'June', text: '16 JUNE 2023'},
    },
    {
      lines: ['f2'],
      headline: 'पर dialogues\nबदलने पड़े',
      accent: ['बदलने'],
      layout: 'ticket',
      ticket: {word: 'dialogues', title: 'ADIPURUSH · DIALOGUES', figure: 'बदले', sub: 'release के बाद backlash'},
      still: {src: 'shorts/budget-vs-box-office/stills/poster.jpg', film: 'Adipurush', year: 2023, credit: 'Bollywood Hungama (poster art: T-Series)', aspect: 585 / 732, focus: '50% 30%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '₹393 करोड़:\nbudget से भी कम',
    accent: ['₹393'],
    pop: {word: '₹393', text: '₹393 CR < ₹500 CR'},
    still: {
      src: 'shorts/budget-vs-box-office/stills/poster.jpg',
      film: 'Adipurush',
      year: 2023,
      credit: 'Bollywood Hungama (poster art: T-Series)',
      aspect: 585 / 732,
      focus: '50% 30%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Adipurush ₹500 करोड़ में बनी, वापस कितना आया? #shorts',
  altTitles: [
    'Adipurush का budget ₹500 करोड़, gross ₹393 करोड़ #shorts',
    'Adipurush: budget बनाम box office #shorts',
  ],
  description: `Adipurush (2023) का budget Bollywood Hungama ने ₹500 करोड़ बताया. Wikipedia पर budget ₹500 से ₹700 करोड़ के बीच लिखा है. Release (16 June 2023) के बाद VFX और dialogues की आलोचना हुई, और makers ने कुछ dialogues बदलने की घोषणा की (Wikipedia). Sacnilk के मुताबिक पूरी दुनिया में film का कुल gross लगभग ₹393 करोड़ रहा.

Budget figures are reported, not audited. Gross is a box-office tracker figure and is not the producer's profit.

Sources:
Bollywood Hungama (budget, 2 June 2023) — https://www.bollywoodhungama.com/news/features/prabhas-starrer-adipurush-made-budget-rs-500-cr-recovers-rs-432-cr-release/
Wikipedia, Adipurush (budget range, worldwide gross) — https://en.wikipedia.org/wiki/Adipurush
Sacnilk, Adipurush final worldwide collection — https://sacnilk.com/news/Adipurush_Final_Worldwide_Box_Office_Collection_and_Records

Image credits:
Adipurush theatrical poster: copyrighted, used as credited commentary on the film; image via Bollywood Hungama (poster art copyright believed to belong to T-Series).
Prabhas at San Diego Comic-Con 2023: Gage Skidmore, Wikimedia Commons, CC BY-SA 2.0 — https://commons.wikimedia.org/wiki/File:2023_San_Diego_Comic-Con_International_by_Gage_Skidmore,_011.jpg

Movie Idiots.

#Adipurush #Prabhas #BoxOffice #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'adipurush', 'prabhas', 'adipurush budget', 'adipurush box office', 'box office', 'bollywood trivia',
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
