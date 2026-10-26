// "Did you know?" Short, design v2 (newsprint). Hook: how close did Lagaan (2001) get to the Oscar?
// Facts: India's official entry, the US push by Aamir Khan and Ashutosh Gowariker, and the 74th
// Academy Awards (2002) nomination. Lagaan was one of five nominees; No Man's Land (Bosnia and
// Herzegovina) won. Category, year and winner are checked in two sources each (see `sources`).
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'lagaan-oscar';
export const title = 'Lagaan Oscar के कितने करीब पहुँची? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const music = 'sandhya';
// Real people are verb subjects (Aamir Khan and Ashutosh Gowariker गए): plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "How close did Lagaan get to the Oscar?",
    text: "Lagaan Oscar के कितने करीब पहुँची?",
    say: "लगान ऑस्कर के कितने क़रीब पहुँची?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0, 1],
    en: "Lagaan came out in 2001, directed by Ashutosh Gowariker. It was India's official entry for the Oscars.",
    text: "Lagaan 2001 की film है, Ashutosh Gowariker ने direct की. और India की तरफ़ से ये official Oscar entry थी.",
    say: "लगान दो हज़ार एक की फ़िल्म है, आशुतोष गोवारिकर ने डायरेक्ट की। और इंडिया की तरफ़ से ये ऑफ़िशियल ऑस्कर एंट्री थी।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 2],
    en: "But getting a Hindi film in front of Oscar voters is hard, so Aamir Khan and Gowariker flew to Los Angeles to push it.",
    text: "पर Oscar voters के सामने एक Hindi film लाना मुश्किल काम है, तो Aamir और Gowariker खुद Los Angeles गए.",
    say: "पर ऑस्कर वोटर्स के सामने एक हिंदी फ़िल्म लाना मुश्किल काम है, तो आमिर और गोवारिकर ख़ुद लॉस एंजिल्स गए।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'मुश्किल', tag: 'skeptical'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 3],
    en: "Still, Lagaan made the top five. But the award went to No Man's Land.",
    text: "फिर भी Lagaan TOP 5 में पहुँची. पर award No Man's Land ने जीता.",
    say: "फिर भी लगान टॉप फ़ाइव में पहुँची। पर अवॉर्ड नो मैन्स लैंड ने जीता।",
    delivery: {emotion: 'serious'},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So how close did Lagaan get to the Oscar?",
    text: "तो Lagaan Oscar के कितने करीब पहुँची?",
    say: "तो लगान ऑस्कर के कितने क़रीब पहुँची?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Lagaan',
    note: 'Released 2001 (India, 15 Jun 2001); directed by Ashutosh Gowariker; Aamir Khan leads. Calls it Delhi\'s official entry to the Academy Awards (quoting The Telegraph). Nominated for Best Foreign Language Film on 12 Feb 2002; lost to No Man\'s Land. Says "Aamir Khan and Gowariker went to Los Angeles to generate publicity for the Academy Awards." Campaign details beyond that are not used.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/List_of_submissions_to_the_74th_Academy_Awards_for_Best_Foreign_Language_Film',
    note: 'India: Lagaan, director Ashutosh Gowariker, result "Nominated". Bosnia and Herzegovina: No Man\'s Land, director Danis Tanović, result "Won Academy Award".',
  },
  {
    url: 'https://www.oscars.org/oscars/ceremonies/2002',
    note: 'Oscars.org, 74th Academy Awards: Best Foreign Language Film nominees Amélie, Elling, Lagaan, No Man\'s Land (winner), Son of the Bride. Five nominees in the category.',
  },
  {
    url: 'https://english.sta.si/632888/no-mans-land-wins-oscar-for-best-foreign-language-film',
    note: 'STA (Slovenian press agency) report: No Man\'s Land wins the Oscar for best foreign language film at the 74th Academy Awards. Date differs by a day from other sources (time zone), so no date is spoken.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  lagaan: 'लगान',
  oscar: 'ऑस्कर',
  voters: 'वोटर्स',
  gowariker: 'गोवारिकर',
  ashutosh: 'आशुतोष',
  aamir: 'आमिर',
  angeles: 'एंजिल्स',
  award: 'अवॉर्ड',
  official: 'ऑफ़िशियल',
  entry: 'एंट्री',
  top: 'टॉप',
  five: 'फ़ाइव',
  land: 'लैंड',
  mans: 'मैन्स',
  "no": 'नो',
};

const LG = {film: 'Lagaan', year: 2001, credit: 'Aamir Khan Productions'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'newsprint',
  // Hook has no still: the only image on hand is a 264 px poster, too soft for the sharp hook frame.
  hook: {
    lines: ['hook'],
    headline: 'Lagaan Oscar के\nकितने करीब पहुँची?',
    accent: ['करीब'],
    still: {src: 'shorts/lagaan-oscar/stills/poster.jpg', ...LG, aspect: 264 / 377, focus: '50% 30%'},
    react: {word: 'Oscar', expression: 'skeptic', pose: 'think'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'India की\nOscar entry',
      accent: ['Oscar'],
      layout: 'ticket',
      ticket: {word: 'official', title: 'LAGAAN · 2001', figure: 'OFFICIAL', sub: 'India की Oscar entry'},
      still: {src: 'shorts/lagaan-oscar/stills/poster.jpg', ...LG, aspect: 264 / 377, focus: '50% 30%'},
    },
    {
      lines: ['f2'],
      headline: 'Voters तक\nपहुँचाना मुश्किल',
      accent: ['मुश्किल'],
      layout: 'print',
      still: {src: 'shorts/lagaan-oscar/stills/poster.jpg', ...LG, aspect: 264 / 377, focus: '50% 75%'},
      pop: {word: 'Los', text: 'LOS ANGELES'},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Top 5 में पहुँची,\nपर award नहीं',
    accent: ['Top 5'],
    still: {src: 'shorts/lagaan-oscar/stills/poster.jpg', ...LG, aspect: 264 / 377, focus: '50% 20%'},
    react: {word: 'award', expression: 'wink', pose: 'present'},
    pop: {word: 'TOP', text: 'TOP 5'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Lagaan Oscar के कितने करीब पहुँची? #shorts',
  altTitles: [
    'Lagaan: Oscar की top 5 में पहुँची, पर जीत नहीं पाई #shorts',
    'एक Hindi film जो Oscar के कितने करीब पहुँची #shorts',
  ],
  description: `Lagaan (2001, Ashutosh Gowariker) India की तरफ़ से official Oscar entry थी. 74th Academy Awards (2002) में ये Best Foreign Language Film की पाँच nominees में थी, और award No Man's Land (Bosnia and Herzegovina) ने जीता.

Aamir Khan और Ashutosh Gowariker Oscar के लिए Los Angeles गए और film को publicity दी (Wikipedia).

Sources:
Lagaan, Wikipedia — https://en.wikipedia.org/wiki/Lagaan
List of submissions to the 74th Academy Awards for Best Foreign Language Film, Wikipedia — https://en.wikipedia.org/wiki/List_of_submissions_to_the_74th_Academy_Awards_for_Best_Foreign_Language_Film
74th Academy Awards, Oscars.org — https://www.oscars.org/oscars/ceremonies/2002
No Man's Land wins Oscar for Best Foreign Language Film, STA — https://english.sta.si/632888/no-mans-land-wins-oscar-for-best-foreign-language-film

Images:
Lagaan English-language release poster, via Wikipedia (https://en.wikipedia.org/wiki/File:Lagaan.jpg). Copyrighted; used as credited commentary on the film.

Movie Idiots.

#Lagaan #AamirKhan #Oscars #AshutoshGowariker #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'lagaan', 'lagaan oscar', 'aamir khan', 'ashutosh gowariker', 'oscar nomination', 'best foreign language film',
    'no mans land', 'hindi shorts', 'movie idiots',
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
