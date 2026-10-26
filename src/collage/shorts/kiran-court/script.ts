// "Did you know?" Short, design v2 (lagoon). News hook: why did a court stop Tu Hai Meri Kiran's release?
// Facts: Bombay High Court order of 19 Oct 2026 (Justice Amit Borkar), reported by LiveLaw Biz (19 Oct) and
// Verdictum (21 Oct). IPRMentLaw weekly highlights (25 Oct) confirms the order date and the conditional restraint.
// The order is interim: it restrains exploitation until the deposit. No view on who is right.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'kiran-court';
export const title = 'Sonakshi की film court ने क्यों रोक दी? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'sonakshi';
export const music = 'sandhya';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Why did a court stop Sonakshi's film?",
    text: "Sonakshi की film court ने क्यों रोक दी?",
    say: "सोनाक्षी की फ़िल्म कोर्ट ने क्यों रोक दी?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "Sonakshi and Zaheer's film Tu Hai Meri Kiran was ready for release.",
    text: "Sonakshi और Zaheer की film Tu Hai Meri Kiran release के लिए तैयार थी.",
    say: "सोनाक्षी और ज़हीर की फ़िल्म तू है मेरी किरण रिलीज़ के लिए तैयार थी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But one co-producer's money was never returned, and a cheque bounced.",
    text: "पर एक co-producer का पैसा वापस नहीं हुआ, और cheque bounce हो गया.",
    say: "पर एक को-प्रोड्यूसर का पैसा वापस नहीं हुआ, और चेक बाउंस हो गया।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'bounce', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "The court's order: deposit 8.85 crore rupees with 15% interest first, then release.",
    text: "Court का order: पहले ₹8.85 करोड़ और 15% interest जमा करो, तब release.",
    say: "कोर्ट का ऑर्डर: पहले आठ करोड़ पचासी लाख रुपये और पंद्रह प्रतिशत ब्याज जमा करो, तब रिलीज़।",
    delivery: {emotion: 'excited', cues: [{word: 'पहले', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Sonakshi's film... why was it stopped?",
    text: "Sonakshi की film... क्यों रुकी?",
    say: "सोनाक्षी की फ़िल्म... क्यों रुकी?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.livelawbiz.com/arbitration/bombay-hc-allows-tu-hai-meri-kiran-release-only-after-echelon-deposits-885-crore-plus-15-interest-as-security-for-co-producer-555306',
    note: 'LiveLaw Biz, published 19 Oct 2026: order by Justice Amit Borkar; Rs. 8.85 crore with 15% annual interest to be deposited within three working days, "failing which the film cannot be commercially exploited"; co-production agreement effective 27 Mar 2024; investment repayable by 27 Apr 2025 (clause 5.3); Rs. 7.50 crore cheque dishonoured on 2 Jan 2026; social media promotion "did not waive Echelon\'s overdue repayment obligation".',
  },
  {
    url: 'https://www.verdictum.in/bombay-high-court/and-movie-products-llp-v-echelon-productions-and-others-2026bhc-os22712-1624389',
    note: 'Verdictum, published 21 Oct 2026: Echelon to deposit Rs. 8.85 crore with 15% interest in three working days, until then the film cannot be released or commercially exploited; petitioner says it paid Rs. 8.85 crore between Mar 2024 and Jan 2025; cheque dishonoured after payment was stopped; "the Instagram collaboration does not make these clauses unclear".',
  },
  {
    url: 'https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/',
    note: 'IPRMentLaw weekly highlights, 25 Oct 2026: interim order passed 19 Oct by Justice Amit Borkar; release restrained until Echelon deposits Rs. 8.85 crore with 15% interest; Section 9 Arbitration and Conciliation Act; AND Movie Products LLP v. Echelon Productions & Ors.',
  },
  {
    url: 'https://www.themoviedb.org/movie/1785611-tu-hai-meri-kiran',
    note: 'TMDB movie page: Tu Hai Meri Kiran (2026); source of the poster still.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  sonakshi: 'सोनाक्षी',
  zaheer: 'ज़हीर',
  kiran: 'किरण',
  release: 'रिलीज़',
  announce: 'अनाउंस',
  producer: 'प्रोड्यूसर',
  cheque: 'चेक',
  bounce: 'बाउंस',
  investment: 'इन्वेस्टमेंट',
  interest: 'ब्याज',
  court: 'कोर्ट',
  film: 'फ़िल्म',
};

const POSTER = {src: 'shorts/kiran-court/stills/poster.jpg', film: 'Tu Hai Meri Kiran', year: 2026, credit: 'Official poster (TMDB listing)', aspect: 1365 / 2048, focus: '50% 25%'};
const SONAKSHI = {src: 'shorts/kiran-court/stills/sonakshi.jpg', film: 'Sonakshi Sinha',credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 577 / 794, focus: '50% 20%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: 'Court ने क्यों\nरोक दी film?',
    accent: ['रोक'],
    // Official poster: sharp from the first frame.
    still: POSTER,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Release के लिए\nतैयार थी',
      accent: ['Release'],
      layout: 'print',
      still: SONAKSHI,
    },
    {
      lines: ['f2'],
      headline: 'पैसा वापस\nनहीं हुआ',
      accent: ['नहीं'],
      layout: 'ticket',
      ticket: {word: 'पैसा', title: 'CO-PRODUCER INVESTMENT', figure: '₹8.85 cr', sub: 'Not returned, cheque bounced'},
      pop: {word: 'bounce', text: 'CHEQUE BOUNCE'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'पहले पैसा,\nफिर release',
    accent: ['पहले'],
    still: POSTER,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sonakshi की film court ने क्यों रोक दी? #shorts',
  altTitles: [
    'Tu Hai Meri Kiran का release क्यों रुका? #shorts',
    'Sonakshi की film पर court का order क्या है? #shorts',
  ],
  description: `Bombay High Court ने 19 Oct 2026 को Tu Hai Meri Kiran (Sonakshi Sinha, Zaheer Iqbal) का theatrical release तब तक रोका, जब तक co-producer Echelon Productions Rs. 8.85 crore 15% interest के साथ जमा नहीं करता. AND Movie Products LLP का कहना है कि उसका पैसा March 2024 के co-production agreement के बाद वापस नहीं हुआ और एक cheque bounce हो गया. Court ने कहा कि Instagram पर promotion से financial claim खत्म नहीं होता (LiveLaw Biz; Verdictum). यह interim order है, और court ने यह तय नहीं किया कि कौन सही है.

Sources:
Bombay HC restrains Tu Hai Meri Kiran release, LiveLaw Biz, 19 Oct 2026 — https://www.livelawbiz.com/arbitration/bombay-hc-allows-tu-hai-meri-kiran-release-only-after-echelon-deposits-885-crore-plus-15-interest-as-security-for-co-producer-555306
AND Movie Products LLP v. Echelon Productions, Verdictum, 21 Oct 2026 — https://www.verdictum.in/bombay-high-court/and-movie-products-llp-v-echelon-productions-and-others-2026bhc-os22712-1624389
IPRMentLaw weekly highlights, 19-25 Oct 2026 — https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/

Images:
Tu Hai Meri Kiran official poster, TMDB listing (https://www.themoviedb.org/movie/1785611-tu-hai-meri-kiran). Copyrighted; used as credited commentary on the film.
Sonakshi Sinha at Krome Studio, Bandra, Bollywood Hungama via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Sonakshi_Sinha_snapped_at_Krome_Studio_in_Bandra_(5).jpg). CC BY 3.0 (https://creativecommons.org/licenses/by/3.0).

Movie Idiots.

#Sonakshi #TuHaiMeriKiran #ZaheerIqbal #BombayHighCourt #BollywoodNews #HindiShorts #MovieIdiots`,
  tags: [
    'sonakshi sinha', 'tu hai meri kiran', 'zaheer iqbal', 'bombay high court', 'bollywood news',
    'film release court', 'hindi shorts', 'movie idiots',
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
