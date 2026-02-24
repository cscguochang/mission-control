#!/usr/bin/env node
/**
 * Push a run record to Convex HTTP action (/runs).
 * Usage:
 *  node tools/mission-control-push-run.js --site https://xxx.convex.site --token devtoken --kind sessions_spawn --role Dev --title "..." --status Running --input "..." --parentSessionKey ...
 */

const args = process.argv.slice(2);
function get(flag, def = undefined) {
  const i = args.indexOf(flag);
  if (i === -1) return def;
  return args[i + 1];
}

const site = get('--site');
const token = get('--token');
if (!site || !token) {
  console.error('Missing --site or --token');
  process.exit(2);
}

const payload = {
  kind: get('--kind', 'manual'),
  role: get('--role', 'Ops'),
  title: get('--title', 'run'),
  status: get('--status', 'Running'),
  parentSessionKey: get('--parentSessionKey'),
  childSessionKey: get('--childSessionKey'),
  runId: get('--runId'),
  input: get('--input'),
  output: get('--output'),
  error: get('--error'),
};

// remove undefined
for (const k of Object.keys(payload)) if (payload[k] === undefined) delete payload[k];

const url = new URL('/runs', site);

(async () => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error('HTTP', res.status, text);
    process.exit(1);
  }
  process.stdout.write(text);
})();
