# FortiValidate

> AI-assisted cybersecurity compliance validator — Fortinet internal tool.

Paste firewall rules, ACL entries, or security policies, select one or more
compliance frameworks, and let the AI validate compliance or suggest improvements.

## Supported Frameworks

ISO 27001 · ISO 27002 · ISO 27017 · ISO 27701 · NIST CSF 2.0 ·
NIST SP 800-53 · CIS Controls v8 · PCI DSS v4 · SOC 2 · HIPAA · CMMC 2.0

## Local Development

```bash
cp .env.example .env.local
# Edit .env.local and set VITE_AI_API_KEY=your_gemini_key

npm install
npm run dev
```

## GitHub Pages Deployment

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Repo → **Settings → Secrets → Actions → New secret**
   - Name: `VITE_AI_API_KEY`
   - Value: your Gemini API key
3. Push to `main` — the deploy workflow handles the rest.

> ⚠️ **Security note:** `VITE_` prefixed variables are embedded in the
> client bundle and visible in the browser. This is acceptable for an
> internal tool on a private/trusted network. For a public-facing deployment,
> refactor to a Vercel API route that proxies the Gemini call server-side
> (see the TODO comment in `src/services/askAiService.ts`).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server |
| `npm run build` | Type-check + production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier |

## Project Structure

```
fortivalidate/
├── index.html
├── public/favicon.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/index.ts
│   ├── constants/standards.ts
│   ├── services/askAiService.ts
│   └── components/
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── SecurityNotice.tsx
│       ├── StandardsSelector.tsx
│       ├── RulesInput.tsx
│       ├── ActionButtons.tsx
│       └── AnalysisDashboard.tsx
├── .github/workflows/
│   ├── ci.yml
│   └── deploy.yml
├── .env.example
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
