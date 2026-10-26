// "Did you know?" Short, design v2 (newsprint). Hook: Dangal's biggest earnings did not come from India.
// Facts: Wikipedia "Dangal (2016 film)" and Sacnilk (see `sources`). India release 23 Dec 2016; China release
// 5 May 2017, about four and a half months later. India gross is ~₹535 crore; China is ~₹1,200 crore+ (the
// Wikipedia table gives ₹1,231 crore, its text ~₹1,400 crore); worldwide is past ₹2,000 crore. Rounded on purpose.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'dangal-china';
export const title = 'Dangal की कमाई China में India से दोगुनी? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'china';
export const music = 'spring-dream';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Dangal's biggest earnings did not happen in India?",
    text: "Dangal की सबसे बड़ी कमाई India में नहीं हुई?",
    say: "दंगल की सबसे बड़ी कमाई इंडिया में नहीं हुई?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "Aamir Khan's Hindi wrestling film came out in India in December 2016 and became a big hit.",
    text: "Aamir Khan की ये Hindi wrestling film December 2016 में India में आई, और बड़ी hit बनी.",
    say: "आमिर ख़ान की ये हिंदी रेसलिंग फ़िल्म दिसंबर दो हज़ार सोलह में इंडिया में आई, और बड़ी हिट बनी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But the film reached another country four and a half months after India, in May 2017.",
    text: "पर ये film India के साढ़े चार महीने बाद, May 2017 में, एक और देश में release हुई.",
    say: "पर ये फ़िल्म इंडिया के साढ़े चार महीने बाद, मई दो हज़ार सत्रह में, एक और देश में रिलीज़ हुई।",
    delivery: {emotion: 'conspiratorial'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "No. Its China gross was more than double its India gross. Worldwide, it crossed ₹2,000 crore.",
    text: "China में इसकी कमाई India से दोगुनी से ज़्यादा रही, और worldwide कमाई ₹2,000 करोड़ के पार चली गई.",
    say: "चाइना में इसकी कमाई इंडिया से दोगुनी से ज़्यादा रही, और वर्ल्डवाइड कमाई दो हज़ार करोड़ के पार चली गई।",
    delivery: {emotion: 'proud'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Dangal's biggest earnings, not in India?",
    text: "Dangal की कमाई India में नहीं?",
    say: "दंगल की कमाई इंडिया में नहीं?",
    delivery: {emotion: 'playful'},
  },
];

export const honorific = false;

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Dangal_(2016_film)',
    note: 'Infobox: India release 23 Dec 2016. Box office: China release 5 May 2017 on 9,000 screens; China gross ¥1,299 million (text: ~₹1,400 crore; table: ₹1,231 crore); India gross ₹538 crore (text) / ₹511.58 crore (table); worldwide ₹2,024 crore (Box Office India; other trackers ₹1,968–2,200 crore). Text: "Its overseas gross in China more than doubled its domestic gross in India" (cites Forbes).',
  },
  {
    url: 'https://www.sacnilk.com/movie/Dangal_2016',
    note: 'Sacnilk (undated trade data, approximate): India gross ₹535.00 crore; India net ₹387.38 crore; worldwide lifetime ₹2,070.30 crore; overseas ₹1,535.30 crore. No China-specific figure on the page.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  dangal: 'दंगल',
  china: 'चाइना',
  india: 'इंडिया',
  aamir: 'आमिर',
  khan: 'ख़ान',
  wrestling: 'रेसलिंग',
  worldwide: 'वर्ल्डवाइड',
  release: 'रिलीज़',
  hindi: 'हिंदी',
  hit: 'हिट',
  film: 'फ़िल्म',
  gross: 'ग्रॉस',
  double: 'डबल',
};

const DANGAL = {film: 'Dangal', year: 2016};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: 'Dangal की कमाई\nIndia में नहीं हुई?',
    accent: ['India'],
    // Sharp from the first frame (channel rule). Only 585 px is on hand from Wikimedia Commons (CC0).
    still: {src: 'shorts/dangal-china/stills/hook.jpg', ...DANGAL, credit: 'Wikimedia Commons (CC0)', aspect: 585 / 352, focus: '50% 40%'},
    react: {word: 'Dangal', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Aamir की film\nIndia में hit',
      accent: ['hit'],
      still: {src: 'shorts/dangal-china/stills/setup.jpg', ...DANGAL, credit: 'Wikimedia Commons (CC0)', aspect: 585 / 515, focus: '50% 35%'},
      pop: {word: 'December', text: 'DEC 2016'},
    },
    {
      lines: ['f2'],
      headline: 'साढ़े चार महीने\nबाद release',
      accent: ['बाद'],
      layout: 'ticket',
      ticket: {word: 'साढ़े', title: 'DANGAL', figure: '4½ महीने', sub: 'Dec 2016 → May 2017'},
      still: {src: 'shorts/dangal-china/stills/tension.jpg', ...DANGAL, credit: 'Wikimedia Commons (CC0)', aspect: 585 / 388, focus: '50% 40%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'China में\nदोगुनी कमाई',
    accent: ['दोगुनी'],
    still: {src: 'shorts/dangal-china/stills/payoff.jpg', ...DANGAL, credit: 'Aamir Khan Productions / UTV Motion Pictures, via Wikipedia', aspect: 262 / 379, focus: '50% 30%'},
    cuts: [{
      word: 'worldwide',
      src: 'shorts/dangal-china/stills/setup.jpg',
      ...DANGAL,
      credit: 'Wikimedia Commons (CC0)',
      aspect: 585 / 515,
      focus: '50% 35%',
      replace: true,
    }],
    pop: {word: 'दोगुनी', text: 'CHINA 2X+'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Dangal की कमाई China में India से दोगुनी? #shorts',
  altTitles: [
    'Dangal: India में hit, China में उससे दोगुनी कमाई #shorts',
    'Dangal का सबसे बड़ा बाज़ार India नहीं था #shorts',
  ],
  description: `Dangal (2016, Aamir Khan) India में 23 December 2016 को रिलीज़ हुई. China में ये 5 May 2017 को आई, यानी लगभग साढ़े चार महीने बाद.

China gross लगभग ₹1,200 करोड़ से ज़्यादा (Wikipedia box-office table: ₹1,231 crore; text: ~₹1,400 crore). India gross लगभग ₹535 करोड़ (Sacnilk: ₹535 crore). Worldwide gross ₹2,000 करोड़ से ज़्यादा (Box Office India via Wikipedia: ₹2,024 crore; Sacnilk: ₹2,070 crore). Figures are trade and tracker estimates and differ by source; they are not audited by Movie Idiots.

Sources:
Dangal (2016 film), Wikipedia — https://en.wikipedia.org/wiki/Dangal_(2016_film)
Dangal (2016), Sacnilk — https://www.sacnilk.com/movie/Dangal_2016

Images:
Aamir Khan and Mahavir Singh Phogat at the special screening of Dangal, Wikimedia Commons (CC0) — https://commons.wikimedia.org/wiki/File:Aamir_Khan_and_Mahavir_Singh_Phogat_at_the_special_screening_of_%E2%80%98Dangal%E2%80%99.jpg
Fatima Sana Shaikh and Sanya Malhotra on the sets of Dangal, Wikimedia Commons (CC0) — https://commons.wikimedia.org/wiki/File:Fatima_Sana_Shaikh_and_Sanya_Malhotra_posing_on_the_sets_of_Dangal.jpg
Geeta Phogat and Babita Kumari at the special screening of Dangal, Wikimedia Commons (CC0) — https://commons.wikimedia.org/wiki/File:Geeta_Phogat_and_Babita_Kumari_at_the_special_screening_of_%E2%80%98Dangal%E2%80%99.jpg
Dangal theatrical poster, via Wikipedia (https://en.wikipedia.org/wiki/File:Dangal_Poster.jpg). Copyrighted; used briefly as credited commentary on the film's box office.

Movie Idiots.

#Dangal #AamirKhan #BoxOffice #China #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'dangal', 'dangal 2016', 'aamir khan', 'dangal china', 'dangal box office', 'bollywood box office',
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
