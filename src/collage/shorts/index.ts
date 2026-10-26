import type React from 'react';
import type {ScriptLine} from '../timeline';
import type {ShortProps} from '../shell';
import type {FunFactsPlan} from '../formats/FunFactsShort';
import {PhalkeShort} from './archive/phalke/Phalke';
import * as phalke from './archive/phalke/script';
import {CollegeShort} from './archive/college/College';
import * as college from './archive/college/script';
import * as funFactsTemplate from './fun-facts-template/script';
import * as cultFlops from './archive/cult-flops/script';
import * as sholayGabbar from './archive/sholay-gabbar/script';
import * as coolieAccident from './archive/coolie-accident/script';
import * as secretRemakes from './archive/secret-remakes/script';
import * as lunchboxOscar from './archive/lunchbox-oscar/script';
import * as wasseypurSplit from './archive/wasseypur-split/script';
import * as intervalIndia from './archive/interval-india/script';
import * as alamAra from './archive/alam-ara/script';
import * as fearlessNadia from './archive/fearless-nadia/script';
import * as guideTwins from './archive/guide-twins/script';
import * as mughalColour from './archive/mughal-colour/script';
import * as nanaPatekar from './archive/nana-patekar/script';
import * as ddljTitle from './archive/ddlj-title/script';
import * as mrIndia from './archive/mr-india/script';
import * as omShantiOm from './archive/om-shanti-om/script';
import * as theLadyKiller from './archive/the-lady-killer/script';
import * as whiteboardDemo from './archive/whiteboard-demo/script';
import * as twelfthFail from './archive/12th-fail/script';
import * as kantara from './archive/kantara/script';
import * as budgetVsBoxOffice from './archive/budget-vs-box-office/script';
import * as flopFee from './archive/flop-fee/script';
import * as bestRoi from './archive/best-roi/script';
import * as saiyaara from './archive/saiyaara/script';

// Batch 4 (uploaded 21-26 Oct).
import * as pushpaVoice from './archive/pushpa-voice/script';
import * as naatuNaatuUkraine from './archive/naatu-naatu-ukraine/script';
import * as dangalChina from './archive/dangal-china/script';
import * as heraPheriRemake from './archive/hera-pheri-remake/script';
import * as drishyamChina from './archive/drishyam-china/script';
import * as bahubaliKattappa from './archive/bahubali-kattappa/script';
import * as threeIdiotsAge from './archive/three-idiots-age/script';
import * as lagaanOscar from './archive/lagaan-oscar/script';
import * as kahoNaaAwards from './archive/kaho-naa-awards/script';
import * as kgfKannada from './archive/kgf-kannada/script';

// Batch 5 (in production, 26 Oct). Finished Shorts move to ./archive.
import * as dhaakadDay8 from './dhaakad-day8/script';
import * as gadar2Auction from './gadar2-auction/script';
import * as rajiniConductor from './rajini-conductor/script';
import * as arjunDeepfake from './arjun-deepfake/script';
import * as kiranCourt from './kiran-court/script';
import * as cbfcLeak from './cbfc-leak/script';
import * as suryaaDoctors from './suryaa-doctors/script';
import * as gangulyDoosra from './ganguly-doosra/script';
import * as drishyam3Stories from './drishyam3-stories/script';
import * as ramayanaTicket from './ramayana-ticket/script';

export type ShortEntry = {
  slug: string;
  title: string;
  lines: ScriptLine[];
  sources: {url: string; note: string}[];
  component: React.FC<ShortProps>;
  /** Script structure checked by `npm run short -- lint SLUG` and before render. */
  format?: 'fun-facts';
  /** Fun-facts beat plan; `lint` checks its stills against the ledger and flags static beats. */
  plan?: FunFactsPlan;
  /** About a real person spoken of respectfully: `lint` flags singular verbs (गया/था → गए/थे). */
  honorific?: boolean;
  /** Tribute or tragedy: `lint` flags mascot cameos. */
  tribute?: boolean;
  /** Shorts with the same topic (e.g. 'kantara', 'china') are scheduled at least 2 days apart. */
  topic?: string;
  /** Background music: a track name in public/music/tracks.json (e.g. 'mass-entry'). Default: the generated bed. */
  music?: string;
  /** Seconds the picture holds after the last spoken word (default 0.5). Shorter tails loop sooner. */
  tail?: number;
  /** Extra Latin → Devanagari pronunciations for this short (names, titles). */
  lexicon?: Record<string, string>;
  /** Upload package: written to youtube.txt by `npm run short -- package SLUG` and on render. */
  youtube?: {title: string; altTitles?: string[]; description: string; tags: string[]; settings?: Record<string, string | boolean>};
};

// Add new Shorts here; the slug is also the Remotion composition ID.
export const SHORTS: ShortEntry[] = [
  {...phalke, component: PhalkeShort},
  {...college, component: CollegeShort},
  funFactsTemplate,
  cultFlops,
  sholayGabbar,
  coolieAccident,
  secretRemakes,
  lunchboxOscar,
  wasseypurSplit,
  intervalIndia,
  alamAra,
  fearlessNadia,
  guideTwins,
  mughalColour,
  nanaPatekar,
  ddljTitle,
  mrIndia,
  omShantiOm,
  theLadyKiller,
  whiteboardDemo,
  twelfthFail,
  kantara,
  budgetVsBoxOffice,
  flopFee,
  bestRoi,
  saiyaara,
  pushpaVoice,
  naatuNaatuUkraine,
  dangalChina,
  heraPheriRemake,
  drishyamChina,
  bahubaliKattappa,
  threeIdiotsAge,
  lagaanOscar,
  kahoNaaAwards,
  kgfKannada,
  dhaakadDay8,
  gadar2Auction,
  rajiniConductor,
  arjunDeepfake,
  kiranCourt,
  cbfcLeak,
  suryaaDoctors,
  gangulyDoosra,
  drishyam3Stories,
  ramayanaTicket,
];
