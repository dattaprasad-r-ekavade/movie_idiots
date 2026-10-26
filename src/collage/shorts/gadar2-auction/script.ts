// "Did you know?" Short, design v2 (marquee). Hook: why was Sunny Deol's house about to be auctioned?
// Facts: Bank of Baroda's e-auction notice for Sunny Villa (Juhu) in August 2023, the loan of about ₹56 crore,
// and the withdrawal the next day citing "technical reasons". Gadar 2 earnings from the same two reports.
// Two independent sources back every fact: Tribune India and Outlook Business (see `sources`).
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'gadar2-auction';
export const title = 'Sunny Deol का घर नीलाम क्यों होने वाला था? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'deol';
export const music = 'mass-entry';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Why was Sunny Deol's house about to be auctioned?",
    text: "Sunny Deol का घर नीलाम क्यों होने वाला था?",
    say: "सनी देओल का घर नीलाम क्यों होने वाला था?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "Gadar 2 earned over ₹300 crore in its first week.",
    text: "Gadar 2 ने पहले हफ़्ते में ही ₹300 करोड़ से ज़्यादा कमाए.",
    say: "ग़दर टू ने पहले हफ़्ते में ही तीन सौ करोड़ से ज़्यादा कमाए।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But that same week, a bank put out an auction notice for his Juhu bungalow.",
    text: "पर उसी हफ़्ते bank ने उनके Juhu bungalow की auction notice निकाल दी.",
    say: "पर उसी हफ़्ते बैंक ने उनके जुहू बंगले की ऑक्शन नोटिस निकाल दी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'उसी', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "About ₹56 crore of loan was unpaid. The next day, the bank withdrew the notice.",
    text: "करीब ₹56 करोड़ का loan बकाया था. अगले ही दिन bank ने notice वापस ले ली.",
    say: "करीब छप्पन करोड़ का लोन बकाया था। अगले ही दिन बैंक ने नोटिस वापस ले ली।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Sunny Deol's house... auctioned, why?",
    text: "Sunny Deol का घर... नीलाम क्यों?",
    say: "सनी देओल का घर... नीलाम क्यों?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.tribuneindia.com/news/punjab/sunny-deols-bungalow-in-mumbais-juhu-not-on-auction-bank-withdraws-notice-536872/amp',
    note: 'Tribune India: bank advertised the e-auction on Sunday (20 Aug 2023) to recover about "Rs 56 crore" (Rs 55.99 crore loan, default since Dec 2022); the notice "stands withdrawn due to Technical Reasons" in a statement on Monday 21 Aug; "Gaddar 2 ... already grossed over Rs 300 crore" in its first week.',
  },
  {
    url: 'https://www.outlookbusiness.com/banking/dual-happiness-for-sunny-deol-as-bank-of-baroda-calls-off-his-juhu-villas-auction-days-after-gadar-2-success',
    note: 'Outlook Business: e-auction notice published 20 Aug 2023 for "Sunny Villa" in Juhu; loan Rs 55.99 crore (loan, interest, penalties), in default since Dec 2022; withdrawal on Mon 21 Aug, "technical reason"; Gadar 2 "already grossed over Rs 300 crore since the release last week".',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  gadar: 'गदर',
  sunny: 'सनी',
  deol: 'देओल',
  bank: 'बैंक',
  juhu: 'जुहू',
  notice: 'नोटिस',
  auction: 'ऑक्शन',
  bungalow: 'बंगले',
  baroda: 'बड़ौदा',
};

const DEOL_PHOTO = {src: 'shorts/gadar2-auction/stills/sunny.jpg', film: 'Sunny Deol', year: 2024, credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 1712 / 3308, focus: '50% 12%'};
const POSTER = {src: 'shorts/gadar2-auction/stills/poster.jpg', film: 'Gadar 2', year: 2023, credit: 'Zee Studios', aspect: 274 / 365, width: 300, focus: '50% 30%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Sunny Deol का घर\nनीलाम होने वाला था?',
    accent: ['नीलाम'],
    // Sharp from the first frame: 1712 px original, Zee Cine Awards 2024 photo.
    still: DEOL_PHOTO,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Gadar 2 ने\nकमाए ₹300 करोड़+',
      accent: ['₹300'],
      layout: 'ticket',
      ticket: {word: 'पहले', title: 'GADAR 2', figure: '₹300 Cr+', sub: 'First week, two reports'},
      still: POSTER,
    },
    {
      lines: ['f2'],
      headline: 'उसी हफ़्ते\nbank ने notice निकाली',
      accent: ['notice'],
      layout: 'print',
      still: DEOL_PHOTO,
      pop: {word: 'उसी', text: 'SAME WEEK'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '₹56 करोड़ का\nलोन था बकाया',
    accent: ['₹56'],
    still: DEOL_PHOTO,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sunny Deol का घर नीलाम क्यों होने वाला था? #shorts',
  altTitles: [
    'Gadar 2 की कमाई के बीच Sunny Deol का बंगला auction #shorts',
    'Bank ने Sunny Deol के घर की notice वापस क्यों ली? #shorts',
  ],
  description: `Gadar 2 (2023) की पहले हफ़्ते की कमाई के बीच, Bank of Baroda ने Sunny Deol के Juhu बंगले "Sunny Villa" की e-auction notice निकाली थी. Loan के करीब ₹56 करोड़ बकाया बताए गए, और अगले दिन bank ने notice को "technical reasons" से वापस ले लिया (Tribune India; Outlook Business). Bank और Deol की तरफ़ से दी गई वजह पर अलग-अलग बातें हैं, इसलिए ये video सिर्फ़ रिपोर्ट्स का सार है.

Sources:
Tribune India, Sunny Deol's bungalow in Juhu not on auction, Bank withdraws notice — https://www.tribuneindia.com/news/punjab/sunny-deols-bungalow-in-mumbais-juhu-not-on-auction-bank-withdraws-notice-536872/amp
Outlook Business, Dual happiness for Sunny Deol as Bank of Baroda calls off his Juhu villa's auction — https://www.outlookbusiness.com/banking/dual-happiness-for-sunny-deol-as-bank-of-baroda-calls-off-his-juhu-villas-auction-days-after-gadar-2-success

Images:
Sunny Deol at Zee Cine Awards 2024, Bollywood Hungama via Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Sunny_Deol_at_Zee_Cine_Awards_2024.jpg. CC BY 3.0 (https://creativecommons.org/licenses/by/3.0).
Gadar 2 theatrical poster, Zee Studios — https://en.wikipedia.org/wiki/File:Gadar_2_film_poster.jpg. Copyrighted; used as credited commentary on the film.

Movie Idiots.

#SunnyDeol #Gadar2 #BollywoodNews #BankOfBaroda #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'sunny deol', 'gadar 2', 'sunny villa', 'bank of baroda', 'sunny deol bungalow', 'gadar 2 box office',
    'bollywood news', 'hindi shorts', 'movie idiots',
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
