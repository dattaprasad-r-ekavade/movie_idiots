// "Did you know?" Short, design v2 (newsprint). Hook: why did Sourav Ganguly go to court over a film?
// Facts: Delhi High Court personality-rights plea over Doosra (dir. Abhinay Deo), as reported by
// FilmInformation (24 Oct 2026) and IPRMentLaw weekly (25 Oct 2026). Claims are the plea's; the producers'
// reply is in `youtube.description`. The court refused to stay the release; no view on who is right.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'ganguly-doosra';
export const title = 'Sourav Ganguly एक film रोकने court क्यों गए? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'ganguly';
export const music = 'spring-dream';
// Real people are verb subjects (Ganguly गए): plural respectful verbs are expected (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Sourav Ganguly went to court to stop a film?",
    text: "Sourav Ganguly एक film रोकने court क्यों गए?",
    say: "सौरव गांगुली एक फ़िल्म रोकने कोर्ट क्यों गए?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "In the 2002 NatWest final at Lord's, Ganguly waved his jersey.",
    text: "2002 के NatWest final में Lord's पर Ganguly ने जर्सी लहराई थी.",
    say: "दो हज़ार दो के नैटवेस्ट फ़ाइनल में लॉर्ड्स पर गांगुली ने जर्सी लहराई थी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But he says the same moment appeared in a new film's trailer without his permission.",
    text: "पर उनके मुताबिक़, वही moment नई film Doosra के trailer में बिना permission दिखा.",
    say: "पर उनके मुताबिक़, वही मोमेंट नई फ़िल्म दूसरा के ट्रेलर में बिना परमिशन दिखा।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'बिना', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "His claim: his identity was used without a licence. But the court did not stop the release.",
    text: "उनका दावा है, बिना license उनकी पहचान इस्तेमाल हुई. पर court ने release नहीं रोकी.",
    say: "उनका दावा है, बिना लाइसेंस उनकी पहचान इस्तेमाल हुई। पर कोर्ट ने रिलीज़ नहीं रोकी।",
    delivery: {emotion: 'storytelling', cues: [{word: 'नहीं', tag: 'surprised'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Ganguly, went to court to stop a film?",
    text: "Ganguly, film रोकने court गए?",
    say: "गांगुली, फ़िल्म रोकने कोर्ट गए?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://filminformation.com/news/delhi-hc-refuses-to-stay-release-of-doosra-sourav-gangulys-personality-rights-plea-rejected-24-october-2026/',
    note: 'FilmInformation, 24 Oct 2026: Delhi HC declined to stay the release of Doosra. Plea: jersey-waving celebration at Lord\'s in 2002 (NatWest final) used without licence; footage "made up nearly a third of the trailer"; Luv Films biopic agreement dated 5 Aug 2021; "Dada – The Sourav Ganguly Story" set for 14 May 2027. Producers: fictional character Tara; match footage permission secured. Article says the order was made "yesterday (October 23)".',
  },
  {
    url: 'https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/',
    note: 'IPRMentLaw weekly, 25 Oct 2026: Justice Dinesh Bhatt. 22 Oct 2026: interim relief refused, theatrical release not stayed. 23 Oct: producers asked to arrange a screening so the court could decide the claim. OTT release also not stayed. Producers: "not a biopic but a fictional story inspired by Ganguly"; NatWest footage said to be licensed.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  sourav: 'सौरव',
  ganguly: 'गांगुली',
  doosra: 'दूसरा',
  lord: 'लॉर्ड्स',
  natwest: 'नैटवेस्ट',
  final: 'फ़ाइनल',
  jersey: 'जर्सी',
  trailer: 'ट्रेलर',
  permission: 'परमिशन',
  court: 'कोर्ट',
  release: 'रिलीज़',
  licence: 'लाइसेंस',
  license: 'लाइसेंस',
  moment: 'मोमेंट',
};

const GANGULY = {src: 'shorts/ganguly-doosra/stills/ganguly.jpg', film: 'Sourav Ganguly', year: 2020, credit: 'Times of India / Wikimedia Commons (CC BY 3.0)', aspect: 648 / 668, focus: '50% 30%'};
// Doosra (2026) poster from TMDB, Abhinay Deo film: copyrighted, used as commentary on the film.
const POSTER = {src: 'shorts/ganguly-doosra/stills/poster.jpg', film: 'Doosra', year: 2026, credit: 'Doosra (2026) poster via TMDB', aspect: 1178 / 1718, focus: '50% 40%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: 'Ganguly ने film\nरोकने की अर्ज़ी दी',
    accent: ['अर्ज़ी'],
    // Commons portrait (648 px wide), sharp from the first frame.
    still: GANGULY,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Lord\'s 2002:\nजर्सी लहराई',
      accent: ['जर्सी'],
      layout: 'ticket',
      ticket: {word: 'Lord\'s', title: 'NATWEST FINAL', figure: '2002', sub: 'जर्सी लहराने का moment'},
      still: POSTER,
    },
    {
      lines: ['f2'],
      headline: 'Trailer में\nबिना permission दिखा',
      accent: ['permission'],
      layout: 'print',
      still: POSTER,
      pop: {word: 'permission', text: 'CLAIM'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Court ने\nरिलीज़ नहीं रोकी',
    accent: ['नहीं'],
  },
  loop: {lines: ['loop']},
  numbered: true,
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sourav Ganguly एक film रोकने court क्यों गए? #shorts',
  altTitles: [
    'Doosra, Ganguly और personality rights: court ने क्या कहा? #shorts',
    'Ganguly का केस: film की release नहीं रुकी #shorts',
  ],
  description: `Sourav Ganguly और Luv Films ने Delhi High Court में Abhinay Deo की film Doosra रोकने की अर्ज़ी दी. उनका आरोप है कि 2002 के Lord's NatWest final की जर्सी वाली moment बिना license trailer में इस्तेमाल हुई, और Luv Films के पास 2021 से उनकी biopic के exclusive rights हैं. Court ने interim राहत नहीं दी, और release नहीं रोकी; बाद में producers से screening माँगी गई (FilmInformation, IPRMentLaw). Producers का कहना है कि film एक काल्पनिक character Tara की कहानी है, और match footage की permission ली गई थी.

Sources:
FilmInformation, Delhi HC refuses to stay release of Doosra (24 Oct 2026) — https://filminformation.com/news/delhi-hc-refuses-to-stay-release-of-doosra-sourav-gangulys-personality-rights-plea-rejected-24-october-2026/
IPRMentLaw, Weekly highlights 19–25 Oct 2026 — https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/

Images:
Sourav Ganguly portrait (late 2010s), Times of India via Wikimedia Commons, CC BY 3.0 (https://creativecommons.org/licenses/by/3.0) — https://commons.wikimedia.org/wiki/File:Sourav_Ganguly_(late_2010s).jpg
Doosra (2026) poster, TMDB — https://www.themoviedb.org/movie/1794929 — copyrighted, used as commentary on the film.

Movie Idiots.

#SouravGanguly #Doosra #PersonalityRights #Cricket #BollywoodNews #HindiShorts #MovieIdiots`,
  tags: [
    'sourav ganguly', 'doosra', 'doosra film', 'personality rights', 'delhi high court', 'luv films',
    'abhinay deo', 'natwest final 2002', 'cricket film', 'hindi shorts', 'movie idiots',
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
