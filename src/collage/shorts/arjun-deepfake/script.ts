// "Did you know?" Short, design v2 (newsprint). Hook: did Arjun Kapoor win his case against AI?
// Facts: Delhi High Court, Arjun Kapoor v. Artist Booking Company & Ors. (CS(COMM) 454/2026), from
// iprmentlaw weekly highlights (25 Oct 2026), LiveLaw (17 Oct 2026) and The Bar Bulletin (22 Oct 2026).
// The exact decree date is not confirmed by the sources, so no date is spoken or shown.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'arjun-deepfake';
export const title = 'Arjun Kapoor ने AI के ख़िलाफ़ case जीत लिया? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'arjun';
export const music = 'city-lights';
// Real people are verb subjects (Arjun Kapoor ने ...): singular verbs are flagged by lint; checked by hand.
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Did Arjun Kapoor win his case against AI?",
    text: "Arjun Kapoor ने AI के ख़िलाफ़ case जीत लिया?",
    say: "अर्जुन कपूर ने एआई के ख़िलाफ़ केस जीत लिया?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "Arjun Kapoor had filed a case over AI misuse of his name and face.",
    text: "Arjun Kapoor ने AI से अपने नाम और चेहरे के misuse पर case किया था.",
    say: "अर्जुन कपूर ने एआई से अपने नाम और चेहरे के मिसयूज़ पर केस किया था।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [1, 2],
    en: "But the other side didn't even file a reply in court.",
    text: "पर दूसरी side ने court में जवाब तक नहीं दिया.",
    say: "पर दूसरी साइड ने कोर्ट में जवाब तक नहीं दिया।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'नहीं', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2],
    en: "Yes! The court decreed in his favour and made the ban on AI and deepfake misuse permanent.",
    text: "हाँ! Court ने उनके हक़ में decree दिया, और AI-deepfake misuse पर रोक पक्की कर दी.",
    say: "हाँ! कोर्ट ने उनके हक़ में डिक्री दी, और एआई डीपफ़ेक मिसयूज़ पर रोक पक्की कर दी।",
    delivery: {emotion: 'excited', cues: [{word: 'हक़', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Won the case against AI?",
    text: "AI का case... जीत लिया?",
    say: "एआई का केस... जीत लिया?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/',
    note: 'IPRMentLaw weekly highlights, 19-25 Oct 2026 (published 25 Oct 2026). Case: Arjun Kapoor v. Artist Booking Company & Ors., CS(COMM) 454/2026, Delhi High Court (Justice Purushaindra Kumar Kaurav). "The Delhi High Court has decreed actor Arjun Kapoor\'s suit." Earlier interim order restrained misuse of his name, image and likeness, including AI, deepfakes and face morphing. Remaining infringing links to be taken down. Order date not given.',
  },
  {
    url: 'https://www.livelaw.in/high-court/delhi-high-court/delhi-high-court-decrees-arjun-kapoors-personality-rights-suit-orders-takedown-of-infringing-links-555201',
    note: 'LiveLaw, published 17 Oct 2026. Suit decreed; "In the absence of any written statement or affidavit of admission/denial of documents, the averments contained in the plaint are liable to be treated as admitted." Interim directions made absolute against several defendants. Takedown of infringing links. Article gives no decree date.',
  },
  {
    url: 'https://thebarbulletin.com/delhi-high-court-personality-rights-suit-infringing-links-takedown/',
    note: 'The Bar Bulletin, published 22 Oct 2026. Suit decreed; defendants did not dispute the plaint; interim restraint covered use "including through artificial intelligence, deepfakes, face morphing and other technologies". Gives 14 Oct 2026 as the decree date, which LiveLaw does not confirm (not spoken on screen).',
  },
];

// Per-short pronunciations for names and words the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  arjun: 'अर्जुन',
  kapoor: 'कपूर',
  case: 'केस',
  name: 'नेम',
  misuse: 'मिसयूज़',
  deepfake: 'डीपफ़ेक',
  written: 'रिटन',
  statement: 'स्टेटमेंट',
  defendants: 'डिफ़ेंडेंट्स',
  court: 'कोर्ट',
  decree: 'डिक्री',
};

const HOOK_STILL = {src: 'shorts/arjun-deepfake/stills/hook.jpg', film: 'Arjun Kapoor', year: 2021, credit: 'Happyfruitsalad / Wikimedia Commons (CC BY-SA 4.0)', aspect: 2 / 3, focus: '50% 15%'};
const POSTER = {src: 'shorts/arjun-deepfake/stills/poster.jpg', film: 'Ek Villain Returns', year: 2022, credit: 'T-Series and Balaji Motion Pictures', aspect: 2 / 3, focus: '50% 25%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: 'Arjun Kapoor ने\nAI से case जीता?',
    accent: ['AI'],
    // Commons portrait, 960 px wide: sharp from the first frame.
    still: HOOK_STILL,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'AI misuse पर\ncase किया',
      accent: ['case'],
      layout: 'ticket',
      ticket: {word: 'case', title: 'DELHI HIGH COURT', figure: '454/2026', sub: 'CS(COMM) suit'},
      still: POSTER,
    },
    {
      lines: ['f2'],
      headline: 'पर defendants ने\nजवाब नहीं दिया',
      accent: ['नहीं'],
      layout: 'print',
      still: POSTER,
      pop: {word: 'नहीं', text: 'NO REPLY FILED'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'हाँ, court ने\ncase decree किया',
    accent: ['decree'],
    still: HOOK_STILL,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Arjun Kapoor ने AI के ख़िलाफ़ case जीत लिया? #shorts',
  altTitles: [
    'Arjun Kapoor का AI deepfake case, Delhi High Court का decree #shorts',
    'Delhi High Court ने Arjun Kapoor के नाम और चेहरे पर AI misuse रोका #shorts',
  ],
  description: `Delhi High Court ने Arjun Kapoor बनाम Artist Booking Company (CS(COMM) 454/2026) में suit का decree कर दिया. Defendants ने कोई written statement नहीं दी, और अदालत ने AI, deepfake और face morphing से नाम, image और likeness के misuse पर रोक को पक्का किया (IPRMentLaw; LiveLaw; The Bar Bulletin). Order की exact date पर sources अलग हैं, इसलिए video में date नहीं दी गई.

Sources:
IPRMentLaw, weekly highlights 19-25 Oct 2026 — https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/
LiveLaw, Delhi High Court decrees Arjun Kapoor's personality rights suit (17 Oct 2026) — https://www.livelaw.in/high-court/delhi-high-court/delhi-high-court-decrees-arjun-kapoors-personality-rights-suit-orders-takedown-of-infringing-links-555201
The Bar Bulletin (22 Oct 2026) — https://thebarbulletin.com/delhi-high-court-personality-rights-suit-infringing-links-takedown/

Images:
Arjun Kapoor, 2021 portrait, Happyfruitsalad, Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Arjun_in_2021.jpg. CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0).
Ek Villain Returns (2022) film poster, T-Series and Balaji Motion Pictures, via TMDB — https://www.themoviedb.org/movie/682401. Copyrighted; used as credited commentary on the film.

Movie Idiots.

#ArjunKapoor #AI #Deepfake #DelhiHighCourt #PersonalityRights #HindiShorts #MovieIdiots`,
  tags: [
    'arjun kapoor', 'arjun kapoor ai', 'arjun kapoor deepfake', 'personality rights', 'delhi high court',
    'ai deepfake case', 'bollywood news', 'hindi shorts', 'movie idiots',
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
