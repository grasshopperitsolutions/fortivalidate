import { ShieldCheck, Sparkles, Loader2 } from 'lucide-react';
import type { AnalysisMode } from '../types';

interface ActionButtonsProps {
  loading: boolean;
  loadingMode: AnalysisMode | null;
  onValidate: () => void;
  onImprove: () => void;
  disabled: boolean;
}

export function ActionButtons({
  loading,
  loadingMode,
  onValidate,
  onImprove,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Validate button — primary */}
      <button
        type="button"
        onClick={onValidate}
        disabled={disabled || loading}
        className="
          flex-1 inline-flex items-center justify-center gap-2
          px-4 py-2.5 rounded-lg text-sm font-semibold
          bg-fortinet text-white
          hover:bg-fortinet-dark active:bg-fortinet-darker
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors focus:outline-none focus:ring-2 focus:ring-fortinet focus:ring-offset-2
        "
        aria-label="Validate rules against selected standards"
      >
        {loading && loadingMode === 'validate' ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Validating…
          </>
        ) : (
          <>
            <ShieldCheck size={16} aria-hidden="true" />
            Validate Rules
          </>
        )}
      </button>

      {/* Improve button — secondary */}
      <button
        type="button"
        onClick={onImprove}
        disabled={disabled || loading}
        className="
          flex-1 inline-flex items-center justify-center gap-2
          px-4 py-2.5 rounded-lg text-sm font-semibold
          border border-fortinet text-fortinet
          hover:bg-fortinet/5 active:bg-fortinet/10
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors focus:outline-none focus:ring-2 focus:ring-fortinet focus:ring-offset-2
        "
        aria-label="Ask AI for improvement suggestions"
      >
        {loading && loadingMode === 'improve' ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={16} aria-hidden="true" />
            Suggest Improvements
          </>
        )}
      </button>
    </div>
  );
}
