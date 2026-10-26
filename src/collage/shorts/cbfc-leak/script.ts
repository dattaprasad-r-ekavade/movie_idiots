// "Did you know?" Short, design v2 (velvet). News (25-26 Oct 2026): documents linked to 500+ film titles
// from the CBFC's e-Cinepramaan portal appeared on the Internet Archive. Reported first by The Hindu; the
// later outlets in `sources` repeat that report. CBFC says initial checks found no further access.
// "500 titles" does not mean 500 full films or scripts were taken.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'cbfc-leak';
export const title = 'Censor Board से 500 films के documents leak हुए? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'cbfc';
export const music = 'golden-hour';
// No real person is a verb subject in this Short; the institution takes singular verbs.
export const honorific = false;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Did documents of 500 films leak from the Censor Board?",
    text: "Censor Board से 500 films के documents leak हुए?",
    say: "सेंसर बोर्ड से पाँच सौ फ़िल्म्स के डॉक्युमेंट्स लीक हुए?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 3],
    en: "A film needs the Censor Board's certificate, so filmmakers send it scripts and files.",
    text: "Film को certificate के लिए Censor Board को script और files देनी होती हैं.",
    say: "फ़िल्म को सर्टिफ़िकेट के लिए सेंसर बोर्ड को स्क्रिप्ट और फ़ाइल्स देनी होती हैं।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [1],
    en: "But this week it came out that these files were lying on the internet.",
    text: "पर इस हफ़्ते पता चला, ये files internet पर पड़ी थीं.",
    say: "पर इस हफ़्ते पता चला, ये फ़ाइल्स इंटरनेट पर पड़ी थीं।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'internet', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 2, 3],
    en: "Yes: documents linked to over 500 titles were online, with scripts and deals. Not 500 full films.",
    text: "हाँ, 500 से ज़्यादा titles से जुड़े documents मिले: scripts, cut orders और deals. पूरी films नहीं.",
    say: "हाँ, पाँच सौ से ज़्यादा टाइटल्स से जुड़े डॉक्युमेंट्स मिले: स्क्रिप्ट्स, कट ऑर्डर्स और डील्स। पूरी फ़िल्म्स नहीं।",
    delivery: {emotion: 'storytelling', cues: [{word: 'नहीं', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "500 films' documents leaked?",
    text: "500 films के documents leak हुए?",
    say: "पाँच सौ फ़िल्म्स के डॉक्युमेंट्स लीक हुए?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://cybersecuritynews.com/indias-film-sensor-board-data-breach/',
    note: '26 Oct 2026. Credits The Hindu as first report. Records submitted through the e-Cinepramaan portal reportedly include shooting scripts, censor cut orders, certification files and private distribution agreements; dated Dec 2025 to Aug 2026; at least three contracts showed licensing fees. CBFC investigating, notified CERT-In; "no evidence of further access" per initial checks. "500 titles" is not 500 full films or scripts.',
  },
  {
    url: 'https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/',
    note: 'Weekly highlights, 25 Oct 2026. Files linked to the e-Cinepramaan portal were reportedly accessible online and on the Internet Archive before removal. CBFC said "initial checks found no trace of the claimed unauthorised access"; investigation and security audit underway; "The full extent and cause of the exposure remain unclear."',
  },
  {
    url: 'https://superkalam.com/current-affairs/25-10-2026/film-certification-records-exposed-in-cbfc-data-leak-pg1-8ae58976-96e7-43c3-89f1-22bb1e638226',
    note: '25 Oct 2026. Credits The Hindu. Shooting scripts, cut orders and local distribution agreements listing licence fees; Dec 2025 to Aug 2026; documents on the Internet Archive for several days before removal (this page gives 12 Oct; other reports give a different date, so no date is used in the Short). Board investigating, cybercrime complaint, CERT-In notified, security audit committed.',
  },
  {
    url: 'https://www.missmalini.com/2026/10/26/cbfc-data-leak-scripts-and-deals-of-500-films-reportedly-exposed-more-details-inside',
    note: '26 Oct 2026. "Records linked to more than 500 films were reportedly accessible"; shooting scripts, cut orders, distribution agreements and other paperwork submitted by filmmakers. Attributes the fee detail to The Hindu: at least three agreements revealed licence fees. Board says "no evidence of further access to the documents".',
  },
];

// Per-short pronunciations for words the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  censor: 'सेंसर',
  board: 'बोर्ड',
  films: 'फ़िल्म्स',
  film: 'फ़िल्म',
  documents: 'डॉक्युमेंट्स',
  leak: 'लीक',
  certificate: 'सर्टिफ़िकेट',
  script: 'स्क्रिप्ट',
  scripts: 'स्क्रिप्ट्स',
  files: 'फ़ाइल्स',
  internet: 'इंटरनेट',
  titles: 'टाइटल्स',
  cut: 'कट',
  orders: 'ऑर्डर्स',
  deals: 'डील्स',
  hindu: 'हिंदू',
};

const HOOK_STILL = {src: 'shorts/cbfc-leak/stills/hook.jpg', film: 'Generic film set', year: 2008, credit: 'Matt Batchelor (Mattbr) / Wikimedia Commons (CC BY 2.0)', aspect: 2812 / 1926, focus: '50% 40%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: '500 films के documents\nleak हुए थे?',
    accent: ['500'],
    still: HOOK_STILL,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Certificate के लिए\nscript देनी पड़ती है',
      accent: ['certificate'],
      layout: 'ticket',
      ticket: {word: 'Censor', title: 'E-CINEPRAMAAN', figure: 'Dec 2025 - Aug 2026', sub: 'Documents on the portal'},
      still: HOOK_STILL,
    },
    {
      lines: ['f2'],
      headline: 'Files अब\ninternet पर',
      accent: ['internet'],
      layout: 'print',
      pop: {word: 'internet', text: 'ONLINE'},
      still: HOOK_STILL,
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '500+ titles के\ndocuments मिले',
    accent: ['500+'],
    still: HOOK_STILL,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Censor Board से 500 films के documents leak हुए? #shorts',
  altTitles: [
    'CBFC की files internet पर मिलीं, जाँच शुरू #shorts',
    'Censor Board का data leak: scripts और deals #shorts',
  ],
  description: `CBFC के e-Cinepramaan portal से जुड़े documents internet पर मिले, जिनमें 500 से ज़्यादा film titles का रिकॉर्ड था. The Hindu की report के मुताबिक़ इसमें scripts, cut orders और distribution deals थे. ये पूरी films या पूरी scripts की चोरी नहीं है. CBFC जाँच और security audit कर रहा है.

Sources:
Cyber Security News, 26 Oct 2026 — https://cybersecuritynews.com/indias-film-sensor-board-data-breach/
IPRMentLaw weekly highlights, 25 Oct 2026 — https://iprmentlaw.com/2026/10/25/iprmentlaw-weekly-highlights-october-19-25-2026/
SuperKalam, 25 Oct 2026 — https://superkalam.com/current-affairs/25-10-2026/film-certification-records-exposed-in-cbfc-data-leak-pg1-8ae58976-96e7-43c3-89f1-22bb1e638226
MissMalini, 26 Oct 2026 — https://www.missmalini.com/2026/10/26/cbfc-data-leak-scripts-and-deals-of-500-films-reportedly-exposed-more-details-inside

Images:
Clapperboard, O2 film, September 2008, Matt Batchelor (Mattbr) / Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Clapperboard,_O2_film,_September_2008.jpg. CC BY 2.0 (https://creativecommons.org/licenses/by/2.0).

Movie Idiots.

#CBFC #CensorBoard #BollywoodNews #FilmIndustry #DidYouKnow #HindiShorts #MovieIdiots`,
  tags: [
    'cbfc', 'censor board', 'cbfc leak', 'e-cinepramaan', 'cbfc data breach', 'film certification',
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
