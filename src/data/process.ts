import type { ProcessHighlight, ProcessStat, ProcessStep } from '@/types/process';

export const processSection = {
  label: 'Our Process',
  headingLines: ['Turning ideas', 'into production-ready software.'] as const,
  description:
    'Every successful product follows a structured engineering process focused on planning, quality, iteration, and long-term scalability.',
} as const;

export const processSteps: ProcessStep[] = [
  {
    id: 'discovery-strategy',
    number: '01',
    title: 'Discovery & Strategy',
    description:
      'We begin by understanding your business goals, users, technical constraints, and opportunities. Every project starts with a clear roadmap and measurable outcomes.',
    icon: 'search',
  },
  {
    id: 'architecture-planning',
    number: '02',
    title: 'Architecture & Planning',
    description:
      'We design scalable system architecture, user flows, APIs, databases, and technical specifications before writing production code.',
    icon: 'blocks',
  },
  {
    id: 'design-development',
    number: '03',
    title: 'Design & Development',
    description:
      'Our engineers build modern web platforms, mobile applications, AI solutions, and automation systems using industry best practices.',
    icon: 'code-2',
  },
  {
    id: 'testing-deployment',
    number: '04',
    title: 'Testing & Deployment',
    description:
      'Every feature is validated through testing, performance optimization, accessibility reviews, and production-ready deployments.',
    icon: 'shield-check',
  },
  {
    id: 'growth-support',
    number: '05',
    title: 'Growth & Support',
    description:
      'After launch we continue improving your product with analytics, monitoring, feature enhancements, AI improvements, and ongoing support.',
    icon: 'trending-up',
  },
];

export const processHighlight: ProcessHighlight = {
  title: 'Why our process works',
  points: [
    'Clear communication',
    'Agile delivery',
    'Scalable architecture',
    'Long-term partnership',
  ],
};

export const processStats: ProcessStat[] = [
  {
    id: 'projects-delivered',
    label: 'Projects Delivered',
    value: 50,
    suffix: '+',
  },
  {
    id: 'client-satisfaction',
    label: 'Client Satisfaction',
    value: 98,
    suffix: '%',
  },
  {
    id: 'average-response-time',
    label: 'Average Response Time',
    value: 24,
    prefix: '<',
    suffix: ' Hours',
  },
  {
    id: 'long-term-partnerships',
    label: 'Long-Term Partnerships',
    value: 85,
    suffix: '%',
  },
];
