// "Did you know?" Short, design v2 (velvet, romance). Hook: were the leads of Saiyaara (2025) making
// their first film? Facts are from Wikipedia, Hollywood Reporter India and Sacnilk (see `sources`).
// The budget is reported as a range, so it is said as "reportedly". The gross is a floor ("₹570 करोड़+").
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'saiyaara';
export const title = 'Saiyaara: दोनों stars की पहली film, और ₹570 करोड़? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'sandhya';
// Real people are verb subjects (Ahaan Panday and Aneet Padda ... बने थे): plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Two new actors, and Saiyaara earned ₹570 crore?",
    text: "दो नए actors वाली Saiyaara ने ₹570 करोड़ कमाए?",
    say: "दो नए एक्टर्स वाली सैयारा ने पाँच सौ सत्तर करोड़ रुपये कमाए?",
    delivery: {emotion: 'curious', sfx: [{word: '₹570', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "It came out in July 2025, led by Ahaan Panday and Aneet Padda. It was the first film for both.",
    text: "Film July 2025 में आई. Lead में Ahaan Panday और Aneet Padda थे, और दोनों की ये पहली film थी.",
    say: "फ़िल्म जुलाई दो हज़ार पच्चीस में आई। लीड में अहान पांडे और अनीत पड्डा थे, और दोनों की ये पहली फ़िल्म थी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 2],
    en: "But no big star, and no big budget: reportedly just ₹45 to 60 crore.",
    text: "पर ना कोई बड़ा star था, ना बड़ा budget. Reportedly बस ₹45 से 60 करोड़.",
    say: "पर ना कोई बड़ा स्टार था, ना बड़ा बजट। रिपोर्टेडली बस पैंतालीस से साठ करोड़।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'बड़ा', tag: 'skeptical'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2],
    en: "Still, it crossed ₹570 crore worldwide and became the highest-grossing Indian romantic film ever.",
    text: "फिर भी worldwide ₹570 करोड़ से ज़्यादा कमाए, और ये अब तक की सबसे बड़ी Indian romantic film बन गई.",
    say: "फिर भी वर्ल्डवाइड पाँच सौ सत्तर करोड़ से ज़्यादा कमाए, और ये अब तक की सबसे बड़ी इंडियन रोमांटिक फ़िल्म बन गई।",
    delivery: {cues: [{word: 'सबसे', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Two new actors, ₹570 crore?",
    text: "दो नए actors, और ₹570 करोड़?",
    say: "दो नए एक्टर्स, और पाँच सौ सत्तर करोड़?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Saiyaara_(film)',
    note: 'Released 18 July 2025, directed by Mohit Suri. Ahaan Panday (Krish Kapoor) and Aneet Padda (Vaani Batra) lead, described as debutants. Budget ₹45 crore (Forbes India); worldwide ₹579.23 crore at close of run (citing Bollywood Hungama).',
  },
  {
    url: 'https://www.hollywoodreporterindia.com/features/insight/saiyaara-box-office-ahaan-panday-aneet-paddas-film-crosses-500-crore-globally-becomes-highest-grossing-indian-romance-ever',
    note: 'Hollywood Reporter India (updated 7 Aug 2025): "the incredible debutants Ahaan and Aneet" (quoting Tanishk Bagchi); "headlined by Ahaan Panday and Aneet Padda"; global gross ₹507 crore at 18 days.',
  },
  {
    url: 'https://sacnilk.com/movie/Saiyaara_2025',
    note: 'Sacnilk: budget ₹60 crore; worldwide lifetime ₹570.33 crore (compiled, may differ from producer figures). Used for the "₹570 करोड़ से ज़्यादा" floor and the upper budget figure. Does not call them debutants.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  saiyaara: 'सैयारा',
  actors: 'एक्टर्स',
  ahaan: 'अहान',
  panday: 'पांडे',
  aneet: 'अनीत',
  padda: 'पड्डा',
  lead: 'लीड',
  leads: 'लीड्स',
  budget: 'बजट',
  reportedly: 'रिपोर्टेडली',
  worldwide: 'वर्ल्डवाइड',
  office: 'ऑफ़िस',
  release: 'रिलीज़',
  debut: 'डेब्यू',
};

// Re-cut 22 Oct 2026: the first upload (official YRF stills) stalled at 2 views; this cut uses
// CC BY 3.0 event photos only.

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'दो नए actors ने\nकमाए ₹570 करोड़?',
    accent: ['₹570'],
    // Official poster: the title and both leads, sharp from the first frame.
    still: {src: 'shorts/saiyaara/stills/team.jpg', film: 'Saiyaara team', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 696, focus: '50% 30%'},
    react: {word: 'Saiyaara', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'दोनों की\nपहली film',
      accent: ['पहली'],
      layout: 'stack',
      still: {src: 'shorts/saiyaara/stills/ahaan-showsha.jpg', film: 'Ahaan Panday', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 822, focus: '50% 25%'},
      cuts: [{word: 'Aneet', ...{src: 'shorts/saiyaara/stills/aneet-juhu.jpg', film: 'Aneet Padda', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 758, focus: '50% 25%'}}],
      pop: {word: 'पहली', text: 'DEBUT'},
    },
    {
      lines: ['f2'],
      headline: 'ना बड़ा star,\nना बड़ा budget',
      accent: ['budget'],
      layout: 'ticket',
      ticket: {word: 'Reportedly', title: 'SAIYAARA', figure: '₹45–60 Cr', sub: 'Reported budget'},
      still: {src: 'shorts/saiyaara/stills/team.jpg', film: 'Saiyaara team', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 696, focus: '50% 30%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'सबसे बड़ी Indian\nromantic film',
    accent: ['सबसे'],
    still: {src: 'shorts/saiyaara/stills/aneet-lfw.jpg', film: 'Aneet Padda', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 832, focus: '50% 25%'},
    cuts: [{word: 'romantic', ...{src: 'shorts/saiyaara/stills/ahaan-showsha.jpg', film: 'Ahaan Panday', credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 822, focus: '50% 25%'}, replace: true}],
    pop: {word: '₹570', text: '₹570 CR+'},
    react: {word: 'सबसे', expression: 'wink', pose: 'present'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Saiyaara: दोनों stars की पहली film, और ₹570 करोड़? #shorts',
  altTitles: [
    'Saiyaara: दोनों stars की पहली film, और ₹570 करोड़ #shorts',
    'ना बड़ा star, ना बड़ा budget: Saiyaara #shorts',
  ],
  description: `Saiyaara (2025, Mohit Suri) के lead actors Ahaan Panday और Aneet Padda, दोनों की ये पहली film थी. Budget reportedly ₹45–60 करोड़ (Forbes India via Wikipedia: ₹45 crore; Sacnilk: ₹60 crore). Worldwide gross ₹570 करोड़ से ज़्यादा (Sacnilk ₹570.33 crore; Wikipedia ₹579.23 crore), और ये अब तक की सबसे ज़्यादा कमाने वाली Indian romantic film बनी (Wikipedia; Hollywood Reporter India).

Sources:
Saiyaara (film), Wikipedia — https://en.wikipedia.org/wiki/Saiyaara_(film)
Hollywood Reporter India, box office report — https://www.hollywoodreporterindia.com/features/insight/saiyaara-box-office-ahaan-panday-aneet-paddas-film-crosses-500-crore-globally-becomes-highest-grossing-indian-romance-ever
Sacnilk, Saiyaara 2025 — https://sacnilk.com/movie/Saiyaara_2025

Budget and gross figures differ between sources and are reported, not audited by Movie Idiots.

Images: event photos by Bollywood Hungama, CC BY 3.0, via Wikimedia Commons (see Image credits).

Movie Idiots.

#Saiyaara #AhaanPanday #AneetPadda #MohitSuri #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'saiyaara', 'saiyaara 2025', 'ahaan panday', 'aneet padda', 'mohit suri', 'bollywood box office',
    'debut film', 'hindi shorts', 'movie idiots',
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
