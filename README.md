# FortiValidate

> AI-powered cybersecurity rule compliance validator — powered by Google Gemini.

[![CI](https://github.com/grasshopperitsolutions/fortivalidate/actions/workflows/ci.yml/badge.svg)](https://github.com/grasshopperitsolutions/fortivalidate/actions/workflows/ci.yml)
[![Deploy](https://github.com/grasshopperitsolutions/fortivalidate/actions/workflows/deploy.yml/badge.svg)](https://github.com/grasshopperitsolutions/fortivalidate/actions/workflows/deploy.yml)

**Live app:** https://grasshopperitsolutions.github.io/fortivalidate/

---

## What it does

FortiValidate lets you paste firewall rules, ACLs, or any security policy configuration and evaluate them against leading cybersecurity standards using AI:

| Mode | Description |
|------|-------------|
| **Validate Rules** | Checks your config against selected standards; returns a findings table with severity, clause IDs, and remediation steps |
| **Suggest Improvements** | Returns an enhancement table, example configs, and a priority roadmap |

### Supported Standards

| Category | Standards |
|---|---|
| ISO/IEC | ISO 27001, ISO 27002, ISO 27017, ISO 27701 |
| NIST | NIST CSF 2.0, NIST SP 800-53 Rev 5 |
| Industry | CIS Controls v8, PCI DSS v4, SOC 2 |
| US Regulatory | HIPAA Security Rule, CMMC 2.0 |

---

## Tech stack

- **React 18 + TypeScript + Vite** (SPA)
- **Tailwind CSS v4** with `@tailwindcss/typography`
- **React Markdown + remark-gfm** for AI response rendering
- **Lucide React** for icons
- **Google Gemini 1.5 Flash** via `askAiService.ts`
- **GitHub Actions** for CI and Pages deployment

---

## Local development

### 1. Clone & install

```bash
git clone https://github.com/grasshopperitsolutions/fortivalidate.git
cd fortivalidate
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your [Google Gemini API key](https://aistudio.google.com/app/apikey):

```env
VITE_AI_API_KEY=your_gemini_api_key_here
```

> **Security:** `.env.local` is git-ignored. Never commit real API keys.

### 3. Run dev server

```bash
npm run dev
```

Open http://localhost:5173/fortivalidate/

### 4. Other scripts

| Command | Description |
|---|---|
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint (zero warnings policy) |
| `npm run typecheck` | `tsc --noEmit` only |
| `npm run format` | Prettier on all `src/**/*.{ts,tsx,css}` |

---

## Deployment (GitHub Pages)

### One-time repo setup

1. Go to **Settings → Pages → Source** and select **GitHub Actions**.
2. Go to **Settings → Secrets and variables → Actions** and add:
   - `VITE_AI_API_KEY` — your Gemini API key

Every push to `main` triggers the deploy workflow automatically.

### Manual re-deploy

Go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## Project structure

```
fortivalidate/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml          # Lint + typecheck + build on every PR & push
│   │   └── deploy.yml      # Build + deploy to GitHub Pages on push to main
│   └── PULL_REQUEST_TEMPLATE.md
├── public/
├── src/
│   ├── components/         # Header, Footer, RulesInput, StandardsSelector,
│   │   │                   # ActionButtons, AnalysisDashboard, SecurityNotice
│   ├── constants/
│   │   └── standards.ts    # All 11 supported frameworks
│   ├── services/
│   │   └── askAiService.ts # All AI communication (Gemini, prompts, retry)
│   ├── types/
│   │   └── index.ts        # Shared TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Security notice

- Do **not** paste production credentials, secrets, or PII into the rules input.
- Rule descriptions are sent to the Google Gemini API. Sanitise all configs before pasting.
- The `VITE_AI_API_KEY` is embedded in the client bundle (Vite `VITE_` prefix). For production use, proxy the AI call through a serverless function (e.g. Vercel Edge Function) to keep the key server-side.

---

## Contributing

1. Fork the repo and create a feature branch
2. Run `npm run lint && npm run typecheck` before pushing
3. Open a PR — the CI workflow will validate automatically

---

*Built by [Grasshopper IT Solutions](https://grasshopperitsolutions.com)*
