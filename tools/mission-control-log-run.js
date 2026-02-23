#!/usr/bin/env node

// Log a run record into Mission Control (Convex local HTTP actions).
// Usage:
//   MISSION_CONTROL_SITE_URL=http://127.0.0.1:3211 \
//   MISSION_CONTROL_TOKEN=devtoken \
//   node tools/mission-control-log-run.js '{"kind":"sessions_spawn",...}'

const site = process.env.MISSION_CONTROL_SITE_URL || process.env.NEXT_PUBLIC_CONVEX_SITE_URL || "http://127.0.0.1:3211";
const token = process.env.MISSION_CONTROL_TOKEN || "devtoken";

async function main() {
  const payloadStr = process.argv[2];
  if (!payloadStr) {
    console.error("Missing JSON payload arg");
    process.exit(2);
  }
  let payload;
  try {
    payload = JSON.parse(payloadStr);
  } catch (e) {
    console.error("Invalid JSON payload:", e.message);
    process.exit(2);
  }

  const url = new URL("/runs", site).toString();
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("HTTP", res.status, text);
    process.exit(1);
  }
  console.log(text);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
