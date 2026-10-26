// "Did you know?" Short, design v2 (marquee). Hook: whose voice was Pushpa's Hindi voice? Facts are from
// Wikipedia (Pushpa: The Rise; Shreyas Talpade), Film Companion (Talpade's own words) and DNA Hindi (the
// dialogue). The dubbing credit is confirmed by two sources (see `sources`).
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'pushpa-voice';
export const title = 'Pushpa की Hindi आवाज़ किसकी थी? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'telugu';
export const music = 'mass-entry';
// Real people are verb subjects (Shreyas Talpade ने दी थी): singular masculine verbs are flagged (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Whose voice was Pushpa's Hindi voice?",
    text: "Pushpa की Hindi आवाज़ किसकी थी?",
    say: "पुष्पा की हिंदी आवाज़ किसकी थी?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "Allu Arjun's Pushpa: The Rise came out in December 2021, and its Hindi version did well at the box office.",
    text: "Allu Arjun की Pushpa: The Rise दिसंबर 2021 में आई, और इसके Hindi version ने box office पर अच्छा कमाया.",
    say: "अल्लू अर्जुन की पुष्पा: द राइज़ दिसंबर दो हज़ार इक्कीस में आई, और इसके हिंदी वर्ज़न ने बॉक्स ऑफ़िस पर अच्छा कमाया।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 2],
    en: "But in the Hindi version, Allu Arjun's own voice was not used.",
    text: "पर Hindi version में Allu Arjun की अपनी आवाज़ नहीं थी.",
    say: "पर हिंदी वर्ज़न में अल्लू अर्जुन की अपनी आवाज़ नहीं थी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'नहीं', tag: 'surprised'}]},
  },
  {
    id: 'f3',
    role: 'tension',
    source: [3],
    en: "Still, the line 'Jhukega Nahi' got stuck on everyone's tongue.",
    text: "फिर भी 'झुकेगा नहीं' हर किसी की ज़ुबान पर चढ़ा हुआ है.",
    say: "फिर भी झुकेगा नहीं, हर किसी की ज़ुबान पर चढ़ा हुआ है।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2],
    en: "Pushpa's Hindi voice was Shreyas Talpade's, in the first film and in Pushpa 2.",
    text: "Pushpa की Hindi आवाज़ Shreyas Talpade ने दी थी. पहली film में भी, और Pushpa 2 में भी.",
    say: "पुष्पा की हिंदी आवाज़ श्रेयस तलपड़े ने दी थी। पहली फ़िल्म में भी, और पुष्पा टू में भी।",
    delivery: {cues: [{word: 'पहली', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Pushpa's Hindi voice... whose was it?",
    text: "Pushpa की Hindi आवाज़... किसकी थी?",
    say: "पुष्पा की हिंदी आवाज़... किसकी थी?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Pushpa:_The_Rise',
    note: 'Released 17 December 2021; Allu Arjun plays Pushpa Raj. Hindi dubbed version described as commercially successful. "Shreyas Talpade confirmed that he has dubbed for Allu Arjun for the film\'s Hindi version."',
  },
  {
    url: 'https://www.filmcompanion.in/features/quick-reads/shreyas-talpade-on-dubbing-for-pushpa-the-rule-it-was-a-challenge-to-match-the-mood',
    note: 'Film Companion interview with Shreyas Talpade: "When I dubbed for the first part, I had never imagined for the film to go so big." On the Pushpa: The Rule trailer dubbing: "It was a challenge to match the mood."',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Shreyas_Talpade',
    note: 'Dubbing table and filmography: dubbed for Allu Arjun in the Hindi version of Pushpa: The Rise (2021) and Pushpa 2: The Rule (2024). Used for the Pushpa 2 part of the payoff.',
  },
  {
    url: 'https://www.dnaindia.com/hindi/entertainment/bollywood/news-allu-arjun-leaked-big-detail-about-pushpa-2-reveals-upcoming-film-catchphrase-watch-video-4060100',
    note: 'DNA Hindi (updated 7 Nov 2022): the dialogue "झुकेगा नहीं" is still on people\'s tongues; Allu Arjun: "पुष्पा 1 में मेरा डायलॉग \'झुकेगा नहीं\' था".',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  pushpa: 'पुष्पा',
  allu: 'अल्लू',
  arjun: 'अर्जुन',
  shreyas: 'श्रेयस',
  talpade: 'तलपड़े',
  hindi: 'हिंदी',
  version: 'वर्ज़न',
  jhukega: 'झुकेगा',
  nahi: 'नहीं',
  office: 'ऑफ़िस',
  film: 'फ़िल्म',
};

const POSTER = {src: 'shorts/pushpa-voice/stills/poster.jpg', film: 'Pushpa: The Rise', year: 2021, credit: 'Mythri Movie Makers', aspect: 1446 / 2048, focus: '50% 30%'};
const SHREYAS = {src: 'shorts/pushpa-voice/stills/shreyas.jpg', film: 'Shreyas Talpade', year: 2012, credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 881, focus: '50% 30%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'marquee',
  hook: {
    lines: ['hook'],
    headline: 'Pushpa की Hindi\nआवाज़ किसकी थी?',
    accent: ['किसकी'],
    // Official Mythri poster: sharp from the first frame.
    still: POSTER,
    react: {word: 'Pushpa', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Hindi version ने\nकमाया अच्छा',
      accent: ['Hindi'],
      layout: 'ticket',
      ticket: {word: 'Hindi', title: 'PUSHPA: THE RISE', figure: 'Dec 2021', sub: 'Release, Hindi version'},
      still: POSTER,
    },
    {
      lines: ['f2', 'f3'],
      headline: 'Allu की आवाज़\nHindi में नहीं',
      accent: ['नहीं'],
      layout: 'print',
      still: POSTER,
      pop: {word: 'नहीं', text: 'NOT HIS VOICE'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Shreyas Talpade ने\nदी थी आवाज़',
    accent: ['Shreyas'],
    still: SHREYAS,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Pushpa की Hindi आवाज़ किसकी थी? #shorts',
  altTitles: [
    'Pushpa की Hindi आवाज़ Shreyas Talpade की थी #shorts',
    'Allu Arjun की अपनी Hindi आवाज़ नहीं थी? #shorts',
  ],
  description: `Pushpa: The Rise (2021, Sukumar, Allu Arjun) की Hindi version में Allu Arjun की आवाज़ Shreyas Talpade ने दी थी. Talpade ने पहली film के लिए और Pushpa 2: The Rule (2024) के लिए dubbing की (Wikipedia; Film Companion). "झुकेगा नहीं" dialogue लोगों की ज़ुबान पर चढ़ा रहा (DNA Hindi).

Sources:
Pushpa: The Rise, Wikipedia — https://en.wikipedia.org/wiki/Pushpa:_The_Rise
Shreyas Talpade, Wikipedia — https://en.wikipedia.org/wiki/Shreyas_Talpade
Shreyas Talpade on dubbing for Pushpa, Film Companion — https://www.filmcompanion.in/features/quick-reads/shreyas-talpade-on-dubbing-for-pushpa-the-rule-it-was-a-challenge-to-match-the-mood
DNA Hindi, Allu Arjun on Pushpa 2 dialogue (updated 7 Nov 2022) — https://www.dnaindia.com/hindi/entertainment/bollywood/news-allu-arjun-leaked-big-detail-about-pushpa-2-reveals-upcoming-film-catchphrase-watch-video-4060100

Images:
Pushpa: The Rise official poster, Mythri Movie Makers (https://mythrimoviemakers.com/pushpa/). Copyrighted; used as credited commentary on the film.
Shreyas Talpade at the launch of 'Its Only Cinema' magazine, 2012, Bollywood Hungama via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Shreyas_Talpade_at_the_launch_of_%27Its_Only_Cinema%27_magazine_05.jpg). CC BY 3.0 (https://creativecommons.org/licenses/by/3.0).

Movie Idiots.

#Pushpa #AlluArjun #ShreyasTalpade #PushpaTheRise #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'pushpa', 'pushpa the rise', 'allu arjun', 'shreyas talpade', 'pushpa hindi dubbing', 'sukumar',
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
