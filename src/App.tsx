import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RulesInput } from './components/RulesInput';
import { StandardsSelector } from './components/StandardsSelector';
import { ActionButtons } from './components/ActionButtons';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { SecurityNotice } from './components/SecurityNotice';
import { STANDARDS } from './constants/standards';
import { askAi } from './services/askAiService';
import type { AnalysisMode, AnalysisResult } from './types';

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [rules, setRules] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['iso27001', 'nist_csf', 'cis_controls']);
  const [loading, setLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<AnalysisMode | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleToggleStandard = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }, []);

  const runAnalysis = useCallback(
    async (mode: AnalysisMode) => {
      setError(null);
      setLoading(true);
      setLoadingMode(mode);

      const selectedStandards = STANDARDS.filter((s) => selectedIds.includes(s.id));

      const response = await askAi({ rules, standards: selectedStandards, mode });

      setLoading(false);
      setLoadingMode(null);

      if (response.error) {
        setError(response.error);
        return;
      }

      setResult({
        mode,
        standardsLabel: selectedStandards.map((s) => s.shortName).join(', '),
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
    },
    [rules, selectedIds],
  );

  const isActionDisabled = !rules.trim() || selectedIds.length === 0;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-bg)]">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Error banner */}
        {error && (
          <div
            role="alert"
            className="mb-4 flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-800/40"
          >
            <span className="text-red-600 dark:text-red-400 font-semibold text-sm">Error:</span>
            <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-600 text-lg leading-none"
              aria-label="Dismiss error"
            >
              &times;
            </button>
          </div>
        )}

        {/* Two-column layout: left = inputs, right = results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ── Left column ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">

            {/* Standards picker */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
              <StandardsSelector
                selected={selectedIds}
                onToggle={handleToggleStandard}
                disabled={loading}
              />
            </div>

            {/* Rules textarea */}
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
              <RulesInput
                value={rules}
                onChange={setRules}
                disabled={loading}
              />
            </div>

            {/* Action buttons */}
            <ActionButtons
              loading={loading}
              loadingMode={loadingMode}
              onValidate={() => runAnalysis('validate')}
              onImprove={() => runAnalysis('improve')}
              disabled={isActionDisabled}
            />

            {/* Security notice */}
            <SecurityNotice />
          </div>

          {/* ── Right column ── */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm h-full">
              <AnalysisDashboard
                loading={loading}
                loadingMode={loadingMode}
                result={result}
                selectedCount={selectedIds.length}
              />
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
