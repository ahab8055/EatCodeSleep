export type ServiceIconName =
  | 'code-2'
  | 'smartphone'
  | 'brain-circuit'
  | 'bot'
  | 'workflow'
  | 'server-cog';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: ServiceIconName;
  technologies: string[];
  href: string;
}
