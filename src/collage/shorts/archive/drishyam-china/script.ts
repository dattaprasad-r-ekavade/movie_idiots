// "Did you know?" Short, design v2 (velvet). Hook: did Drishyam's story reach China? Facts are from
// Wikipedia (Drishyam, Drishyam 2015, Sheep Without a Shepherd), ThePrint and CGTN (see `sources`).
// The China gross is a rounded floor from two sources ($191.6M ThePrint, $199M Wikipedia): "190 million+".
// Not Dangal-in-China (separate Short).
import type {ScriptLine} from '../../../timeline';
import {funFacts, type FunFactsPlan} from '../../../formats/FunFactsShort';

export const slug = 'drishyam-china';
export const title = 'Drishyam की कहानी China तक पहुँची? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'china';
export const music = 'pahadi-winter';
// Real people are verb subjects (Mohanlal, Jeethu Joseph, Ajay Devgn): plural verbs (lint).
export const honorific = true;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Did Drishyam's story reach China?",
    text: "Drishyam की कहानी China तक पहुँची?",
    say: "दृश्यम की कहानी चाइना तक पहुँची?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [0],
    en: "Drishyam came out in Malayalam in 2013. Mohanlal led it, and Jeethu Joseph wrote and directed it.",
    text: "Drishyam 2013 में Malayalam में आई. Mohanlal lead में थे, और Jeethu Joseph ने लिखी और direct की.",
    say: "दृश्यम दो हज़ार तेरह में मलयालम में आई। मोहनलाल लीड में थे, और जीतू जोसफ़ ने लिखी और डायरेक्ट की।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1, 2],
    en: "Hindi got it too, in 2015, with Ajay Devgn. But for China, an undisclosed company bought the remake rights in 2017.",
    text: "2015 में Hindi में भी बनी, Ajay Devgn के साथ. पर 2017 में एक Chinese company ने इसके remake rights ख़रीद लिए.",
    say: "दो हज़ार पंद्रह में हिंदी में भी बनी, अजय देवगन के साथ। पर दो हज़ार सत्रह में एक चाइनीज़ कंपनी ने इसके रीमेक राइट्स ख़रीद लिए।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'पर', tag: 'skeptical'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [2, 3],
    en: "In 2019 it came out in China as Sheep Without a Shepherd, and earned over $190 million worldwide.",
    text: "2019 में ये China में Sheep Without a Shepherd बनकर आई, और worldwide $190 million से ज़्यादा कमाए.",
    say: "दो हज़ार उन्नीस में ये चाइना में शीप विदाउट ए शेफ़र्ड बनकर आई, और वर्ल्डवाइड एक सौ नब्बे मिलियन डॉलर से ज़्यादा कमाए।",
    delivery: {emotion: 'proud', cues: [{word: 'Sheep', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "Drishyam's story, in China?",
    text: "Drishyam की कहानी... China तक?",
    say: "दृश्यम की कहानी... चाइना तक?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Drishyam',
    note: 'Lead: 2013 Indian Malayalam crime thriller, written and directed by Jeethu Joseph, lead Mohanlal. Remakes: Hindi Drishyam (2015, Ajay Devgn, dir. Nishikant Kamat); Chinese "Sheep Without a Shepherd" (2019), "the first Indian film to be remade in Mainland China".',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Drishyam_(2015_film)',
    note: 'Infobox: Hindi Drishyam, release 31 July 2015, lead Ajay Devgn, director Nishikant Kamat (used for the Hindi remake and Ajay Devgn credit).',
  },
  {
    url: 'https://en.wikipedia.org/wiki/Sheep_Without_a_Shepherd',
    note: 'Lead: "official remake of the 2013 Indian Malayalam film Drishyam"; released in China 13 Dec 2019; $199 million (lead), $192 million (Box Office section, citing Box Office Mojo). Body: undisclosed Chinese production company acquired the remake rights in September 2017; Sam Quah directed; distributed by China Film Group Corporation.',
  },
  {
    url: 'https://theprint.in/entertainment/how-drishyam-went-global-from-malayalam-to-remakes-in-7-languages/3062853/',
    note: 'ThePrint: Mandarin remake Sheep Without a Shepherd came out in 2019, "a major box office success in China", "collecting approximately $191.6 million worldwide". Lists the remakes by language.',
  },
  {
    url: 'https://news.cgtn.com/news/2019-12-17/-Sheep-Without-a-Shepherd-beats-Sky-Fire-at-the-box-office-Mtq89WPQhG/share_amp.html',
    note: 'CGTN, 17 Dec 2019: "the Chinese remake of the 2013 Malayalam thriller Drishyam"; took the domestic box office crown in its opening week with over 218 million yuan (US$31.13 million). Used for the remake statement; the opening-week figure is not used on screen.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  drishyam: 'दृश्यम',
  china: 'चाइना',
  mohanlal: 'मोहनलाल',
  jeethu: 'जीतू',
  joseph: 'जोसफ़',
  malayalam: 'मलयालम',
  ajay: 'अजय',
  devgn: 'देवगन',
  remake: 'रीमेक',
  rights: 'राइट्स',
  undisclosed: 'अनाम',
  company: 'कंपनी',
  sheep: 'शीप',
  without: 'विदाउट',
  shepherd: 'शेफ़र्ड',
  worldwide: 'वर्ल्डवाइड',
  million: 'मिलियन',
};

const DRISHYAM_CHINA = {film: 'Sheep Without a Shepherd', year: 2019, credit: 'Poster artwork, via Cinemaclock'};
const MOHANLAL = {film: 'Drishyam', year: 2013, credit: 'Prathyush Thomas, Wikimedia Commons'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Drishyam की कहानी\nChina तक पहुँची?',
    accent: ['China'],
    // Chinese poster, 714x1071: the hook image is sharp, never blurred.
    still: {src: 'shorts/drishyam-china/stills/poster-china.jpg', ...DRISHYAM_CHINA, aspect: 714 / 1071, focus: '50% 30%'},
  },
  facts: [
    {
      lines: ['f1'],
      headline: 'Malayalam में\n2013 में आई',
      accent: ['Malayalam'],
      layout: 'stack',
      still: {src: 'shorts/drishyam-china/stills/mohanlal.jpg', ...MOHANLAL, aspect: 1800 / 2100, focus: '50% 25%'},
    },
    {
      lines: ['f2'],
      headline: 'पर China के\nrights बिके थे',
      accent: ['rights'],
      layout: 'versus',
      versus: {
        top: {src: 'shorts/drishyam-china/stills/mohanlal.jpg', ...MOHANLAL, aspect: 1800 / 2100, focus: '50% 25%'},
        bottom: {src: 'shorts/drishyam-china/stills/poster-china.jpg', ...DRISHYAM_CHINA, aspect: 714 / 1071, focus: '50% 30%', word: 'Chinese'},
        middle: 'VS',
      },
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'हाँ, China में\n2019 में आई',
    accent: ['China'],
    pop: {word: 'million', text: '$190M+ WORLDWIDE'},
    still: {src: 'shorts/drishyam-china/stills/poster-china.jpg', ...DRISHYAM_CHINA, aspect: 714 / 1071, focus: '50% 30%'},
    react: {word: 'Sheep', expression: 'happy', pose: 'thumbsUp'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Drishyam की कहानी China तक पहुँची? #shorts',
  altTitles: [
    'Drishyam का Chinese remake: Sheep Without a Shepherd #shorts',
    'Malayalam thriller, Hindi remake, और फिर China #shorts',
  ],
  description: `Drishyam (2013, Malayalam, Jeethu Joseph, Mohanlal) की कहानी Hindi (2015, Ajay Devgn) और दूसरी Indian languages में बनी. China में ये Sheep Without a Shepherd (2019) नाम से आई, जो official remake थी, और worldwide करीब $190 million+ कमाए (ThePrint: $191.6 million; Wikipedia: $199 million).

Sources:
Drishyam, Wikipedia — https://en.wikipedia.org/wiki/Drishyam
Drishyam (2015 film), Wikipedia — https://en.wikipedia.org/wiki/Drishyam_(2015_film)
Sheep Without a Shepherd, Wikipedia — https://en.wikipedia.org/wiki/Sheep_Without_a_Shepherd
ThePrint, "How Drishyam went global" — https://theprint.in/entertainment/how-drishyam-went-global-from-malayalam-to-remakes-in-7-languages/3062853/
CGTN, Sheep Without a Shepherd box office (17 Dec 2019) — https://news.cgtn.com/news/2019-12-17/-Sheep-Without-a-Shepherd-beats-Sky-Fire-at-the-box-office-Mtq89WPQhG/share_amp.html

Box-office figures differ between sources and are reported, not audited by Movie Idiots.

Images:
Mohanlal portrait by Prathyush Thomas, Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Mohanlal_Viswanathan_BNC.jpg), GFDL 1.2 or Free Art License.
Sheep Without a Shepherd theatrical poster, via Cinemaclock (https://www.cinemaclock.com/movies/sheep-without-a-shepherd-2019). Copyrighted; used as credited commentary on the film.

Movie Idiots.

#Drishyam #Mohanlal #AjayDevgn #SheepWithoutAShepherd #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'drishyam', 'drishyam 2013', 'drishyam china', 'sheep without a shepherd', 'mohanlal', 'ajay devgn',
    'jeethu joseph', 'remake', 'hindi shorts', 'movie idiots',
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
