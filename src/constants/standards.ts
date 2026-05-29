import type { Standard } from '../types';

/**
 * Canonical list of cybersecurity standards supported by FortiValidate.
 * Add / remove entries here to change the selectable frameworks in the UI.
 */
export const STANDARDS: Standard[] = [
  // ── ISO/IEC 27000 family ─────────────────────────────────────────────────
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001:2022',
    shortName: 'ISO 27001',
    description: 'Information Security Management Systems (ISMS) — core certifiable standard',
    category: 'iso',
  },
  {
    id: 'iso27002',
    name: 'ISO/IEC 27002:2022',
    shortName: 'ISO 27002',
    description: 'Security controls best-practice guidance that complements ISO 27001',
    category: 'iso',
  },
  {
    id: 'iso27017',
    name: 'ISO/IEC 27017:2015',
    shortName: 'ISO 27017',
    description: 'Additional controls for cloud service providers and customers',
    category: 'iso',
  },
  {
    id: 'iso27701',
    name: 'ISO/IEC 27701:2019',
    shortName: 'ISO 27701',
    description: 'Privacy Information Management System (PIMS) — GDPR alignment',
    category: 'iso',
  },

  // ── NIST ─────────────────────────────────────────────────────────────────
  {
    id: 'nist_csf',
    name: 'NIST CSF 2.0',
    shortName: 'NIST CSF',
    description: 'Cybersecurity Framework: Govern, Identify, Protect, Detect, Respond, Recover',
    category: 'nist',
  },
  {
    id: 'nist_800_53',
    name: 'NIST SP 800-53 Rev 5',
    shortName: 'NIST 800-53',
    description: 'Security and privacy controls for federal information systems',
    category: 'nist',
  },

  // ── Industry standards ────────────────────────────────────────────────────
  {
    id: 'cis_controls',
    name: 'CIS Controls v8',
    shortName: 'CIS Controls',
    description: 'Prioritised technical and procedural controls for common attack vectors',
    category: 'industry',
  },
  {
    id: 'pci_dss',
    name: 'PCI DSS v4.0',
    shortName: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard — mandatory for cardholder data',
    category: 'industry',
  },
  {
    id: 'soc2',
    name: 'SOC 2 (AICPA)',
    shortName: 'SOC 2',
    description: 'Trust Services Criteria — widely required by SaaS and cloud providers',
    category: 'industry',
  },

  // ── US Regulatory ─────────────────────────────────────────────────────────
  {
    id: 'hipaa',
    name: 'HIPAA Security Rule',
    shortName: 'HIPAA',
    description: 'US healthcare data protection — administrative, physical, and technical safeguards',
    category: 'us-regulatory',
  },
  {
    id: 'cmmc',
    name: 'CMMC 2.0',
    shortName: 'CMMC',
    description: 'Cybersecurity Maturity Model Certification — US DoD contractors (NIST 800-171)',
    category: 'us-regulatory',
  },
];

export const CATEGORY_LABELS: Record<string, string> = {
  iso: 'ISO/IEC',
  nist: 'NIST',
  industry: 'Industry',
  'us-regulatory': 'US Regulatory',
};
