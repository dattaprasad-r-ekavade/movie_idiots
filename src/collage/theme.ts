import {continueRender, delayRender, staticFile} from 'remotion';

// Paper-collage palette: warm stock, ink, and a few loud accents used sparingly.
export const C = {
  cream: '#f3e7cf',
  kraft: '#d9b98a',
  ink: '#1d1a17',
  inkSoft: '#3a332c',
  red: '#d6392f',
  marigold: '#f4b42a',
  teal: '#1f6f6b',
  indigo: '#26355d',
  white: '#fffaf0',
  gold: '#e5b23a',
  skin: '#c98b5e',
  night: '#14151c',
};

export const FONT = {
  display: '"Rozha One", serif',
  body: '"Mukta", sans-serif',
  hand: '"Kalam", cursive',
  type: '"Special Elite", "Mukta", monospace',
};

// Load self-hosted fonts once per page; rendering waits until every face is ready.
if (typeof document !== 'undefined' && !document.getElementById('collage-fonts')) {
  const handle = delayRender('Loading collage fonts');
  const link = document.createElement('link');
  link.id = 'collage-fonts';
  link.rel = 'stylesheet';
  link.href = staticFile('fonts/fonts.css');
  const faces = ['400 40px "Rozha One"', '500 40px Mukta', '800 40px Mukta', '700 40px Kalam', '400 40px "Special Elite"'];
  link.onload = () =>
    Promise.all(faces.flatMap((face) => [document.fonts.load(face, 'अआ क'), document.fonts.load(face, 'Aa')]))
      .then(() => continueRender(handle))
      .catch((e) => {
        console.error(e);
        continueRender(handle);
      });
  link.onerror = () => continueRender(handle);
  document.head.appendChild(link);
}
