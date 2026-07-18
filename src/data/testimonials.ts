import type {
  ClientLogo,
  RecognitionBadge,
  SuccessStory,
  Testimonial,
  TrustMetric,
} from '@/types/testimonials';

export const testimonialsSection = {
  label: 'Trusted by Clients',
  headingLines: ['Built on trust.', 'Measured by results.'] as const,
  description:
    'Long-term partnerships are built through transparent communication, reliable delivery, and software that creates measurable business value.',
} as const;

export const trustMetrics: TrustMetric[] = [
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

export const clientLogos: ClientLogo[] = [
  { id: 'technova', name: 'TechNova' },
  { id: 'cloudpeak', name: 'CloudPeak' },
  { id: 'healthsync', name: 'HealthSync' },
  { id: 'finpilot', name: 'FinPilot' },
  { id: 'growthlab', name: 'GrowthLab' },
  { id: 'dataforge', name: 'DataForge' },
  { id: 'visionai', name: 'VisionAI' },
  { id: 'brightstack', name: 'BrightStack' },
];

export const testimonials: Testimonial[] = [
  {
    id: 'sarah-mitchell',
    name: 'Sarah Mitchell',
    role: 'Founder',
    company: 'VisionAI',
    project: 'AI Workflow Platform',
    quote:
      'EatCodeSleep helped us modernize our operations with AI-powered automation. Their engineering quality and communication exceeded our expectations.',
    technologies: ['OpenAI', 'Astro', 'Node.js'],
    rating: 5,
    avatarInitials: 'SM',
    avatarAlt: 'Avatar placeholder for Sarah Mitchell',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    role: 'CTO',
    company: 'HealthSync',
    project: 'Healthcare SaaS',
    quote:
      'The team delivered scalable architecture, clean code, and thoughtful solutions that continue to support our growth.',
    technologies: ['React', 'NestJS', 'AWS'],
    rating: 5,
    avatarInitials: 'DC',
    avatarAlt: 'Avatar placeholder for David Chen',
  },
  {
    id: 'emma-rodriguez',
    name: 'Emma Rodriguez',
    role: 'Product Manager',
    company: 'CloudPeak',
    project: 'Enterprise Dashboard',
    quote:
      'They became an extension of our team. Every milestone was delivered professionally and with great attention to detail.',
    technologies: ['Next.js', 'PostgreSQL', 'TypeScript'],
    rating: 5,
    avatarInitials: 'ER',
    avatarAlt: 'Avatar placeholder for Emma Rodriguez',
  },
];

export const successStories: SuccessStory[] = [
  {
    id: 'reduced-manual-work',
    title: 'Reduced Manual Work by 70%',
    summary:
      'Implemented AI-powered workflow automation that significantly reduced repetitive administrative tasks and improved operational efficiency.',
  },
  {
    id: 'scaled-to-thousands',
    title: 'Scaled to Thousands of Users',
    summary:
      'Designed a cloud-native architecture capable of supporting rapid growth while maintaining high performance and reliability.',
  },
];

export const recognitionBadges: RecognitionBadge[] = [
  {
    id: 'modern-engineering',
    title: 'Modern Engineering',
    description: 'Clean architecture and maintainable systems.',
    icon: 'code-xml',
  },
  {
    id: 'ai-specialists',
    title: 'AI Specialists',
    description: 'Practical AI agents and automation.',
    icon: 'brain-circuit',
  },
  {
    id: 'cloud-native',
    title: 'Cloud Native',
    description: 'Infrastructure built for reliability.',
    icon: 'cloud',
  },
  {
    id: 'performance-focused',
    title: 'Performance Focused',
    description: 'Speed and efficiency from day one.',
    icon: 'gauge',
  },
];
