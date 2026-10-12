// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still guide-twins --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'guide-twins';
export const title = 'Guide दो बार बनी, एक hit एक गायब #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Guide was made twice. One was a hit, and one disappeared?",
    text: "Guide दो बार बनी. एक hit, और एक गायब?",
    delivery: {sfx: [{word: "गायब", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "Both had the same stars: Dev Anand and Waheeda Rehman.",
    text: "और दोनों में वही stars थे, Dev Anand और Waheeda Rehman.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "One was made in Hindi, the other in English as The Guide.",
    text: "एक Hindi में बनी, और दूसरी English में, The Guide नाम से.",
    delivery: {sfx: [{word: "English", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [1, 2],
    en: "The English version was planned first. Pearl S. Buck wrote the script and Tad Danielewski directed it.",
    text: "English version पहले से plan था. Pearl S. Buck ने script लिखी, और Tad Danielewski ने direct किया.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: [0, 1],
    en: "The Indian and American teams clashed, so the Hindi script was rewritten from scratch. Vijay Anand wrote the screenplay.",
    text: "Indian और American teams में झगड़ा हुआ, तो Hindi script scratch से दोबारा लिखी गई. Screenplay Vijay Anand ने लिखा.",
    delivery: {sfx: [{word: "scratch", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f4',
    role: 'fact',
    source: [0, 1],
    en: "The English one ran 120 minutes and stayed out of circulation for years.",
    text: "English version 120 minutes की थी, और सालों तक गायब रही.",
    delivery: {sfx: [{word: "गायब", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 2],
    en: "The Hindi Guide was a hit, all 183 minutes of it. But R.K. Narayan did not like the film.",
    text: "Hindi Guide hit हुई, पूरे 183 minutes की. पर R.K. Narayan को film पसंद नहीं आई.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "One hit, and one lost?",
    text: "एक hit, और एक गायब?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Guide_(film)',
    note: 'Infobox: 183 minutes (Hindi), 120 minutes (English). US English version The Guide written by Pearl S. Buck, directed and produced by Tad Danielewski. Screenplay and dialogue credited to Vijay Anand (Hindi). Dev Anand and Waheeda Rehman in the Hindi film. Teams clashed and the Hindi version was postponed. R. K. Narayan disliked the film adaptation of his novel.',
  },
  {
    url: 'https://scroll.in/reel/911745/dev-anands-guide-the-back-story-of-the-english-version-is-far-more-interesting-than-the-movie',
    note: 'Scroll (3 Feb 2019): English-language The Guide was planned first. Dev Anand and Waheeda Rehman act in the English version. Dev Anand’s account: Hindi version script rewritten from scratch. English print out of circulation for years.',
  },
  {
    url: 'https://www.thehindu.com/features/friday-review/hindi-movie-guide-was-a-super-hit/article7379477.ece',
    note: 'The Hindu, 2 Jul 2015. Only the title was checked (page not fetchable from the tool): “Hindi movie Guide was a super hit”. Body not read; the hit claim rests on this title plus the Wikipedia article.',
  },
];

export const lexicon: Record<string, string> = {
  guide: 'गाइड',
  same: 'सेम',
  stars: 'स्टार्स',
  dev: 'देव',
  anand: 'आनंद',
  waheeda: 'वाहीदा',
  rehman: 'रहमान',
  english: 'इंग्लिश',
  pearl: 'पर्ल',
  buck: 'बक',
  tad: 'टैड',
  danielewski: 'डेनिएलेव्स्की',
  directors: 'डायरेक्टर्स',
  vijay: 'विजय',
  scratch: 'स्क्रैच',
  narayan: 'नारायण',
  american: 'अमेरिकन',
  teams: 'टीम्स',
  screenplay: 'स्क्रीनप्ले',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  // Design v2 (docs/shorts-redesign.md): a layout per beat, velvet palette, mascot cameos.
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook', 'promise'],
    headline: 'दो Guide\nएक गायब',
    accent: ['गायब'],
    blur: 0,
    still: {
      src: 'shorts/guide-twins/stills/pair.jpg',
      film: 'Guide',
      year: 1965,
      credit: 'Navketan Films',
      width: 960,
      aspect: 1200 / 667,
      focus: '50% 40%',
    },
    pop: {line: 'promise', word: 'stars', text: 'SAME STARS'},
    react: {word: 'गायब', expression: 'shock', pose: 'shrug'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Dev + Waheeda\nदो versions',
      accent: ['दो'],
      layout: 'versus',
      versus: {
        top: {word: 'Hindi', src: 'shorts/guide-twins/stills/leads.jpg', film: 'Guide · Hindi', year: 1965, credit: 'Navketan Films', aspect: 1200 / 675, focus: '50% 35%'},
        bottom: {word: 'English', src: 'shorts/guide-twins/stills/pair.jpg', film: 'The Guide · English', year: 1965, credit: 'Navketan Films', aspect: 1200 / 667, focus: '50% 40%'},
        middle: 'VS',
      },
    },
    {
      lines: ['f2'],
      headline: 'Pearl S Buck\nEnglish script',
      accent: ['Buck'],
      still: {
        src: 'shorts/guide-twins/stills/pair.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        width: 960,
        aspect: 1200 / 667,
        focus: '50% 35%',
      },
      cuts: [{
        word: 'Tad',
        src: 'shorts/guide-twins/stills/waheeda.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        width: 460,
        aspect: 759 / 1076,
        focus: '50% 30%',
        replace: true,
      }],
    },
    {
      lines: ['f3'],
      headline: 'Hindi:\nscratch से',
      accent: ['scratch'],
      still: {
        src: 'shorts/guide-twins/stills/leads.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        width: 960,
        aspect: 1200 / 675,
        focus: '30% 30%',
        push: [1, 1.1],
      },
      cuts: [{
        word: 'Vijay',
        src: 'shorts/guide-twins/stills/pair.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        width: 860,
        aspect: 1200 / 667,
        focus: '50% 40%',
        replace: true,
      }],
      layout: 'print',
      pop: {word: 'scratch', text: 'FROM SCRATCH'},
      react: {word: 'झगड़ा', expression: 'skeptic', pose: 'facepalm'},
    },
    {
      lines: ['f4'],
      headline: 'English version\nसालों गायब',
      accent: ['गायब'],
      layout: 'number',
      number: {word: '120', value: 120, suffix: ' min', label: 'English The Guide'},
      still: {
        src: 'shorts/guide-twins/stills/pair.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        width: 960,
        aspect: 1200 / 667,
        focus: '50% 40%',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Hindi hit\nEnglish lost',
    accent: ['lost'],
    still: {
      src: 'shorts/guide-twins/stills/pair.jpg',
      film: 'Guide',
      year: 1965,
      credit: 'Navketan Films',
      width: 960,
      aspect: 1200 / 667,
      focus: '50% 45%',
    },
    pop: {word: '183', text: '183 MIN'},
    react: {word: 'Narayan', expression: 'sad', pose: 'shrug'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Guide दो बार बनी, एक hit एक गायब #shorts',
  altTitles: [
    'Dev Anand की Guide की English twin सालों गायब रही #shorts',
    'Pearl S Buck ने Guide English लिखी, फिर गायब #shorts',
  ],
  description: `Guide दो बार बनी. Same stars, दो languages. Hindi hit, English version सालों तक गायब.

Hindi Guide — Vijay Anand, 183 min (Wikipedia infobox)
English The Guide — Pearl S. Buck script, Tad Danielewski direction, 120 min (Wikipedia infobox), out of circulation for years (Scroll)
English version was planned first (Scroll); teams clashed; Hindi version rewritten from scratch (Dev Anand's account, via Scroll); Vijay Anand credited with its screenplay (Wikipedia)
R. K. Narayan disliked the film adaptation of his novel (Wikipedia)

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed. No authentic 1965 English-language poster was found; the English-twin beat uses the same Dev Anand / Waheeda Rehman stills.

Stills:
Guide — Navketan Films / Indian Express / The Hindu

Sources:
Guide (film) — https://en.wikipedia.org/wiki/Guide_(film)
Scroll on the English version — https://scroll.in/reel/911745/dev-anands-guide-the-back-story-of-the-english-version-is-far-more-interesting-than-the-movie
The Hindu — https://www.thehindu.com/features/friday-review/hindi-movie-guide-was-a-super-hit/article7379477.ece

Movie Idiots.

#Guide #DevAnand #WaheedaRehman #HindiShorts #MovieIdiots`,
  tags: [
    'guide 1965', 'dev anand', 'waheeda rehman', 'vijay anand', 'pearl s buck',
    'hindi shorts', 'movie idiots', 'rk narayan',
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
