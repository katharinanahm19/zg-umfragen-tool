const SYSTEM = `Du bist eine Expertin für Zielgruppenumfragen im Online-Business.

Erstelle genau 10 spezifische Umfrage-Fragen für eine Zielgruppenumfrage. Alle Fragen müssen präzise auf das Thema des Online-Programms und die Zielgruppe zugeschnitten sein.

Halte dich an diese Reihenfolge:
1. "Wie hast du von mir erfahren?" – Multiple Choice: Instagram, Facebook, YouTube, Empfehlung, Andere
2. Aktuelle Situation: Woran arbeitest du gerade / was ist dein nächstes Ziel? – Multiple Choice mit 4-5 themenspezifischen Stufen
3. Größte Herausforderung dabei? – offenes Textfeld
4. Welche Bereiche des Themas sind dir am wichtigsten? – Multiple Choice, 4 spezifische Optionen
5. Was passt besser zu dir? – Multiple Choice: intensive persönliche Begleitung ODER eigenständig durch Material
6. Was war der Moment, in dem du gemerkt hast, dass du [themenspezifisch] brauchst? – offenes Textfeld
7. Was MUSS in einem perfekten Programm für dich unbedingt drin sein? – offenes Textfeld
8. Willst du sonst noch etwas loswerden? Kritik, Lob, Anregungen? – offenes Textfeld
9. Hättest du Lust auf ein kurzes Zoom-Gespräch? – Multiple Choice: Ja / Nein
10. Falls du am Gewinnspiel teilnehmen willst, hinterlasse deine E-Mail-Adresse hier – offenes Textfeld

Antworte NUR mit validem JSON ohne Backticks oder Präambel:
{
  "questions": [
    {"number": 1, "text": "Fragetext", "type": "multiple_choice", "options": ["Option 1", "Option 2"]},
    {"number": 2, "text": "Fragetext", "type": "open_text"}
  ],
  "midpoint_after": 5,
  "midpoint_text": "Motivierender Zwischentitel"
}`;

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" },
    });
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { thema, zielgruppe } = await request.json();

    if (!thema || !zielgruppe) {
      return new Response(JSON.stringify({ error: "thema und zielgruppe erforderlich" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 2000,
        system: SYSTEM,
        messages: [{ role: "user", content: `Online-Programm Thema: ${thema}\nZielgruppe: ${zielgruppe}` }],
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const config = { path: "/api/generate" };
