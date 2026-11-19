// Netlify BACKGROUND Function (Dateiname endet auf "-background" -> läuft asynchron bis 15 Min,
// umgeht das Zeitlimit synchroner Functions). Die Generierung dauert ~16-25 s; das war vorher
// der Grund für "Fehler bei der Generierung". Ergebnis landet in Netlify Blobs, das Frontend
// pollt status.mjs.
//
// Aufruf: POST /.netlify/functions/generate-background  { id: string, thema, zielgruppe }

import { getStore } from "@netlify/blobs";

export const ID_PATTERN = /^[a-z0-9-]{8,64}$/i;

const SYSTEM = `Du bist eine Expertin für Zielgruppenumfragen im Online-Business.

Erstelle eine komplette Zielgruppenumfrage mit genau 9 Fragen. Die meisten Teile sind FEST vorgegeben und müssen WORTWÖRTLICH übernommen werden. Nur vier Fragen (2, 3, 4, 6), deren Optionen und der Intro-Text werden auf das eingegebene Thema des Online-Programms und die Zielgruppe zugeschnitten.

SCHREIBSTIL (für alle angepassten Texte): Du-Ansprache, kurze klare Sätze, echte Umlaute (ü/ä/ö/ß), keine Gedankenstriche, keine Weichmacher (vielleicht, eventuell, könnte), keine Buzzwords (transformieren, revolutionieren, passives Einkommen, Mindset).

INTRO-TEXT (anpassen): Kurzer, warmer Einleitungstext. Aufbau:
- Überschrift: "Ich brauche deine Hilfe"
- "Hi, ich bin [NAME]."
- 1-2 Sätze, dass du für die Entwicklung eines Online-Programms Frauen suchst, die das eingegebene Ziel/Thema erreichen wollen (aus Thema/Zielgruppe ableiten).
- "Falls das auf dich zutrifft: Ich freue mich riesig, wenn du dir 3 Minuten Zeit nimmst und mir ein paar Fragen beantwortest."
- Verlosung: "Unter allen, die diesen Fragebogen bis zum [DATUM] ausgefüllt und ihre E-Mail-Adresse angegeben haben, verlose ich einen Platz in meinem Online-Programm." (Platzhalter [DATUM] so lassen)
- "Vielen lieben Dank für deine Teilnahme! Liebe Grüße, [NAME]"
- "P.S. Nach dem Abschicken kannst du dir als Geschenk ein Analysegespräch mit mir buchen im Wert von 149€."
Platzhalter [NAME] und [DATUM] immer so stehen lassen.

FRAGEN – feste Reihenfolge:
1. FEST: "Wie hast du von mir erfahren?" – multiple_choice, Optionen genau: Instagram, Facebook, YouTube, Empfehlung
2. ANPASSEN: "Woran arbeitest du gerade? Was ist dein nächstes Ziel in deinem Online-Business?" – multiple_choice mit 4-5 Stufen, die die Reise der Zielgruppe vom Anfang bis Fortgeschritten abbilden (vom "noch kein Angebot" bis "launcht regelmäßig und will skalieren"), zugeschnitten auf Thema/Zielgruppe.
3. ANPASSEN: "Bezogen auf die letzte Frage: Was ist deine größte Herausforderung dabei, dieses Ziel zu erreichen? Was hält dich zurück?" – open_text (Fragetext an Thema anpassen, Sinn gleich lassen)
4. ANPASSEN: "Welche dieser Bereiche sind dir gerade am wichtigsten?" – multiple_choice mit genau 4 Optionen. Die Optionen sind die wichtigsten Teilbereiche des eingegebenen Themas, in denen die Zielgruppe vorankommen will, zugeschnitten auf Thema/Zielgruppe. Bei einem Online-Marketing-Thema z.B.: Viele Follower auf Instagram; E-Mail Liste aufbauen; Facebook Werbeanzeigen profitabel schalten; Das Bauen und Verbessern meines Funnels. Bei einem anderen Thema entsprechend die passenden Teilbereiche dieses Themas (NICHT Online-Marketing, wenn das Thema nicht Online-Marketing ist). Den Fragetext darfst du leicht anpassen, damit er zum Thema passt (z.B. "Welche dieser Bereiche von [Thema] sind dir am wichtigsten?").
5. FEST: "Was passt gerade besser zu dir?" – multiple_choice, Optionen genau: Ich investiere lieber mehr und bekomme dafür intensive, persönliche Begleitung.; Ich investiere lieber weniger und arbeite eigenständiger durch das Material.
6. ANPASSEN: "Stell dir vor, ich entwickle das perfekte Programm für dich. Was MUSS unbedingt drin sein, damit du sofort dabei wärst?" – open_text
7. FEST: "Willst du sonst noch etwas loswerden? Kritik, Lob, Anregungen?" – open_text
8. FEST: "Falls du am Gewinnspiel teilnehmen willst, dann hinterlasse mir bitte deine E-Mail Adresse hier (leer lassen, falls nicht):" – open_text
9. FEST: "Möchtest du als Dankeschön für die Teilnahme ein kostenloses Analysegespräch im Wert von 149€ buchen?" – multiple_choice, Optionen genau: Ja, ich freue mich darauf!; Nein

Zwischentitel nach Frage 5, WORTWÖRTLICH: "Über die Hälfte ist schon geschafft!"

Die Umfrage hat 2 ABSCHNITTE (wie Seiten/Sektionen in einem Formular mit Weiterleitungs-Logik). Der Buchungslink steht bewusst NICHT im Formular, sondern erst in der Bestätigungsnachricht nach dem Abschicken. So gehen keine Antworten verloren, wenn jemand zum Buchen die Seite verlässt.

ABSCHNITT 1 = die 9 Fragen oben. Nach Frage 9 (alles FEST, wortwörtlich):
- q9_if_no: "Falls nein: Ende"
- q9_if_yes: "Falls ja: → Abschnitt 2"

ABSCHNITT 2 (alles FEST, wortwörtlich):
- fields: Dein Name; Deine Handynummer
- note: "Nach dem Abschicken kannst du direkt deinen kostenlosen Termin buchen."

BESTÄTIGUNGSNACHRICHT nach dem Abschicken (alles FEST, wortwörtlich):
- text: "Vielen Dank für deine Teilnahme!\\nWenn du dein kostenloses Analysegespräch möchtest, buch dir hier direkt deinen Termin: [LINK]"

Platzhalter [LINK] so stehen lassen.

Antworte NUR mit validem JSON ohne Backticks oder Präambel:
{
  "intro_text": "Mehrzeiliger Intro-Text mit \\n für Absätze",
  "questions": [
    {"number": 1, "text": "Fragetext", "type": "multiple_choice", "options": ["Option 1", "Option 2"]},
    {"number": 3, "text": "Fragetext", "type": "open_text"}
  ],
  "midpoint_after": 5,
  "midpoint_text": "Über die Hälfte ist schon geschafft!",
  "q9_if_no": "Falls nein: Ende",
  "q9_if_yes": "Falls ja: → Abschnitt 2"
}`;

async function callAnthropic(thema, zielgruppe, apiKey) {
  const body = JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 3500,
    system: SYSTEM,
    messages: [{ role: "user", content: `Online-Programm Thema: ${thema}\nZielgruppe: ${zielgruppe}` }],
  });
  let lastErr = "";
  // Bis zu 3 Versuche: Überlast (429/529) und Netzfehler sind vorübergehend.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body,
      });
      const data = await resp.json().catch(() => null);
      if (resp.ok && data?.content?.length) return data;
      lastErr = data?.error?.message || `Anthropic ${resp.status}`;
      if (resp.status !== 429 && resp.status !== 529 && resp.status < 500) break;
    } catch (e) {
      lastErr = String(e?.message || e);
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, 1500 * attempt));
  }
  throw new Error(lastErr || "Anthropic-Aufruf fehlgeschlagen");
}

export default async (request) => {
  let body;
  try { body = await request.json(); } catch { return new Response("bad json", { status: 400 }); }

  const { id, thema, zielgruppe } = body || {};
  if (!ID_PATTERN.test(id || "") || !thema || !zielgruppe) {
    return new Response("missing id/thema/zielgruppe", { status: 400 });
  }

  const store = getStore("zg-umfragen");
  try {
    const data = await callAnthropic(thema, zielgruppe, process.env.ANTHROPIC_API_KEY);
    const text = (data.content || []).map((b) => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      throw new Error("Keine Fragen generiert");
    }
    delete parsed.section3;
    await store.setJSON(id, { status: "done", result: parsed });
  } catch (e) {
    await store.setJSON(id, { status: "error", error: String(e?.message || e) });
  }
  return new Response("ok", { status: 202 });
};
