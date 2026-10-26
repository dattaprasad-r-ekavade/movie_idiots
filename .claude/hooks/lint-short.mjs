// PostToolUse hook: after an edit to src/collage/shorts/<slug>/script.ts, run the Short's lint
// (`npm run short -- lint <slug>`) and feed the result back to Claude.
// Errors → exit 2 (stderr goes to Claude); warnings → additionalContext; clean → silent.
import {spawnSync} from 'node:child_process';
import path from 'node:path';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const input = JSON.parse(raw || '{}');
const file = String(input.tool_input?.file_path ?? input.tool_response?.filePath ?? '').replace(/\\/g, '/');
// Finished Shorts live under shorts/archive/<slug>/; their slugs are unchanged.
const match = file.match(/src\/collage\/shorts\/(?:archive\/)?([^/]+)\/script\.ts$/);
if (!match || match[1] === 'fun-facts-template') process.exit(0);

const slug = match[1];
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const tsx = path.join(root, 'node_modules', 'tsx', 'dist', 'cli.mjs');
const run = spawnSync(process.execPath, [tsx, 'scripts/short.ts', 'lint', slug], {cwd: root, encoding: 'utf8', timeout: 60000});
const out = `${run.stdout ?? ''}${run.stderr ?? ''}`.trim();

if (run.status !== 0) {
  process.stderr.write(`npm run short -- lint ${slug} failed:\n${out}\n`);
  process.exit(2);
}
const warnings = out.split('\n').filter((l) => l.startsWith('WARN'));
if (warnings.length) {
  console.log(JSON.stringify({hookSpecificOutput: {hookEventName: 'PostToolUse', additionalContext: `Lint warnings for ${slug}:\n${warnings.join('\n')}`}}));
}
