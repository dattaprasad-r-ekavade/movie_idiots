// "Did you know?" Short, design v2 (velvet). Hook: where was Naatu Naatu (RRR, 2022) shot? Facts are from
// Wikipedia (RRR, Naatu Naatu, Mariinskyi Palace), PTI via Onmanorama, Free Press Journal and Business Today
// (see `sources`). The shoot year is said as "2021 में" (reported, not an exact date); the war is one neutral clause.
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'naatu-naatu-ukraine';
export const title = 'Naatu Naatu किस देश में shoot हुआ? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'telugu';
export const music = 'neon-bhairav';
// Real people are verb subjects in the notes (Rajamouli, the team): plural verbs where a person acts (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Which country was Naatu Naatu shot in?",
    text: "Naatu Naatu किस देश में shoot हुआ?",
    say: "नाटू नाटू किस देश में शूट हुआ?",
    delivery: {emotion: 'curious', sfx: [{word: 'shoot', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "RRR is set in pre-independence India, and the song looks like an Indian village.",
    text: "RRR आज़ादी से पहले के India की कहानी है, और ये गाना भी किसी Indian गाँव जैसा दिखता है.",
    say: "आरआरआर आज़ादी से पहले के इंडिया की कहानी है, और ये गाना भी किसी इंडियन गाँव जैसा दिखता है।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [2],
    en: "But the shoot was first meant for India. Then the monsoon rains began, and the team had to move the location.",
    text: "पर पहले shooting India में होनी थी. मानसून की बारिश शुरू हुई, और team को location बदलनी पड़ी.",
    say: "पर पहले शूटिंग इंडिया में होनी थी। मानसून की बारिश शुरू हुई, और टीम को लोकेशन बदलनी पड़ी।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'पर', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2, 3, 5],
    en: "Ukraine. Outside Mariinskyi Palace in Kyiv, in 2021. A few months later, war began there. And this song later won the Oscar.",
    text: "Ukraine में, Kyiv के Mariinskyi Palace के बाहर, 2021 में शूट हुआ. कुछ महीनों बाद वहाँ war शुरू हुआ. और इसी गाने को बाद में Oscar मिला.",
    say: "यूक्रेन में, कीव के मारिंस्की पैलेस के बाहर, दो हज़ार इक्कीस में शूट हुआ। कुछ महीनों बाद वहाँ वॉर शुरू हुआ। और इसी गाने को बाद में ऑस्कर मिला।",
    delivery: {cues: [{word: 'बाद', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Naatu Naatu, and where was the shoot?",
    text: "Naatu Naatu... और shoot कहाँ हुआ?",
    say: "नाटू नाटू... और शूट कहाँ हुआ?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/RRR',
    note: 'Film by S. S. Rajamouli, released 25 March 2022; "a fictionalised tale of two historical freedom fighters, set in the Indian pre-independence era." Says the Naatu Naatu song was filmed at Mariinskyi Palace in Kyiv, Ukraine.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Naatu_Naatu',
    note: 'Song shot at Mariinskyi Palace, Ukraine, in August 2021 as part of the final leg of RRR shooting. Palace is "the official residence of the president of Ukraine in Kyiv". Won Best Original Song at the 95th Academy Awards (12 March 2023).',
  },
  {
    url: 'https://www.onmanorama.com/entertainment/music/2023/03/07/rajamouli-shot-naatu-naatu-mariinskyi-palace-kyiv-ukraine.html',
    note: 'PTI, 7 Mar 2023: "It is shot in Kyiv, actually the presidential palace." Rajamouli: the song was first planned for India, but the team switched after the monsoon arrived: "because it was monsoon time then."',
  },
  {
    url: 'https://www.freepressjournal.in/entertainment/did-you-know-rrr-song-naatu-naatu-was-shot-outside-ukrainian-president-volodymyr-zelenskyys-palace',
    note: 'Free Press Journal, Jan 2023: the song was shot at Mariinsky Palace, Ukraine\'s presidential palace in Kyiv; "Reportedly, the shooting took place in August 2021 as a part of the final shooting schedule of RRR in Ukraine." Second news source for the timing.',
  },
  {
    url: 'https://www.businesstoday.in/visualstories/trending/rrrs-oscar-winning-naatu-naatu-the-unscathed-walls-of-ukraines-presidential-palace-26201-14-03-2023',
    note: 'Business Today (undated on the page; URL dated 14 Mar 2023): "RRR\'s epic song, Naatu Naatu, was shot in 2021, just months before Russia attacked Ukraine." Used for the neutral war timing.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Mariinskyi_Palace',
    note: 'Says the RRR music video "was filmed at Mariinskyi Palace in August 2021"; the palace is the official residence of Ukraine\'s president.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  naatu: 'नाटू',
  rrr: 'आरआरआर',
  rajamouli: 'राजामौली',
  ukraine: 'यूक्रेन',
  kyiv: 'कीव',
  mariinskyi: 'मारिंस्की',
  palace: 'पैलेस',
  presidential: 'प्रेसिडेंशियल',
  monsoon: 'मानसून',
  independence: 'इंडिपेंडेंस',
  shoot: 'शूट',
  location: 'लोकेशन',
  director: 'डायरेक्टर',
  team: 'टीम',
  war: 'वॉर',
  oscar: 'ऑस्कर',
};

const RRR = {film: 'RRR', year: 2022, credit: 'Dani Charles / Silverscreen Media (Wikimedia Commons)'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Naatu Naatu\nकहाँ shoot हुआ?',
    accent: ['shoot'],
    // Director and lead actors, sharp from the first frame (5472 px, CC BY-SA 3.0).
    still: {src: 'shorts/naatu-naatu-ukraine/stills/press-jpg.jpg', ...RRR, aspect: 1.5, focus: '50% 35%'},
    react: {word: 'shoot', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'आज़ादी से पहले\nका India',
      accent: ['पहले'],
      layout: 'print',
      still: {src: 'shorts/naatu-naatu-ukraine/stills/press-jpg.jpg', ...RRR, aspect: 1.5, focus: '62% 35%'},
      pop: {word: 'गाँव', text: 'INDIA?'},
    },
    {
      lines: ['f2'],
      headline: 'Plan था India,\nपर मानसून आया',
      accent: ['मानसून'],
      layout: 'ticket',
      ticket: {word: 'मानसून', title: 'NAATU NAATU', figure: 'Rain', sub: 'India plan, then rain'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Kyiv में,\nपहले Palace के बाहर',
    accent: ['Kyiv'],
    still: {
      src: 'shorts/naatu-naatu-ukraine/stills/palace-jpg.jpg',
      film: 'Mariinskyi Palace',
      credit: 'Gnesener1900 / Wikimedia Commons (CC BY-SA 4.0)',
      aspect: 3944 / 2155,
      focus: '50% 40%',
    },
    pop: {word: 'Oscar', text: 'BEST SONG OSCAR'},
    react: {word: 'Oscar', expression: 'happy', pose: 'thumbsUp'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Naatu Naatu किस देश में shoot हुआ? #shorts',
  altTitles: [
    'RRR का Naatu Naatu Ukraine में क्यों शूट हुआ? #shorts',
    'Oscar वाला गाना, India की फ़िल्म, Kyiv में shoot #shorts',
  ],
  description: `RRR (2022, SS Rajamouli) का "Naatu Naatu" गाना 1920s-style India जैसा लगता है, लेकिन इसकी shooting Ukraine की राजधानी Kyiv में, Mariinskyi Palace के बाहर हुई (2021). बाद में इसी गाने को 95th Academy Awards में Best Original Song का Oscar मिला.

Shoot की जगह Wikipedia और PTI (Onmanorama) दोनों के मुताबिक Mariinskyi Palace है, जो Ukraine के president का official residence है. Shoot का समय Wikipedia और Free Press Journal के मुताबिक August 2021 बताया गया है. Rajamouli ने बताया कि गाना पहले India में शूट होना था, पर monsoon की वजह से location बदली गई (PTI).

Sources:
RRR (film), Wikipedia — https://en.wikipedia.org/wiki/RRR
Naatu Naatu, Wikipedia — https://en.wikipedia.org/wiki/Naatu_Naatu
Mariinskyi Palace, Wikipedia — https://en.wikipedia.org/wiki/Mariinskyi_Palace
Rajamouli on the Kyiv shoot, PTI via Onmanorama, 7 Mar 2023 — https://www.onmanorama.com/entertainment/music/2023/03/07/rajamouli-shot-naatu-naatu-mariinskyi-palace-kyiv-ukraine.html
Free Press Journal, Jan 2023 — https://www.freepressjournal.in/entertainment/did-you-know-rrr-song-naatu-naatu-was-shot-outside-ukrainian-president-volodymyr-zelenskyys-palace
Business Today, Naatu Naatu and the Ukrainian presidential palace, Mar 2023 — https://www.businesstoday.in/visualstories/trending/rrrs-oscar-winning-naatu-naatu-the-unscathed-walls-of-ukraines-presidential-palace-26201-14-03-2023

Shoot details come from press and encyclopedia reports; the exact date is not confirmed. Movie Idiots did not verify this with the production.

Images:
RRR press meet photo (SS Rajamouli, Ram Charan and others), Dani Charles / Silverscreen Media, Wikimedia Commons (https://commons.wikimedia.org/wiki/File:SS_Rajamouli,_Ram_Charan,_Alia_Bhatt,_N.T.Rama_Rao_Jr._At_The_RRR_Press_Meet_in_Chennai.jpg), CC BY-SA 3.0.
Mariinsky Palace, Kiev, Gnesener1900, Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Mariinsky_Palace,_Kiev.jpg), CC BY-SA 4.0.

Movie Idiots.

#NaatuNaatu #RRR #SSRajamouli #Oscar #Ukraine #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'naatu naatu', 'rrr', 'rrr 2022', 'ss rajamouli', 'ram charan', 'ntr jr', 'naatu naatu ukraine',
    'naatu naatu oscar', 'mariinskyi palace', 'bollywood trivia', 'hindi shorts', 'movie idiots',
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
