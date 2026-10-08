// Fun-facts Short. Stills left without `src` on purpose — procure later:
//   npm run short -- still sholay-gabbar --url IMAGE --source PAGE --credit "Studio" --label "Film (Year): …" --name f1
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'sholay-gabbar';
export const title = 'Sholay का Gabbar originally किसी और का था #shorts';
export const format = 'fun-facts' as const;

// Written in English first, then translated to Hinglish. Each `en` is the reviewed draft;
// `text` is the translation the voice and captions use. Check `en` before translating.
export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: 'Was Gabbar in Sholay originally meant for someone else?',
    text: 'Sholay का Gabbar असल में किसी और का था?',
    delivery: {rate: -6, sfx: [{word: 'Gabbar', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: 'Ramesh Sippy himself explained why.',
    text: 'इसकी वजह खुद Ramesh Sippy ने बताई है.',
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "Sanjeev Kumar heard Gabbar's dialogue and wanted that role. He was given Thakur instead.",
    text: 'Sanjeev Kumar ने Gabbar का dialogue सुना, और यही role मांगने लगे. पर उन्हें Thakur का role दिया गया.',
    delivery: {sfx: [{word: 'Gabbar', sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 1,
    en: 'Amjad Khan came from theatre. Javed Akhtar doubted his voice.',
    text: 'Amjad Khan theatre से आए थे. Javed Akhtar को उनकी आवाज़ पर शक था.',
  },
  {
    id: 'f3',
    role: 'fact',
    source: [2, 3],
    en: "The first choice was Danny Denzongpa. But he was shooting Feroz Khan's Dharmatma in Afghanistan, and Sippy could not wait.",
    text: 'असली पसंद Danny Denzongpa थे. पर वो Afghanistan में Feroz Khan की Dharmatma shoot कर रहे थे, और Sippy इंतज़ार नहीं कर सकते थे.',
    delivery: {sfx: [{word: 'Afghanistan', sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 2,
    en: 'The first choice was Danny Denzongpa. The role went to Amjad Khan.',
    text: 'वो पहली पसंद थे, Danny Denzongpa. और Gabbar का role Amjad Khan के पास चला गया.',
  },
  {
    id: 'loop',
    role: 'loop',
    en: 'Was Gabbar in Sholay originally meant for someone else?',
    text: 'Sholay का Gabbar असल में किसी और का था?',
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
    // Own still: the 2023 actor portrait. Never the Amjad Khan hook still under a Danny label.
    still: {
      src: 'shorts/sholay-gabbar/stills/danny-portrait.jpg',
      credit: 'Bollywood Hungama via Wikimedia Commons',
      focus: '50% 30%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Sholay का Gabbar असल में किसी और का था? #shorts',
  altTitles: [
    'Amjad Khan से पहले Gabbar किसी और को मिला था #shorts',
    'Sholay का पहला Gabbar कौन था? #shorts',
  ],
  description: `Sholay का Gabbar असल में किसी और का था. वो नाम Amjad Khan नहीं, Danny Denzongpa था.

Published interviews और film histories पर आधारित commentary. ये screening review नहीं है.

Sanjeev Kumar ने Gabbar का dialogue सुना, और यही role मांगने लगे. पर उन्हें Thakur का role दिया गया.
Amjad Khan theatre से आए थे. Javed Akhtar को उनकी आवाज़ पर शक था.
Danny Denzongpa पहली पसंद थे. पर वो Afghanistan में Feroz Khan की Dharmatma shoot कर रहे थे, और Sippy इंतज़ार नहीं कर सकते थे.

Film stills और posters copyrighted publicity images हैं. इन्हें commentary के लिए, credit के साथ इस्तेमाल किया गया है. ये licensed नहीं हैं.

Sources:
Scroll, Anupama Chopra की Sholay reporting: https://scroll.in/article/745687/shatrughan-sinha-as-jai-pran-as-thakur-and-danny-as-gabbar-what-sholay-could-have-been
Republic, 4 Aug 2020: https://www.republicworld.com/entertainment/bollywood/danny-poses-with-the-star-studded-sholay-cast-in-this-unseen-pic
Ramesh Sippy, Bollywood Bubble, 9 Jul 2024: https://www.bollywoodbubble.com/exclusive-news/ramesh-sippy-first-approached-danny-denzongpa-for-gabbar-singh-and-not-amjad-khan-sholay-director-reveals/
Dharmatma: https://en.wikipedia.org/wiki/Dharmatma

Movie Idiots.

#Sholay #GabbarSingh #AmjadKhan #DannyDenzongpa #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'sholay', 'gabbar singh', 'amjad khan', 'danny denzongpa', 'ramesh sippy', 'sanjeev kumar',
    'dharmatma', 'bollywood trivia', 'hindi shorts', 'movie idiots', 'bollywood facts', 'sholay facts',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real film stills and photos, not altered or synthetic)',
    audience: 'Not made for kids',
  },
};
