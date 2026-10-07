// Spoken form of a script line. Hindi TTS voices pronounce Devanagari reliably and guess at
// Latin-script words ("Madhu" came out wrong). Display text can stay Hinglish; the voice gets
// Devanagari. Each display word maps to a range of spoken words, so word cues from a speech
// service land back on the display words that captions and animation anchors use.

export type SpokenWord = {text: string; start: number; end: number};
export type Spoken = {text: string; map: [number, number][]; unknown: string[]};

// Lower-case Latin token → Devanagari. Add names and loanwords as scripts need them.
// Prefer how a Hindi speaker says the word, not a letter-by-letter transliteration.
export const LEXICON: Record<string, string> = {
  // film / channel words
  bollywood: 'बॉलीवुड', hollywood: 'हॉलीवुड', film: 'फ़िल्म', films: 'फ़िल्में', movie: 'मूवी', movies: 'मूवीज़',
  hero: 'हीरो', heroine: 'हीरोइन', villain: 'विलेन', director: 'डायरेक्टर', producer: 'प्रोड्यूसर', actor: 'एक्टर', actress: 'एक्ट्रेस',
  script: 'स्क्रिप्ट', scene: 'सीन', scenes: 'सीन्स', shooting: 'शूटिंग', shoot: 'शूट', set: 'सेट', camera: 'कैमरा', song: 'सॉन्ग',
  climax: 'क्लाइमैक्स', release: 'रिलीज़', released: 'रिलीज़', box: 'बॉक्स', office: 'ऑफ़िस', hit: 'हिट', flop: 'फ़्लॉप', blockbuster: 'ब्लॉकबस्टर',
  superhit: 'सुपरहिट', remake: 'रीमेक', sequel: 'सीक्वल', cameo: 'कैमियो', role: 'रोल', double: 'डबल', dialogue: 'डायलॉग', dialogues: 'डायलॉग्स',
  trailer: 'ट्रेलर', poster: 'पोस्टर', award: 'अवॉर्ड', awards: 'अवॉर्ड्स', filmfare: 'फ़िल्मफ़ेयर', oscar: 'ऑस्कर', national: 'नेशनल',
  stunt: 'स्टंट', stunts: 'स्टंट्स', budget: 'बजट', crore: 'करोड़', lakh: 'लाख', rupees: 'रुपये', ticket: 'टिकट', theatre: 'थिएटर',
  cinema: 'सिनेमा', studio: 'स्टूडियो', audition: 'ऑडिशन', casting: 'कास्टिंग', story: 'स्टोरी', twist: 'ट्विस्ट', fact: 'फ़ैक्ट', facts: 'फ़ैक्ट्स',
  channel: 'चैनल', comment: 'कमेंट', subscribe: 'सब्सक्राइब', like: 'लाइक', share: 'शेयर', part: 'पार्ट', idiots: 'इडियट्स',
  // everyday Hinglish
  college: 'कॉलेज', school: 'स्कूल', class: 'क्लास', classroom: 'क्लासरूम', exam: 'एग्ज़ाम', exams: 'एग्ज़ाम्स', fail: 'फ़ेल', pass: 'पास',
  canteen: 'कैंटीन', principal: 'प्रिंसिपल', teacher: 'टीचर', syllabus: 'सिलेबस', farewell: 'फ़ेयरवेल', band: 'बैंड', basketball: 'बास्केटबॉल',
  cycle: 'साइकिल', race: 'रेस', prank: 'प्रैंक', friendship: 'फ़्रेंडशिप', favourite: 'फ़ेवरेट', favorite: 'फ़ेवरेट', real: 'रियल', actually: 'एक्चुअली',
  fan: 'फ़ैन', fans: 'फ़ैन्स', tourist: 'टूरिस्ट', spot: 'स्पॉट', version: 'वर्ज़न', offer: 'ऑफ़र', offered: 'ऑफ़र', star: 'स्टार', superstar: 'सुपरस्टार',
  plan: 'प्लान', idea: 'आइडिया', problem: 'प्रॉब्लम', game: 'गेम', record: 'रिकॉर्ड', team: 'टीम', news: 'न्यूज़', interview: 'इंटरव्यू',
  restaurant: 'रेस्टोरेंट', crew: 'क्रू', reel: 'रील', reels: 'रील्स', develop: 'डेवलप', bank: 'बैंक', police: 'पुलिस', inspector: 'इंस्पेक्टर',
  model: 'मॉडल', mr: 'मिस्टर', mrs: 'मिसेज़', miss: 'मिस', ms: 'मिस', st: 'सेंट', dr: 'डॉक्टर', vs: 'वर्सेस', ok: 'ओके', tv: 'टीवी',
  papa: 'पापा', mummy: 'मम्मी', raja: 'राजा', raj: 'राज', rahul: 'राहुल', anjali: 'अंजलि', madhu: 'मधु', sunil: 'सुनील', simran: 'सिमरन',
  // Hinglish fillers and reactions a fun-facts script leans on
  seriously: 'सीरियसली', basically: 'बेसिकली', literally: 'लिटरली', crazy: 'क्रेज़ी', legend: 'लेजेंड', legendary: 'लेजेंडरी', iconic: 'आइकॉनिक',
  famous: 'फ़ेमस', popular: 'पॉपुलर', success: 'सक्सेस', audience: 'ऑडियंस', music: 'म्यूज़िक', composer: 'कंपोज़र', singer: 'सिंगर', lyrics: 'लिरिक्स',
  world: 'वर्ल्ड', best: 'बेस्ट', first: 'फ़र्स्ट', second: 'सेकंड', last: 'लास्ट', total: 'टोटल', original: 'ओरिजिनल', fake: 'फ़ेक', truth: 'ट्रुथ',
  character: 'कैरेक्टर', look: 'लुक', costume: 'कॉस्ट्यूम', makeup: 'मेकअप', location: 'लोकेशन', entry: 'एंट्री', dance: 'डांस', songs: 'सॉन्ग्स',
  edit: 'एडिट', editor: 'एडिटर', cut: 'कट', final: 'फ़ाइनल', shocking: 'शॉकिंग', interesting: 'इंटरेस्टिंग', perfect: 'परफ़ेक्ट', fun: 'फ़न',
  mind: 'माइंड', blowing: 'ब्लोइंग', wait: 'वेट', reason: 'रीज़न', secret: 'सीक्रेट', rumour: 'रूमर', rumor: 'रूमर',
  career: 'करियर', debut: 'डेब्यू', fees: 'फ़ीस', fee: 'फ़ीस', salary: 'सैलरी', contract: 'कॉन्ट्रैक्ट', sign: 'साइन', signed: 'साइन',
  reject: 'रिजेक्ट', rejected: 'रिजेक्ट', replace: 'रिप्लेस', replaced: 'रिप्लेस', ban: 'बैन', banned: 'बैन', censor: 'सेंसर', board: 'बोर्ड',
  overseas: 'ओवरसीज़', silver: 'सिल्वर', jubilee: 'जुबली', golden: 'गोल्डन', week: 'वीक', weeks: 'वीक्स', minute: 'मिनट', minutes: 'मिनट',
  hours: 'आवर्स', days: 'डेज़', years: 'इयर्स', online: 'ऑनलाइन', internet: 'इंटरनेट', meme: 'मीम', memes: 'मीम्स', viral: 'वायरल',
  action: 'एक्शन', comedy: 'कॉमेडी', romance: 'रोमांस', thriller: 'थ्रिलर', horror: 'हॉरर', drama: 'ड्रामा', fight: 'फ़ाइट', chase: 'चेज़',
  so: 'सो', but: 'बट', and: 'एंड', yes: 'यस', no: 'नो', guess: 'गेस', what: 'व्हॉट', you: 'यू', know: 'नो', did: 'डिड', bro: 'ब्रो', boss: 'बॉस',
  // decades as people say them
  '60s': 'सिक्स्टीज़', '70s': 'सेवेंटीज़', '80s': 'एटीज़', '90s': 'नाइंटीज़', '2000s': 'टू थाउज़ेंड्स',
};

const ONES = ['शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस', 'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस',
  'बीस', 'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस', 'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस',
  'चालीस', 'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास', 'इक्यावन', 'बावन', 'तिरेपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ',
  'साठ', 'इकसठ', 'बासठ', 'तिरेसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सड़सठ', 'अड़सठ', 'उनहत्तर', 'सत्तर', 'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्यासी',
  'अस्सी', 'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सत्तासी', 'अट्ठासी', 'नवासी', 'नब्बे', 'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे'];

/** Hindi words for 0–99999, for counts and amounts ("पंद्रह रुपये"). Years and dates use English. */
export function hindiNumber(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 99999) return String(n);
  if (n < 100) return ONES[n];
  const parts: string[] = [];
  if (n >= 1000) parts.push(ONES[Math.floor(n / 1000)], 'हज़ार');
  if (n % 1000 >= 100) parts.push(ONES[Math.floor((n % 1000) / 100)], 'सौ');
  if (n % 100) parts.push(ONES[n % 100]);
  return parts.join(' ');
}

// English number words in Devanagari: Hindi voices say these clearly, and years/dates are
// spoken in English the way people actually say them ("नाइंटीन एटी एट", "थर्ड मे").
const EN_ONES = ['', 'वन', 'टू', 'थ्री', 'फ़ोर', 'फ़ाइव', 'सिक्स', 'सेवन', 'एट', 'नाइन', 'टेन', 'इलेवन', 'ट्वेल्व', 'थर्टीन', 'फ़ोर्टीन', 'फ़िफ़्टीन', 'सिक्सटीन', 'सेवनटीन', 'एटीन', 'नाइनटीन'];
const EN_TENS = ['', '', 'ट्वेंटी', 'थर्टी', 'फ़ोर्टी', 'फ़िफ़्टी', 'सिक्सटी', 'सेवेंटी', 'एटी', 'नाइंटी'];
const EN_ORD = ['', 'फ़र्स्ट', 'सेकंड', 'थर्ड', 'फ़ोर्थ', 'फ़िफ़्थ', 'सिक्स्थ', 'सेवंथ', 'एटथ', 'नाइंथ', 'टेंथ', 'इलेवंथ', 'ट्वेल्फ़्थ', 'थर्टींथ', 'फ़ोर्टींथ', 'फ़िफ़्टींथ', 'सिक्सटींथ', 'सेवनटींथ', 'एटींथ', 'नाइनटींथ'];

/** English words for 1–99: "एटी एट". */
export function englishNumber(n: number): string {
  if (n < 20) return EN_ONES[n];
  return [EN_TENS[Math.floor(n / 10)], EN_ONES[n % 10]].filter(Boolean).join(' ');
}

/** English ordinal for a day of the month: 3 → "थर्ड", 21 → "ट्वेंटी फ़र्स्ट". */
export function englishOrdinal(n: number): string {
  if (n < 20) return EN_ORD[n];
  if (n % 10 === 0) return EN_TENS[n / 10].replace(/ी$/, 'िएथ');
  return `${EN_TENS[Math.floor(n / 10)]} ${EN_ORD[n % 10]}`;
}

/** A year as spoken in English, in pairs: 1988 "नाइनटीन एटी एट", 1905 "नाइनटीन ओ फ़ाइव", 2004 "टू थाउज़ेंड फ़ोर", 2024 "ट्वेंटी ट्वेंटी फ़ोर". */
export function englishYear(y: number): string {
  if (y >= 2000 && y < 2010) return ['टू थाउज़ेंड', EN_ONES[y % 10]].filter(Boolean).join(' ');
  const hi = Math.floor(y / 100), lo = y % 100;
  if (lo === 0) return `${englishNumber(hi)} हंड्रेड`;
  return `${englishNumber(hi)} ${lo < 10 ? `ओ ${EN_ONES[lo]}` : englishNumber(lo)}`;
}

// Gregorian months, Latin or Devanagari spelling → English pronunciation.
const MONTHS: Record<string, string> = {
  january: 'जनवरी', jan: 'जनवरी', जनवरी: 'जनवरी', february: 'फ़ेब्रुअरी', feb: 'फ़ेब्रुअरी', फ़रवरी: 'फ़ेब्रुअरी', फरवरी: 'फ़ेब्रुअरी',
  march: 'मार्च', मार्च: 'मार्च', april: 'एप्रिल', apr: 'एप्रिल', अप्रैल: 'एप्रिल', may: 'मे', मई: 'मे', june: 'जून', जून: 'जून',
  july: 'जुलाई', जुलाई: 'जुलाई', august: 'ऑगस्ट', aug: 'ऑगस्ट', अगस्त: 'ऑगस्ट', september: 'सेप्टेंबर', sept: 'सेप्टेंबर', sep: 'सेप्टेंबर', सितंबर: 'सेप्टेंबर', सितम्बर: 'सेप्टेंबर',
  october: 'ऑक्टोबर', oct: 'ऑक्टोबर', अक्टूबर: 'ऑक्टोबर', अक्तूबर: 'ऑक्टोबर', november: 'नवंबर', nov: 'नवंबर', नवंबर: 'नवंबर', नवम्बर: 'नवंबर',
  december: 'डिसेंबर', dec: 'डिसेंबर', दिसंबर: 'डिसेंबर', दिसम्बर: 'डिसेंबर',
};
// Spelled-out English numbers in Hinglish lines: "Fact one", "third".
const EN_NAMES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const EN_ORD_NAMES = ['', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth'];
const EN_WORDS: Record<string, string> = Object.fromEntries([
  ...EN_NAMES.slice(1).map((w, i) => [w, EN_ONES[i + 1]]),
  ...EN_ORD_NAMES.slice(1).map((w, i) => [w, EN_ORD[i + 1]]),
  ...['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'].map((w, i) => [w, EN_TENS[i + 2]]),
  ['hundred', 'हंड्रेड'], ['thousand', 'थाउज़ेंड'], ['million', 'मिलियन'], ['billion', 'बिलियन'],
]);
const isYear =(core: string) => /^\d{4}$/.test(core) && Number(core) >= 1000 && Number(core) <= 2099;

const LATIN = /[A-Za-z]/;
const ABBREVIATIONS = new Set(['mr', 'mrs', 'ms', 'st', 'dr', 'vs']);
// Leading/trailing punctuation stays with the spoken word so pauses survive.
const SPLIT = /^([^\p{L}\p{N}]*)(.*?)([^\p{L}\p{N}\p{M}]*)$/u;

function speakToken(core: string): string | undefined {
  const key = core.toLowerCase();
  if (LEXICON[key]) return LEXICON[key];
  if (MONTHS[key]) return MONTHS[key];
  if (EN_WORDS[key]) return EN_WORDS[key];
  if (isYear(core)) return englishYear(Number(core));
  // Decades: "1990s" → "नाइनटीन नाइंटीज़".
  if (/^\d{4}s$/.test(core) && isYear(core.slice(0, 4))) return englishYear(Number(core.slice(0, 4))).replace(/ी$/, 'ीज़').replace(/(हंड्रेड)$/, '$1्स');
  if (/^\d{1,5}$/.test(core)) return hindiNumber(Number(core));
  if (/^\d{1,2}(,\d{2,3})+$/.test(core) && Number(core.replace(/,/g, '')) <= 99999) return hindiNumber(Number(core.replace(/,/g, '')));
  if (/^\d+%$/.test(core)) return `${hindiNumber(Number(core.slice(0, -1)))} परसेंट`;
  // Possessive / plural on a known word: "Xavier's", "Raj's".
  const base = key.replace(/'s$/, '');
  if (base !== key && LEXICON[base]) return `${LEXICON[base]}ज़`;
  return undefined;
}

/**
 * Spoken Devanagari for a display line. `say` overrides the whole line (its words then map to
 * display words by position). Latin words missing from the lexicon are returned in `unknown`.
 */
export function toSpoken(text: string, say?: string, lexicon: Record<string, string> = {}): Spoken {
  const display = text.split(/\s+/).filter(Boolean);
  if (say?.trim()) {
    const spoken = say.split(/\s+/).filter(Boolean);
    return {text: spoken.join(' '), map: proportionalMap(display.length, spoken.length), unknown: spoken.filter((w) => LATIN.test(w))};
  }
  const out: string[] = [];
  const map: [number, number][] = [];
  const unknown: string[] = [];
  const coreOf = (w?: string) => (w?.match(SPLIT)?.[2] ?? '').toLowerCase();
  for (const [index, word] of display.entries()) {
    // Split hyphenated/slashed compounds ("80s-90s") into separately spoken parts.
    const pieces = LATIN.test(word) || /\d/.test(word) ? word.split(/(?<=[\p{L}\p{N}])[-/](?=[\p{L}\p{N}])/u) : [word];
    const begin = out.length;
    // A day number next to a month is a date: "3 मई" / "May 3" / "3rd May" → "थर्ड मे".
    const nearMonth = !!MONTHS[coreOf(display[index + 1])] || !!MONTHS[coreOf(display[index - 1])];
    for (const piece of pieces) {
      const [, lead = '', core = '', trail = ''] = piece.match(SPLIT) ?? [];
      const day = nearMonth && core.match(/^(\d{1,2})(st|nd|rd|th)?$/i);
      const said = day && Number(day[1]) >= 1 && Number(day[1]) <= 31
        ? englishOrdinal(Number(day[1]))
        : core ? speakToken(core) ?? lexicon[core.toLowerCase()] : undefined;
      // "St." / "Dr." are abbreviations, not sentence ends: drop the dot so the voice does not pause.
      const tail = said && ABBREVIATIONS.has(core.toLowerCase()) ? trail.replace(/^\./, '') : trail;
      if (said) out.push(...`${lead}${said}${tail}`.split(' '));
      else {
        if (LATIN.test(core) || /\d/.test(core)) unknown.push(core);
        out.push(piece);
      }
    }
    map.push([begin, out.length]);
  }
  return {text: out.join(' '), map, unknown: [...new Set(unknown)]};
}

function proportionalMap(display: number, spoken: number): [number, number][] {
  return Array.from({length: display}, (_, i) => {
    const a = Math.floor((i * spoken) / display);
    const b = Math.max(a + 1, Math.floor(((i + 1) * spoken) / display));
    return [Math.min(a, spoken - 1), Math.min(b, spoken)];
  });
}

/**
 * Turn speech-service word cues (spoken words) into cues for the display words.
 * When the service returns a different word count than expected, display words are spread over
 * the spoken span by character length instead.
 */
export function displayCues(text: string, spoken: Spoken, cues: SpokenWord[]): SpokenWord[] {
  const display = text.split(/\s+/).filter(Boolean);
  if (!cues.length) return [];
  const expected = spoken.text.split(/\s+/).filter(Boolean).length;
  if (cues.length === expected) {
    return display.map((word, i) => {
      const [a, b] = spoken.map[i];
      return {text: word, start: cues[a].start, end: cues[b - 1].end};
    });
  }
  const start = cues[0].start;
  const span = cues[cues.length - 1].end - start;
  const weights = display.map((w) => Math.max(2, [...w].length));
  const total = weights.reduce((x, y) => x + y, 0);
  let cursor = start;
  return display.map((word, i) => {
    const length = (weights[i] / total) * span;
    const cue = {text: word, start: cursor, end: cursor + length};
    cursor += length;
    return cue;
  });
}
