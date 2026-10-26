// "Did you know?" Short, design v2 (lagoon). Hook: why is the Hindi Drishyam 3 story different from the Malayalam
// one? Facts: Wikipedia (2015 Hindi Drishyam was a remake); The Week and Republic (Malayalam release 21 May 2026,
// makers' statements); Onmanorama (Ajay Devgn, 10 Sep 2026, different story and screenplay); Film Companion (2023
// report on the spoiler-free plan). Hindi release 2 Oct 2026 is confirmed by three sources (see `sources`).
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'drishyam3-stories';
export const title = 'Drishyam 3 की Hindi और Malayalam कहानी अलग क्यों? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'drishyam';
export const music = 'pahadi-winter';
// Real people are referenced (Ajay Devgn, Mohanlal) with respectful forms where a verb appears (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Why is the Hindi Drishyam 3 story different from the Malayalam one?",
    text: "Drishyam 3 की Hindi और Malayalam कहानी अलग क्यों?",
    say: "दृश्यम 3 की हिंदी और मलयालम कहानी अलग क्यों?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "The 2015 Hindi Drishyam was a remake of the Malayalam film.",
    text: "2015 की Hindi Drishyam, Malayalam film की remake थी.",
    say: "दो हज़ार पंद्रह की हिंदी दृश्यम, मलयालम फ़िल्म की रीमेक थी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [1, 5],
    en: "But the Malayalam Drishyam 3 came out in May. With the same story, the suspense would be gone.",
    text: "पर Malayalam Drishyam 3 मई में ही आ गई. वही कहानी होती, तो suspense खुल जाता.",
    say: "पर मलयालम दृश्यम थ्री मई में ही आ गई। वही कहानी होती, तो सस्पेंस खुल जाता।",
    delivery: {emotion: 'conspiratorial'},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [2, 3, 4],
    en: "Devgn says the Hindi Drishyam 3 has a completely new story and screenplay.",
    text: "Devgn के मुताबिक, Hindi Drishyam 3 की कहानी और screenplay पूरी तरह नए हैं.",
    say: "देवगन के मुताबिक, हिंदी दृश्यम थ्री की कहानी और स्क्रीनप्ले पूरी तरह नए हैं।",
    delivery: {emotion: 'playful'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Why is the Drishyam 3 story different?",
    text: "Drishyam 3 की कहानी अलग क्यों?",
    say: "दृश्यम 3 की कहानी अलग क्यों?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Drishyam_(2015_film)',
    note: 'Wikipedia: "Drishyam (transl. Visual) is a 2015 Indian Hindi-language crime thriller film directed by Nishikant Kamat." "A remake of the eponymous 2013 Malayalam film of the same name." Used for the setup line.',
  },
  {
    url: 'https://www.theweek.in/news/entertainment/2026/05/16/for-the-first-time-drishyam-3-hindi-version-story-will-move-in-a-different-direction-say-makers.amp.html',
    note: 'The Week, 16 May 2026: "Malayalam version: May 21, 2026, with dubbed Tamil, Telugu, and Kannada versions." "Hindi version: October 2, 2026." Makers (Abhishek Pathak, to PTI): "Both the stories of \'Drishyam 3\' in Malayalam and Hindi are going to flow differently."',
  },
  {
    url: 'https://www.onmanorama.com/entertainment/entertainment-news/2026/09/10/drishyam-3-movie-ajay-devgn-hindi-version-different-malayalam-original.html',
    note: 'Onmanorama, 10 Sep 2026: Ajay Devgn says the two films should be treated as separate works and the Hindi version "has an entirely different screenplay" (paraphrase, not a direct quote). Hindi film "scheduled to hit theatres on October 2."',
  },
  {
    url: 'https://www.republicworld.com/entertainment/bollywood/ajay-devgn-dodged-a-bullet-netizens-glad-over-hindi-drishyam-3-having-a-different-plot-than-mohanlal-starrer-after-disappointing-first-reviews-2026-05-21-125214',
    note: 'Republic, 21 May 2026: producer Kumar Mangat Pathak: "We have also made changes to the story and screenplay for this instalment, and the audience will notice the difference." Hindi film is "a remake but won\'t be an exact copy".',
  },
  {
    url: 'https://www.filmcompanion.in/news/ajay-devgn-mohanlal-to-shoot-for-drishyam-3-simultaneously',
    note: 'Film Companion, updated 14 Jun 2023 (early plan, source-based report): "The reasoning behind releasing both versions is to have a spoiler-free experience for the audience." Used for the suspense reason only.',
  },
  {
    url: 'https://www.themoviedb.org/movie/1269325',
    note: 'TMDB page for Drishyam: The Conclusion (2026, Hindi), release listed 2 Oct 2026. Source for the Hindi poster still.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  drishyam: 'दृश्यम',
  malayalam: 'मलयालम',
  hindi: 'हिंदी',
  remake: 'रीमेक',
  suspense: 'सस्पेंस',
  screenplay: 'स्क्रीनप्ले',
  film: 'फ़िल्म',
  devgn: 'देवगन',
  story: 'स्टोरी',
};

const POSTER = {src: 'shorts/drishyam3-stories/stills/poster.jpg', film: 'Drishyam: The Conclusion', year: 2026, credit: 'Panorama Studios', aspect: 960 / 1440, focus: '50% 35%'};
const DEVGN = {src: 'shorts/drishyam3-stories/stills/devgn.jpg', film: 'Ajay Devgn', year: 2025, credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 388 / 371, focus: '50% 25%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'lagoon',
  hook: {
    lines: ['hook'],
    headline: 'Drishyam 3 की\nकहानी क्यों बदली?',
    accent: ['बदली'],
    still: POSTER,
    react: {word: 'क्यों', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Hindi Drishyam थी\nMalayalam की remake',
      accent: ['remake'],
      layout: 'print',
      still: POSTER,
    },
    {
      lines: ['f2'],
      headline: 'पर Malayalam\nपहले आ गई',
      accent: ['पहले'],
      layout: 'ticket',
      ticket: {word: 'मई', title: 'DRISHYAM 3 · MALAYALAM', figure: '21 MAY 2026', sub: 'Release, Malayalam version'},
      still: POSTER,
      pop: {word: 'suspense', text: 'SPOILER'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Hindi की कहानी\nअलग लिखी गई',
    accent: ['अलग'],
    still: DEVGN,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Drishyam 3 की Hindi और Malayalam कहानी अलग क्यों? #shorts',
  altTitles: [
    'Drishyam 3 की Hindi कहानी Malayalam से अलग क्यों है? #shorts',
    'Malayalam Drishyam 3 पहले आई, Hindi की कहानी बदली #shorts',
  ],
  description: `Malayalam Drishyam 3 (Mohanlal, 21 मई 2026) पहले रिलीज़ हुई, और Hindi Drishyam: The Conclusion (Ajay Devgn, 2 अक्टूबर 2026) की कहानी और screenplay अलग रखे गए. Devgn के मुताबिक Hindi film एक नई कहानी है, remake की exact copy नहीं (Onmanorama; The Week; Republic).

Sources:
The Week, Malayalam and Hindi release dates and makers' statement (16 May 2026) — https://www.theweek.in/news/entertainment/2026/05/16/for-the-first-time-drishyam-3-hindi-version-story-will-move-in-a-different-direction-say-makers.amp.html
Onmanorama, Ajay Devgn on the Hindi version (10 Sep 2026) — https://www.onmanorama.com/entertainment/entertainment-news/2026/09/10/drishyam-3-movie-ajay-devgn-hindi-version-different-malayalam-original.html
Republic, producer on story and screenplay changes (21 May 2026) — https://www.republicworld.com/entertainment/bollywood/ajay-devgn-dodged-a-bullet-netizens-glad-over-hindi-drishyam-3-having-a-different-plot-than-mohanlal-starrer-after-disappointing-first-reviews-2026-05-21-125214
Film Companion, early plan for both versions (updated 14 Jun 2023) — https://www.filmcompanion.in/news/ajay-devgn-mohanlal-to-shoot-for-drishyam-3-simultaneously
Drishyam (2015 film), Wikipedia — https://en.wikipedia.org/wiki/Drishyam_(2015_film)

Images:
Drishyam: The Conclusion (2026) poster, Panorama Studios. Copyrighted; used as credited commentary on the film. Source: https://www.themoviedb.org/movie/1269325
Ajay Devgn at the trailer launch of Raid 2, Bollywood Hungama via Wikimedia Commons. CC BY 3.0 (https://creativecommons.org/licenses/by/3.0). Source: https://commons.wikimedia.org/wiki/File:Ajay_Devgn_at_the_trailer_launch_of_Raid_2.jpg

Movie Idiots.

#Drishyam3 #Drishyam #AjayDevgn #Mohanlal #Malayalam #BollywoodNews #MovieIdiots`,
  tags: [
    'drishyam 3', 'drishyam the conclusion', 'ajay devgn', 'mohanlal', 'drishyam malayalam', 'jeethu joseph',
    'hindi remake', 'bollywood news', 'movie idiots',
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
