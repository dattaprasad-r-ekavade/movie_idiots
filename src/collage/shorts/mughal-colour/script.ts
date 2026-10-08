// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still mughal-colour --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'mughal-colour';
export const title = 'पूरी film black-and-white, एक गाना colour में #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "The whole film is black and white, but one song is in colour?",
    text: "पूरी film black-and-white, पर एक गाना colour में?",
    delivery: {sfx: [{word: "colour", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "That song was shot on a Sheesh Mahal set.",
    text: "वो गाना Sheesh Mahal के set पर shoot हुआ.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "Work began in 1944, stalled at Partition, and the film was released in 1960.",
    text: "Film 1944 में शुरू हुई. Partition पर रुक गई. और 1960 में release हुई.",
    delivery: {sfx: [{word: "1960", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 0,
    en: "It was the most expensive Hindi film of its time. One song cost about as much as a whole ordinary film.",
    text: "अपने समय की सबसे महंगी Hindi film थी. एक गाने का खर्च लगभग एक पूरी आम film जितना था.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 1,
    en: "Pyar Kiya To Darna Kya has Madhubala and Lata, shot in colour on a Sheesh Mahal set.",
    text: "Pyar Kiya To Darna Kya में Madhubala हैं, और Lata की आवाज़. ये colour में, Sheesh Mahal के set पर shoot हुआ.",
    delivery: {sfx: [{word: "Kya", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    en: "Asif wanted the whole film in colour in 1960. The distributors said no. The full colour version came in 2004.",
    text: "Asif पूरी film colour में चाहते थे. Distributors ने मना कर दिया. पूरी colour version 2004 में आई.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "One song in colour?",
    text: "एक गाना colour में?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Mughal-E-Azam',
    note: 'Development began 1944; financier left at Partition; recast; released 5 August 1960. Budget ₹10.5–15 million, more than any previous Indian film; Wikipedia: budget for a single song sequence exceeded that typical for an entire film of the period. Do not lock a single rupee figure.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Pyar_Kiya_To_Darna_Kya',
    note: 'Song from Mughal-e-Azam, composed by Naushad, lyrics Shakeel Badayuni, sung by Lata Mangeshkar, picturised on Madhubala. Shot in Technicolor / colour in the original otherwise black-and-white feature.',
  },
  {
    url: 'https://www.britannica.com/topic/Mughal-e-Azam',
    note: 'Britannica: “Pyar Kiya To Darna Kya” filmed in colour in a replica of Lahore’s Sheesh Mahal. Asif wanted to reshoot the entire film in colour in 1960; distributors refused. Digitally colourized theatrical re-release in 2004, described as the first Indian feature colourized for theatrical release.',
  },
];

export const lexicon: Record<string, string> = {
  colour: 'कलर',
  black: 'ब्लैक',
  white: 'व्हाइट',
  sheesh: 'शीश',
  mahal: 'महल',
  partition: 'पार्टीशन',
  ordinary: 'ऑर्डिनरी',
  pyar: 'प्यार',
  kiya: 'किया',
  darna: 'डरना',
  kya: 'क्या',
  madhubala: 'मधुबाला',
  lata: 'लता',
  asif: 'आसिफ़',
  distributors: 'डिस्ट्रिब्यूटर्स',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'एक गाना\ncolour में',
    accent: ['colour'],
    still: {
      src: 'shorts/mughal-colour/stills/poster.jpg',
      film: 'Mughal-e-Azam',
      year: 1960,
      credit: 'Sterling Investment Corporation',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: '1944 → 1960\n16 साल',
      accent: ['1960'],
      still: {
        src: 'shorts/mughal-colour/stills/still1.jpg',
        film: 'Mughal-e-Azam',
        year: 1960,
        credit: 'Sterling Investment Corporation',
        focus: '50% 40%',
      },
      pop: {word: '1960', text: '1960'},
    },
    {
      lines: ['f2'],
      headline: 'सबसे महंगी\nHindi film',
      accent: ['महंगी'],
      still: {
        src: 'shorts/mughal-colour/stills/still2.jpg',
        film: 'Mughal-e-Azam',
        year: 1960,
        credit: 'Sterling Investment Corporation',
        focus: '50% 40%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Pyar Kiya\nTo Darna Kya',
      accent: ['Kya'],
      still: {
        src: 'shorts/mughal-colour/stills/bw-colour.jpg',
        film: 'Mughal-e-Azam',
        year: 1960,
        credit: 'Sterling Investment Corporation',
        focus: '50% 40%',
      },
      pop: {word: 'Kya', text: 'COLOUR'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '2004:\nपूरी colour',
    accent: ['2004'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'पूरी film black-and-white, एक गाना colour में #shorts',
  altTitles: [
    'Mughal-e-Azam: Pyar Kiya To Darna Kya colour में क्यों? #shorts',
    'Asif पूरी film colour चाहते थे, 2004 में हुई #shorts',
  ],
  description: `Mughal-e-Azam का ज्यादातर हिस्सा black-and-white है. Pyar Kiya To Darna Kya colour में shoot हुआ.

1944 में शुरू, Partition पे रुकी, 5 August 1960 को release
अपने समय की सबसे महंगी Hindi film — एक song sequence ordinary film जितना (Wikipedia). Budget figures disagree (₹1.05 vs ₹1.5 crore); script avoids a single rupee lock
Sheesh Mahal replica; Madhubala, Lata, Naushad, Shakeel
Asif wanted the whole film in colour in 1960; distributors said no. Full digital colourization, theatrical re-release 2004

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
Mughal-e-Azam — Sterling Investment Corporation / Bollywood Hungama

Sources:
Mughal-e-Azam — https://en.wikipedia.org/wiki/Mughal-E-Azam
Pyar Kiya To Darna Kya — https://en.wikipedia.org/wiki/Pyar_Kiya_To_Darna_Kya
Britannica — https://www.britannica.com/topic/Mughal-e-Azam

Movie Idiots.

#MughaleAzam #Madhubala #DilipKumar #HindiShorts #MovieIdiots`,
  tags: [
    'mughal e azam', 'madhubala', 'dilip kumar', 'pyar kiya to darna kya',
    'hindi shorts', 'movie idiots', 'k asif',
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
