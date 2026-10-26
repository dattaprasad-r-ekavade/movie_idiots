// PreToolUse hook: refuse edits to secret files: .env (the ElevenLabs API key) and secrets/ (the
// YouTube OAuth client and token). .env.example stays editable. The upload command writes its own
// token at runtime; this only stops the editing tools.
import path from 'node:path';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const input = JSON.parse(raw || '{}');
const file = String(input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? '').replace(/\\/g, '/');
const name = path.basename(file);

const deny = (reason) => console.log(JSON.stringify({hookSpecificOutput: {hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason}}));

if (name === '.env' || (/^\.env\./.test(name) && name !== '.env.example')) {
  deny(`${name} holds secrets (ElevenLabs key). Edit it by hand, or change .env.example instead.`);
} else if (/(^|\/)secrets\//.test(file)) {
  deny(`${name} is in secrets/ (YouTube OAuth client or token). Replace it by hand; never edit or print it.`);
}
