export type ProjectCategoryFilter =
  | 'all'
  | 'ai'
  | 'web-apps'
  | 'mobile'
  | 'automation'
  | 'saas'
  | 'enterprise';

export type ProjectVisualVariant =
  | 'ai-workflow'
  | 'healthcare'
  | 'mobile-learning'
  | 'analytics';

export interface ProjectOutcome {
  label: string;
}

export interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  outcomes: ProjectOutcome[];
  filters: ProjectCategoryFilter[];
  visual: ProjectVisualVariant;
  featured: boolean;
  href: string;
  imageAlt: string;
}

export interface ProjectFilterItem {
  id: ProjectCategoryFilter;
  label: string;
}

export interface TechGroup {
  id: string;
  title: string;
  items: string[];
}

export interface CaseStudyStep {
  id: string;
  title: string;
  description: string;
}

export interface WorkHeroContent {
  headingLines: readonly string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface WorkCtaContent {
  headingLines: readonly string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}
