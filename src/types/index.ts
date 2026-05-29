// ─── Analysis Types ───────────────────────────────────────────────────────────

export type AnalysisMode = 'validate' | 'improve';

export interface AnalysisResult {
  /** Whether this was a validation pass or an improvement suggestion */
  mode: AnalysisMode;
  /** Human-readable comma-joined list of standards evaluated */
  standardsLabel: string;
  /** Raw Markdown content returned by the AI */
  content: string;
  /** Locale-formatted timestamp of when the analysis completed */
  timestamp: string;
}

// ─── Standard Types ───────────────────────────────────────────────────────────

export type StandardCategory = 'iso' | 'nist' | 'industry' | 'us-regulatory';

export interface Standard {
  id: string;
  name: string;
  shortName: string;
  description: string;
  category: StandardCategory;
}

// ─── AI Service Types (public contract for askAiService.ts) ──────────────────

export interface AiRequest {
  rules: string;
  standards: Standard[];
  mode: AnalysisMode;
}

export interface AiResponse {
  content: string;
  error?: string;
}
