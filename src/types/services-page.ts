export type ServiceVisualKind =
  | 'web'
  | 'ai'
  | 'mobile'
  | 'automation'
  | 'backend';

export type ServiceIconName =
  | 'monitor'
  | 'brain-circuit'
  | 'smartphone'
  | 'workflow'
  | 'server';

export interface ServiceNavItem {
  id: string;
  label: string;
  href: string;
}

export interface ServiceDetail {
  id: string;
  /** Extra hash targets that should land on this section (homepage deep links). */
  aliases?: string[];
  navLabel: string;
  icon: ServiceIconName;
  title: string;
  problem: string;
  description: string;
  solutions: string[];
  technologies: string[];
  deliverables: string[];
  visual: ServiceVisualKind;
  ctaLabel: string;
  ctaHref: string;
}

export interface DeliveryModel {
  id: string;
  title: string;
  description: string;
  includes: string[];
}

export interface ServicesHeroContent {
  headingLines: readonly string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}
