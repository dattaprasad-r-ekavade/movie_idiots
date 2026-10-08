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
    en: "Same stars, same year, two films.",
    text: "Same stars, same साल, और दो अलग films.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "Dev Anand and Waheeda Rehman starred in both. One was Hindi Guide, the other English The Guide.",
    text: "Dev Anand और Waheeda Rehman, दोनों versions में थे. एक Hindi Guide, दूसरी English The Guide.",
    delivery: {sfx: [{word: "English", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [1, 2],
    en: "The English version was the original plan. Pearl S. Buck wrote the script and Tad Danielewski directed it.",
    text: "English version पहले से plan था. Pearl S. Buck ने script लिखी, और Tad Danielewski ने direct किया.",
  },
  {
    id: 'f3',
    role: 'fact',
    source: 2,
    en: "The directors clashed. Vijay Anand rewrote the Hindi version from scratch.",
    text: "Directors के बीच झगड़ा हुआ. Vijay Anand ने Hindi version को scratch से लिखा.",
    delivery: {sfx: [{word: "scratch", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1],
    en: "The Hindi version was a hit at 183 minutes. The English one ran about 120 minutes and stayed lost for decades. R.K. Narayan disliked both.",
    text: "Hindi version hit रही, 183 minutes की. English version करीब 120 minutes की थी, और दशकों तक गायब रही. R.K. Narayan को दोनों पसंद नहीं आईं.",
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
    note: 'Guide (1965). Hindi version directed by Vijay Anand, ~183 minutes. US English version The Guide written by Pearl S. Buck, directed by Tad Danielewski, ~120 minutes. Same leads: Dev Anand, Waheeda Rehman. Based on R. K. Narayan’s novel.',
  },
  {
    url: 'https://scroll.in/reel/911745/dev-anands-guide-the-back-story-of-the-english-version-is-far-more-interesting-than-the-movie',
    note: 'Scroll (3 Feb 2019): English version was planned first. Dual shoot abandoned after director fights. Dev Anand’s autobiography: Hindi rewritten from scratch; not a single English shot reused. English print out of circulation for years; a bootleg later surfaced.',
  },
  {
    url: 'https://www.thehindu.com/features/friday-review/hindi-movie-guide-was-a-super-hit/article7379477.ece',
    note: 'The Hindu (2 Jul 2015): Hindi super hit, English flop. Pearl S. Buck scripted and co-produced the English version. R. K. Narayan was upset after watching Guide. Waheeda objected to a costume; Dev stopped an unscripted scene.',
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
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'दो Guide\nएक गायब',
    accent: ['गायब'],
    still: {
      src: 'shorts/guide-twins/stills/pair.jpg',
      film: 'Guide',
      year: 1965,
      credit: 'Navketan Films',
      focus: '50% 40%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Dev + Waheeda\nदो versions',
      accent: ['दो'],
      still: {
        src: 'shorts/guide-twins/stills/poster.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        focus: '50% 28%',
      },
      pop: {word: 'English', text: 'ENGLISH'},
    },
    {
      lines: ['f2'],
      headline: 'Pearl S Buck\nEnglish script',
      accent: ['Buck'],
      still: {
        src: 'shorts/guide-twins/stills/leads.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        focus: '50% 35%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Hindi:\nscratch से',
      accent: ['scratch'],
      still: {
        src: 'shorts/guide-twins/stills/waheeda.jpg',
        film: 'Guide',
        year: 1965,
        credit: 'Navketan Films',
        focus: '50% 30%',
      },
      pop: {word: 'scratch', text: 'FROM SCRATCH'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Hindi hit\nEnglish lost',
    accent: ['lost'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Guide दो बार बनी, एक hit एक गायब #shorts',
  altTitles: [
    'Dev Anand की Guide की English twin दशकों गायब रही #shorts',
    'Pearl S Buck ने Guide English लिखी, flop गई #shorts',
  ],
  description: `Guide दो बार बनी. Same stars, same साल. Hindi hit, English version दशकों गायब.

Hindi Guide — Vijay Anand, ~183 min, hit
English The Guide — Pearl S. Buck script, Tad Danielewski, ~120 min, flop, out of circulation for decades
English was the original plan; directors fought; Vijay rewrote Hindi from scratch (Dev Anand, Romancing with Life, as reported)
R. K. Narayan disliked both adaptations

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
