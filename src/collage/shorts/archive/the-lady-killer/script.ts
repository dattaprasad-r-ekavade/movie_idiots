// Fun-facts Short, design v2 (newsprint). Batch 3 #1: a famous name and an unbelievable number.
// Rebuilt to Hook → Setup → Tension → Payoff → loop. Facts re-read 13 Oct 2026, two sources each.
// Batch rules: no "loss", no loss figure, no budget (₹45 vs ₹80 crore, and it implies a loss), no ticket
// counts (293 / 500 / 29,300 conflict), neutral about the actors (the director said the problems
// "did not stem from the actors"). Day-1 figure is an estimate: "लगभग" / "बताया गया".
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'the-lady-killer';
export const title = 'Arjun Kapoor की film ने पहले दिन सिर्फ़ ₹38,000 कमाए? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'city-lights';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: 'Did an Arjun Kapoor film earn just ₹38,000 on day one?',
    text: 'Arjun Kapoor की film ने पहले दिन सिर्फ़ ₹38,000 कमाए?',
    say: 'अर्जुन कपूर की फ़िल्म ने पहले दिन सिर्फ़ अड़तीस हज़ार रुपये कमाए?',
    delivery: {emotion: 'curious', sfx: [{word: '₹38,000', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: 'The Lady Killer came out in 2023 with no promotion, and got only about 12 shows across the country.',
    text: 'The Lady Killer 2023 में बिना promotion के release हुई, और पूरे देश में बस करीब 12 shows मिले.',
    say: 'द लेडी किलर दो हज़ार तेईस में बिना प्रमोशन के रिलीज़ हुई, और पूरे देश में बस करीब बारह शोज़ मिले।',
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [1, 4],
    en: 'But director Ajay Bahl later admitted the film was incomplete: 30 of its 117 script pages were never shot.',
    text: 'पर director Ajay Bahl ने बाद में खुद माना कि film अधूरी थी. 117 pages की script के 30 pages कभी shoot ही नहीं हुए.',
    say: 'पर डायरेक्टर अजय बहल ने बाद में ख़ुद माना कि फ़िल्म अधूरी थी। एक सौ सत्रह पेजेस की स्क्रिप्ट के तीस पेजेस कभी शूट ही नहीं हुए।',
    delivery: {emotion: 'conspiratorial', cues: [{word: 'अधूरी', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [2, 4],
    en: 'So day one brought in about ₹38,000. And in September 2024, T-Series put it on YouTube, free.',
    text: 'तो पहले दिन बस लगभग ₹38,000 आए. और September 2024 में T-Series ने film YouTube पर free डाल दी.',
    say: 'तो पहले दिन बस लगभग अड़तीस हज़ार रुपये आए। और सितंबर दो हज़ार चौबीस में टी-सीरीज़ ने फ़िल्म यूट्यूब पर फ़्री डाल दी।',
    delivery: {cues: [{word: 'free', tag: 'amused'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: 'Day one: just ₹38,000?',
    text: 'पहले दिन, सिर्फ़ ₹38,000?',
    say: 'पहले दिन, सिर्फ़ अड़तीस हज़ार रुपये?',
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.koimoi.com/box-office/the-lady-killer-box-office-day-1-arjun-kapoor-bhumi-pednekar-to-break-the-record-of-releasing-lowest-number-shows-just-4-shows-in-mumbai-total-12-shows-across-major-cities-in-the-country-is-it/',
    note: 'Koimoi, 2 Nov 2023: "no promotion for the film, even by Arjun Kapoor or Bhumi Pednekar themselves"; 4 shows each in Mumbai and Pune, 2 in Delhi; about 12 across major cities.',
  },
  {
    url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/director-ajay-bahl-blames-incomplete-script-of-ladykiller-for-box-office-failure-clears-arjun-kapoor-and-bhumi-pednekar-of-fault/articleshow/105048240.cms',
    note: 'Times of India, 7 Nov 2023: "quietly released on November 3"; "just 12 shows across the country as per a report"; Ajay Bahl: "the film is indeed incomplete. Out of the 117-page screenplay, 30 pages were never filmed"; problems did not stem from the actors.',
  },
  {
    url: 'https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/box-office/arjun-kapoor-and-bhumi-pednekars-the-ladykiller-collects-just-rs-8000-on-day-1/articleshow/104955444.cms',
    note: 'Times of India, 4 Nov 2023, citing an early Sacnilk estimate: "collected Rs 38000 only" on day 1. Other estimates: ₹32,000 (Bollywood Hungama), ₹35,000 (T2).',
  },
  {
    url: 'https://www.bollywoodhungama.com/movie/the-lady-killer/box-office/',
    note: 'Bollywood Hungama box office: released 03 November 2023; lifetime ₹0.01 crore (figures "may be approximate").',
  },
  {
    url: 'https://www.hindustantimes.com/entertainment/bollywood/the-lady-killer-biggest-flop-lands-silently-on-youtube-arjun-kapoor-bhumi-pednekar-101725340476730.html',
    note: 'Hindustan Times, 3 Sep 2024: released that morning on T-Series\' YouTube channel; lifetime ₹0.01 crore per Bollywood Hungama; Ajay Bahl in a YouTube comment: "yes the movie is incomplete. 30 pages of the 117 page screenplay were never shot."',
  },
  {
    url: 'https://filmcompanion.in/news/arjun-kapoor-bhumi-pednekars-the-ladykiller-made-less-than-1-lakh-with-a-budget-of-45-crores',
    note: 'Film Companion: "The film earned Rs. 38000 on its opening day"; lifetime "less than a lakh". (Budget figure here is not used.)',
  },
  {
    url: 'https://news24online.com/entertainment/arjun-kapoor-bhumi-pednekars-box-office-disaster-the-lady-killer-silently-lands-on-youtube/628592/amp',
    note: 'News24: made available for free on T-Series\' YouTube channel after an OTT plan fell through.',
  },
];

export const lexicon: Record<string, string> = {
  arjun: 'अर्जुन',
  kapoor: 'कपूर',
  film: 'फ़िल्म',
  the: 'द',
  lady: 'लेडी',
  killer: 'किलर',
  november: 'नवंबर',
  september: 'सितंबर',
  promotion: 'प्रमोशन',
  shows: 'शोज़',
  run: 'रन',
  director: 'डायरेक्टर',
  ajay: 'अजय',
  bahl: 'बहल',
  pages: 'पेजेस',
  script: 'स्क्रिप्ट',
  shoot: 'शूट',
  youtube: 'यूट्यूब',
  free: 'फ़्री',
};

const TLK = {film: 'The Lady Killer', year: 2023, credit: 'T-Series'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  // Newsprint: a box-office news story.
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: 'Arjun की film ने पहले दिन\nकमाए ₹38,000?',
    accent: ['₹38,000?'],
    still: {
      src: 'shorts/the-lady-killer/stills/arjun-portrait.jpg',
      film: 'Arjun Kapoor',
      year: 2022,
      credit: 'Happyfruitsalad / Wikimedia Commons',
      aspect: 1.1,
      focus: '53% 18%',
    },
    // No mascot cameo: a shocked reaction next to the actor's portrait would read as mocking him.
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'No promotion,\n~12 shows',
      accent: ['~12'],
      layout: 'ticket',
      ticket: {word: 'promotion', title: 'The Lady Killer', figure: '~12 shows', sub: 'पूरे देश में, 3 Nov 2023'},
      still: {
        src: 'shorts/the-lady-killer/stills/tlk-poster.jpg',
        ...TLK,
        aspect: 1.8,
        focus: '50% 72%',
      },
    },
    {
      lines: ['f2'],
      headline: '30 of 117\npages कभी shoot नहीं',
      accent: ['30'],
      layout: 'stack',
      still: {
        src: 'shorts/the-lady-killer/stills/tlk-still-2.jpg',
        ...TLK,
        aspect: 1.15,
        focus: '45% 30%',
      },
      cuts: [{word: '117', src: 'shorts/the-lady-killer/stills/tlk-still-1.png', ...TLK, aspect: 1157 / 675, focus: '45% 38%', replace: true}],
      pop: {word: '30', text: '30 / 117 PAGES'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'पहले दिन\n~₹38,000',
    accent: ['~₹38,000'],
    still: {
      src: 'shorts/the-lady-killer/stills/tlk-youtube.jpg',
      ...TLK,
      // The thumbnail is from the 2024 YouTube upload of the 2023 film: no year tag.
      year: undefined,
      aspect: 16 / 9,
      focus: '50% 50%',
    },
    pop: {word: 'YouTube', text: 'FREE'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Arjun Kapoor की film ने पहले दिन सिर्फ़ ₹38,000 कमाए? #shorts',
  altTitles: [
    'The Lady Killer: 30 pages कभी shoot ही नहीं हुए #shorts',
    '12 shows, कोई promotion नहीं: The Lady Killer #shorts',
  ],
  description: `The Lady Killer (2023, Arjun Kapoor, Bhumi Pednekar) की कहानी: 3 Nov 2023 को बिना किसी promotion के release हुई, और बताया गया कि पूरे देश में करीब 12 shows मिले (Koimoi, Times of India).

Director Ajay Bahl ने माना कि film अधूरी थी: 117 pages की screenplay के 30 pages shoot नहीं हुए. उनके मुताबिक problems actors की वजह से नहीं थीं (Times of India, Hindustan Times).

Published reports पर आधारित commentary. Box-office figures estimates हैं और outlets में अलग-अलग हैं.
Day 1 लगभग ₹38,000 (early Sacnilk estimate via Times of India; Film Companion). दूसरे estimates: ₹32,000 (Bollywood Hungama), ₹35,000 (T2). Lifetime करीब ₹1 लाख (Bollywood Hungama: ₹0.01 crore).
3 Sep 2024 को film T-Series के YouTube channel पर free आई (Hindustan Times).

Film images copyrighted publicity images / official thumbnail हैं, commentary support के लिए थोड़ी देर इस्तेमाल हुए. Arjun Kapoor portrait: Happyfruitsalad, CC BY-SA 4.0, Wikimedia Commons.

Sources:
Koimoi, 2 Nov 2023: https://www.koimoi.com/box-office/the-lady-killer-box-office-day-1-arjun-kapoor-bhumi-pednekar-to-break-the-record-of-releasing-lowest-number-shows-just-4-shows-in-mumbai-total-12-shows-across-major-cities-in-the-country-is-it/
Times of India, 7 Nov 2023: https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/news/director-ajay-bahl-blames-incomplete-script-of-ladykiller-for-box-office-failure-clears-arjun-kapoor-and-bhumi-pednekar-of-fault/articleshow/105048240.cms
Times of India, 4 Nov 2023: https://timesofindia.indiatimes.com/entertainment/hindi/bollywood/box-office/arjun-kapoor-and-bhumi-pednekars-the-ladykiller-collects-just-rs-8000-on-day-1/articleshow/104955444.cms
Bollywood Hungama: https://www.bollywoodhungama.com/movie/the-lady-killer/box-office/
Hindustan Times, 3 Sep 2024: https://www.hindustantimes.com/entertainment/bollywood/the-lady-killer-biggest-flop-lands-silently-on-youtube-arjun-kapoor-bhumi-pednekar-101725340476730.html
Film Companion: https://filmcompanion.in/news/arjun-kapoor-bhumi-pednekars-the-ladykiller-made-less-than-1-lakh-with-a-budget-of-45-crores

Movie Idiots.

#TheLadyKiller #ArjunKapoor #BhumiPednekar #BoxOffice #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'the lady killer', 'the ladykiller', 'arjun kapoor', 'bhumi pednekar', 'ajay bahl', 't-series',
    'box office', 'bollywood trivia', 'hindi shorts', 'movie idiots',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real publicity stills and photos with a stylised mascot, not realistic)',
    audience: 'Not made for kids',
  },
};
