import { getDatabase } from "@netlify/database";
import type { Config } from "@netlify/functions";

const POLL_KEY = "state-transfer-2026-10";
const ALLOWED_ORIGIN = "https://belaya-mgla-sova58.github.io";

function corsHeaders(origin: string | null) {
  const allow = origin === ALLOWED_ORIGIN ? origin : ALLOWED_ORIGIN;
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
    "Cache-Control": "no-store",
  };
}

async function totals() {
  const db = getDatabase();
  const rows = await db.sql<{ choice: string; count: string }>`
    SELECT choice, COUNT(*)::text AS count
    FROM poll_votes
    WHERE poll_key = ${POLL_KEY}
    GROUP BY choice
  `;
  let yes = 0;
  let no = 0;
  for (const row of rows) {
    if (row.choice === "yes") yes = Number(row.count) || 0;
    if (row.choice === "no") no = Number(row.count) || 0;
  }
  const total = yes + no;
  return {
    yes,
    no,
    total,
    yesPercent: total ? Math.round((yes / total) * 100) : 0,
    noPercent: total ? Math.round((no / total) * 100) : 0,
  };
}

export default async (req: Request) => {
  const origin = req.headers.get("origin");
  const headers = corsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  if (req.method === "GET") {
    return Response.json(await totals(), { headers });
  }

  if (req.method !== "POST") {
    return Response.json({ error: "method_not_allowed" }, { status: 405, headers });
  }

  let body: { choice?: string; voterToken?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400, headers });
  }

  const choice = body.choice === "yes" || body.choice === "no" ? body.choice : null;
  const voterToken = typeof body.voterToken === "string" ? body.voterToken.trim() : "";

  if (!choice || !/^[a-zA-Z0-9_-]{16,100}$/.test(voterToken)) {
    return Response.json({ error: "invalid_vote" }, { status: 400, headers });
  }

  const db = getDatabase();
  const inserted = await db.sql<{ choice: string }>`
    INSERT INTO poll_votes (poll_key, voter_token, choice)
    VALUES (${POLL_KEY}, ${voterToken}, ${choice})
    ON CONFLICT (poll_key, voter_token) DO NOTHING
    RETURNING choice
  `;

  const result = await totals();
  if (!inserted.length) {
    return Response.json({ ok: false, alreadyVoted: true, ...result }, { status: 409, headers });
  }

  return Response.json({ ok: true, alreadyVoted: false, choice, ...result }, { status: 201, headers });
};

export const config: Config = {
  path: "/api/poll",
  method: ["GET", "POST", "OPTIONS"],
  rateLimit: {
    action: "rate_limit",
    aggregateBy: "ip",
    windowSize: 60,
    windowLimit: 30,
  },
};
