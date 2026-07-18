export type ProjectMockupVariant = 'ai-workflow' | 'healthcare' | 'fintech';

export type BusinessResultIcon =
  | 'gauge'
  | 'zap'
  | 'trending-up'
  | 'users'
  | 'shield'
  | 'activity'
  | 'clock'
  | 'sparkles'
  | 'layout-dashboard';

export interface BusinessResult {
  icon: BusinessResultIcon;
  metric: string;
  description: string;
}

export interface FeaturedProject {
  id: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
  results: BusinessResult[];
  href: string;
  mockup: ProjectMockupVariant;
  imageAlt: string;
}
