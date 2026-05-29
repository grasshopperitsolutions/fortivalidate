import { Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto max-w-screen-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-fortinet text-white">
            <Shield size={20} aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-text leading-none">FortiValidate</h1>
            <p className="text-xs text-muted mt-0.5">Cybersecurity Rule Compliance Validator</p>
          </div>
        </div>
        <span className="text-xs text-muted hidden sm:block">
          Powered by Gemini AI
        </span>
      </div>
    </header>
  );
}
