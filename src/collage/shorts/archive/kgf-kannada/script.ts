// "Did you know?" Short, design v2 (marquee). Hook: did a Kannada film earn ₹1,200 crore?
// Facts: KGF: Chapter 2 (2022, Prashanth Neel, Yash) from Wikipedia, Bollywood Hungama, Sacnilk and
// DT Next (see `sources`). Gross is a floor ("₹1,200 करोड़ से ज़्यादा"); figures differ by source.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'kgf-kannada';
export const title = 'एक Kannada film ने ₹1,200 करोड़ कमाए? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'kannada';
export const music = 'neon-bhairav';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "A Kannada film earned ₹1,200 crore?",
    text: "एक Kannada film ने ₹1,200 करोड़ कमाए?",
    say: "एक कन्नड़ फ़िल्म ने बारह सौ करोड़ रुपये कमाए?",
    delivery: {emotion: 'curious', sfx: [{word: '₹1,200', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "KGF: Chapter 2 came out in 2022, directed by Prashanth Neel, with Yash in the lead.",
    text: "KGF: Chapter 2 2022 में आई. Director Prashanth Neel, और lead में Yash थे.",
    say: "केजीएफ़ चैप्टर टू दो हज़ार बाईस में आई। डायरेक्टर प्रशांत नील, और लीड में यश थे।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [3],
    en: "But it was a Kannada film, and before this, no Kannada film had crossed ₹1,000 crore.",
    text: "पर ये Kannada film थी, और इससे पहले कोई Kannada film ₹1,000 करोड़ क्लब में नहीं गई थी.",
    say: "पर ये कन्नड़ फ़िल्म थी, और इससे पहले कोई कन्नड़ फ़िल्म एक हज़ार करोड़ के क्लब में नहीं गई थी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'पहले', tag: 'surprised'}]},
  },
  {
    id: 'f3',
    role: 'tension',
    source: [0],
    en: "Even so, it was not only in Kannada: it also came in Telugu, Tamil, Malayalam and Hindi.",
    text: "फिर भी ये सिर्फ़ Kannada में नहीं रुकी, Telugu, Tamil, Malayalam और Hindi में भी आई.",
    say: "फिर भी ये सिर्फ़ कन्नड़ में नहीं रुकी, तेलुगु, तमिल, मलयालम और हिंदी में भी आई।",
    delivery: {emotion: 'storytelling', cues: [{word: 'सिर्फ़', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2],
    en: "Yes. Worldwide it crossed ₹1,200 crore, and it is among the highest-grossing Indian films.",
    text: "Worldwide इसने ₹1,200 करोड़ से ज़्यादा कमाए, और ये भारत की सबसे ज़्यादा कमाने वाली films में से एक बनी.",
    say: "वर्ल्डवाइड इसने बारह सौ करोड़ रुपये से ज़्यादा कमाए, और ये भारत की सबसे ज़्यादा कमाने वाली फ़िल्मों में से एक बनी।",
    delivery: {emotion: 'proud', cues: [{word: 'सबसे', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "A Kannada film, ₹1,200 crore?",
    text: "एक Kannada film, ₹1,200 करोड़?",
    say: "एक कन्नड़ फ़िल्म, बारह सौ करोड़?",
    delivery: {emotion: 'playful'},
  },
];

export const honorific = false;

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/K.G.F:_Chapter_2',
    note: 'Released 14 April 2022; directed by Prashanth Neel; Yash leads. Kannada, with dubbed versions in Telugu, Tamil, Malayalam and Hindi (five languages). Worldwide gross ₹1,200–1,250 crore; "fourth highest-grossing Indian film of all time" (box office section).',
  },
  {
    url: 'https://www.bollywoodhungama.com/news/box-office-special-features/kgf-chapter-2-box-office-film-crosses-rs-1200-cr-worldwide-box-office-ranks-third-highest-time-worldwide-grosser/',
    note: 'Bollywood Hungama, 17 May 2022: "the overall worldwide business of the film has made it past the Rs. 1200 cr. mark"; ranked third all-time highest worldwide grosser at that point (behind Dangal and Baahubali 2).',
  },
  {
    url: 'https://www.sacnilk.com/quicknews/KGF_Chapter_2_2020_Box_Office_Collection_Day_Wise_Worldwide',
    note: 'Sacnilk day-wise page (last updated 20 Aug 2023): worldwide ₹1,215.00 Cr (India ₹1,000.85 Cr, overseas ₹214.15 Cr). Trade tally, may differ from producer figures.',
  },
  {
    url: 'https://www.dtnext.in/cinema/2022/04/30/kgf-chapter-2-continues-dream-run-at-bo-breaches-rs-1000-crore-mark',
    note: 'DT Next, 30 Apr 2022: "the first movie from Karnataka to break into the Rs 1,000 crore club." Source for the "no Kannada film before this crossed ₹1,000 crore" line.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  kgf: 'केजीएफ़',
  chapter: 'चैप्टर',
  kannada: 'कन्नड़',
  telugu: 'तेलुगु',
  tamil: 'तमिल',
  malayalam: 'मलयालम',
  prashanth: 'प्रशांत',
  neel: 'नील',
  yash: 'यश',
  worldwide: 'वर्ल्डवाइड',
  director: 'डायरेक्टर',
  lead: 'लीड',
  club: 'क्लब',
};

const KGF = {film: 'KGF: Chapter 2', year: 2022, credit: 'Hombale Films'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'एक Kannada film ने\n₹1,200 करोड़ कमाए?',
    accent: ['Kannada', '₹1,200'],
    // Promo photo (2048 px), Yash and Prashanth Neel at the Chennai promotion. Sharp from frame one.
    still: {src: 'shorts/kgf-kannada/stills/promo.jpg', ...KGF, credit: 'Sriram Narasimhan / Silverscreen Media (CC BY-SA 3.0)', aspect: 2048 / 1365, focus: '50% 40%'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'KGF: Chapter 2\nका डायरेक्टर',
      accent: ['Chapter', 'डायरेक्टर'],
      layout: 'stack',
      still: {src: 'shorts/kgf-kannada/stills/promo.jpg', ...KGF, credit: 'Sriram Narasimhan / Silverscreen Media (CC BY-SA 3.0)', aspect: 2048 / 1365, focus: '62% 40%'},
      cuts: [{
        word: 'Prashanth',
        src: 'shorts/kgf-kannada/stills/neel.jpg',
        film: 'Prashanth Neel',
        credit: 'Sriram Narasimhan (CC BY-SA 3.0)',
        aspect: 2 / 3,
        focus: '50% 25%',
        offset: [260, 40],
        tilt: -4,
      }],
    },
    {
      lines: ['f2'],
      headline: 'पहली Kannada film\nजो क्लब में गई',
      accent: ['Kannada', 'क्लब'],
      layout: 'number',
      number: {word: 'क्लब', value: 1000, suffix: ' करोड़+', label: 'Kannada film में पहली'},
      still: {src: 'shorts/kgf-kannada/stills/promo.jpg', ...KGF, credit: 'Sriram Narasimhan / Silverscreen Media (CC BY-SA 3.0)', aspect: 2048 / 1365, focus: '30% 40%'},
    },
    {
      lines: ['f3'],
      headline: 'सिर्फ़ Kannada\nमें नहीं रुकी',
      accent: ['नहीं'],
      layout: 'ticket',
      ticket: {word: 'Telugu,', title: 'KGF 2', figure: '5 भाषाएँ', sub: 'Kannada, Telugu, Tamil, Malayalam, Hindi'},
      still: {src: 'shorts/kgf-kannada/stills/neel.jpg', ...KGF, credit: 'Sriram Narasimhan (CC BY-SA 3.0)', aspect: 2 / 3, focus: '50% 25%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'हाँ, ₹1,200 करोड़+\nworldwide',
    accent: ['₹1,200'],
    still: {src: 'shorts/kgf-kannada/stills/promo.jpg', ...KGF, credit: 'Sriram Narasimhan / Silverscreen Media (CC BY-SA 3.0)', aspect: 2048 / 1365, focus: '50% 40%'},
    pop: {word: 'सबसे', text: 'TOP INDIAN GROSSERS'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'एक Kannada film ने ₹1,200 करोड़ कमाए? #shorts',
  altTitles: [
    'KGF: Chapter 2, Kannada से pan-India तक #shorts',
    'Kannada film, ₹1,200 करोड़ worldwide: KGF 2 #shorts',
  ],
  description: `KGF: Chapter 2 (2022, Prashanth Neel, Yash) Kannada में बनी, और Telugu, Tamil, Malayalam व Hindi में भी रिलीज़ हुई. Worldwide gross ₹1,200 करोड़ से ज़्यादा (Bollywood Hungama, मई 2022; Sacnilk ₹1,215 करोड़; Wikipedia ₹1,200–1,250 करोड़). ये भारत की सबसे ज़्यादा कमाने वाली films में से एक है. DT Next के मुताबिक़ ये Karnataka की पहली film थी जो ₹1,000 करोड़ क्लब में पहुँची.

Sources:
K.G.F: Chapter 2, Wikipedia — https://en.wikipedia.org/wiki/K.G.F:_Chapter_2
Bollywood Hungama, 17 May 2022 — https://www.bollywoodhungama.com/news/box-office-special-features/kgf-chapter-2-box-office-film-crosses-rs-1200-cr-worldwide-box-office-ranks-third-highest-time-worldwide-grosser/
Sacnilk, KGF Chapter 2 day-wise worldwide — https://www.sacnilk.com/quicknews/KGF_Chapter_2_2020_Box_Office_Collection_Day_Wise_Worldwide
DT Next, 30 Apr 2022 — https://www.dtnext.in/cinema/2022/04/30/kgf-chapter-2-continues-dream-run-at-bo-breaches-rs-1000-crore-mark

Box office figures differ between sources and are reported, not audited by Movie Idiots.

Images (Wikimedia Commons, CC BY-SA 3.0, used as credited stills):
Promo photo "Easwari Rao, Prashanth Neel, Yash, Srinidhi Shetty Promote KGF Chapter 2 in Chennai" by Sriram Narasimhan / Silverscreen Media — https://commons.wikimedia.org/wiki/File:Easwari_Rao,_Prashanth_Neel,_Yash,_Srinidhi_Shetty_Promote_KGF_Chapter_2_in_Chennai.jpg
Portrait "Prashanth Neel in 2022" by Sriram Narasimhan — https://commons.wikimedia.org/wiki/File:Prashanth_Neel_in_2022.jpg

Movie Idiots.

#KGF2 #Yash #PrashanthNeel #KannadaCinema #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'kgf 2', 'kgf chapter 2', 'yash', 'prashanth neel', 'kannada cinema', 'kannada film box office',
    'pan india film', 'hindi shorts', 'movie idiots',
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
