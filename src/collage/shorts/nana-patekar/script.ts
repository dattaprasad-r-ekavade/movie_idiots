// Fun-facts Short. Unknown Nana Patekar beats, researched after his death on 8 Oct 2026.
// Claims from published pages only. Death is in the description, not the hook.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'nana-patekar';
export const title = 'Nana Patekar सच में Kargil गए थे? #shorts';
export const format = 'fun-facts' as const;
// Tribute to a real person: lint flags singular verbs (गया/था → गए/थे).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Did Nana Patekar really go to Kargil?",
    text: "Nana Patekar सच में Kargil गए थे?",
    delivery: {sfx: [{word: "Kargil", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "And it all started with a film.",
    text: "और ये सब शुरू हुआ एक film से.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: [0, 1, 2],
    en: "1991, Prahaar. He directed it himself, and trained three years with the Maratha Light Infantry.",
    text: "1991, Prahaar. खुद direct की, और तीन साल Maratha Light Infantry के साथ training ली.",
    delivery: {sfx: [{word: "1991", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: 2,
    en: "1999, the Kargil war. The Defence Minister said no at first, but he got permission and went with the troops.",
    text: "1999, Kargil war. Defence Minister ने पहले मना किया, फिर permission लेकर troops के साथ गए.",
    delivery: {sfx: [{word: "permission", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [3, 4],
    en: "2015: he started Naam Foundation for drought-hit farmers.",
    text: "2015 में सूखे से परेशान farmers के लिए Naam Foundation शुरू की.",
  },
  {
    id: 'f3r',
    role: 'reveal',
    source: 4,
    en: "And for that, he dropped his plan to buy a one-and-a-half-crore car.",
    text: "और इसके लिए डेढ़ करोड़ की नई car का plan छोड़ दिया.",
    delivery: {sfx: [{word: "करोड़", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 0,
    en: "The angry man on screen; in real life, a soldier and a friend to farmers.",
    text: "Screen पर angry man, असल में फ़ौजी और farmers का साथी.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "And yes, he really did go to Kargil.",
    text: "और हाँ, वो सच में Kargil गए थे.",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Nana_Patekar',
    note: 'Vishwanath “Nana” Patekar (1 Jan 1951 – 8 Oct 2026). Directorial debut Prahaar: The Final Attack (1991); trained for an Indian Army officer role. Territorial Army / Maratha Light Infantry association. Three National Film Awards. Died of cardiac arrest at home in Goa.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Prahaar:_The_Final_Attack',
    note: 'Prahaar: The Final Attack (1991). Written, directed by and starring Nana Patekar as Major V.S. Chavan. Co-stars Madhuri Dixit. Training with the army is part of the film’s production story.',
  },
  {
    url: 'https://www.telegraphindia.com/entertainment/when-nana-patekar-put-acting-career-on-hold-to-join-the-army-during-kargil-war/cid/2183733',
    note: 'Telegraph India, 8 Oct 2026, quoting Patekar on KBC 16 (Aug 2024): three years with Maratha Light Infantry for Prahaar; called Defence Minister George Fernandes during Kargil 1999; Fernandes first said it was impossible; Patekar: commission is six months, he had already trained three years. Do not lock 60 days / 20 kg — other outlets disagree on those numbers.',
  },
  {
    url: 'https://timesofindia.indiatimes.com/city/mumbai/nanas-goodwill-nets-6-crore-for-parched-farmers/articleshow/49144117.cms',
    note: 'Times of India, 28 Sep 2015: Naam Foundation, with Makarand Anaspure, for drought-hit Maharashtra families. First distributed ₹15,000 each to 225 suicide victims’ families; collected ₹6 crore in one month.',
  },
  {
    url: 'https://indianexpress.com/article/entertainment/bollywood/nana-patekar-death-saved-rs-1-5-cr-luxury-car-tv-report-farmers-changed-life-naam-foundation-10911838/',
    note: 'Indian Express, 8 Oct 2026, quoting Patekar to The Lallantop: he had saved ₹1.5 crore for a new car; a TV interview with a farmer’s family after a suicide changed the plan; co-founded Naam Foundation with Makarand Anaspure.',
  },
];

export const lexicon: Record<string, string> = {
  nana: 'नाना',
  patekar: 'पाटेकर',
  kargil: 'कारगिल',
  prahaar: 'प्रहार',
  directed: 'डायरेक्टेड',
  maratha: 'मराठा',
  light: 'लाइट',
  infantry: 'इन्फैंट्री',
  training: 'ट्रेनिंग',
  defence: 'डिफेंस',
  minister: 'मिनिस्टर',
  permission: 'परमिशन',
  troops: 'ट्रूप्स',
  naam: 'नाम',
  foundation: 'फाउंडेशन',
  farmers: 'फार्मर्स',
  angry: 'एंग्री',
  army: 'आर्मी',
  car: 'कार',
  makarand: 'मकरंद',
  anaspure: 'अनासपुरे',
  direct: 'डायरेक्ट',
  war: 'वॉर',
  plan: 'प्लान',
  film: 'फ़िल्म',
  screen: 'स्क्रीन',
  man: 'मैन',
};

// Tribute tone: no mascot cameo, and the hook face is shown sharp (no blur gag).
// Prints are large (≈980 px) and each long beat changes picture or stamp every 2–3 s.
export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: false,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Nana Patekar\nKargil में?',
    accent: ['Kargil'],
    blur: 0,
    still: {
      src: 'shorts/nana-patekar/stills/iffi-2017-3.jpg',
      film: 'Nana Patekar',
      year: 2017,
      credit: 'joegoaukiffi3 / Flickr',
      width: 860,
      aspect: 1.25,
      focus: '35% 40%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Prahaar · 1991\nDirector + Major',
      accent: ['1991'],
      still: {
        src: 'shorts/nana-patekar/stills/prahaar-wiki-poster.jpg',
        film: 'Prahaar',
        year: 1991,
        credit: 'Divya Films Combines',
        width: 470,
        aspect: 220 / 300,
        push: [1, 1.06],
      },
      cuts: [{
        word: 'Maratha',
        src: 'shorts/nana-patekar/stills/print-army.jpg',
        credit: 'Divya Films Combines / Eros Now',
        width: 960,
        aspect: 1.6,
        focus: '50% 28%',
        replace: true,
      }],
      pop: {word: 'तीन', text: '3 साल'},
    },
    {
      lines: ['f2'],
      headline: 'Kargil · 1999\nपहले मना, फिर हाँ',
      accent: ['1999'],
      still: {
        src: 'shorts/nana-patekar/stills/kargil-it.jpg',
        film: 'Kargil',
        year: 1999,
        credit: 'Aaj Tak / India Today',
        width: 980,
        aspect: 946 / 511,
        focus: '58% 40%',
      },
      pop: {word: 'permission', text: 'PERMISSION'},
    },
    {
      lines: ['f3', 'f3r'],
      headline: 'Naam Foundation\n2015',
      accent: ['2015'],
      still: {
        // Photo is from a later Jal Kranti event (banner reads 2026), so the tag carries no year.
        src: 'shorts/nana-patekar/stills/naam-it.jpg',
        film: 'Jal Kranti',
        credit: 'India Today',
        width: 980,
        aspect: 1.45,
        focus: '30% 30%',
      },
      // Punch-in on his face as the car line lands.
      cuts: [{
        line: 'f3r',
        word: 'car',
        src: 'shorts/nana-patekar/stills/naam-it.jpg',
        // Narrow portrait crop: cover-fit keeps the left (his face); zoom is centre-based, so keep it small.
        width: 560,
        aspect: 0.8,
        focus: '0% 30%',
        push: [1.2, 1.3],
        tilt: 2,
        replace: true,
      }],
      pop: {line: 'f3r', word: 'करोड़', text: '₹1.5 करोड़'},
      reveal: {line: 'f3r', headline: 'नई car?\nCancel.', accent: ['Cancel.']},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Nana Patekar\n1951 – 2026',
    accent: ['1951', '2026'],
    still: {
      src: 'shorts/nana-patekar/stills/padma-shri.jpg',
      film: 'Padma Shri',
      year: 2013,
      credit: 'President\'s Secretariat / PIB',
      width: 940,
      aspect: 1.4,
      focus: '22% 32%',
    },
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Nana Patekar सच में Kargil गए थे? #shorts',
  altTitles: [
    'Prahaar के लिए तीन साल army. फिर Kargil. #shorts',
    'Nana: Prahaar, Kargil, Naam Foundation #shorts',
  ],
  description: `Nana Patekar (1 Jan 1951 – 8 Oct 2026, Goa, cardiac arrest). Screen पर angry man. बाहर: Prahaar की army training, Kargil 1999, और Naam Foundation.

Published interviews और film pages पर commentary. हमने screening का दावा नहीं किया.

1991 Prahaar — खुद directed; Maratha Light Infantry के साथ तीन साल training (उनका KBC account).
1999 Kargil — Defence Minister George Fernandes से permission; troops के साथ गए. दिनों की संख्या outlets पर अलग है, इसलिए हमने वो number नहीं बोला.
2015 Naam Foundation — Makarand Anaspure के साथ, drought वाले farmers के लिए. Lallantop/IE: डेढ़ करोड़ की car का प्लान छोड़ दिया.

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited in this description. Not licensed.

Stills:
IFFI Goa 2017 portrait — joegoaukiffi3 / Flickr, CC BY-SA 2.0 (https://creativecommons.org/licenses/by-sa/2.0/)
Prahaar (1991) poster — Divya Films Combines, via Wikipedia
Prahaar (1991) Major Chauhan still — Divya Films Combines / Eros Now, via The Print
Kargil 1999 with troops — Aaj Tak / India Today
Jal Kranti event (later Naam/water work; banner dated 2026) — India Today
Padma Shri 20 Apr 2013 — President's Secretariat / PIB, GODL-India

Sources:
Nana Patekar — https://en.wikipedia.org/wiki/Nana_Patekar
Prahaar — https://en.wikipedia.org/wiki/Prahaar:_The_Final_Attack
Kargil / KBC quote — https://www.telegraphindia.com/entertainment/when-nana-patekar-put-acting-career-on-hold-to-join-the-army-during-kargil-war/cid/2183733
Naam Foundation 2015 — https://timesofindia.indiatimes.com/city/mumbai/nanas-goodwill-nets-6-crore-for-parched-farmers/articleshow/49144117.cms
Car plan / Lallantop — https://indianexpress.com/article/entertainment/bollywood/nana-patekar-death-saved-rs-1-5-cr-luxury-car-tv-report-farmers-changed-life-naam-foundation-10911838/
Death: The Hindu / BBC / PTI, 8 Oct 2026.

Movie Idiots.

#NanaPatekar #Prahaar #Kargil #NaamFoundation #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'nana patekar', 'prahaar', 'kargil', 'naam foundation', 'krantiveer',
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
