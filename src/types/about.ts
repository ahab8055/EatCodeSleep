export type AboutValueIcon =
  | 'code'
  | 'brain'
  | 'users'
  | 'shield'
  | 'handshake'
  | 'rocket';

export type AboutPrincipleIcon = 'sparkles' | 'scaling' | 'gem' | 'lightbulb';

export type AboutCapabilityIcon =
  | 'monitor'
  | 'server'
  | 'brain-circuit'
  | 'cloud'
  | 'compass';

export interface AboutHighlight {
  id: string;
  label: string;
}

export interface AboutPrinciple {
  id: string;
  title: string;
  description: string;
  icon: AboutPrincipleIcon;
}

export interface AboutValue {
  id: string;
  title: string;
  description: string;
  icon: AboutValueIcon;
}

export interface AboutCapability {
  id: string;
  title: string;
  icon: AboutCapabilityIcon;
}

export interface AboutTechCategory {
  id: string;
  title: string;
  items: string[];
}

export interface AboutTimelineItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface AboutHeroContent {
  label: string;
  headingLines: readonly string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface AboutStoryContent {
  headingLines: readonly string[];
  lead: string;
  body: string;
  highlights: AboutHighlight[];
}

export interface AboutCtaContent {
  heading: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}
