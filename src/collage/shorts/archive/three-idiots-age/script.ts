// "Did you know?" Short, design v2 (lagoon). Hook: was the college student in 3 Idiots (2009) 44 years old?
// Ages are computed from birth dates and the Indian release date (25 Dec 2009), each checked on two sources.
// Affectionate, not mocking: the actors were chosen for the film, and the age gap is the trivia.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'three-idiots-age';
export const title = '3 Idiots में college student 44 साल का था? #shorts';
export const format = 'fun-facts' as const;
export const music = 'golden-hour';
// Real people are verb subjects (Aamir Khan, R. Madhavan, Sharman Joshi ... थे): plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "In 3 Idiots, was the college student 44 years old?",
    text: "3 Idiots में college student 44 साल के थे?",
    say: "थ्री इडियट्स में कॉलेज स्टूडेंट चवालीस साल के थे?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "The film follows three engineering students, and Rajkumar Hirani released it in December 2009.",
    text: "Film तीन engineering students की कहानी है, जिसे Rajkumar Hirani ने दिसंबर 2009 में release किया.",
    say: "फ़िल्म तीन इंजीनियरिंग स्टूडेंट्स की कहानी है, जिसे राजकुमार हिरानी ने दिसंबर दो हज़ार नौ में रिलीज़ किया।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [2, 3],
    en: "But Rancho was played by Aamir Khan, who was born in 1965.",
    text: "पर इन students में Rancho बने Aamir Khan, और वो 1965 में पैदा हुए थे.",
    say: "पर इन स्टूडेंट्स में रैंचो बने आमिर ख़ान, और वो उन्नीस सौ पैंसठ में पैदा हुए थे।",
    delivery: {emotion: 'conspiratorial', cues: [{word: '1965', tag: 'curious'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2, 3, 4, 5, 6, 7],
    en: "At release, Aamir was 44. R. Madhavan was 39, and Sharman Joshi was 30.",
    text: "Release के वक़्त Aamir 44 साल के थे. Madhavan 39 के, और Sharman Joshi 30 के.",
    say: "रिलीज़ के वक़्त आमिर चवालीस साल के थे। माधवन उनतालीस के, और शर्मन जोशी तीस के।",
    delivery: {emotion: 'serious', cues: [{word: 'Aamir', tag: 'surprised'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "The college student, 44 years old?",
    text: "College student, 44 साल का?",
    say: "कॉलेज स्टूडेंट, चवालीस साल का?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/3_Idiots',
    note: 'Release date 25 December 2009 (India); directed by Rajkumar Hirani; cast and roles (Aamir Khan as Rancho, R. Madhavan as Farhan, Sharman Joshi as Raju); story of "three students at an Indian engineering college".',
  },
  {
    url: 'https://screendaily.com/reliances-3-idiots-breaks-box-office-records-for-hindi-film/5009361.article',
    note: 'Screen Daily box office report: "released on Christmas Day" (second source for the 25 Dec 2009 release).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Aamir_Khan',
    note: 'Born 14 March 1965 (Mumbai); appeared in 3 Idiots as Ranchodas Chanchad.',
  },
  {
    url: 'https://www.sacnilk.com/tag/Aamir_Khan',
    note: 'Birth date 14 March 1965, Mumbai (second source).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/R._Madhavan',
    note: 'Born 1 June 1970 (Jamshedpur); played Farhan Qureshi in 3 Idiots.',
  },
  {
    url: 'https://www.sacnilk.com/tag/R_Madhavan',
    note: 'Birth date June 1, 1970 (second source).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Sharman_Joshi',
    note: 'Born 28 April 1979; played Raju Rastogi, an engineering student, in 3 Idiots.',
  },
  {
    url: 'https://www.sacnilk.com/tag/Sharman_Joshi',
    note: 'Birth date 28 April 1979, "Apr 28, 1979" (second source).',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  idiots: 'इडियट्स',
  rancho: 'रैंचो',
  aamir: 'आमिर',
  khan: 'ख़ान',
  madhavan: 'माधवन',
  sharman: 'शर्मन',
  joshi: 'जोशी',
  rajkumar: 'राजकुमार',
  hirani: 'हिरानी',
  engineering: 'इंजीनियरिंग',
  students: 'स्टूडेंट्स',
  student: 'स्टूडेंट',
  release: 'रिलीज़',
};

const POSTER = {film: '3 Idiots', year: 2009, credit: 'Vidhu Vinod Chopra Films / Reliance Entertainment'};
const AAMIR = {film: 'Aamir Khan', year: 2018, credit: 'Bollywood Hungama, CC BY 3.0'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: '3 Idiots का student\n44 साल के थे?',
    accent: ['44'],
    still: {src: 'shorts/three-idiots-age/stills/poster.jpg', ...POSTER, aspect: 2 / 3, focus: '50% 30%'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'तीन students की\nfilm',
      accent: ['students'],
      layout: 'number',
      number: {word: '2009', value: 2009, label: 'Release का साल'},
      still: {src: 'shorts/three-idiots-age/stills/poster.jpg', ...POSTER, aspect: 2 / 3, focus: '50% 30%'},
    },
    {
      lines: ['f2'],
      headline: 'Rancho बने Aamir,\nजन्म 1965',
      accent: ['1965'],
      layout: 'ticket',
      ticket: {word: '1965', title: 'AAMIR KHAN', figure: '1965', sub: 'जन्म का साल'},
      still: {src: 'shorts/three-idiots-age/stills/aamir.jpg', ...AAMIR, aspect: 0.8, focus: '50% 25%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Release पर\nAamir 44 के',
    accent: ['44'],
    still: {src: 'shorts/three-idiots-age/stills/aamir.jpg', ...AAMIR, aspect: 0.8, focus: '50% 25%'},
    pop: {word: '44', text: '44 साल'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: '3 Idiots में college student 44 साल का था? #shorts',
  altTitles: [
    '3 Idiots: तीन students, और Aamir की उम्र 44 साल #shorts',
    'Rancho बने Aamir, release पर उम्र कितनी थी? #shorts',
  ],
  description: `3 Idiots (2009, Rajkumar Hirani) में तीन engineering students की कहानी है, और film 25 दिसंबर 2009 को India में रिलीज़ हुई. Release के वक़्त Aamir Khan 44 साल के थे (जन्म 14 मार्च 1965), R. Madhavan 39 के थे (जन्म 1 जून 1970), और Sharman Joshi 30 के थे (जन्म 28 अप्रैल 1979).

Ages are calculated from the birth dates and the release date below. Movie Idiots did not get these from any other source.

Sources:
3 Idiots, Wikipedia — https://en.wikipedia.org/wiki/3_Idiots
3 Idiots box office report (Christmas Day release), Screen Daily — https://screendaily.com/reliances-3-idiots-breaks-box-office-records-for-hindi-film/5009361.article
Aamir Khan, Wikipedia — https://en.wikipedia.org/wiki/Aamir_Khan
Aamir Khan, Sacnilk — https://www.sacnilk.com/tag/Aamir_Khan
R. Madhavan, Wikipedia — https://en.wikipedia.org/wiki/R._Madhavan
R. Madhavan, Sacnilk — https://www.sacnilk.com/tag/R_Madhavan
Sharman Joshi, Wikipedia — https://en.wikipedia.org/wiki/Sharman_Joshi
Sharman Joshi, Sacnilk — https://www.sacnilk.com/tag/Sharman_Joshi

Images: 3 Idiots poster and Aamir Khan still, copyrighted, used briefly as credited commentary on the film's cast. Credits are in the stills ledger.

Movie Idiots.

#3Idiots #AamirKhan #RajkumarHirani #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    '3 idiots', 'aamir khan', 'rajkumar hirani', 'r madhavan', 'sharman joshi', '3 idiots age',
    'bollywood trivia', 'hindi shorts', 'movie idiots',
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
