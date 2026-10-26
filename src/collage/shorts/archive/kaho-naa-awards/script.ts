// Starter for a "Did you know?" Short. Copy this folder to src/collage/shorts/<slug>/, replace
// every line and the plan, register it in ../index.ts, then:
//   npm run short -- lint <slug>      structure + pronunciation check
//   npm run short -- say <slug>       Devanagari the voice will read + audio direction per line
//   npm run short -- still <slug> --url … --source … --credit … --label "Film (Year): …" --name f1
//   npm run short -- stills <slug>    contact sheets → render --draft → render
//
// Placeholder text below is layout filler, not facts. Do not publish it.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'kaho-naa-awards';
export const title = 'Hrithik की पहली film ने कितने awards जीते? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'golden-hour';
// Real people are verb subjects (Hrithik Roshan ... थे): plural verbs for the person (lint).
export const honorific = true;

// Write Hinglish the way you'd tell a friend. Captions show `text`; the voice reads Devanagari from
// `say` (or toSpoken()). Hook ≤ 10 words, one question. Setup, tension (turn word), payoff, loop.
export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "How many awards did Hrithik's first film win?",
    text: "Hrithik की पहली film ने कितने awards जीते?",
    say: "ऋतिक की पहली फ़िल्म ने कितने अवॉर्ड्स जीते?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 2],
    en: "Kaho Naa... Pyaar Hai, from 2000, was Hrithik Roshan's debut as a lead, opposite Ameesha Patel.",
    text: "2000 की Kaho Naa... Pyaar Hai से Hrithik Roshan का lead में debut हुआ, Ameesha Patel के साथ.",
    say: "दो हज़ार की कहो ना प्यार है से ऋतिक रोशन का लीड में डेब्यू हुआ, अमीषा पटेल के साथ।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [3],
    en: "But in the Best Actor race he was up against Shah Rukh Khan, Anil Kapoor and Sanjay Dutt.",
    text: "पर Best Actor की race में उनके सामने Shah Rukh Khan, Anil Kapoor और Sanjay Dutt जैसे बड़े नाम थे.",
    say: "पर बेस्ट एक्टर की रेस में उनके सामने शाहरुख़ ख़ान, अनिल कपूर और संजय दत्त जैसे बड़े नाम थे।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'पर', tag: 'skeptical'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 3],
    en: "Still, Best Film, Best Actor and Best Male Debut went to this film, and it won 92 awards in total.",
    text: "फिर भी Best Film, Best Actor और Best Male Debut इसी film के नाम रहे, और कुल 92 awards मिले.",
    say: "फिर भी बेस्ट फ़िल्म, बेस्ट एक्टर और बेस्ट मेल डेब्यू इसी फ़िल्म के नाम रहे, और कुल बानवे अवॉर्ड्स मिले।",
    delivery: {emotion: 'proud', cues: [{word: 'कुल', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Debut film, and this many awards?",
    text: "पहली film, और इतने awards?",
    say: "पहली फ़िल्म, और इतने अवॉर्ड्स?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Kaho_Naa..._Pyaar_Hai',
    note: 'Released 14 Jan 2000; written, directed and produced by Rakesh Roshan; "marked the acting debuts of Hrithik Roshan and Ameesha Patel"; 46th Filmfare (17 Feb 2001) wins incl. Best Film, Best Actor (Hrithik), Best Male Debut (Hrithik); Guinness (2002) for the feature film with the most awards, "a total of 92 awards"; Limca entry for most awards by a Hindi film (the page says it "would be added"; year not used).',
  },
  {
    url: 'https://www.filmstarts.de/nachrichten/1000096323.html',
    note: 'Filmstarts (German): "Mit insgesamt 92 Trophäen"; Guinness World Records entry in 2002. Does not mention Limca. Used for the 92 count (second source).',
  },
  {
    url: 'https://www.orissapost.com/20-years-ago-hrithik-roshan-debuted-with-this-film-some-lesser-known-facts-about-kaho-naa-pyaar-hai/amp/',
    note: 'Orissa Post: "20 years ago Hrithik Roshan debuted with this film"; film "featured in the Limca Book of Records" for the most awards won by a Hindi film. Does not give Filmfare or the total count.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/46th_Filmfare_Awards',
    note: 'Ceremony 17 Feb 2001: Kaho Naa... Pyaar Hai won Best Film, Best Actor and Best Male Debut (Hrithik); Hrithik also had Best Actor nominations for Fiza and Kaho Naa... Pyaar Hai. The page gives a different award count (9) from the film article (8); no count is used on screen.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  hrithik: 'ऋतिक',
  roshan: 'रोशन',
  ameesha: 'अमीषा',
  patel: 'पटेल',
  fiza: 'फ़िज़ा',
  filmfare: 'फ़िल्मफ़ेयर',
  awards: 'अवॉर्ड्स',
  award: 'अवॉर्ड',
  debut: 'डेब्यू',
  lead: 'लीड',
  best: 'बेस्ट',
  actor: 'एक्टर',
  male: 'मेल',
};

// The only still is the theatrical poster (265 px wide, too small for a full-frame or sharp hook).
// It appears as a mounted print, never as the hook frame.
const POSTER = {film: 'Kaho Naa... Pyaar Hai', year: 2000, credit: 'Theatrical poster, via Wikipedia'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Debut film ने\nकितने awards जीते?',
    accent: ['जीते'],
    still: {src: 'shorts/kaho-naa-awards/stills/poster-kaho.jpg', ...POSTER, aspect: 265 / 376, focus: '50% 30%'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'पहली film,\nlead में debut',
      accent: ['debut'],
      layout: 'print',
      still: {src: 'shorts/kaho-naa-awards/stills/poster-kaho.jpg', ...POSTER, aspect: 265 / 376, width: 520, focus: '50% 30%'},
      pop: {word: 'debut', text: 'DEBUT'},
    },
    {
      lines: ['f2'],
      headline: 'सामने थे\nबड़े stars',
      accent: ['बड़े'],
      layout: 'ticket',
      ticket: {word: 'Shah', title: 'BEST ACTOR 2001', figure: 'SRK?', sub: 'Shah Rukh, Anil, Sanjay'},
      still: {src: 'shorts/kaho-naa-awards/stills/poster-kaho.jpg', ...POSTER, aspect: 265 / 376, width: 440, focus: '50% 30%'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Best Actor, Best Debut,\nऔर 92 awards',
    accent: ['92'],
    still: {src: 'shorts/kaho-naa-awards/stills/poster-kaho.jpg', ...POSTER, aspect: 265 / 376, width: 520, focus: '50% 30%'},
    pop: {word: '92', text: '92 AWARDS'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Hrithik की पहली film ने कितने awards जीते? #shorts',
  altTitles: [
    'Kaho Naa... Pyaar Hai: Hrithik का debut, और 92 awards #shorts',
    'Debutant Hrithik, और Filmfare की race #shorts',
  ],
  description: `Kaho Naa... Pyaar Hai (2000, Rakesh Roshan) से Hrithik Roshan और Ameesha Patel का acting debut हुआ. 46th Filmfare (2001) में film को Best Film, Best Actor और Best Male Debut मिले. Filmfare में उसी साल Hrithik का Fiza के लिए भी Best Actor में नामांकन था. Film के कुल 92 awards होने की बात Wikipedia और Filmstarts दोनों में है, और कहा जाता है कि Guinness और Limca Book of Records में भी इसी record का ज़िक्र है.

Sources:
Kaho Naa... Pyaar Hai, Wikipedia — https://en.wikipedia.org/wiki/Kaho_Naa..._Pyaar_Hai
Filmstarts (de), 92 Filmpreise — https://www.filmstarts.de/nachrichten/1000096323.html
Orissa Post, 20 years of Kaho Naa... Pyaar Hai — https://www.orissapost.com/20-years-ago-hrithik-roshan-debuted-with-this-film-some-lesser-known-facts-about-kaho-naa-pyaar-hai/amp/
46th Filmfare Awards, Wikipedia — https://en.wikipedia.org/wiki/46th_Filmfare_Awards

Award counts and record-book entries differ between sources; they are reported, not audited by Movie Idiots.

Images: theatrical poster of Kaho Naa... Pyaar Hai (Wikipedia), copyrighted, used briefly as credited commentary.

Movie Idiots.

#KahoNaaPyaarHai #HrithikRoshan #AmeeshaPatel #Filmfare #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'kaho naa pyaar hai', 'hrithik roshan', 'ameesha patel', 'rakesh roshan', 'filmfare awards', 'bollywood debut',
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
