/**
 * askAiService.ts
 * ---------------------------------------------------------------------------
 * All AI communication is contained here. The rest of the app never imports
 * from any AI provider directly — only from this service.
 *
 * Current provider: Google Gemini (gemini-1.5-flash)
 *
 * TODO (Future refactor): Replace the direct Gemini fetch below with a call to
 * a Vercel Edge Function (e.g. POST /api/analyze) that holds the API key
 * server-side, so the key is never shipped in the client bundle.
 * The only change needed here is swapping the URL + headers inside callProvider().
 */

import type { AiRequest, AiResponse } from '../types';

// ─── Provider configuration ─────────────────────────────────────────────────

const GEMINI_MODEL = 'gemini-1.5-flash';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

// ─── Prompt builders ────────────────────────────────────────────────────────

const SYSTEM_CONTEXT = `You are FortiValidate, an expert cybersecurity analyst embedded in a Fortinet internal tool.
Your role is to evaluate firewall rules, ACLs, network security policies, and other cybersecurity configurations
against industry standards and frameworks. Be precise, structured, and actionable. Format all output in Markdown
using tables, code blocks, and headings where appropriate. Always cite the specific clause or control ID from
the relevant standard when flagging a finding.`;

function buildValidationPrompt(request: AiRequest): string {
  const standardsList = request.standards
    .map((s) => `- **${s.name}** (${s.shortName}): ${s.description}`)
    .join('\n');

  return `${SYSTEM_CONTEXT}

## Task: Compliance Validation

Evaluate the following cybersecurity rules against the standards listed below and produce a structured report.

### Standards to Evaluate Against
${standardsList}

### Rules / Configuration to Evaluate
\`\`\`
${request.rules}
\`\`\`

### Required Output Format

1. **Executive Summary** — 2–3 sentences on overall compliance posture.
2. **Findings Table** — Markdown table with columns: | Finding | Severity (Critical/High/Medium/Low/Info) | Standard | Clause/Control ID | Recommendation |
3. **Compliant Controls** — Brief list of what is already correctly configured.
4. **Next Steps** — Prioritised remediation actions.

Be specific. Reference exact rule lines or identifiers when possible.`;
}

function buildImprovementPrompt(request: AiRequest): string {
  const standardsList = request.standards
    .map((s) => `- **${s.name}** (${s.shortName})`)
    .join('\n');

  return `${SYSTEM_CONTEXT}

## Task: Security Improvement Suggestions

You are reviewing the following cybersecurity rules with the goal of recommending improvements
to strengthen security posture, align with best practices, and address gaps relative to the standards below.

### Target Standards
${standardsList}

### Current Rules / Configuration
\`\`\`
${request.rules}
\`\`\`

### Required Output Format

1. **Improvement Summary** — Overall assessment and key themes.
2. **Suggested Enhancements Table** — Markdown table: | Area | Current Behaviour | Suggested Change | Rationale | Standard/Control |
3. **Example Configurations** — Where applicable, provide concrete rule examples or pseudo-config snippets.
4. **Priority Roadmap** — Order improvements by impact vs. effort (Quick Wins first, then Strategic).

Focus on actionable, practical recommendations a network security engineer can implement.`;
}

// ─── Provider call ─────────────────────────────────────────────────────────
// To switch AI providers in the future, only this function needs to change.

async function callProvider(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined;

  if (!apiKey) {
    throw new Error(
      'VITE_AI_API_KEY is not set. Add it to your .env.local file (see .env.example).',
    );
  }

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.2, // low temperature for consistent, structured output
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await response.json()) as any;
  const text: string | undefined = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error('Gemini returned an empty or unexpected response structure.');
  }

  return text;
}

// ─── Retry wrapper ──────────────────────────────────────────────────────────

async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1); // exponential backoff
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  // TypeScript narrowing — unreachable but satisfies the compiler
  throw new Error('Max retries exceeded');
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Ask the AI to validate or improve the provided security rules.
 * This is the only function the rest of the app should import from this module.
 */
export async function askAi(request: AiRequest): Promise<AiResponse> {
  if (!request.rules.trim()) {
    return { content: '', error: 'Please enter some rules or configuration to analyse.' };
  }

  if (request.standards.length === 0) {
    return { content: '', error: 'Please select at least one compliance standard.' };
  }

  const prompt =
    request.mode === 'validate'
      ? buildValidationPrompt(request)
      : buildImprovementPrompt(request);

  try {
    const content = await withRetry(() => callProvider(prompt));
    return { content };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return { content: '', error: message };
  }
}
