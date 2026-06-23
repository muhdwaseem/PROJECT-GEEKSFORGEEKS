# Tender Analyzer MVP

An AI-powered tool that lets you upload a tender, RFP, or commercial contract and instantly:

1. **Chat** with the document to ask questions and get cited answers
2. **Extract** a structured summary — payment terms, penalty clauses, deadlines, deliverables, and risk flags
3. **Export** that summary as a shareable PDF/Excel file

Built for SMEs and contractors in the UAE/GCC who bid on tenders regularly but don't have an in-house legal team to comb through every clause.

---

## Why this exists

Tender and contract documents are long, dense, and full of clauses that quietly carry financial risk — payment milestones, penalty stacking, tight termination windows. Reading them manually is slow and error-prone. This tool turns that into:

- A **chat interface** for quick Q&A ("What happens if we miss the delivery deadline?")
- A **structured extraction panel** that surfaces the clauses that actually matter, with source citations
- A **one-page export** clients can walk away with after a meeting

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript (Vite) |
| Backend | Node.js + Express |
| Document parsing | `pdf-parse` (PDF), `mammoth` (DOCX) |
| AI | Google Gemini API (`@google/generative-ai`) |
| Export | `jsPDF` / `exceljs` |

> Originally prototyped with the Anthropic API; migrated to Gemini for cost/context-window reasons. Architecture is provider-agnostic — swapping back only touches the two API call functions in `/server`.

---

## Architecture Overview

```
┌─────────────────────────┐         ┌──────────────────────────┐
│        Frontend          │         │          Backend          │
│  (React + TS, Vite)      │ <-----> │   (Node.js + Express)     │
│                           │  HTTP   │                            │
│  ┌─────────┐ ┌─────────┐ │         │  /api/upload               │
│  │  Doc    │ │  Chat + │ │         │  /api/chat                 │
│  │ Viewer  │ │ Extract │ │         │  /api/extract               │
│  │ (left)  │ │ (right) │ │         │  /api/export                │
│  └─────────┘ └─────────┘ │         │                            │
└─────────────────────────┘         │  → Gemini API calls        │
                                      └──────────────────────────┘
```

- **Left panel** — uploaded document rendered as scrollable plain text, with highlight-on-click support for linked clauses
- **Right panel** — tabbed: **Chat** and **Extracted Summary**
- No database in MVP — session-based only. Add Postgres/Supabase later for multi-user persistence and history.

---

## Features

### 1. Document Upload & Parsing
Accepts PDF or DOCX. Extracts raw text server-side before any AI call is made.

### 2. Chat (RAG-lite)
The full document text is injected into Gemini's `systemInstruction`. Every question is answered strictly from the document, with clause/section citations. No external knowledge is used — if the answer isn't in the document, the model says so explicitly.

### 3. Structured Extraction
A second Gemini call, using `responseSchema` + `responseMimeType: "application/json"`, forces a reliable structured output:

```json
{
  "parties": [{ "name": "", "role": "" }],
  "contract_value": "",
  "currency": "",
  "payment_terms": [{ "description": "", "due": "" }],
  "penalty_clauses": [{ "description": "", "amount_or_rate": "", "trigger_condition": "", "source_excerpt": "" }],
  "deadlines": [{ "milestone": "", "date_or_duration": "" }],
  "deliverables": [{ "description": "" }],
  "governing_law": "",
  "termination_clauses": [{ "description": "" }],
  "red_flags": [{ "description": "", "severity": "low|medium|high", "source_excerpt": "" }]
}
```

### 4. Clause Linking
Clicking an extracted item (e.g. a red flag) scrolls and highlights the matching `source_excerpt` in the left-panel document viewer, via substring match.

### 5. Export
One click generates a formatted PDF or Excel summary of the extraction — payment terms, penalties, deadlines, deliverables, red flags — suitable for sharing with a client or procurement team.

---

## Project Structure (suggested)

```
tender-analyzer/
├── client/                  # React + TS frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── DocumentViewer.tsx
│   │   │   ├── ChatPanel.tsx
│   │   │   ├── ExtractionPanel.tsx
│   │   │   └── ExportButton.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── vite.config.ts
├── server/                  # Node + Express backend
│   ├── routes/
│   │   ├── upload.ts
│   │   ├── chat.ts
│   │   ├── extract.ts
│   │   └── export.ts
│   ├── services/
│   │   ├── geminiClient.ts
│   │   └── docParser.ts
│   └── index.ts
├── .env                      # GEMINI_API_KEY (never commit)
├── .env.example
└── README.md
```

---

## Environment Variables

Create a `.env` file in `/server`:

```
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.0-flash
PORT=4000
```

Never commit `.env` — only `.env.example` with placeholder values.

---

## Getting Started

```bash
# Backend
cd server
npm install
npm run dev

# Frontend (separate terminal)
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:4000` (adjust proxy config in `vite.config.ts` if needed).

---

## Testing

A sample tender document (`Sample_Tender_RFP_AlMarjan_IT-0142.docx`) is included for testing. It contains every field the extraction schema expects:

- Multi-milestone payment terms
- A payment-deadline table
- Stacked/compounding penalty clauses (good stress test for `red_flags` reasoning)
- Termination-for-cause and for-convenience clauses
- A deliberately missing force-majeure clause (tests whether the model flags absence, not just presence)

**Suggested test flow:**
1. Upload the sample doc
2. Ask the chat: *"What happens if the contractor misses the hardware delivery deadline?"* → should cite Clause 6.1
3. Run extraction → confirm `red_flags` picks up the Section 11 items, not just literal penalty text
4. Click a red flag → confirm the document viewer scrolls/highlights the correct `source_excerpt`
5. Export → confirm the PDF/Excel output is clean and client-shareable

---

## Known Limitations (MVP stage)

- **No persistence** — refreshing the page loses the session. Add a database before multi-user use.
- **No auth** — anyone with the URL can use it. Add auth before any public deployment.
- **Single-document only** — no cross-document comparison yet (see roadmap).
- **Not legal advice** — `red_flags` highlights clauses worth reviewing; it does not replace a lawyer. Frame this clearly to clients.
- **Long documents** — very large tenders (100+ pages) re-send full text on every chat turn, which adds latency/cost. Gemini's context caching API is the fix when this becomes a real bottleneck.

---

## Roadmap Ideas

- [ ] Multi-document comparison (e.g. compare 2–3 competing vendor quotes side by side)
- [ ] Persistent storage (Supabase/Postgres) with project history
- [ ] User accounts + multi-tenant support for agencies managing multiple clients
- [ ] Arabic-language document support
- [ ] Clause-level commenting/annotation for legal review workflows

---

## Disclaimer

This tool is an analysis aid, not a substitute for legal or financial review. All extracted summaries and risk flags should be verified by a qualified professional before being relied on for contractual decisions.
