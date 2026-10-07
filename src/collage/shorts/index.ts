import type React from 'react';
import type {ScriptLine} from '../timeline';
import type {ShortProps} from '../shell';
import {PhalkeShort} from './phalke/Phalke';
import * as phalke from './phalke/script';
import {CollegeShort} from './college/College';
import * as college from './college/script';

export type ShortEntry = {
  slug: string;
  title: string;
  lines: ScriptLine[];
  sources: {url: string; note: string}[];
  component: React.FC<ShortProps>;
  /** Upload package: written to youtube.txt by `npm run short -- package SLUG` and on render. */
  youtube?: {title: string; altTitles?: string[]; description: string; tags: string[]; settings?: Record<string, string | boolean>};
};

// Add new Shorts here; the slug is also the Remotion composition ID.
export const SHORTS: ShortEntry[] = [
  {...phalke, component: PhalkeShort},
  {...college, component: CollegeShort},
];
