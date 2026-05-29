import { CheckSquare, Square } from 'lucide-react';
import { STANDARDS, CATEGORY_LABELS } from '../constants/standards';
import type { StandardCategory } from '../types';

interface StandardsSelectorProps {
  selected: string[];
  onToggle: (id: string) => void;
  disabled?: boolean;
}

const CATEGORY_ORDER: StandardCategory[] = ['iso', 'nist', 'industry', 'us-regulatory'];

export function StandardsSelector({ selected, onToggle, disabled }: StandardsSelectorProps) {
  const allSelected = selected.length === STANDARDS.length;

  const handleSelectAll = () => {
    if (allSelected) {
      STANDARDS.forEach((s) => selected.includes(s.id) && onToggle(s.id));
    } else {
      STANDARDS.forEach((s) => !selected.includes(s.id) && onToggle(s.id));
    }
  };

  return (
    <section aria-labelledby="standards-label">
      <div className="flex items-center justify-between mb-3">
        <span id="standards-label" className="text-sm font-medium text-text">
          Compliance Standards
          <span className="ml-2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-fortinet/10 text-fortinet text-xs font-semibold">
            {selected.length}/{STANDARDS.length}
          </span>
        </span>
        <button
          type="button"
          onClick={handleSelectAll}
          disabled={disabled}
          className="text-xs text-fortinet hover:text-fortinet-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      <div className="space-y-4" role="group" aria-labelledby="standards-label">
        {CATEGORY_ORDER.map((category) => {
          const items = STANDARDS.filter((s) => s.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
                {CATEGORY_LABELS[category]}
              </p>
              <div className="space-y-1">
                {items.map((standard) => {
                  const checked = selected.includes(standard.id);
                  return (
                    <button
                      key={standard.id}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => onToggle(standard.id)}
                      disabled={disabled}
                      className={`
                        w-full flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-left
                        border transition-all
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${
                          checked
                            ? 'border-fortinet/40 bg-fortinet/5 text-text'
                            : 'border-border bg-surface hover:bg-surface-offset text-text'
                        }
                      `}
                    >
                      <span className={`mt-0.5 shrink-0 ${checked ? 'text-fortinet' : 'text-faint'}`}>
                        {checked
                          ? <CheckSquare size={15} aria-hidden="true" />
                          : <Square size={15} aria-hidden="true" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold leading-tight">
                          {standard.shortName}
                        </span>
                        <span className="block text-xs text-muted leading-snug mt-0.5">
                          {standard.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
