// Whiteboard (VideoScribe-style) test Short: exercises every element kind of src/whiteboard on the
// already-verified Om Shanti Om facts. Not for upload as is; it is the bench for perfecting the look.
import type {ScriptLine} from '../../../timeline';
import {whiteboard, type WhiteboardPlan} from '../../../../whiteboard/Whiteboard';
import {sources as oshoSources, lexicon as oshoLexicon} from '../om-shanti-om/script';

export const slug = 'whiteboard-demo';
export const title = 'Whiteboard test: Om Shanti Om';

export const lines: ScriptLine[] = [
  {id: 'hook', role: 'hook', en: 'How many stars were in one SRK song?', text: 'SRK के एक गाने में कितने stars थे?'},
  {id: 'f1', role: 'fact', source: [0, 1], en: "Om Shanti Om was Deepika Padukone's first Hindi film.", text: 'Om Shanti Om, Deepika Padukone की पहली Hindi film थी.'},
  {id: 'f2', role: 'fact', source: [0, 2], en: 'The title was taken from a song in Karz, 1980.', text: 'Title 1980 की Karz के एक गाने से लिया गया था.'},
  {id: 'payoff', role: 'payoff', source: [3, 0], en: 'And Deewangi Deewangi had more than 30 stars, along with SRK.', text: 'और Deewangi Deewangi में SRK के साथ 30 से ज़्यादा stars थे.'},
  {id: 'loop', role: 'loop', en: 'One song, more than 30 stars.', text: 'एक गाना, 30 से ज़्यादा stars.'},
];

export const sources = oshoSources;
export const lexicon = {...oshoLexicon, gaana: 'गाना'};

const RED = '#d6392f';

export const board: WhiteboardPlan = {
  // A tall board suits 9:16: beats stack top to bottom, so the closing overview fills the screen.
  world: {w: 1600, h: 2800},
  paper: 'white',
  accent: RED,
  sfx: {src: 'paper.wav', volume: 0.12},
  elements: [
    // Hook: the question is written, then a star lands beside it.
    {kind: 'write', at: {line: 'hook'}, text: 'SRK के एक गाने में', x: 760, y: 300, size: 120, camera: {x: 160, y: 160, w: 1300, h: 400}},
    {kind: 'write', at: {line: 'hook', word: 'कितने'}, text: 'कितने stars?', x: 760, y: 470, size: 140, color: RED, camera: 'stay'},
    {kind: 'doodle', at: {line: 'hook', word: 'stars'}, doodle: 'star', x: 1340, y: 420, size: 170, fill: '#f4b42a', draw: 0.7, camera: 'stay'},
    // Fact 1: photo sketched in, caption written under it, the caption underlined.
    {kind: 'image', at: {line: 'f1'}, src: 'shorts/om-shanti-om/stills/osho-srk-deepika.jpg', x: 800, y: 900, w: 1100, h: 660, focus: '50% 30%', camera: {x: 220, y: 540, w: 1160, h: 860}},
    {kind: 'write', at: {line: 'f1', word: 'Deepika'}, text: 'Deepika की पहली Hindi film', x: 800, y: 1340, size: 84, camera: 'stay'},
    {kind: 'underline', at: {line: 'f1', word: 'पहली'}, x1: 420, x2: 1180, y: 1370, color: RED, camera: 'stay'},
    // Fact 2: film reel for Karz, labelled, then an arrow up to the photo.
    {kind: 'doodle', at: {line: 'f2'}, doodle: 'reel', x: 480, y: 1680, size: 360, camera: {x: 180, y: 1440, w: 700, h: 620}},
    {kind: 'write', at: {line: 'f2', word: 'Karz'}, text: 'Karz (1980)', x: 480, y: 1960, size: 100, color: RED, camera: 'stay'},
    {kind: 'arrow', at: {line: 'f2', word: 'लिया'}, from: {x: 700, y: 1700}, to: {x: 1390, y: 1120}, bend: -0.3, camera: {x: 200, y: 560, w: 1200, h: 1440}},
    // Payoff: a crowd, the number, a marker circle around it.
    {kind: 'doodle', at: {line: 'payoff'}, doodle: 'crowd', x: 1050, y: 2160, size: 400, camera: {x: 600, y: 1930, w: 900, h: 760}},
    {kind: 'write', at: {line: 'payoff', word: '30'}, text: '30+ stars', x: 1050, y: 2560, size: 150, color: RED, draw: 0.8, camera: 'stay'},
    {kind: 'circle', at: {line: 'payoff', word: 'stars'}, x: 1050, y: 2510, rx: 360, ry: 130, camera: 'stay'},
    // Loop: pull back to the whole board.
    {kind: 'overview', at: {line: 'loop'}, move: 36},
  ],
};

export const component = whiteboard(board);
