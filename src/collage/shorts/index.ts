import type React from 'react';
import type {ScriptLine} from '../timeline';
import {PhalkeShort, type ShortProps} from './phalke/Phalke';
import * as phalke from './phalke/script';

export type ShortEntry = {
  slug: string;
  title: string;
  lines: ScriptLine[];
  sources: {url: string; note: string}[];
  component: React.FC<ShortProps>;
};

// Add new Shorts here; the slug is also the Remotion composition ID.
export const SHORTS: ShortEntry[] = [{...phalke, component: PhalkeShort}];
