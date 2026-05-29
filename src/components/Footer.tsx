export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <div className="mx-auto max-w-screen-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Grasshopper IT Solutions. FortiValidate.
        </p>
        <p className="text-xs text-muted text-center sm:text-right max-w-sm">
          AI analysis is advisory only. Always verify findings with a qualified security engineer.
        </p>
      </div>
    </footer>
  );
}
