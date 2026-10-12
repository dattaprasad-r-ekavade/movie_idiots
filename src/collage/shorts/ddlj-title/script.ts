// Fun-facts Short. Stills with provenance in public/shorts/ddlj-title/stills/stills.json.
// Facts re-read 12 Oct 2026 with a second source each. Wording rules from that check:
// "rare" credit, never "first"; the record is the continuous run in one Mumbai theatre;
// no 1,251-week lockdown count (sources disagree); "2025 तक" for the current run.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'ddlj-title';
export const title = 'DDLJ का title Aditya Chopra ने नहीं दिया था? #shorts';
export const format = 'fun-facts' as const;

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "DDLJ's title... wasn't given by Aditya Chopra?",
    text: "DDLJ का title... Aditya Chopra ने नहीं दिया था?",
    delivery: {sfx: [{word: "Chopra", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'promise',
    role: 'promise',
    en: "The answer is written in the film's credits.",
    text: "जवाब film के credits में लिखा है.",
  },
  {
    id: 'f1',
    role: 'fact',
    source: [0, 1],
    en: "The title came from a 1974 song: Le Jayenge Le Jayenge, from Chor Machaye Shor.",
    text: "Title 1974 के एक गाने से आया था: Chor Machaye Shor का 'Le Jayenge Le Jayenge'.",
    delivery: {sfx: [{word: "1974", sound: 'pop.wav', volume: 0.5}]},
  },
  {
    id: 'f2',
    role: 'fact',
    source: [2, 3],
    en: "In 2001 it broke Sholay's five-year record, at Mumbai's Maratha Mandir.",
    text: "2001 में इसने Sholay का पाँच साल वाला record तोड़ दिया, Mumbai के Maratha Mandir में.",
    delivery: {sfx: [{word: "record", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'f3',
    role: 'fact',
    source: [4, 5],
    en: "In 2015 the theatre ended the run at 1,009 weeks. Fans asked, and within days it was back.",
    text: "2015 में theatre ने 1009 weeks के बाद run बंद कर दिया. पर fans के कहने पर, कुछ ही दिनों में film लौट आई.",
    say: "ट्वेंटी फ़िफ़्टीन में थिएटर ने एक हज़ार नौ वीक्स के बाद रन बंद कर दिया. पर फ़ैन्स के कहने पर, कुछ ही दिनों में फ़िल्म लौट आई.",
  },
  {
    id: 'f4',
    role: 'fact',
    source: [6, 7],
    en: "And in 2025 it was still running: one show every morning at 11:30. Over 1,500 weeks.",
    text: "और 2025 में भी रोज़ सुबह साढ़े ग्यारह बजे का show चल रहा था. यानी 1500 से ज़्यादा weeks हो चुके थे.",
    say: "और ट्वेंटी ट्वेंटी फ़ाइव में भी रोज़ सुबह साढ़े ग्यारह बजे का शो चल रहा था. यानी पंद्रह सौ से ज़्यादा वीक्स हो चुके थे.",
    delivery: {sfx: [{word: "1500", sound: 'stamp.wav', volume: 0.45}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [1, 8],
    en: "And the title? Kirron Kher suggested it. The credits say: Title suggested by Kirron Kher.",
    text: "और title? Kirron Kher ने suggest किया था. Credits में लिखा है, title suggested by Kirron Kher.",
  },
  {
    id: 'loop',
    role: 'loop',
    en: "So DDLJ's title... wasn't Aditya Chopra's.",
    text: "तो DDLJ का title... Aditya Chopra का नहीं था.",
  },
];

export const sources = [
  {
    url: 'https://en.wikipedia.org/wiki/Chor_Machaye_Shor',
    note: 'Chor Machaye Shor (18 Mar 1974): "Le Jayenge Le Jayenge" sung by Kishore Kumar and Asha Bhosle, music Ravindra Jain, lyrics Inderjeet Singh Tulsi.',
  },
  {
    url: 'https://www.bollywoodhungama.com/news/features/aditya-chopra-never-refers-dilwale-dulhania-le-jayenge-ddlj',
    note: 'Bollywood Hungama, 18 Jan 2018 (from the 2014 book Aditya Chopra Relives… DDLJ): title line from the Chor Machaye Shor song; Kirron Kher "instantly suggested the film\'s title"; rare "Title Suggested By" credit billing.',
  },
  {
    url: 'https://www.yashrajfilms.com/news/detail/2016/05/23/dilwale-dulhania-le-jayenge-celebrates-500-weeks',
    note: 'Yash Raj Films: in 2001 DDLJ broke the continuous-exhibition record set by Sholay at Minerva (5 years, 1975–1980).',
  },
  {
    url: 'http://www.rediff.com/broadband/2001/feb/05lead.htm',
    note: 'Rediff, 5 Feb 2001: Sholay ran over five years at Minerva; DDLJ overtook it the previous month.',
  },
  {
    url: 'https://www.bollywoodhungama.com/news/bollywood/its-curtains-down-for-ddlj-at-maratha-mandir',
    note: 'Bollywood Hungama, 19 Feb 2015: run to end after 1009 uninterrupted weeks at Maratha Mandir, by mutual agreement.',
  },
  {
    url: 'https://www.thenewsminute.com/article/ddlj-back-again-thanks-fan-requests-20845',
    note: 'The News Minute (PTI), 22 Feb 2015: theatre and YRF brought DDLJ back after numerous fan requests.',
  },
  {
    url: 'https://www.gulf-times.com/article/713475/international/india/bollywoods-favourite-romance-still-going-strong-after-30-years',
    note: 'AFP via Gulf Times, 23 Oct 2025: still running daily at Maratha Mandir, every day at 11.30am, more than 1,500 weeks.',
  },
  {
    url: 'https://thequint.com/amp/story/entertainment/bollywood/dilwale-dulhania-le-jayenge-returns-to-maratha-mandir-as-theatres-re-open-in-mumbai',
    note: 'The Quint, 6 Nov 2020: DDLJ returned to Maratha Mandir when theatres reopened after over eight months of COVID closure.',
  },
  {
    url: 'https://gulfnews.com/amp/story/entertainment%2Fddlj-at-20-10-things-you-may-not-know-about-the-film-1.1601749',
    note: 'Gulf News, DDLJ at 20 (2015): Kirron Kher, wife of Anupam Kher, suggested the film\'s title.',
  },
];

export const lexicon: Record<string, string> = {
  ddlj: 'डीडीएलजे',
  aditya: 'आदित्य',
  chopra: 'चोपड़ा',
  chor: 'चोर',
  machaye: 'मचाए',
  shor: 'शोर',
  kishore: 'किशोर',
  asha: 'आशा',
  le: 'ले',
  jayenge: 'जाएंगे',
  sholay: 'शोले',
  maratha: 'मराठा',
  mandir: 'मंदिर',
  kirron: 'किरण',
  kher: 'खेर',
  suggested: 'सजेस्टेड',
  suggest: 'सजेस्ट',
  title: 'टाइटल',
  credits: 'क्रेडिट्स',
  request: 'रिक्वेस्ट',
  show: 'शो',
  by: 'बाय',
  mumbai: 'मुंबई',
  run: 'रन',
};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  mascot: false,
  numbered: true,
  hook: {
    lines: ['hook', 'promise'],
    headline: 'DDLJ का title\nकिसका?',
    accent: ['title'],
    pop: {line: 'promise', word: 'credits', text: 'CREDITS'},
    // Sharp from frame 0 (channel rule): the mustard-field frame is the scroll-stopper.
    still: {
      src: 'shorts/ddlj-title/stills/ddlj-mustard.jpg',
      film: 'Dilwale Dulhania Le Jayenge',
      year: 1995,
      credit: 'Yash Raj Films',
      width: 900,
      aspect: 0.82,
      focus: '58% 25%',
    },
  },
  facts: [
    {
      lines: ['f1'],
      headline: '1974 का\nएक गाना',
      accent: ['1974'],
      still: {
        src: 'shorts/ddlj-title/stills/chor-machaye-shor.jpg',
        film: 'Chor Machaye Shor',
        year: 1974,
        credit: 'N. N. Sippy Productions',
        width: 860,
        aspect: 0.82,
        focus: '50% 40%',
      },
      pop: {word: 'Jayenge', text: 'LE JAYENGE'},
    },
    {
      lines: ['f2'],
      headline: '2001: Sholay का\nrecord टूटा',
      accent: ['record'],
      still: {
        src: 'shorts/ddlj-title/stills/ddlj-poster.jpg',
        film: 'Dilwale Dulhania Le Jayenge',
        year: 1995,
        credit: 'Yash Raj Films',
        width: 860,
        aspect: 0.82,
        focus: '50% 40%',
      },
      pop: {word: 'पाँच', text: '5 YEARS'},
      cuts: [{
        word: 'Maratha',
        src: 'shorts/ddlj-title/stills/maratha-mandir.jpg',
        film: 'Maratha Mandir',
        year: 2022,
        credit: 'Cinzia007 / Wikimedia Commons',
        width: 940,
        aspect: 1.1,
        focus: '62% 45%',
        replace: true,
      }],
    },
    {
      lines: ['f3'],
      headline: '1009 weeks\nफिर वापस',
      accent: ['1009'],
      still: {
        src: 'shorts/ddlj-title/stills/ddlj-1000-weeks.jpg',
        film: 'DDLJ 1000-weeks poster',
        year: 2014,
        credit: 'Yash Raj Films',
        width: 860,
        aspect: 0.82,
        focus: '50% 40%',
      },
      cuts: [{
        word: 'fans',
        src: 'shorts/ddlj-title/stills/ddlj-train.jpg',
        film: 'Dilwale Dulhania Le Jayenge',
        year: 1995,
        credit: 'Yash Raj Films',
        width: 940,
        aspect: 0.9,
        focus: '35% 55%',
        replace: true,
      }],
    },
    {
      lines: ['f4'],
      headline: '30 साल बाद भी\nरोज़ 11:30',
      accent: ['11:30'],
      still: {
        src: 'shorts/ddlj-title/stills/ddlj-hug.jpg',
        film: 'Dilwale Dulhania Le Jayenge',
        year: 1995,
        credit: 'Yash Raj Films',
        width: 900,
        aspect: 0.82,
        focus: '50% 45%',
      },
      pop: {word: '1500', text: '1500+ WEEKS'},
      cuts: [{
        word: 'show',
        src: 'shorts/ddlj-title/stills/maratha-mandir.jpg',
        film: 'Maratha Mandir',
        year: 2022,
        credit: 'Cinzia007 / Wikimedia Commons',
        width: 940,
        aspect: 1.1,
        focus: '62% 45%',
        replace: true,
      }],
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Title suggested by\nKirron Kher',
    accent: ['Kirron', 'Kher'],
    still: {
      src: 'shorts/ddlj-title/stills/kirron-kher.jpg',
      film: 'Kirron Kher',
      credit: 'Bollywood Hungama / Wikimedia Commons',
      width: 820,
      aspect: 0.8,
      focus: '50% 30%',
    },
    // Calls back to the promise: the answer is in the credits.
    pop: {word: 'Credits', text: 'CREDITS'},
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'DDLJ का title Aditya Chopra ने नहीं दिया था? #shorts',
  altTitles: [
    'DDLJ: 1500 weeks, एक theatre, रोज़ 11:30 #shorts',
    'Kirron Kher ने दिया DDLJ का title #shorts',
  ],
  description: `DDLJ का title एक 1974 के गाने से आया, और suggest किया Kirron Kher ने. Credits में आज भी लिखा है: "Title suggested by".

Published reports पर आधारित commentary.

Title: "Le Jayenge Le Jayenge", Chor Machaye Shor (1974), Kishore Kumar और Asha Bhosle.
2001: Maratha Mandir में Sholay का पाँच साल वाला continuous-run record (Minerva) टूटा.
Feb 2015: 1009 weeks के बाद run खत्म करने का एलान, fans की request पर कुछ दिनों में वापसी.
COVID closure के बाद Nov 2020 में लौटी. Oct 2025 तक रोज़ 11:30 का show, 1500+ weeks.

Film stills और posters copyrighted publicity images हैं, commentary support के लिए थोड़ी देर इस्तेमाल हुए, credit नीचे है.

Sources:
Chor Machaye Shor, Wikipedia: https://en.wikipedia.org/wiki/Chor_Machaye_Shor
Bollywood Hungama, 18 Jan 2018: https://www.bollywoodhungama.com/news/features/aditya-chopra-never-refers-dilwale-dulhania-le-jayenge-ddlj
Yash Raj Films, 500 weeks: https://www.yashrajfilms.com/news/detail/2016/05/23/dilwale-dulhania-le-jayenge-celebrates-500-weeks
Rediff, 5 Feb 2001: http://www.rediff.com/broadband/2001/feb/05lead.htm
Bollywood Hungama, 19 Feb 2015: https://www.bollywoodhungama.com/news/bollywood/its-curtains-down-for-ddlj-at-maratha-mandir
The News Minute (PTI), 22 Feb 2015: https://www.thenewsminute.com/article/ddlj-back-again-thanks-fan-requests-20845
The Quint, 6 Nov 2020: https://thequint.com/amp/story/entertainment/bollywood/dilwale-dulhania-le-jayenge-returns-to-maratha-mandir-as-theatres-re-open-in-mumbai
AFP via Gulf Times, 23 Oct 2025: https://www.gulf-times.com/article/713475/international/india/bollywoods-favourite-romance-still-going-strong-after-30-years
Gulf News, DDLJ at 20: https://gulfnews.com/amp/story/entertainment%2Fddlj-at-20-10-things-you-may-not-know-about-the-film-1.1601749

Movie Idiots.

#DDLJ #ShahRukhKhan #Kajol #MarathaMandir #BollywoodTrivia #HindiShorts #MovieIdiots`,
  tags: [
    'ddlj', 'dilwale dulhania le jayenge', 'shah rukh khan', 'kajol', 'aditya chopra', 'kirron kher',
    'maratha mandir', 'chor machaye shor', 'bollywood trivia', 'hindi shorts', 'movie idiots',
  ],
  settings: {
    category: 'Film & Animation',
    language: 'Hindi',
    madeForKids: false,
    visibility: 'Private',
    alteredContent: 'No (real publicity stills and photos, not altered or synthetic)',
    audience: 'Not made for kids',
  },
};
