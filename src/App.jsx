import { useState, useEffect } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const CHECKLIST_GREEN = [
  "Instagram Story mit Umfragelink",
  "Instagram Post",
  "Instagram Bio",
  "WhatsApp Status und Direktnachrichten",
  "Facebook Gruppen (thematisch passend)",
  'Facebook Profil: \u201eIch arbeite an etwas Neuem und brauche kurz deine Hilfe\u2026\u201c',
  'Im persönlichen Umfeld gezielt fragen (\u201eKennst du jemanden, der\u2026\u201c)',
  "DMs an Follower bei Insta/LinkedIn/Facebook",
  "Circle (Launch Sisters)",
];

const CHECKLIST_YELLOW = [
  "Newsletter (falls schon vorhanden)",
  "Umfrage über das Freebie einbinden",
  "Einbindung auf der eigenen Website (Pop-Up, Sidebar, Blogartikel etc.)",
  "Podcast Interviews",
  "Netzwerk-Events",
  "Nachrichten bei LinkedIn",
  "Kooperationen",
  "Bestehende Kundinnen bitten, die Umfrage in ihrem Netzwerk zu teilen",
];

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
  .intro-box {
    background: ${C.beige};
    border: 1px solid #e8d4d8;
    border-radius: 12px;
    padding: 18px 20px;
    margin-bottom: 20px;
  }
  .intro-box p { font-size: 13px; line-height: 1.55; color: #444; margin: 0 0 6px; }
  .intro-box p:first-child { font-weight: 700; color: ${C.dunkelgruen}; font-size: 15px; }
  .booking-box {
    margin-top: 22px;
    padding-top: 20px;
    border-top: 1.5px dashed ${C.altrosa};
  }
  .booking-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: ${C.altrosa};
    margin-bottom: 12px;
  }
  .booking-cond { font-size: 12px; font-style: italic; color: #999; margin: 10px 0 6px; }
  .booking-heading { font-size: 14px; font-weight: 700; color: ${C.dunkelgruen}; margin-bottom: 10px; }
  .section-label {
    display: inline-block;
    background: ${C.dunkelgruen};
    color: ${C.beige};
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 5px 12px;
    border-radius: 6px;
    margin: 4px 0 14px;
  }
  .section-block { margin-top: 24px; padding-top: 18px; border-top: 1.5px dashed ${C.altrosa}; }
  .branch-note {
    font-size: 12px;
    font-style: italic;
    color: #999;
    margin: 10px 0 4px;
    padding-left: 2px;
  }
  .branch-note div { margin: 2px 0; }

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

  .cl-section {
    margin-top: 28px;
    background: ${C.white};
    border-radius: 12px;
    border: 1px solid ${C.hellrosa}66;
    overflow: hidden;
  }
  .cl-header {
    background: ${C.dunkelgruen};
    padding: 14px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .cl-header-title {
    font-size: 13px;
    font-weight: 700;
    color: ${C.beige};
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .cl-header-sub {
    font-size: 11px;
    color: ${C.hellrosa};
    letter-spacing: 0.5px;
  }
  .cl-body { padding: 20px; }
  .cl-group { margin-bottom: 20px; }
  .cl-group:last-child { margin-bottom: 0; }
  .cl-group-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .cl-group-label.green { color: #2d7a4f; }
  .cl-group-label.yellow { color: #b08000; }
  .cl-group-label::after { content: ''; flex: 1; height: 1px; background: ${C.hellrosa}; }
  .cl-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 7px 0;
    cursor: pointer;
    border-radius: 6px;
    transition: background 0.15s;
    user-select: none;
  }
  .cl-item:hover { background: ${C.beige}; padding-left: 6px; margin-left: -6px; }
  .cl-box {
    width: 18px;
    height: 18px;
    border-radius: 4px;
    flex-shrink: 0;
    margin-top: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    transition: all 0.15s;
  }
  .cl-box.green-box { border: 2px solid #4e9c61; color: ${C.white}; }
  .cl-box.green-box.checked { background: #4e9c61; }
  .cl-box.yellow-box { border: 2px solid #c9a227; color: ${C.white}; }
  .cl-box.yellow-box.checked { background: #c9a227; }
  .cl-text {
    font-size: 13px;
    color: #444;
    line-height: 1.5;
    transition: all 0.15s;
  }
  .cl-text.checked { text-decoration: line-through; color: #aaa; }
  .cl-progress {
    font-size: 11px;
    color: ${C.hellgruen};
    font-weight: 700;
  }

  @media (max-width: 520px) {
    .topbar { padding: 16px 20px; }
    .body { padding: 24px 16px; }
    .intro-title { font-size: 22px; }
    .export-row { gap: 8px; }
  }
`;

export default function App() {
  const [step, setStep] = useState("form");
  const [thema, setThema] = useState("");
  const [zielgruppe, setZielgruppe] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState({});
  const [gdocLoading, setGdocLoading] = useState(false);
  const [gdocNotice, setGdocNotice] = useState("");

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
    setErr("");
    setStep("loading");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thema, zielgruppe }),
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
    if (result.intro_text) t += `${result.intro_text}\n\n==========\n\n`;
    t += `ABSCHNITT 1\n\n`;
    result.questions.forEach(q => {
      if (q.number === result.midpoint_after + 1) t += `\n${result.midpoint_text}\n\n`;
      t += `Frage ${q.number}: ${q.text}\n`;
      if (q.type === "multiple_choice") q.options?.forEach(o => (t += `* ${o}\n`));
      else t += "TEXTFELD\n";
      t += "\n";
    });
    if (result.q9_if_no) t += `${result.q9_if_no}\n`;
    if (result.q9_if_yes) t += `${result.q9_if_yes}\n`;
    const s2 = result.section2;
    if (s2) {
      t += `\n==========\n\nABSCHNITT 2\n\n`;
      if (s2.heading) t += `${s2.heading}\n\n`;
      if (s2.confirm_question) t += `${s2.confirm_question}\n`;
      s2.confirm_options?.forEach(o => (t += `* ${o}\n`));
      if (s2.if_yes) t += `\n${s2.if_yes}\n`;
      if (s2.if_no) t += `${s2.if_no}\n`;
    }
    const s3 = result.section3;
    if (s3) {
      t += `\n==========\n\nABSCHNITT 3\n\n`;
      if (s3.intro) t += `${s3.intro}\n\n`;
      s3.fields?.forEach(f => (t += `${f}: TEXTFELD\n`));
    }
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
    const pageW = 210;
    const margin = 20;
    const cw = pageW - margin * 2;
    let y = 0;

    const checkPage = (needed = 10) => {
      if (y + needed > 280) { doc.addPage(); y = margin; }
    };

    const addText = (text, x, size, style, rgb, maxW) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", style || "normal");
      doc.setTextColor(...rgb);
      const lines = doc.splitTextToSize(String(text), maxW || (cw - (x - margin)));
      checkPage(lines.length * size * 0.42);
      doc.text(lines, x, y);
      y += lines.length * size * 0.42 + 1;
    };

    // Header bar
    doc.setFillColor(26, 69, 53);
    doc.rect(0, 0, pageW, 34, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(254, 244, 238);
    doc.text("Zielgruppenumfrage", margin, 14);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(229, 207, 211);
    const themaLines = doc.splitTextToSize(thema, cw - 10);
    doc.text(themaLines, margin, 23);

    y = 44;

    // Separator
    doc.setDrawColor(189, 136, 146);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    // Intro text
    if (result.intro_text) {
      String(result.intro_text).split("\n").forEach(line => {
        if (!line.trim()) { y += 2.5; return; }
        addText(line, margin, 10, "normal", [70, 70, 70]);
      });
      y += 4;
      doc.setDrawColor(229, 207, 211);
      doc.setLineWidth(0.3);
      doc.line(margin, y, pageW - margin, y);
      y += 8;
    }

    const sectionBar = (label) => {
      y += 7;
      checkPage(14);
      doc.setFillColor(26, 69, 53);
      doc.roundedRect(margin, y - 4, cw, 7, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text(label, margin + 4, y + 1);
      y += 12;
    };

    sectionBar("ABSCHNITT 1");

    result.questions?.forEach(q => {
      // Midpoint
      if (q.number === result.midpoint_after + 1) {
        y += 3;
        checkPage(16);
        doc.setDrawColor(229, 207, 211);
        doc.setLineWidth(0.3);
        doc.line(margin, y, pageW - margin, y);
        y += 6;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(189, 136, 146);
        const mw = doc.getTextWidth(result.midpoint_text);
        doc.text(result.midpoint_text, (pageW - mw) / 2, y);
        y += 9;
      }

      checkPage(20);

      // Number badge
      doc.setFillColor(26, 69, 53);
      doc.roundedRect(margin, y - 4.5, 7, 5.5, 0.8, 0.8, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(254, 244, 238);
      doc.text(String(q.number), margin + 3.5, y - 0.3, { align: "center" });

      // Question text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(26, 26, 26);
      const qLines = doc.splitTextToSize(q.text, cw - 12);
      checkPage(qLines.length * 4.8 + 4);
      doc.text(qLines, margin + 10, y);
      y += qLines.length * 4.8 + 3;

      if (q.type === "multiple_choice" && q.options) {
        q.options.forEach(opt => {
          checkPage(8);
          // Drawn circle instead of Unicode
          doc.setDrawColor(189, 136, 146);
          doc.setLineWidth(0.5);
          doc.circle(margin + 3.5, y - 1.5, 2, "S");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(70, 70, 70);
          const optLines = doc.splitTextToSize(opt, cw - 14);
          doc.text(optLines, margin + 8, y);
          y += optLines.length * 4.2 + 2;
        });
      } else {
        checkPage(16);
        doc.setFillColor(254, 244, 238);
        doc.setDrawColor(222, 200, 204);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, y, cw, 13, 1, 1, "FD");
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(190, 190, 190);
        doc.text("Freie Antwort", margin + 5, y + 7.5);
        y += 16;
      }
      y += 5;
    });

    // Abschnitt 1 Ende: Verzweigung nach Frage 9
    y += 2;
    if (result.q9_if_no) addText(result.q9_if_no, margin, 9, "italic", [150, 150, 150]);
    if (result.q9_if_yes) addText(result.q9_if_yes, margin, 9, "italic", [150, 150, 150]);

    // Abschnitt 2
    const s2 = result.section2;
    if (s2) {
      sectionBar("ABSCHNITT 2");
      if (s2.heading) addText(s2.heading, margin, 11, "bold", [26, 69, 53]);
      y += 2;
      if (s2.confirm_question) addText(s2.confirm_question, margin, 11, "bold", [26, 26, 26]);
      s2.confirm_options?.forEach(opt => {
        checkPage(8);
        doc.setDrawColor(189, 136, 146);
        doc.setLineWidth(0.5);
        doc.circle(margin + 3.5, y - 1.5, 2, "S");
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(70, 70, 70);
        doc.text(doc.splitTextToSize(opt, cw - 14), margin + 8, y);
        y += 6.2;
      });
      y += 2;
      if (s2.if_yes) addText(s2.if_yes, margin, 9, "italic", [150, 150, 150]);
      if (s2.if_no) addText(s2.if_no, margin, 9, "italic", [150, 150, 150]);
    }

    // Abschnitt 3
    const s3 = result.section3;
    if (s3) {
      sectionBar("ABSCHNITT 3");
      if (s3.intro) addText(s3.intro, margin, 10, "normal", [70, 70, 70]);
      y += 2;
      s3.fields?.forEach(f => {
        checkPage(16);
        addText(f, margin, 10, "bold", [26, 26, 26]);
        doc.setFillColor(254, 244, 238);
        doc.setDrawColor(222, 200, 204);
        doc.setLineWidth(0.3);
        doc.roundedRect(margin, y, cw, 11, 1, 1, "FD");
        y += 15;
      });
    }

    // Footer on all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(200, 200, 200);
      doc.text("Launch Sisters · Nahm Consulting GmbH", pageW / 2, 291, { align: "center" });
    }

    doc.save("umfrage-fragen.pdf");
  };

  const createGoogleDoc = () => {
    if (!GOOGLE_CLIENT_ID || !window.google?.accounts?.oauth2) {
      setGdocNotice("Google Client ID fehlt. Bitte in Netlify als VITE_GOOGLE_CLIENT_ID eintragen.");
      return;
    }

    setGdocLoading(true);
    setGdocNotice("");

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/documents",
      callback: async (tokenResponse) => {
        if (tokenResponse.error) {
          setGdocLoading(false);
          setGdocNotice("Anmeldung fehlgeschlagen. Bitte erneut versuchen.");
          return;
        }

        try {
          const token = tokenResponse.access_token;

          // 1. Dokument erstellen
          const createRes = await fetch("https://docs.googleapis.com/v1/documents", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ title: `Zielgruppenumfrage: ${thema.slice(0, 60)}` }),
          });
          const docData = await createRes.json();
          const docId = docData.documentId;

          // 2. Inhalt aufbauen + Indizes tracken
          const insertReqs = [];
          const fmtReqs = [];
          let idx = 1;

          const ins = (text) => {
            insertReqs.push({ insertText: { location: { index: idx }, text } });
            const start = idx;
            idx += text.length;
            return { start, end: idx };
          };

          const titleRange = ins("Zielgruppenumfrage\n");
          ins(`${thema}\n\n`);

          if (result.intro_text) {
            ins(`${result.intro_text}\n\n`);
            ins("――――――――――\n\n");
          }

          const secLabel = (label) => {
            const r = ins(`${label}\n\n`);
            fmtReqs.push({
              updateTextStyle: {
                range: { startIndex: r.start, endIndex: r.end - 2 },
                textStyle: {
                  bold: true,
                  fontSize: { magnitude: 13, unit: "PT" },
                  foregroundColor: { color: { rgbColor: { red: 0.102, green: 0.271, blue: 0.208 } } },
                },
                fields: "bold,fontSize,foregroundColor",
              },
            });
          };

          secLabel("Abschnitt 1");

          result.questions?.forEach((q) => {
            if (q.number === result.midpoint_after + 1) {
              ins(`\u2015  ${result.midpoint_text}  \u2015\n\n`);
            }
            const qRange = ins(`Frage ${q.number}: ${q.text}\n`);
            fmtReqs.push({
              updateTextStyle: {
                range: { startIndex: qRange.start, endIndex: qRange.end - 1 },
                textStyle: { bold: true },
                fields: "bold",
              },
            });
            if (q.type === "multiple_choice" && q.options) {
              q.options.forEach((o) => ins(`   \u25cb  ${o}\n`));
            } else {
              ins("[Freie Antwort]\n");
            }
            ins("\n");
          });

          if (result.q9_if_no) ins(`${result.q9_if_no}\n`);
          if (result.q9_if_yes) ins(`${result.q9_if_yes}\n`);

          const s2 = result.section2;
          if (s2) {
            ins("\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\n\n");
            secLabel("Abschnitt 2");
            if (s2.heading) {
              const hRange = ins(`${s2.heading}\n\n`);
              fmtReqs.push({
                updateTextStyle: {
                  range: { startIndex: hRange.start, endIndex: hRange.end - 2 },
                  textStyle: { bold: true },
                  fields: "bold",
                },
              });
            }
            if (s2.confirm_question) {
              const cRange = ins(`${s2.confirm_question}\n`);
              fmtReqs.push({
                updateTextStyle: {
                  range: { startIndex: cRange.start, endIndex: cRange.end - 1 },
                  textStyle: { bold: true },
                  fields: "bold",
                },
              });
            }
            s2.confirm_options?.forEach((o) => ins(`   \u25cb  ${o}\n`));
            if (s2.if_yes) ins(`\n${s2.if_yes}\n`);
            if (s2.if_no) ins(`${s2.if_no}\n`);
            ins("\n");
          }

          const s3 = result.section3;
          if (s3) {
            ins("\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\n\n");
            secLabel("Abschnitt 3");
            if (s3.intro) ins(`${s3.intro}\n\n`);
            s3.fields?.forEach((f) => ins(`${f}: [Freie Antwort]\n`));
            ins("\n");
          }

          ins("Launch Sisters \u00b7 Nahm Consulting GmbH");

          // Titel formatieren
          fmtReqs.push({
            updateTextStyle: {
              range: { startIndex: titleRange.start, endIndex: titleRange.end - 1 },
              textStyle: {
                bold: true,
                fontSize: { magnitude: 18, unit: "PT" },
                foregroundColor: { color: { rgbColor: { red: 0.102, green: 0.271, blue: 0.208 } } },
              },
              fields: "bold,fontSize,foregroundColor",
            },
          });

          // 3. batchUpdate: erst Text einfügen, dann formatieren
          await fetch(`https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
            body: JSON.stringify({ requests: [...insertReqs, ...fmtReqs] }),
          });

          // 4. Dokument öffnen
          window.open(`https://docs.google.com/document/d/${docId}/edit`, "_blank");
          setGdocNotice("success");
        } catch {
          setGdocNotice("Fehler beim Erstellen des Dokuments. Bitte erneut versuchen.");
        } finally {
          setGdocLoading(false);
        }
      },
    });

    tokenClient.requestAccessToken();
  };


  const reset = () => { setResult(null); setStep("form"); setErr(""); setGdocNotice(""); setChecked({}); };

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
                <div className="intro-sub">Gib Thema und Zielgruppe ein. Du bekommst die komplette Zielgruppenumfrage: Intro-Text, 9 Fragen und den Buchungs-Flow fürs Analysegespräch.</div>
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
                  <div className="result-title">Deine Zielgruppenumfrage</div>
                  <div className="result-meta">Thema: {thema.slice(0, 60)}{thema.length > 60 ? "…" : ""}</div>
                </div>
                <button className="btn-reset" onClick={reset}>↩ Neu erstellen</button>
              </div>

              {gdocNotice === "success" && (
                <div className="gdoc-notice">
                  ✓ Google Doc wurde erstellt und geöffnet.
                </div>
              )}
              {gdocNotice && gdocNotice !== "success" && (
                <div className="gdoc-notice" style={{ borderColor: "#f5c6c6", background: "#fdf0f0", color: "#c0392b" }}>
                  ⚠ {gdocNotice}
                </div>
              )}

              <div className="export-row">
                <button className={`btn-copy${copied ? " done" : ""}`} onClick={doCopy}>
                  {copied ? "✓ Kopiert" : "↓ Text kopieren"}
                </button>
                <button className="btn-pdf" onClick={exportPDF}>↓ Als PDF</button>
              </div>

              {result.intro_text && (
                <div className="intro-box">
                  {String(result.intro_text).split("\n").map((line, i) =>
                    line.trim() ? <p key={i}>{line}</p> : <div key={i} style={{ height: 6 }} />
                  )}
                </div>
              )}

              <div className="section-label">Abschnitt 1</div>

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

              {(result.q9_if_no || result.q9_if_yes) && (
                <div className="branch-note">
                  {result.q9_if_no && <div>{result.q9_if_no}</div>}
                  {result.q9_if_yes && <div>{result.q9_if_yes}</div>}
                </div>
              )}

              {result.section2 && (
                <div className="section-block">
                  <div className="section-label">Abschnitt 2</div>
                  {result.section2.heading && (
                    <div className="booking-heading">{result.section2.heading}</div>
                  )}
                  {result.section2.confirm_question && (
                    <div className="q-card">
                      <div className="q-text">{result.section2.confirm_question}</div>
                      <ul className="q-options">
                        {result.section2.confirm_options?.map((o, i) => (
                          <li key={i}><div className="q-radio" /> {o}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(result.section2.if_yes || result.section2.if_no) && (
                    <div className="branch-note">
                      {result.section2.if_yes && <div>{result.section2.if_yes}</div>}
                      {result.section2.if_no && <div>{result.section2.if_no}</div>}
                    </div>
                  )}
                </div>
              )}

              {result.section3 && (
                <div className="section-block">
                  <div className="section-label">Abschnitt 3</div>
                  {result.section3.intro && (
                    <div className="booking-cond">{result.section3.intro}</div>
                  )}
                  {result.section3.fields?.map((f, i) => (
                    <div className="q-card" key={i}>
                      <div className="q-text">{f}</div>
                      <div className="q-textfield">Freie Antwort der Teilnehmerin</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <div className="footer">Launch Sisters · Nahm Consulting GmbH</div>
        </div>
      </div>
    </>
  );
}
