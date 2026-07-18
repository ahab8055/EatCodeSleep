export type ContactOptionIcon = 'calendar' | 'message-square' | 'mail';

export interface ContactOption {
  id: string;
  icon: ContactOptionIcon;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  email?: string;
  external?: boolean;
}

export interface ContactChoiceOption {
  id: string;
  label: string;
}

export interface ContactProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface ContactTrustItem {
  id: string;
  title: string;
  description: string;
}

export interface ContactHeroContent {
  label: string;
  headingLines: readonly string[];
  description: string;
  availability: string;
}

export interface ContactCtaContent {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface ContactFormPayload {
  buildType: string;
  projectStage: string;
  budget: string;
  name: string;
  email: string;
  company: string;
  description: string;
  timeline: string;
  source?: string;
}

export interface ContactFormErrors {
  buildType?: string;
  projectStage?: string;
  budget?: string;
  name?: string;
  email?: string;
  description?: string;
}
