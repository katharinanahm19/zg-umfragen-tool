import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const C = {
  dunkelgruen: "#1a4535",
  hellgruen: "#4e9c61",
  altrosa: "#bd8892",
  hellrosa: "#e5cfd3",
  beige: "#fef4ee",
  white: "#ffffff",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: ${C.beige}; }

  .wrap {
    font-family: 'Montserrat', sans-serif;
    background: ${C.beige};
    min-height: 100vh;
  }

  .topbar {
    background: ${C.dunkelgruen};
    padding: 20px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .topbar-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${C.beige};
    letter-spacing: 2px;
    text-transform: uppercase;
  }
  .topbar-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${C.hellrosa};
    border: 1px solid ${C.hellrosa}44;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .body { padding: 36px 32px; max-width: 680px; margin: 0 auto; }

  .intro { margin-bottom: 28px; }
  .intro-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${C.altrosa};
    margin-bottom: 8px;
  }
  .intro-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: ${C.dunkelgruen};
    line-height: 1.3;
    margin-bottom: 10px;
  }
  .intro-sub {
    font-size: 13px;
    color: #555;
    line-height: 1.7;
    font-weight: 400;
  }

  .form-card {
    background: ${C.white};
    border-radius: 12px;
    padding: 28px;
    margin-bottom: 16px;
    border: 1px solid ${C.hellrosa}66;
  }

  .field { margin-bottom: 22px; }
  .field:last-child { margin-bottom: 0; }
  .field-label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${C.dunkelgruen};
    margin-bottom: 6px;
  }
  .field-hint {
    font-size: 12px;
    color: #888;
    margin-bottom: 8px;
    line-height: 1.5;
  }
  .field input, .field textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1.5px solid ${C.hellrosa};
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    color: #333;
    background: ${C.beige}88;
    outline: none;
    transition: border-color 0.2s;
    resize: vertical;
  }
  .field input:focus, .field textarea:focus {
    border-color: ${C.altrosa};
    background: ${C.white};
  }
  .field input::placeholder, .field textarea::placeholder { color: #bbb; }

  .btn-gen {
    width: 100%;
    background: ${C.hellgruen};
    color: ${C.white};
    border: none;
    padding: 15px 24px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .btn-gen:hover { background: #3d865b; }
  .btn-gen:disabled { background: #9ecfb0; cursor: not-allowed; }

  .error {
    font-size: 12px;
    color: #c0392b;
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .loading {
    text-align: center;
    padding: 48px 24px;
    background: ${C.white};
    border-radius: 12px;
    border: 1px solid ${C.hellrosa}66;
  }
  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid ${C.hellrosa};
    border-top-color: ${C.altrosa};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 16px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: ${C.dunkelgruen};
    margin-bottom: 6px;
  }
  .loading-sub { font-size: 12px; color: #888; }

  .result-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 12px;
  }
  .result-title {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 700;
    color: ${C.dunkelgruen};
  }
  .result-meta { font-size: 11px; color: #888; margin-top: 3px; }

  .export-row {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
    align-items: center;
  }
  .export-divider {
    width: 1px;
    height: 24px;
    background: ${C.hellrosa};
    margin: 0 2px;
  }

  .btn-copy {
    background: ${C.dunkelgruen};
    color: ${C.white};
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: background 0.2s;
  }
  .btn-copy:hover { background: #122e24; }
  .btn-copy.done { background: ${C.hellgruen}; }

  .btn-pdf {
    background: transparent;
    color: ${C.dunkelgruen};
    border: 1.5px solid ${C.dunkelgruen};
    padding: 10px 18px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.2s;
  }
  .btn-pdf:hover { background: ${C.dunkelgruen}; color: ${C.white}; }

  .btn-gdoc {
    background: ${C.altrosa};
    color: ${C.white};
    border: none;
    padding: 10px 18px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: background 0.2s;
  }
  .btn-gdoc:hover { background: #a8737d; }

  .btn-reset {
    background: transparent;
    color: ${C.dunkelgruen};
    border: 1.5px solid ${C.hellrosa};
    padding: 10px 18px;
    border-radius: 8px;
    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .btn-reset:hover { border-color: ${C.altrosa}; background: ${C.hellrosa}33; }

  .gdoc-notice {
    font-size: 12px;
    color: ${C.dunkelgruen};
    background: ${C.hellrosa}55;
    border: 1px solid ${C.hellrosa};
    border-radius: 8px;
    padding: 10px 14px;
    margin-bottom: 16px;
  }

  .q-list { display: flex; flex-direction: column; gap: 10px; }

  .q-card {
    background: ${C.white};
    border-radius: 10px;
    padding: 18px 20px;
    border: 1px solid ${C.hellrosa}66;
    border-left: 3px solid ${C.altrosa};
  }

  .q-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }
  .q-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: ${C.dunkelgruen};
    color: ${C.white};
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .q-text {
    font-size: 14px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.5;
    flex: 1;
  }

  .q-type-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 20px;
    margin-bottom: 10px;
  }
  .badge-mc { background: #eef6f1; color: #2d7a4f; }
  .badge-open { background: #f5eef0; color: #9b5f6a; }

  .q-options { list-style: none; display: flex; flex-direction: column; gap: 5px; }
  .q-options li {
    display: flex;
    align-items: center;
    gap: 9px;
    font-size: 13px;
    color: #444;
  }
  .q-radio {
    width: 14px;
    height: 14px;
    border: 1.5px solid ${C.altrosa};
    border-radius: 50%;
    flex-shrink: 0;
  }

  .q-textfield {
    background: ${C.beige};
    border: 1px dashed ${C.hellrosa};
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 12px;
    color: #aaa;
    font-style: italic;
  }

  .divider {
    text-align: center;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: ${C.altrosa};
    padding: 12px 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${C.hellrosa};
  }

  .footer {
    text-align: center;
    padding: 32px 0 16px;
    font-size: 11px;
    color: #bbb;
    letter-spacing: 0.5px;
  }

  @media (max-width: 520px) {
    .topbar { padding: 16px 20px; }
    .body { padding: 24px 16px; }
    .intro-title { font-size: 22px; }
    .export-row { gap: 8px; }
  }
`;

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

export default function App() {
  const [step, setStep] = useState("form");
  const [thema, setThema] = useState("");
  const [zielgruppe, setZielgruppe] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [gdocNotice, setGdocNotice] = useState(false);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    document.head.appendChild(s);
  }, []);

  const generate = async () => {
    if (!thema.trim() || !zielgruppe.trim()) {
      setErr("Bitte fülle beide Felder aus.");
      return;
    }
    if (!API_KEY) {
      setErr("API-Key fehlt. Bitte VITE_ANTHROPIC_API_KEY in .env eintragen.");
      return;
    }
    setErr("");
    setStep("loading");

    const msg = `Online-Programm Thema: ${thema}\nZielgruppe: ${zielgruppe}`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-calls": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: SYSTEM,
          messages: [{ role: "user", content: msg }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      if (!data.content?.length) throw new Error("Leere Antwort");
      const raw = data.content.map(b => b.text || "").join("");
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      if (!parsed.questions?.length) throw new Error("Keine Fragen generiert");
      setResult(parsed);
      setStep("result");
    } catch (e) {
      setErr("Fehler bei der Generierung. Bitte erneut versuchen.");
      setStep("form");
    }
  };

  const toPlainText = () => {
    if (!result) return "";
    let t = "";
    result.questions.forEach(q => {
      if (q.number === result.midpoint_after + 1) t += `\n${result.midpoint_text}\n\n`;
      t += `Frage ${q.number}: ${q.text}\n`;
      if (q.type === "multiple_choice") q.options?.forEach(o => (t += `* ${o}\n`));
      else t += "TEXTFELD\n";
      t += "\n";
    });
    return t.trim();
  };

  const doCopy = () => {
    navigator.clipboard.writeText(toPlainText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const exportPDF = () => {
    const jspdf = window.jspdf;
    if (!jspdf) return;
    const { jsPDF } = jspdf;
    const doc = new jsPDF();
    const margin = 20;
    const cw = 170;
    let y = margin;

    const txt = (text, x, size, style = "normal", rgb = [40, 40, 40]) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", style);
      doc.setTextColor(...rgb);
      const lines = doc.splitTextToSize(String(text), cw - (x - margin));
      if (y + lines.length * size * 0.38 > 282) { doc.addPage(); y = margin; }
      doc.text(lines, x, y);
      y += lines.length * size * 0.38 + 1.5;
    };

    txt("Zielgruppenumfrage", margin, 20, "bold", [26, 69, 53]);
    y += 1;
    txt(thema, margin, 9, "normal", [120, 120, 120]);
    y += 4;
    doc.setDrawColor(189, 136, 146);
    doc.setLineWidth(0.5);
    doc.line(margin, y, 190, y);
    y += 7;

    result.questions?.forEach(q => {
      if (q.number === result.midpoint_after + 1) {
        y += 3;
        doc.setDrawColor(229, 207, 211);
        doc.line(margin, y, 190, y);
        y += 5;
        txt(result.midpoint_text, margin, 9, "bold", [189, 136, 146]);
        y += 4;
      }
      txt(`Frage ${q.number}: ${q.text}`, margin, 11, "bold", [26, 26, 26]);
      y += 1;
      if (q.type === "multiple_choice" && q.options) {
        q.options.forEach(o => txt(`\u25A1  ${o}`, margin + 5, 10, "normal", [80, 80, 80]));
      } else {
        doc.setFillColor(254, 244, 238);
        doc.setDrawColor(229, 207, 211);
        if (y + 14 > 282) { doc.addPage(); y = margin; }
        doc.rect(margin, y, cw, 14, "FD");
        y += 17;
      }
      y += 4;
    });

    doc.save("umfrage-fragen.pdf");
  };

  const openGoogleDoc = () => {
    navigator.clipboard.writeText(toPlainText()).catch(() => {});
    window.open("https://docs.google.com/document/create", "_blank");
    setGdocNotice(true);
    setTimeout(() => setGdocNotice(false), 6000);
  };

  const reset = () => { setResult(null); setStep("form"); setErr(""); setGdocNotice(false); };

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="topbar">
          <div className="topbar-title">Umfrage-Generator</div>
          <div className="topbar-badge">Launch Sisters</div>
        </div>

        <div className="body">
          {step === "form" && (
            <>
              <div className="intro">
                <div className="intro-label">Zielgruppenumfragen</div>
                <div className="intro-title">Deine Umfrage-Fragen in Sekunden</div>
                <div className="intro-sub">Gib Thema und Zielgruppe ein. Du bekommst 10 fertige Fragen für deine Zielgruppenumfrage.</div>
              </div>

              <div className="form-card">
                <div className="field">
                  <label className="field-label">Thema deines Online-Programms</label>
                  <div className="field-hint">Worum geht es in dem Programm, das du entwickeln willst?</div>
                  <textarea
                    rows={3}
                    placeholder="z.B. Ich will ein Online-Programm entwickeln, das Ernährungsberaterinnen hilft, ihren ersten Gruppenworkshop zu erstellen und zu verkaufen"
                    value={thema}
                    onChange={e => setThema(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label className="field-label">Deine Zielgruppe</label>
                  <div className="field-hint">Wer soll die Umfrage ausfüllen?</div>
                  <textarea
                    rows={2}
                    placeholder="z.B. Selbstständige Ernährungsberaterinnen, die aktuell nur 1:1 arbeiten und skalieren wollen"
                    value={zielgruppe}
                    onChange={e => setZielgruppe(e.target.value)}
                  />
                </div>
                {err && <div className="error">⚠ {err}</div>}
              </div>

              <button className="btn-gen" onClick={generate}>
                Fragen generieren →
              </button>
            </>
          )}

          {step === "loading" && (
            <div className="loading">
              <div className="spinner" />
              <div className="loading-title">Fragen werden erstellt...</div>
              <div className="loading-sub">Einen Moment bitte</div>
            </div>
          )}

          {step === "result" && result && (
            <>
              <div className="result-header">
                <div>
                  <div className="result-title">Deine 10 Umfrage-Fragen</div>
                  <div className="result-meta">Thema: {thema.slice(0, 60)}{thema.length > 60 ? "…" : ""}</div>
                </div>
                <button className="btn-reset" onClick={reset}>↩ Neu erstellen</button>
              </div>

              {gdocNotice && (
                <div className="gdoc-notice">
                  ✓ Text kopiert. Google Doc wurde geöffnet. Füge den Text mit Strg+V (Mac: Cmd+V) ein.
                </div>
              )}

              <div className="export-row">
                <button className={`btn-copy${copied ? " done" : ""}`} onClick={doCopy}>
                  {copied ? "✓ Kopiert" : "↓ Text kopieren"}
                </button>
                <button className="btn-pdf" onClick={exportPDF}>↓ Als PDF</button>
                <div className="export-divider" />
                <button className="btn-gdoc" onClick={openGoogleDoc}>Google Doc erstellen ↗</button>
              </div>

              <div className="q-list">
                {result.questions?.map((q) => (
                  <div key={q.number}>
                    {q.number === result.midpoint_after + 1 && (
                      <div className="divider">{result.midpoint_text}</div>
                    )}
                    <div className="q-card">
                      <div className="q-top">
                        <div className="q-num">{q.number}</div>
                        <div className="q-text">{q.text}</div>
                      </div>
                      <div className={`q-type-badge ${q.type === "multiple_choice" ? "badge-mc" : "badge-open"}`}>
                        {q.type === "multiple_choice" ? "Multiple Choice" : "Offenes Textfeld"}
                      </div>
                      {q.type === "multiple_choice" && q.options && (
                        <ul className="q-options">
                          {q.options.map((o, i) => (
                            <li key={i}><div className="q-radio" /> {o}</li>
                          ))}
                        </ul>
                      )}
                      {q.type === "open_text" && (
                        <div className="q-textfield">Freie Antwort der Teilnehmerin</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="footer">Launch Sisters · Nahm Consulting GmbH</div>
        </div>
      </div>
    </>
  );
}
