// "Did you know?" Short, design v2 (lagoon). Hook: is Hera Pheri (2000) not original? Facts from
// Wikipedia (Hera Pheri, Ramji Rao Speaking) and Patrika (Pinkvilla interview, 25 Sep 2025), see `sources`.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'hera-pheri-remake';
export const title = 'Hera Pheri असल में original नहीं थी? #shorts';
export const format = 'fun-facts' as const;
export const music = 'city-lights';
// Real people are verb subjects (Priyadarshan ने direct की, Paresh Rawal का Baburao): plural/agreeing verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Wait, Hera Pheri was not original?",
    text: "Hera Pheri असल में original नहीं थी?",
    say: "हेरा फेरी असल में ऑरिजिनल नहीं थी?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: 0,
    en: "Priyadarshan directed Hera Pheri in 2000, and Paresh Rawal's Baburao is still one of the most memorable characters.",
    text: "2000 में आई Hera Pheri, और Paresh Rawal का Baburao आज तक memes में छाया हुआ है.",
    say: "दो हज़ार में आई हेरा फेरी, और परेश रावल का बाबूराव आज तक मीम्स में छाया हुआ है।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: 0,
    en: "But Baburao's style feels so desi that many people treat him as pure Bollywood.",
    text: "पर इसके director Priyadarshan Malayalam cinema से आए थे, और ये कहानी Kerala में पहले ही hit हो चुकी थी.",
    say: "पर इसके डायरेक्टर प्रियदर्शन मलयालम सिनेमा से आए थे, और ये कहानी केरल में पहले ही हिट हो चुकी थी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'Kerala', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2],
    en: "No. It is a remake of the 1989 Malayalam film Ramji Rao Speaking.",
    text: "ये 1989 की Malayalam film Ramji Rao Speaking का remake है, और Priyadarshan ने खुद इसे frame-to-frame copy बताया.",
    say: "ये उन्नीस सौ नवासी की मलयालम फ़िल्म रामजी राव स्पीकिंग का रीमेक है, और प्रियदर्शन ने ख़ुद इसे फ़्रेम टू फ़्रेम कॉपी बताया।",
    delivery: {emotion: 'serious'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Hera Pheri, not original?",
    text: "Hera Pheri, original नहीं थी?",
    say: "हेरा फेरी, ऑरिजिनल नहीं थी?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Hera_Pheri_(2000_film)',
    note: 'Directed by Priyadarshan; released 31 March 2000; "The film is a remake of 1989 Malayalam film Ramji Rao Speaking." Baburao is played by Paresh Rawal. Used for the setup and for the perception tension (commentary, not a sourced claim about audiences).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Ramji_Rao_Speaking',
    note: 'Malayalam film, released 1989, written and directed by Siddique-Lal. "Priyadarshan remade the film in Hindi, titled Hera Pheri (2000)."',
  },
  {
    url: 'https://www.patrika.com/en/bollywood-news/priyadarshan-sayshera-pheri-was-a-shot-for-shot-remake-of-a-36-year-old-malayalam-film-19973978',
    note: 'Patrika, 25 Sep 2025, citing a Pinkvilla interview: Priyadarshan called Hera Pheri "a frame-to-frame copy" of the 1989 Malayalam film Ramji Rao Speaking. Article wording, not a verbatim transcript.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  original: 'ऑरिजिनल',
  remake: 'रीमेक',
  malayalam: 'मलयालम',
  ramji: 'रामजी',
  rao: 'राव',
  speaking: 'स्पीकिंग',
  priyadarshan: 'प्रियदर्शन',
  paresh: 'परेश',
  rawal: 'रावल',
  baburao: 'बाबूराव',
  desi: 'देसी',
  bollywood: 'बॉलीवुड',
  creation: 'क्रिएशन',
  characters: 'करैक्टर्स',
};

// Stills are not in the ledger yet: run `npm run short -- still hera-pheri-remake --url … --source … --credit … --label … --name …`,
// then add `src: 'hera-pheri-remake/stills/<name>.jpg'` to each still below. Wikimedia API was rate-limited when this was written.
export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: 'Hera Pheri असल में\noriginal नहीं थी?',
    accent: ['original'],
    still: {src: 'shorts/hera-pheri-remake/stills/hp-poster.webp', film: 'Hera Pheri', year: 2000, credit: 'Wikipedia', aspect: 540 / 710, focus: '50% 35%'},
    react: {word: 'Hera', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Baburao आज भी\nmemes में है',
      accent: ['Baburao'],
      layout: 'print',
      still: {src: 'shorts/hera-pheri-remake/stills/hp-poster.webp', film: 'Hera Pheri', year: 2000, credit: 'Wikipedia', aspect: 1.1, focus: '50% 60%'},
      pop: {word: 'memes', text: 'MARCH 2000'},
    },
    {
      lines: ['f2'],
      headline: 'पर कहानी\nKerala से आई',
      accent: ['Kerala'],
      layout: 'ticket',
      ticket: {word: 'Kerala', title: 'PRIYADARSHAN', figure: 'Kerala?', sub: 'Malayalam cinema से'},
      still: {src: 'shorts/hera-pheri-remake/stills/rr-poster.jpg', film: 'Ramji Rao Speaking', year: 1989, credit: 'Wikipedia', aspect: 220 / 310, focus: '50% 40%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Ramji Rao Speaking\nका remake',
    accent: ['remake'],
    still: {src: 'shorts/hera-pheri-remake/stills/rr-poster.jpg', film: 'Ramji Rao Speaking', year: 1989, credit: 'Wikipedia', aspect: 220 / 310, focus: '50% 40%'},
    pop: {word: 'frame-to-frame', text: 'FRAME-TO-FRAME'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Hera Pheri असल में original नहीं थी? #shorts',
  altTitles: [
    'Hera Pheri का असली original: Ramji Rao Speaking #shorts',
    'Baburao इतना desi, फिर भी remake निकली #shorts',
  ],
  description: `Hera Pheri (2000, Priyadarshan) एक 1989 की Malayalam film Ramji Rao Speaking का remake है. Priyadarshan ने इसे Hindi में बनाया, और उन्होंने खुद इसे frame-to-frame copy बताया (Patrika, Pinkvilla interview).

Sources:
Hera Pheri (2000 film), Wikipedia — https://en.wikipedia.org/wiki/Hera_Pheri_(2000_film)
Ramji Rao Speaking, Wikipedia — https://en.wikipedia.org/wiki/Ramji_Rao_Speaking
Priyadarshan on Hera Pheri as a frame-to-frame copy, Patrika (25 Sep 2025) — https://www.patrika.com/en/bollywood-news/priyadarshan-sayshera-pheri-was-a-shot-for-shot-remake-of-a-36-year-old-malayalam-film-19973978

Interview wording is as reported by the news article, not a verbatim transcript. Movie Idiots did not verify the film prints directly.

Images: to be added with credits after the stills step.

Movie Idiots.

#HeraPheri #Priyadarshan #PareshRawal #RamjiRaoSpeaking #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'hera pheri', 'hera pheri 2000', 'ramji rao speaking', 'priyadarshan', 'paresh rawal', 'baburao',
    'hindi remake', 'malayalam remake', 'hindi shorts', 'movie idiots',
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
