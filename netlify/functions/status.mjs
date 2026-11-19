// Netlify Function: Status-/Ergebnis-Abfrage. Liest das Ergebnis aus Netlify Blobs
// und löscht es nach der Auslieferung, damit keine Antworten liegen bleiben.
// Aufruf: GET /.netlify/functions/status?id=<id>
// Antwort: { status: "pending" | "done" | "error", result?, error? }

import { getStore } from "@netlify/blobs";

const ID_PATTERN = /^[a-z0-9-]{8,64}$/i;

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

export default async (request) => {
  const id = new URL(request.url).searchParams.get("id") || "";
  if (!ID_PATTERN.test(id)) return json({ status: "error", error: "no id" }, 400);

  const store = getStore("zg-umfragen");
  let rec = null;
  try { rec = await store.get(id, { type: "json" }); } catch { /* noch nicht da */ }

  if (!rec) return json({ status: "pending" });
  await store.delete(id).catch(() => {});
  return json(rec);
};
