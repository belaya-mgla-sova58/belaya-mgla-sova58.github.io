import { getStore } from "@netlify/blobs";
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

function getVotesStore() {
  return getStore({ name: "poll-votes", consistency: "strong" });
}

async function totals() {
  const store = getVotesStore();
  const { blobs } = await store.list({ prefix: `${POLL_KEY}/` });
  let yes = 0;
  let no = 0;

  const values = await Promise.all(
    blobs.map(async ({ key }) => {
      return await store.get(key, { type: "json", consistency: "strong" }) as { choice?: string } | null;
    })
  );

  for (const value of values) {
    if (value?.choice === "yes") yes += 1;
    if (value?.choice === "no") no += 1;
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
    try {
      return Response.json(await totals(), { headers });
    } catch (error) {
      console.error("poll totals error", error);
      return Response.json({ error: "storage_unavailable" }, { status: 503, headers });
    }
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

  try {
    const store = getVotesStore();
    const key = `${POLL_KEY}/${voterToken}`;
    const { modified } = await store.setJSON(
      key,
      { choice, createdAt: new Date().toISOString() },
      { onlyIfNew: true }
    );

    const result = await totals();
    if (!modified) {
      return Response.json({ ok: false, alreadyVoted: true, ...result }, { status: 409, headers });
    }

    return Response.json({ ok: true, alreadyVoted: false, choice, ...result }, { status: 201, headers });
  } catch (error) {
    console.error("poll vote error", error);
    return Response.json({ error: "storage_unavailable" }, { status: 503, headers });
  }
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
