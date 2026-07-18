import type { EngineeringPrinciple, TechnologyCategory } from '@/types/technologies';

export const technologiesSection = {
  label: 'Technologies',
  headingLines: ['Modern technologies', 'for modern products.'] as const,
  description:
    'Every technology choice is driven by business requirements, scalability, maintainability, and long-term success rather than trends.',
} as const;

export const technologyCategories: TechnologyCategory[] = [
  {
    id: 'frontend-engineering',
    title: 'Frontend Engineering',
    description: 'Interfaces that feel fast, accessible, and intentionally crafted.',
    icon: 'monitor',
    technologies: [
      { label: 'React', tone: 'secondary' },
      { label: 'Next.js', tone: 'primary' },
      { label: 'Astro', tone: 'accent' },
      { label: 'TypeScript', tone: 'secondary' },
      { label: 'Tailwind CSS', tone: 'primary' },
      { label: 'Vite', tone: 'muted' },
    ],
  },
  {
    id: 'backend-engineering',
    title: 'Backend Engineering',
    description: 'APIs and services built for reliability, clarity, and scale.',
    icon: 'server',
    technologies: [
      { label: 'Node.js', tone: 'accent' },
      { label: 'NestJS', tone: 'primary' },
      { label: 'Express', tone: 'muted' },
      { label: 'FastAPI', tone: 'secondary' },
      { label: 'Python', tone: 'secondary' },
      { label: 'REST APIs', tone: 'muted' },
      { label: 'GraphQL', tone: 'primary' },
    ],
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    description: 'Practical AI systems that automate work and improve decisions.',
    icon: 'brain-circuit',
    technologies: [
      { label: 'OpenAI', tone: 'accent' },
      { label: 'Claude', tone: 'primary' },
      { label: 'Gemini', tone: 'secondary' },
      { label: 'LangChain', tone: 'primary' },
      { label: 'LangGraph', tone: 'secondary' },
      { label: 'Vector Databases', tone: 'muted' },
      { label: 'RAG', tone: 'accent' },
      { label: 'AI Agents', tone: 'primary' },
    ],
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud & Infrastructure',
    description: 'Secure foundations for deployment, data, and growth.',
    icon: 'cloud',
    technologies: [
      { label: 'AWS', tone: 'primary' },
      { label: 'Docker', tone: 'secondary' },
      { label: 'Kubernetes', tone: 'muted' },
      { label: 'NGINX', tone: 'muted' },
      { label: 'PostgreSQL', tone: 'accent' },
      { label: 'Redis', tone: 'secondary' },
      { label: 'Supabase', tone: 'accent' },
      { label: 'Firebase', tone: 'primary' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Connected workflows that remove repetitive operational work.',
    icon: 'workflow',
    technologies: [
      { label: 'n8n', tone: 'accent' },
      { label: 'Zapier', tone: 'primary' },
      { label: 'Make', tone: 'secondary' },
      { label: 'HubSpot', tone: 'muted' },
      { label: 'Slack', tone: 'secondary' },
      { label: 'Stripe', tone: 'primary' },
      { label: 'GitHub Actions', tone: 'muted' },
    ],
  },
  {
    id: 'engineering-practices',
    title: 'Engineering Practices',
    description: 'Quality systems that keep products resilient over time.',
    icon: 'shield-check',
    technologies: [
      { label: 'CI/CD', tone: 'accent' },
      { label: 'Testing', tone: 'primary' },
      { label: 'Accessibility', tone: 'secondary' },
      { label: 'Performance', tone: 'primary' },
      { label: 'SEO', tone: 'muted' },
      { label: 'Security', tone: 'accent' },
      { label: 'Monitoring', tone: 'secondary' },
      { label: 'Documentation', tone: 'muted' },
    ],
  },
];

export const engineeringPrinciples: EngineeringPrinciple[] = [
  {
    id: 'performance-first',
    title: 'Performance First',
    description: 'We optimize for speed and efficiency from day one.',
    icon: 'gauge',
  },
  {
    id: 'scalable-architecture',
    title: 'Scalable Architecture',
    description: 'Systems designed to grow with your business.',
    icon: 'blocks',
  },
  {
    id: 'security-by-design',
    title: 'Security by Design',
    description: 'Best practices integrated throughout development.',
    icon: 'shield',
  },
  {
    id: 'long-term-maintainability',
    title: 'Long-Term Maintainability',
    description: 'Clean code and documentation built for future teams.',
    icon: 'file-code',
  },
];

export const technologyMarqueeItems = [
  'React',
  'Astro',
  'Node.js',
  'Python',
  'AWS',
  'Docker',
  'PostgreSQL',
  'Redis',
  'OpenAI',
  'Claude',
  'Gemini',
  'TypeScript',
  'Tailwind CSS',
  'n8n',
  'Supabase',
  'GitHub',
] as const;
