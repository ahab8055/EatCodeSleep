export type TechnologyCategoryIcon =
  | 'monitor'
  | 'server'
  | 'brain-circuit'
  | 'cloud'
  | 'workflow'
  | 'shield-check';

export type TechnologyTone = 'primary' | 'secondary' | 'accent' | 'muted';

export interface TechnologyItem {
  label: string;
  tone?: TechnologyTone;
}

export interface TechnologyCategory {
  id: string;
  title: string;
  description: string;
  icon: TechnologyCategoryIcon;
  technologies: TechnologyItem[];
}

export type EngineeringPrincipleIcon =
  | 'gauge'
  | 'blocks'
  | 'shield'
  | 'file-code';

export interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
  icon: EngineeringPrincipleIcon;
}
