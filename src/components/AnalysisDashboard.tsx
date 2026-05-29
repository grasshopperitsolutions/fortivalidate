import { Loader2, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { AnalysisResult } from '../types';

interface AnalysisDashboardProps {
  loading: boolean;
  loadingMode: 'validate' | 'improve' | null;
  result: AnalysisResult | null;
  selectedCount: number;
}

function LoadingState({ mode }: { mode: 'validate' | 'improve' | null }) {
  const label = mode === 'improve' ? 'Generating improvements' : 'Validating rules';
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-muted" role="status" aria-live="polite">
      <Loader2 size={36} className="animate-spin text-fortinet" aria-hidden="true" />
      <div className="text-center">
        <p className="text-sm font-medium text-text">{label}…</p>
        <p className="text-xs text-muted mt-1">The AI is analysing your configuration.</p>
      </div>
      {/* Skeleton lines */}
      <div className="w-full max-w-md space-y-2 mt-4" aria-hidden="true">
        {[100, 80, 90, 60, 75].map((w, i) => (
          <div
            key={i}
            className="h-3 rounded bg-surface-offset animate-pulse"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function EmptyState({ selectedCount }: { selectedCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-center" role="status">
      <div className="w-12 h-12 rounded-full bg-surface-offset flex items-center justify-center">
        <AlertTriangle size={22} className="text-faint" aria-hidden="true" />
      </div>
      <div>
        <p className="text-sm font-medium text-text">No analysis yet</p>
        <p className="text-xs text-muted mt-1 max-w-xs">
          {selectedCount === 0
            ? 'Select at least one compliance standard, enter your rules, then click Validate or Suggest Improvements.'
            : 'Enter your firewall rules or security configuration, then click Validate Rules or Suggest Improvements.'}
        </p>
      </div>
    </div>
  );
}

export function AnalysisDashboard({
  loading,
  loadingMode,
  result,
  selectedCount,
}: AnalysisDashboardProps) {
  return (
    <section
      aria-labelledby="dashboard-label"
      className="flex flex-col h-full"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between mb-3">
        <span id="dashboard-label" className="text-sm font-medium text-text">
          Analysis Result
        </span>
        {result && !loading && (
          <div className="flex items-center gap-1.5">
            <span
              className={`
                inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                ${
                  result.mode === 'validate'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                }
              `}
            >
              {result.mode === 'validate'
                ? <><ShieldCheck size={11} aria-hidden="true" /> Validation</>
                : <><Sparkles size={11} aria-hidden="true" /> Improvements</>}
            </span>
            <span className="text-xs text-muted">{result.timestamp}</span>
          </div>
        )}
      </div>

      {/* Standards badge */}
      {result && !loading && (
        <p className="text-xs text-muted mb-3">
          Evaluated against:{' '}
          <span className="font-medium text-text">{result.standardsLabel}</span>
        </p>
      )}

      {/* Main content area */}
      <div
        className="flex-1 rounded-lg border border-border bg-surface-offset overflow-y-auto p-4"
        aria-live="polite"
        aria-atomic="true"
      >
        {loading ? (
          <LoadingState mode={loadingMode} />
        ) : result ? (
          <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.content}</ReactMarkdown>
          </div>
        ) : (
          <EmptyState selectedCount={selectedCount} />
        )}
      </div>
    </section>
  );
}
