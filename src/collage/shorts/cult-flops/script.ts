// Fun-facts Short: theatrical flops that later became cult. Research from published
// sources only; no first-hand screening claims.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'cult-flops';
export const title = 'Theatre में flop, आज cult: वो films जिनका नाम भी नहीं आता #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "A masterpiece flopped, so the director removed his name?",
    text: "Masterpiece flop हुई. Director ने अपना नाम हटा दिया?",
    delivery: {sfx: [{word: "flop", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "The third fact is one that even John Abraham's fans don't know.",
    text: "तीसरी बात तो John Abraham के fans को भी नहीं पता.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: 0,
    en: "1994, Andaz Apna Apna. The Aamir and Salman comedy flopped in theatres. Today every dialogue is cult.",
    text: "1994, Andaz Apna Apna. Aamir-Salman की comedy theatres में flop हुई. आज हर dialogue cult है.",
    delivery: {sfx: [{word: "flop", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [1, 2],
    en: "1983, Jaane Bhi Do Yaaro. A satire made on a nine-lakh budget did not do well in theatres.",
    text: "1983, Jaane Bhi Do Yaaro. नौ लाख के budget की satire, theatres में चली नहीं.",
  },
  {
    id: 'f2r',
    role: 'reveal',
    en: "Today everyone calls it Hindi cinema's sharpest comedy.",
    text: "आज सब कहते हैं, Hindi cinema की sharpest comedy है.",
    delivery: {sfx: [{word: "sharpest", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f3',
    role: 'fact',
    source: 3,
    en: "2007, No Smoking, starring John Abraham. A budget of 7.5 crore, and a collection of 3.5 crore.",
    text: "2007, No Smoking, John Abraham के साथ. साढ़े सात करोड़ का budget, और collection साढ़े तीन करोड़.",
    delivery: {sfx: [{word: "तीन", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3r',
    role: 'reveal',
    en: "Today it is a cult classic, a Hindi adaptation of a Stephen King story.",
    text: "आज cult classic है. Stephen King की story का Hindi adaptation.",
    delivery: {sfx: [{word: "cult", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: 4,
    en: "That masterpiece? Kaagaz Ke Phool, 1959. Guru Dutt's last film as director.",
    text: "वो masterpiece? 1959, Kaagaz Ke Phool. Guru Dutt की आखिरी directed film.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Masterpiece flopped, and the director removed his name?",
    text: "Masterpiece flop हुई, और director ने नाम हटा दिया?",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Andaz_Apna_Apna',
    note: 'Released 4 November 1994. Commercially unsuccessful; later emerged as a cult film. Dialogues such as “Teja main hoon, Mark idhar hai” entered popular memory via TV reruns.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Jaane_Bhi_Do_Yaaro',
    note: 'Kundan Shah, NFDC, released 12 August 1983. Budget cited as ₹8–9 lakh. National Award for Best Debut Director. Digitally restored re-release 2 November 2012. Mahabharata climax is widely cited as a highlight.',
  },
  {
    url: 'https://www.news18.com/photogallery/movies/bollywood/these-indian-cult-classics-flopped-upon-release-ws-l-9593531.html',
    note: 'News18 (24 Sep 2025): Jaane Bhi Do Yaaro “flopped upon release”; later hailed as a cult masterpiece. Also lists Kaagaz Ke Phool among flop-to-cult titles. Roundup article, not a box-office ledger.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/No_Smoking_(2007_film)',
    note: 'Anurag Kashyap, released 26 October 2007. Budget ₹7.50 crore, box office ₹3.49 crore; Wikipedia: bombed, later cult following. Hindi adaptation of Stephen King\'s “Quitters, Inc.” John Abraham as K.',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Kaagaz_Ke_Phool',
    note: 'Guru Dutt, released 2 January 1959. First Indian CinemaScope film. Box-office bomb; later cult classic in the 1980s. Last film officially directed by Dutt; later studio films were credited to other directors because he felt his name hurt the box office.',
  },
  {
    url: 'https://www.boxofficeindia.com/movie.php?movieid=787',
    note: 'Gulaal (2009): Box Office India verdict Flop. India nett ₹4.30 crore against budget ₹10 crore. Extra lesser-known example, used in the description, not a spoken fact.',
  },
];

export const lexicon: Record<string, string> = {
  andaz: 'अंदाज़',
  apna: 'अपना',
  aamir: 'आमिर',
  salman: 'सलमान',
  jaane: 'जाने',
  yaaro: 'यारो',
  john: 'जॉन',
  abraham: 'अब्राहम',
  smoking: 'स्मोकिंग',
  kaagaz: 'काग़ज़',
  phool: 'फूल',
  guru: 'गुरु',
  dutt: 'दत्त',
  stephen: 'स्टीफ़न',
  king: 'किंग',
  adaptation: 'अडैप्टेशन',
  collection: 'कलेक्शन',
  dialogue: 'डायलॉग',
  fans: 'फैंस',
  theatres: 'थिएटर्स',
  masterpiece: 'मास्टरपीस',
  sharpest: 'शार्पेस्ट',
  directed: 'डायरेक्टेड',
  hindi: 'हिंदी',
  cult: 'कल्ट',
  classic: 'क्लासिक',
  bhi: 'भी',
  do: 'दो',
  satire: 'सैटायर',
  ke: 'के',
};

export const plan: FunFactsPlan = {
  kicker: 'Theatre flop → cult',
  mascot: true,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'Director ने\nनाम हटा दिया',
    accent: ['नाम'],
    still: {
      src: 'shorts/cult-flops/stills/kkp.jpg',
      film: 'Kaagaz Ke Phool',
      year: 1959,
      credit: 'Guru Dutt Films',
      focus: '50% 28%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Andaz Apna Apna\n1994',
      accent: ['1994'],
      still: {
        src: 'shorts/cult-flops/stills/aaa.jpg',
        film: 'Andaz Apna Apna',
        year: 1994,
        credit: 'Vinay Pictures',
        focus: '50% 32%',
      },
      pop: {word: 'flop', text: 'FLOP'},
    },
    {
      lines: ['f2', 'f2r'],
      headline: 'Jaane Bhi Do Yaaro\n₹9 lakh',
      accent: ['₹9'],
      still: {
        src: 'shorts/cult-flops/stills/jbdy.jpg',
        film: 'Jaane Bhi Do Yaaro',
        year: 1983,
        credit: 'NFDC',
        focus: '50% 30%',
      },
      reveal: {line: 'f2r', headline: 'आज: sharpest comedy', accent: ['sharpest']},
    },
    {
      lines: ['f3', 'f3r'],
      headline: 'No Smoking\n2007',
      accent: ['2007'],
      still: {
        src: 'shorts/cult-flops/stills/ns.jpg',
        film: 'No Smoking',
        year: 2007,
        credit: 'Eros / Vishal Bhardwaj Films',
        focus: '50% 32%',
      },
      pop: {word: 'तीन', text: '₹3.5 CR'},
      reveal: {line: 'f3r', headline: 'आज: cult classic', accent: ['cult']},
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Kaagaz Ke Phool\n1959',
    accent: ['1959'],
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Theatre में flop, आज cult: 4 films जिनका नाम भी नहीं आता #shorts',
  altTitles: [
    'Andaz Apna Apna flop थी? Guru Dutt ने नाम तक हटा दिया #shorts',
    'John Abraham की No Smoking disaster थी, आज cult है #shorts',
    'Kaagaz Ke Phool flop हुई, director ने अपना नाम हटा दिया #shorts',
  ],
  description: `Theatre में flop गईं, सालों बाद cult बन गईं — Andaz Apna Apna, Jaane Bhi Do Yaaro, No Smoking, और वो film जिसके बाद Guru Dutt ने अपना नाम हटा दिया.

Published box-office notes और film histories पर commentary; ये first-hand screening नहीं है.

1994 Andaz Apna Apna — Aamir-Salman comedy, theatres में unsuccessful, बाद में cult
1983 Jaane Bhi Do Yaaro — NFDC satire, ~₹9 lakh, release पर चली नहीं, आज sharpest Hindi comedy में गिनी जाती है
2007 No Smoking — John Abraham, ₹7.50 cr budget vs ₹3.49 cr collection, बाद में cult; Stephen King की Hindi adaptation
1959 Kaagaz Ke Phool — Guru Dutt की last officially directed film, bomb, 80s में cult

Lesser-known extra (description only): Gulaal (2009) Box Office India पर Flop — ₹4.30 cr nett vs ₹10 cr budget.

Film stills/posters are copyrighted publicity images, used briefly as commentary support, credited on screen. Not licensed, not public domain.

Stills:
Andaz Apna Apna — Vinay Pictures
Jaane Bhi Do Yaaro — NFDC
No Smoking — Eros / Vishal Bhardwaj Films
Kaagaz Ke Phool — Guru Dutt Films

Sources:
Andaz Apna Apna — https://en.wikipedia.org/wiki/Andaz_Apna_Apna
Jaane Bhi Do Yaaro — https://en.wikipedia.org/wiki/Jaane_Bhi_Do_Yaaro
News18 flop-to-cult roundup — https://www.news18.com/photogallery/movies/bollywood/these-indian-cult-classics-flopped-upon-release-ws-l-9593531.html
No Smoking (2007) — https://en.wikipedia.org/wiki/No_Smoking_(2007_film)
Kaagaz Ke Phool — https://en.wikipedia.org/wiki/Kaagaz_Ke_Phool
Gulaal, Box Office India — https://www.boxofficeindia.com/movie.php?movieid=787

Movie Idiots.

#Bollywood #CultClassics #AndazApnaApna #JaaneBhiDoYaaro #NoSmoking #KaagazKePhool #GuruDutt #HindiShorts #MovieIdiots`,
  tags: [
    'bollywood cult classics', 'bollywood flops', 'andaz apna apna', 'jaane bhi do yaaro', 'no smoking 2007',
    'kaagaz ke phool', 'guru dutt', 'anurag kashyap', 'john abraham', 'aamir khan', 'salman khan',
    'kundan shah', 'hindi shorts', 'movie idiots', 'bollywood trivia', 'flop to cult',
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
