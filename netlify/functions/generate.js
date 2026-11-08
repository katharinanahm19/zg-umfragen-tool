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
  "q9_if_yes": "Falls ja: → Abschnitt 2",
  "section2": {
    "fields": ["Dein Name", "Deine Handynummer"],
    "note": "Nach dem Abschicken kannst du direkt deinen kostenlosen Termin buchen."
  },
  "confirmation": {
    "text": "Vielen Dank für deine Teilnahme!\\nWenn du dein kostenloses Analysegespräch möchtest, buch dir hier direkt deinen Termin: [LINK]"
  }
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
        max_tokens: 3500,
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
