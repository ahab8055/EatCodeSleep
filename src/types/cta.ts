export interface FinalCtaContent {
  eyebrow: string;
  headingLines: readonly [string, string];
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  availability: {
    status: string;
    detail: string;
  };
  socialProof: string;
  techHints: readonly string[];
}

export type CtaVisualNodeId =
  | 'ai-agent'
  | 'workflow'
  | 'api'
  | 'database'
  | 'cloud';

export interface CtaVisualNode {
  id: CtaVisualNodeId;
  label: string;
}
