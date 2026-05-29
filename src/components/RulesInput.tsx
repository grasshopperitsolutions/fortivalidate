import { FileText } from 'lucide-react';

interface RulesInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const PLACEHOLDER = `# Paste firewall rules, ACLs, or security policy config here.
# Examples:

# FortiGate ACL
config firewall policy
  edit 1
    set srcintf "port1"
    set dstintf "port2"
    set srcaddr "all"
    set dstaddr "all"
    set action accept
    set schedule "always"
    set service "ALL"
  next
end

# iptables rules
iptables -A INPUT -p tcp --dport 22 -j ACCEPT
iptables -A INPUT -j DROP`;

export function RulesInput({ value, onChange, disabled }: RulesInputProps) {
  return (
    <section aria-labelledby="rules-label">
      <div className="flex items-center gap-2 mb-2">
        <FileText size={16} className="text-muted" aria-hidden="true" />
        <label
          id="rules-label"
          htmlFor="rules-textarea"
          className="text-sm font-medium text-text"
        >
          Security Rules / Configuration
        </label>
        <span className="ml-auto text-xs text-muted">
          {value.trim().length > 0
            ? `${value.trim().split('\n').length} lines`
            : 'Empty'}
        </span>
      </div>
      <textarea
        id="rules-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={PLACEHOLDER}
        rows={18}
        spellCheck={false}
        className="
          w-full font-mono text-sm rounded-lg border border-border bg-surface-offset
          text-text placeholder:text-faint resize-y
          px-4 py-3 leading-relaxed
          focus:outline-none focus:ring-2 focus:ring-fortinet focus:border-fortinet
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors
        "
        aria-describedby="rules-hint"
      />
      <p id="rules-hint" className="text-xs text-muted mt-1.5">
        Accepts FortiGate configs, iptables rules, AWS security groups, YAML policies, or plain-text descriptions.
      </p>
    </section>
  );
}
