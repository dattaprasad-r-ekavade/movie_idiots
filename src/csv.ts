// Minimal RFC 4180 CSV for docs/uploads.csv (quoted fields, embedded commas, quotes and newlines).

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') (field += '"'), i++;
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') row.push(field), (field = '');
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field), rows.push(row), (row = []), (field = '');
    } else field += ch;
  }
  if (field || row.length) row.push(field), rows.push(row);
  return rows;
}

const cell = (v: string) => (/[",\n\r]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** Serialises with a UTF-8 BOM (Excel opens Devanagari correctly) and LF line ends. */
export const stringifyCsv = (rows: string[][]) => '﻿' + rows.map((r) => r.map(cell).join(',')).join('\n') + '\n';
