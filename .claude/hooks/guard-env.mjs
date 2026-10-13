// PreToolUse hook: refuse edits to .env files (they hold the ElevenLabs API key).
// .env.example stays editable.
import path from 'node:path';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
const input = JSON.parse(raw || '{}');
const file = String(input.tool_input?.file_path ?? input.tool_input?.notebook_path ?? '');
const name = path.basename(file.replace(/\\/g, '/'));

if (name === '.env' || (/^\.env\./.test(name) && name !== '.env.example')) {
  console.log(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: `${name} holds secrets (ElevenLabs key). Edit it by hand, or change .env.example instead.`,
    },
  }));
}
