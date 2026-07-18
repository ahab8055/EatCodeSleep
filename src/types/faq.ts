export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqTrustIndicator {
  id: string;
  label: string;
  icon: 'mail' | 'clock' | 'code';
}

export interface FaqSidebarContent {
  title: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  indicators: FaqTrustIndicator[];
}
