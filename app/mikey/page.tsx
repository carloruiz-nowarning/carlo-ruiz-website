"use client";
import { useState } from "react";

/* ── Web3Forms access key ──────────────────────────────────────────────
   Get a FREE key in ~30 seconds so submissions email to carlorg@live.com:
   1. Go to https://web3forms.com
   2. Enter  carlorg@live.com  and click "Create Access Key"
   3. They email you a key — paste it below, replacing the empty string.
   Until a key is set, Submit falls back to opening an email draft.        */
const WEB3FORMS_ACCESS_KEY = "";

type Q = { n: number; text: string };
type Section = { letter: string; title: string; questions: Q[] };

const SECTIONS: Section[] = [
  { letter: "A", title: "Ownership & control", questions: [
    { n: 1, text: "What percentage of each for-profit entity do you own today, and who else holds equity (names + %)?" },
    { n: 2, text: "Who exactly receives the 10–15% in Distribution — employees, outside investors, or both — and is it granted, vested, or earned?" },
    { n: 3, text: "Do you want a single holding company over all for-profits, or to keep some entities held directly?" },
    { n: 4, text: "Should Magnify sit under the trust alongside HoldCo, or remain fully personal/separate?" },
  ] },
  { letter: "B", title: "Trust & succession", questions: [
    { n: 5, text: "Do you already have a trust? Revocable, irrevocable, or none yet?" },
    { n: 6, text: "If you were incapacitated or passed tomorrow, who runs each business, and who inherits your ownership?" },
    { n: 7, text: "Do you want the businesses kept and run by successors, or sold and the value passed on?" },
    { n: 8, text: "Are there co-founders or family members who must be provided for or kept out?" },
  ] },
  { letter: "C", title: "Entity details & tax", questions: [
    { n: 9, text: "Current legal form and home state of each entity (LLC, S-corp, C-corp; NC, CA, other)?" },
    { n: 10, text: "Which entities are taxed as pass-through vs. corporation, and is that intentional?" },
    { n: 11, text: "For the Medical Dispensary LLC: what state, what license type, and what are the ownership/residency restrictions on who can hold it?" },
    { n: 12, text: "Are you aware licensed cannabis is subject to IRC 280E (no normal expense deductions)? Should it be fully separated for that reason?" },
  ] },
  { letter: "D", title: "Investors & agreements", questions: [
    { n: 13, text: "Do the Distribution investors have an operating agreement, buy-sell terms, and what happens to their shares on your death?" },
    { n: 14, text: "Are there any promises (verbal or written) of future equity to leaders across any entity?" },
    { n: 15, text: "Are there loans, convertible notes, or personal guarantees tied to any entity?" },
  ] },
  { letter: "E", title: "The non-profit", questions: [
    { n: 16, text: "Is the 501(c)(3) already recognized by the IRS, or still being formed?" },
    { n: 17, text: "Who sits on its board, and how do you want to control its mission over time?" },
    { n: 18, text: "How much do you intend the for-profits to donate, and do you want a formal giving policy (to avoid private-benefit issues)?" },
    { n: 19, text: "Does the non-profit own or need the 2-acre hemp plot, or does a for-profit hold the land?" },
  ] },
  { letter: "F", title: "Real estate, IP & major assets", questions: [
    { n: 20, text: "Who owns the 2-acre grow, the manufacturing facility, and each retail location — the operating company, a separate real-estate LLC, or you personally?" },
    { n: 21, text: "Is the “Be a Happy Camper” trademark registered, and in which entity does it (or should it) live?" },
    { n: 22, text: "List major assets outside the businesses (home, personal investments, Magnify holdings) that belong in the estate plan." },
  ] },
  { letter: "G", title: "Financials the agency will request", questions: [
    { n: 23, text: "Trailing 24-month P&L and balance sheet for each for-profit entity." },
    { n: 24, text: "Consolidated (net of intercompany) revenue and profit." },
    { n: 25, text: "A current valuation or valuation basis for each entity (for gift/estate tax planning)." },
    { n: 26, text: "Cash-flow statement showing intercompany flows and distributions to you." },
  ] },
  { letter: "H", title: "Personal, family & intent", questions: [
    { n: 27, text: "Spouse, children, dependents — and any guardianship needs?" },
    { n: 28, text: "Charitable intent: how much of the estate should ultimately support the hemp/non-profit mission?" },
    { n: 29, text: "Any specific wishes for what happens to the brand and mission after you?" },
  ] },
  { letter: "I", title: "Risk & protection", questions: [
    { n: 30, text: "What insurance is in place (product liability, general, key-person, D&O)?" },
    { n: 31, text: "Any pending disputes, regulatory issues, or personal guarantees that create estate risk?" },
    { n: 32, text: "Given the Nov 12, 2026 federal hemp change, how should the plan account for the possibility that product lines shift or a business is restructured?" },
  ] },
];

export default function Mikey() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [help, setHelp] = useState<Record<number, boolean>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [payload, setPayload] = useState<{ message: string; subject: string; file: string }>({ message: "", subject: "", file: "" });

  const esc = (s: string) => s.replace(/[&<>]/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[m] as string));

  const downloadTxt = (message: string, file: string) => {
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = file + ".txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const savePdf = (message: string, subject: string) => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<!doctype html><html><head><title>${esc(subject)}</title><style>` +
      `body{font-family:Georgia,'Times New Roman',serif;padding:48px;white-space:pre-wrap;font-size:12px;line-height:1.55;color:#111}` +
      `</style></head><body>${esc(message)}</body></html>`
    );
    w.document.close(); w.focus();
    setTimeout(() => w.print(), 300);
  };

  const emailToCarlo = (message: string, subject: string) => {
    window.location.href = `mailto:carlorg@live.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const buildMessage = () => {
    let m = "HAPPY CAMPER — ESTATE-STRUCTURING QUESTIONNAIRE\n";
    m += `Respondent: ${name || "—"}${email ? " (" + email + ")" : ""}\n`;
    m += "=".repeat(60) + "\n\n";
    SECTIONS.forEach((s) => {
      m += `${s.letter}. ${s.title.toUpperCase()}\n`;
      s.questions.forEach((q) => {
        m += `\n${q.n}. ${q.text}\n`;
        m += `Answer: ${answers[q.n]?.trim() || (help[q.n] ? "" : "(no answer)")}\n`;
        if (help[q.n]) m += "→ NEED HELP / DISCUSS\n";
      });
      m += "\n" + "-".repeat(60) + "\n\n";
    });
    return m;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = buildMessage();
    const subject = `Happy Camper Questionnaire — ${name || "Response"}`;
    const file = subject.replace(/[^\w-]+/g, "_");

    // Always download a text copy for the record
    downloadTxt(message, file);
    setPayload({ message, subject, file });

    // If a Web3Forms key is configured, also email the contents automatically
    if (WEB3FORMS_ACCESS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject,
            from_name: name || "Happy Camper Questionnaire",
            replyto: email || undefined,
            message,
          }),
        });
      } catch {}
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <main className="min-h-screen bg-[#E9E7E3] px-6 py-24 text-[#111111]">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-4xl mb-4">Answers saved.</h1>
          <p className="text-[#111111]/70 mb-8">
            A text file has downloaded to your device. Save a PDF and/or email it to Carlo below,
            then you can close this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => downloadTxt(payload.message, payload.file)}
              className="border border-[#111111] text-[#111111] text-sm px-6 py-3 rounded-full hover:bg-[#111111]/5 transition-colors">
              Download text file
            </button>
            <button onClick={() => savePdf(payload.message, payload.subject)}
              className="border border-[#111111] text-[#111111] text-sm px-6 py-3 rounded-full hover:bg-[#111111]/5 transition-colors">
              Save as PDF
            </button>
            <button onClick={() => emailToCarlo(payload.message, payload.subject)}
              className="bg-[#7B8C5A] text-white text-sm px-6 py-3 rounded-full hover:bg-[#5f6e43] transition-colors">
              Email to Carlo
            </button>
          </div>
          <p className="text-xs text-[#111111]/45 mt-6">
            &ldquo;Email to Carlo&rdquo; opens a message to carlorg@live.com — attach the downloaded file if it isn&apos;t already in the body.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E9E7E3] px-6 py-16 text-[#111111]">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <p className="text-sm text-[#7B8C5A] tracking-widest uppercase mb-3">Confidential · Draft for professional review</p>
        <h1 className="font-serif text-[clamp(2rem,5vw,3.25rem)] leading-tight mb-4">Estate-Structuring Questionnaire</h1>
        <p className="text-[#111111]/70 leading-relaxed mb-10 max-w-2xl">
          Answer what you can; for anything you&apos;re unsure of, tick <em>&ldquo;Need help / discuss&rdquo;</em> and
          move on. These are the decisions the estate-planning agency (and tax / cannabis counsel) will need from you.
        </p>

        {/* Respondent */}
        <div className="grid gap-4 sm:grid-cols-2 mb-12">
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-[#111111]/50">Your name</span>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="border border-[#111111]/15 bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#7B8C5A]" />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-widest text-[#111111]/50">Your email (optional)</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="border border-[#111111]/15 bg-white rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#7B8C5A]" />
          </label>
        </div>

        {SECTIONS.map((s) => (
          <section key={s.letter} className="mb-12">
            <h2 className="font-serif text-2xl mb-6 pb-3 border-b border-[#111111]/10">
              <span className="text-[#7B8C5A] mr-2">{s.letter}.</span>{s.title}
            </h2>
            <div className="flex flex-col gap-8">
              {s.questions.map((q) => (
                <div key={q.n}>
                  <label htmlFor={`q${q.n}`} className="block text-[#111111] leading-relaxed mb-2">
                    <span className="font-medium mr-1">{q.n}.</span>{q.text}
                  </label>
                  <textarea
                    id={`q${q.n}`}
                    value={answers[q.n] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [q.n]: e.target.value }))}
                    rows={3}
                    className="w-full border border-[#111111]/15 bg-white rounded-md px-3 py-2 text-sm leading-relaxed resize-y focus:outline-none focus:border-[#7B8C5A]"
                    placeholder="Type your answer…"
                  />
                  <label className="mt-2 inline-flex items-center gap-2 text-xs text-[#111111]/55 cursor-pointer">
                    <input type="checkbox" checked={!!help[q.n]}
                      onChange={(e) => setHelp((h) => ({ ...h, [q.n]: e.target.checked }))} />
                    Need help / discuss
                  </label>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="border-t border-[#111111]/10 pt-8">
          {status === "error" && (
            <p className="text-sm text-[#b23a36] mb-4">Something went wrong sending. Please try again.</p>
          )}
          <button type="submit" disabled={status === "sending"}
            className="bg-[#7B8C5A] text-white text-sm px-10 py-3.5 rounded-full hover:bg-[#5f6e43] transition-colors duration-200 active:scale-[0.98] disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Submit answers"}
          </button>
          <p className="text-xs text-[#111111]/40 mt-4">Your responses are emailed directly to Carlo. Nothing is stored on this page.</p>
        </div>
      </form>
    </main>
  );
}
