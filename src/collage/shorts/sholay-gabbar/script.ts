// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still sholay-gabbar --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'sholay-gabbar';
export const title = 'Sholay का Gabbar originally किसी और का था #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    text: 'Sholay का Gabbar originally किसी और का था?',
    delivery: {rate: 16, sfx: [{word: 'Gabbar', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    text: 'तीसरा fact तो Sippy interview में खुद आया।',
    delivery: {rate: 16},
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    text: 'Sanjeev Kumar dialogue सुनके Gabbar मांगने लगे। बने Thakur।',
    delivery: {rate: 16, sfx: [{word: 'Gabbar', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    text: 'Amjad Khan theatre से आए। Javed को उनकी voice की टेंशन थी।',
    delivery: {rate: 16},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [2, 3],
    text: 'असली signed actor Afghanistan में फंस गए। Feroz Khan की Dharmatma।',
    delivery: {rate: 16, sfx: [{word: 'Afghanistan', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    text: 'वो नाम? Danny Denzongpa। Role Amjad के पास चला गया।',
    delivery: {rate: 18},
  },
  {
    id: 'loop',
    role: 'loop',
    text: 'Gabbar originally किसी और का था?',
    delivery: {rate: 16},
  },
];

export const sources = [
  {
    url: 'https://scroll.in/article/745687/shatrughan-sinha-as-jai-pran-as-thakur-and-danny-as-gabbar-what-sholay-could-have-been',
    note: 'Scroll (11 Aug 2015), from Anupama Chopra’s Sholay reporting: Danny Denzongpa first choice for the dacoit; after hearing the dialogue Sanjeev Kumar wanted Danny’s role and played Thakur.',
  },
  {
    url: 'https://www.republicworld.com/entertainment/bollywood/danny-poses-with-the-star-studded-sholay-cast-in-this-unseen-pic',
    note: 'Republic (4 Aug 2020): Javed Akhtar was skeptical of Amjad Khan’s voice; Danny opted out because he was shooting Dharmatma in Afghanistan.',
  },
  {
    url: 'https://www.bollywoodbubble.com/exclusive-news/ramesh-sippy-first-approached-danny-denzongpa-for-gabbar-singh-and-not-amjad-khan-sholay-director-reveals/',
    note: 'Ramesh Sippy to Bollywood Bubble (9 Jul 2024): Danny was not available; he was in Afghanistan shooting Dharmatma with Feroz Khan. They could not wait.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Dharmatma',
    note: 'Dharmatma (1975), Feroz Khan, partly shot in Afghanistan. Date check for the overlap with Sholay’s production.',
  },
];

export const lexicon: Record<string, string> = {
  sholay: 'शोले',
  gabbar: 'गब्बर',
  originally: 'ओरिजिनली',
  sippy: 'सिप्पी',
  interview: 'इंटरव्यू',
  sanjeev: 'संजीव',
  kumar: 'कुमार',
  thakur: 'ठाकुर',
  amjad: 'अमजद',
  khan: 'खान',
  javed: 'जावेद',
  afghanistan: 'अफ़ग़ानिस्तान',
  feroz: 'फ़िरोज़',
  dharmatma: 'धर्मात्मा',
  danny: 'डैनी',
  denzongpa: 'डेन्ज़ोंगपा',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'असली Gabbar\nकौन था?',
    accent: ['Gabbar'],
    still: {
      src: 'shorts/sholay-gabbar/stills/gabbar.jpg',
      film: 'Sholay',
      year: 1975,
      credit: 'Sippy Films',
      focus: '50% 30%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Sanjeev ने\nGabbar मांगा',
      accent: ['Gabbar'],
      still: {
        src: 'shorts/sholay-gabbar/stills/scene.jpg',
        film: 'Sholay',
        year: 1975,
        credit: 'Sippy Films',
        focus: '50% 40%',
      },
      pop: {word: 'Thakur', text: 'THAKUR'},
    },
    {
      lines: ['f2'],
      headline: 'Amjad\ntheatre से',
      accent: ['theatre'],
      still: {
        src: 'shorts/sholay-gabbar/stills/cast.jpg',
        film: 'Sholay',
        year: 1975,
        credit: 'Sippy Films',
        focus: '50% 40%',
      },
    },
    {
      lines: ['f3'],
      headline: 'Signed actor\nAfghanistan',
      accent: ['Afghanistan'],
      still: {
        src: 'shorts/sholay-gabbar/stills/dharmatma.jpg',
        film: 'Dharmatma',
        year: 1975,
        credit: 'Feroz Khan Productions',
        focus: '50% 28%',
      },
      pop: {word: 'Afghanistan', text: 'AFGHANISTAN'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Danny\nDenzongpa',
    accent: ['Danny'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sholay का Gabbar originally किसी और का था #shorts',
  altTitles: [
    'Danny Denzongpa Gabbar होते? Sippy ने बताया #shorts',
    'Amjad Khan से पहले Gabbar किसी और को मिला था #shorts',
  ],
  description: `Sholay का Gabbar originally किसी और का था — और वो नाम Amjad Khan नहीं है.

Published interviews और film histories पर commentary; first-hand screening नहीं है.

Sanjeev Kumar dialogue सुनके Gabbar मांगने लगे, बने Thakur
Amjad Khan theatre से आए; Javed को voice की टेंशन बताई गई
Ramesh Sippy: Danny Denzongpa Afghanistan में Dharmatma shoot कर रहे थे, wait नहीं हो सकती

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed.

Stills:
Sholay — Sippy Films / Indian Express
Dharmatma — Feroz Khan Productions

Sources:
Scroll / Anupama Chopra reporting — https://scroll.in/article/745687/shatrughan-sinha-as-jai-pran-as-thakur-and-danny-as-gabbar-what-sholay-could-have-been
Republic on Danny / Amjad voice — https://www.republicworld.com/entertainment/bollywood/danny-poses-with-the-star-studded-sholay-cast-in-this-unseen-pic
Ramesh Sippy, Bollywood Bubble — https://www.bollywoodbubble.com/exclusive-news/ramesh-sippy-first-approached-danny-denzongpa-for-gabbar-singh-and-not-amjad-khan-sholay-director-reveals/
Dharmatma — https://en.wikipedia.org/wiki/Dharmatma

Movie Idiots.

#Sholay #GabbarSingh #AmjadKhan #DannyDenzongpa #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'sholay', 'gabbar singh', 'amjad khan', 'danny denzongpa', 'ramesh sippy',
    'bollywood trivia', 'hindi shorts', 'movie idiots', 'dharmatma', 'sanjeev kumar',
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
