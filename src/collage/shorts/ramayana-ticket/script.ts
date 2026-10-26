// "Did you know?" Short, design v2 (velvet). Hook: is one Ramayana ticket really ₹2,770?
// Facts: Ramayana: Part 1 (2026, Nitesh Tiwari, Ranbir Kapoor, Yash) release date and advance-booking
// opening from Sacnilk; the ₹2,770 recliner listing (PVR ICON Phoenix Palladium, Mumbai, IMAX 3D) from
// BollywoodShaadis and Dynamite News; day-one bookings from Business Today, Outlook and The Week.
// Price is one Mumbai listing, not a general price: the payoff says so.
import type {ScriptLine} from '../../timeline';
import {funFacts, type FunFactsPlan} from '../../formats/FunFactsShort';

export const slug = 'ramayana-ticket';
export const title = 'Ramayana का एक ticket ₹2,770 का? #shorts';
export const format = 'fun-facts' as const;
// Background bed from public/music (original, music-mania); credited automatically in youtube.txt.
export const topic = 'ramayana';
export const music = 'sandhya';

export const lines: ScriptLine[] = [
  {
    id: 'hook',
    role: 'hook',
    en: "Ranbir Kapoor's Ramayana: is one ticket really ₹2,770?",
    text: "Ranbir Kapoor की Ramayana का एक ticket ₹2,770 का?",
    say: "रणबीर कपूर की रामायण का एक टिकट दो हज़ार सात सौ सत्तर रुपये का?",
    delivery: {emotion: 'curious'},
  },
  {
    id: 'f1',
    role: 'setup',
    source: [3, 0],
    en: "Ramayana: Part 1 releases worldwide on 5 November, and advance booking opened on Dussehra.",
    text: "Ramayana 5 नवंबर को आ रही है. Advance booking Dussehra पर खुली.",
    say: "रामायण पाँच नवंबर को आ रही है। एडवांस बुकिंग दशहरे पर खुली।",
    delivery: {emotion: 'storytelling'},
  },
  {
    id: 'f2',
    role: 'tension',
    source: [0, 1],
    en: "But some shows' ticket prices left people shocked.",
    text: "पर कुछ shows के ticket prices देखकर लोग चौंक गए.",
    say: "पर कुछ शोज़ के टिकट के दाम देखकर लोग चौंक गए।",
    delivery: {emotion: 'conspiratorial', cues: [{word: 'चौंक', tag: 'surprised'}]},
  },
  {
    id: 'payoff',
    role: 'payoff',
    source: [0, 1, 2, 4],
    en: "Yes! In Mumbai, an IMAX 3D recliner seat showed ₹2,770. And about ₹5 crore of bookings on day one.",
    text: "हाँ! Mumbai में IMAX 3D recliner seat का ticket ₹2,770 का दिखा. और पहले ही दिन करीब ₹5 करोड़ की booking.",
    say: "हाँ! मुंबई में आईमैक्स थ्री-डी रिक्लाइनर सीट का टिकट दो हज़ार सात सौ सत्तर रुपये का दिखा। और पहले ही दिन करीब पाँच करोड़ की बुकिंग।",
    delivery: {emotion: 'excited', cues: [{word: 'पहले', tag: 'excited'}]},
  },
  {
    id: 'loop',
    role: 'loop',
    en: "A Ramayana ticket, ₹2,770?",
    text: "Ramayana का ticket ₹2,770 का?",
    say: "रामायण का टिकट दो हज़ार सात सौ सत्तर का?",
    delivery: {emotion: 'playful'},
  },
];

export const sources = [
  {
    url: 'https://www.bollywoodshaadis.com/amp-articles/ranbir-kapoor-ramayana-tickets-touch-rs-2770-85834',
    note: 'Updated 21 Oct 2026. "the recliner seats for the 6:55 PM show at IMAX 3D at PVR ICON: Phoenix Palladium are currently priced at Rs. 2,770" (for 5 and 6 Nov 2026). "The film has already collected Rs. 4.88 crore in advance bookings across 104 cities" (as of 8 AM, 21 Oct). Body also says prices "surged to over Rs. 2,000 in just a day".',
  },
  {
    url: 'https://www.dynamitenews.com/entertainment/ranbir-kapoors-ramayana-sees-strong-advance-booking-response-premium-ticket-prices-touch-rs-2770',
    note: '21 Oct 2026, 8:40 PM IST. "Recliner seats for select IMAX 3D screenings at PVR ICON in Phoenix Palladium, Lower Parel, have been listed at Rs 2,770." Advance bookings "approximately Rs 4.88 crore", about 85,000 tickets nationwide.',
  },
  {
    url: 'https://www.businesstoday.in/trending/box-office/story/ramayana-advance-booking-ranbir-kapoor-led-epic-sells-over-86000-tickets-nears-rs5-crore-in-ticket-sales-562670-2026-10-21',
    note: '21 Oct 2026. "A total of 86,187 tickets were sold across 3,537 shows in 104 cities." "Ramayana: Part 1 has neared ₹5 crore gross in India through online advance booking so far." Does not mention ₹2,770.',
  },
  {
    url: 'https://www.sacnilk.com/news/ramayana-part-1-officially-confirmed-for-november-5-release-as-advance-booking-update-revealed',
    note: 'Published 11 Oct 2026. "Ramayana: Part 1 will arrive in cinemas worldwide on November 5, 2026, across premium theatrical formats, including IMAX." "advance bookings will open on Dussehra, October 20."',
  },
  {
    url: 'https://www.outlookindia.com/art-entertainment/inside-ramayanas-massive-pre-sales-5-crore-mark-crossed-and-2770-luxury-tickets',
    note: '21 Oct 2026, 3:45 pm. Headline: "₹5 Crore Mark Crossed And ₹2,770 Luxury Tickets". Advance bookings "reached ₹5.35 crore nationwide", 91,125 tickets (Sacnilk). Body does not name the venue of the ₹2,770 price.',
  },
  {
    url: 'https://www.theweek.in/news/entertainment/2026/10/21/ramayana-box-office-advance-bookings-day-1.html',
    note: '21 Oct 2026. "has sold ₹5.97 crore in advance bookings for Day 1, according to Sacnilk." Does not mention ₹2,770.',
  },
];

// Per-short pronunciations for names and titles the shared lexicon does not know.
export const lexicon: Record<string, string> = {
  ramayana: 'रामायण',
  ranbir: 'रणबीर',
  kapoor: 'कपूर',
  ticket: 'टिकट',
  shows: 'शोज़',
  prices: 'दाम',
  advance: 'एडवांस',
  booking: 'बुकिंग',
  dussehra: 'दशहरा',
  mumbai: 'मुंबई',
  imax: 'आईमैक्स',
  recliner: 'रिक्लाइनर',
  part: 'पार्ट',
  release: 'रिलीज़',
  listed: 'लिस्ट',
};

const POSTER = {src: 'shorts/ramayana-ticket/stills/poster.jpg', film: 'Ramayana', year: 2026, credit: 'Prime Focus Studios', aspect: 842 / 1263, focus: '50% 30%'};
const RANBIR = {src: 'shorts/ramayana-ticket/stills/ranbir-apr.jpg', film: 'Ranbir Kapoor', year: 2024, credit: 'Bollywood Hungama / Wikimedia Commons (CC BY 3.0)', aspect: 585 / 677, focus: '50% 30%'};

export const plan: FunFactsPlan = {
  kicker: 'Did you know?',
  design: 'v2',
  palette: 'velvet',
  hook: {
    lines: ['hook'],
    headline: 'Ramayana का ticket\n₹2,770 का है?',
    accent: ['₹2,770'],
    // Official poster from TMDB (original size): sharp from the first frame.
    still: POSTER,
  },
  facts: [
    {
      lines: ['f1'],
      headline: '5 नवंबर को\nआ रही है',
      accent: ['नवंबर'],
      layout: 'print',
      still: RANBIR,
    },
    {
      lines: ['f2'],
      headline: 'Shows के दाम\nदेखकर चौंक',
      accent: ['चौंक'],
      layout: 'ticket',
      ticket: {word: 'चौंक', title: 'IMAX 3D', figure: '₹ ???', sub: 'Premium recliner'},
      still: POSTER,
    },
  ],
  payoff: {
    lines: ['payoff'],
    headline: 'Mumbai में\n₹2,770 का ticket',
    accent: ['₹2,770'],
    still: POSTER,
  },
  loop: {lines: ['loop']},
};

export const component = funFacts(plan);

export const youtube = {
  title: 'Ramayana का एक ticket ₹2,770 का? #shorts',
  altTitles: [
    'Ranbir Kapoor की Ramayana, IMAX का ticket ₹2,770 #shorts',
    'Ramayana advance booking, दिन 1 पर ₹5 करोड़ के आसपास #shorts',
  ],
  description: `Nitesh Tiwari की Ramayana: Part 1 (2026, Ranbir Kapoor, Yash) 5 नवंबर 2026 को worldwide release होगी, और advance booking दशहरे पर खुली. Mumbai के PVR ICON, Phoenix Palladium में एक IMAX 3D recliner show ₹2,770 में लिस्ट हुआ (BollywoodShaadis; Dynamite News). ये एक theatre की listing थी, सभी shows का दाम नहीं. पहले दिन की advance booking ₹5 करोड़ के आसपास बताई गई (Business Today; Outlook; The Week).

Sources:
BollywoodShaadis, 21 Oct 2026 — https://www.bollywoodshaadis.com/amp-articles/ranbir-kapoor-ramayana-tickets-touch-rs-2770-85834
Dynamite News, 21 Oct 2026 — https://www.dynamitenews.com/entertainment/ranbir-kapoors-ramayana-sees-strong-advance-booking-response-premium-ticket-prices-touch-rs-2770
Business Today, 21 Oct 2026 — https://www.businesstoday.in/trending/box-office/story/ramayana-advance-booking-ranbir-kapoor-led-epic-sells-over-86000-tickets-nears-rs5-crore-in-ticket-sales-562670-2026-10-21
Sacnilk, 11 Oct 2026 — https://www.sacnilk.com/news/ramayana-part-1-officially-confirmed-for-november-5-release-as-advance-booking-update-revealed
Outlook, 21 Oct 2026 — https://www.outlookindia.com/art-entertainment/inside-ramayanas-massive-pre-sales-5-crore-mark-crossed-and-2770-luxury-tickets
The Week, 21 Oct 2026 — https://www.theweek.in/news/entertainment/2026/10/21/ramayana-box-office-advance-bookings-day-1.html

Booking figures are early trade tracker numbers and differ by source. They can change before release.

Images:
Ramayana (2026) official poster, Prime Focus Studios, via TMDB — https://www.themoviedb.org/movie/656908 . Copyrighted; used as credited commentary on the film.
Ranbir Kapoor, Apr 2024, Bollywood Hungama via Wikimedia Commons — https://commons.wikimedia.org/wiki/File:Ranbir_Kapoor_in_April_2024.jpg . CC BY 3.0 (https://creativecommons.org/licenses/by/3.0).

Movie Idiots.

#Ramayana #RanbirKapoor #Yash #NiteshTiwari #AdvanceBooking #BollywoodNews #MovieIdiots`,
  tags: [
    'ramayana', 'ramayana part 1', 'ranbir kapoor', 'yash', 'nitesh tiwari', 'ramayana tickets',
    'advance booking', 'bollywood news', 'movie idiots',
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
