// "Did you know?" Short, design v2 (newsprint). Hook: did Kangana Ranaut's Dhaakad earn just ₹4,420 on day 8?
// Facts: Wikipedia (Dhaakad: budget, one-week cut in shows), Mans World India (30 May 2022) and TBS News
// (31 May 2022) for the day-8 figure and the 20 tickets. Budget is reported as an estimate (see `sources`).
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'dhaakad-day8';
export const title = 'Kangana की ₹85 करोड़ की film ने एक दिन में ₹4,420 कमाए? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'flop';
export const music = 'city-lights';
export const honorific = false;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Kangana's ₹85 crore film earned ₹4,420 in a day?",
    text: "Kangana की ₹85 करोड़ की film ने एक दिन में ₹4,420 कमाए?",
    say: "कंगना की पचासी करोड़ की फ़िल्म ने एक दिन में चार हज़ार चार सौ बीस रुपये कमाए?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "Dhaakad was a big-budget action film with a big release.",
    text: "Dhaakad बड़े budget की action film थी, release भी बड़ी मिली.",
    say: "धाकड़ बड़े बजट की ऐक्शन फ़िल्म थी, रिलीज़ भी बड़ी मिली।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0],
    en: "But within a week, most theatres dropped its shows.",
    text: "पर एक हफ़्ते में ही ज़्यादातर theatres से shows हट गए.",
    say: "पर एक हफ़्ते में ही ज़्यादातर थिएटर्स से शोज़ हट गए।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'ही', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 2],
    en: "On day 8, only 20 tickets sold across India. Earnings: ₹4,420.",
    text: "8वें दिन पूरे India में सिर्फ़ 20 tickets बिके. कमाई: ₹4,420.",
    say: "आठवें दिन पूरे इंडिया में सिर्फ़ बीस टिकट बिके। कमाई: चार हज़ार चार सौ बीस रुपये।",
    delivery: {emotion: 'storytelling', cues: [{word: 'सिर्फ़', tag: 'surprised'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Just ₹4,420 in a day?",
    text: "एक दिन में सिर्फ़ ₹4,420?",
    say: "एक दिन में सिर्फ़ चार हज़ार चार सौ बीस रुपये?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Dhaakad',
    note: 'Infobox: box office "est. ₹3.77 crore"; budget "est. ₹85 crore" (cites Indian Express). Box Office section: "most of its shows discontinued from cinemas within one week of release." The article text gives no day-8 figure.',
  },
  {
    url: 'https://www.mansworldindia.com/lifestyle/entertainment/kangana-ranaut-delivers-her-biggest-flop-with-dhaakad',
    note: 'Mans World India, 30 May 2022: budget "between Rs 80-90 crore"; "raking in only Rs 4,420 on the eighth day of its theatrical journey"; "with just 20 tickets sold across the country."',
  },
  {
    url: 'https://www.tbsnews.net/node/430306',
    note: 'TBS News, 31 May 2022: "sold only 20 tickets on the eight day of its release and earned Rs4,420." Same article gives a different budget ("1 billion INR"), which this Short does not use.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  dhaakad: 'धाकड़',
  kangana: 'कंगना',
  ranaut: 'रनौत',
  day: 'डे',
  budget: 'बजट',
  action: 'एक्शन',
  release: 'रिलीज़',
  shows: 'शोज़',
  tickets: 'टिकट',
  ticket: 'टिकट',
  india: 'इंडिया',
  flop: 'फ़्लॉप',
};

const KANGANA = {src: 'shorts/dhaakad-day8/stills/kangana.jpg', film: 'Kangana Ranaut', credit: 'Rohit2301 / Wikimedia Commons (CC0)', aspect: 865 / 960, focus: '50% 30%'};
const POSTER = {src: 'shorts/dhaakad-day8/stills/poster.jpg', film: 'Dhaakad', year: 2022, credit: 'Dhaakad theatrical release poster (via Wikipedia)', aspect: 259 / 384, focus: '50% 30%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  hook: {
    lines: ['hook'],
    headline: '₹85 करोड़ की film ने\n₹4,420 कमाए?',
    accent: ['₹4,420'],
    still: KANGANA,
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Budget लगभग\n₹85 करोड़',
      accent: ['₹85'],
      layout: 'ticket',
      ticket: {word: 'budget', title: 'DHAAKAD', figure: '₹85 करोड़', sub: 'Budget (est.)'},
      still: KANGANA,
    },
    {
      lines: ['f2'],
      headline: 'एक हफ़्ते में\nshows हटे',
      accent: ['हटे'],
      layout: 'print',
      still: POSTER,
      pop: {word: 'हट', text: 'SHOWS CUT'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: '8वें दिन सिर्फ़\n20 tickets बिके',
    accent: ['20'],
    still: KANGANA,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Kangana की ₹85 करोड़ की film ने एक दिन में ₹4,420 कमाए? #shorts',
  altTitles: [
    'Dhaakad: day 8 पर सिर्फ़ 20 tickets #shorts',
    'Kangana Ranaut की Dhaakad का flop सफ़र #shorts',
  ],
  description: `Dhaakad (2022, Kangana Ranaut) का budget बताया जाता है ₹80-90 करोड़ (Mans World India; Wikipedia का अनुमान ₹85 करोड़). Release के आठवें दिन पूरे India में सिर्फ़ 20 tickets बिके और ₹4,420 की कमाई हुई (Mans World India; TBS News). ज़्यादातर shows पहले हफ़्ते में ही सिनेमाघरों से हटा दिए गए (Wikipedia).

Sources:
Dhaakad, Wikipedia — https://en.wikipedia.org/wiki/Dhaakad
Kangana Ranaut's biggest flop with Dhaakad, Mans World India (30 May 2022) — https://www.mansworldindia.com/lifestyle/entertainment/kangana-ranaut-delivers-her-biggest-flop-with-dhaakad
Kangana's Dhakad sells 20 tickets on 8th day, TBS News (31 May 2022) — https://www.tbsnews.net/node/430306

Box office figures differ between sources and are reported, not audited by Movie Idiots.

Images:
Kangana Ranaut, photo by Rohit2301, Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Kangana_Ranaut_Famous_Actress.jpg). CC0 1.0 (https://creativecommons.org/publicdomain/zero/1.0/).
Dhaakad theatrical release poster, via Wikipedia (https://en.wikipedia.org/wiki/File:Dhaakad_poster.jpg). Copyrighted; used as credited commentary on the film.

Movie Idiots.

#Dhaakad #KanganaRanaut #BoxOffice #BollywoodFlop #HindiShorts #BollywoodTrivia #MovieIdiots`,
  tags: [
    'dhaakad', 'dhaakad 2022', 'kangana ranaut', 'dhaakad box office', 'dhaakad flop', 'kangana ranaut flop',
    'bollywood flop', 'hindi shorts', 'movie idiots',
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
