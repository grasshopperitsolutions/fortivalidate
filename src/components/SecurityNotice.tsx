import { Lock } from 'lucide-react';

export function SecurityNotice() {
  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800/40">
      <Lock size={14} className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
      <p className="text-xs text-amber-700 dark:text-amber-300 leading-snug">
        <strong>Security notice:</strong> Do not paste production credentials, secrets, or
        personally identifiable information. Rule descriptions are sent to the Gemini API.
        Sanitise all configs before pasting.
      </p>
    </div>
  );
}
