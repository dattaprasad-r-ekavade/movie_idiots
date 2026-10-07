import type React from 'react';
import type {ScriptLine} from '../timeline';
import type {ShortProps} from '../shell';
import {PhalkeShort} from './phalke/Phalke';
import * as phalke from './phalke/script';
import {CollegeShort} from './college/College';
import * as college from './college/script';
import * as funFactsTemplate from './fun-facts-template/script';
import * as cultFlops from './cult-flops/script';
import * as sholayGabbar from './sholay-gabbar/script';
import * as coolieAccident from './coolie-accident/script';
import * as secretRemakes from './secret-remakes/script';
import * as lunchboxOscar from './lunchbox-oscar/script';
import * as wasseypurSplit from './wasseypur-split/script';
import * as intervalIndia from './interval-india/script';
import * as alamAra from './alam-ara/script';
import * as fearlessNadia from './fearless-nadia/script';
import * as guideTwins from './guide-twins/script';
import * as mughalColour from './mughal-colour/script';

export type ShortEntry = {
  slug: string;
  title: string;
  lines: ScriptLine[];
  sources: {url: string; note: string}[];
  component: React.FC<ShortProps>;
  /** Script structure checked by `npm run short -- lint SLUG` and before render. */
  format?: 'fun-facts';
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
];
