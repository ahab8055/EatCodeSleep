import type { Service } from '@/types/services';

export const servicesSection = {
  label: 'Our Expertise',
  headingLines: ['Engineering solutions', 'that drive growth.'] as const,
  description:
    'EatCodeSleep designs and builds scalable software products, AI solutions, automation systems, and cloud platforms for startups and businesses.',
} as const;

export const services: Service[] = [
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    description:
      'Custom web platforms built with modern technologies that are fast, scalable, and optimized for long-term growth.',
    icon: 'code-2',
    technologies: ['React', 'Next.js', 'Astro', 'TypeScript', 'Node.js'],
    href: '/services/#web-application-development',
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile applications with exceptional user experiences and scalable backend architecture.',
    icon: 'smartphone',
    technologies: ['React Native', 'Expo', 'Firebase', 'App Store', 'Google Play'],
    href: '/services/#mobile-app-development',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description:
      'Integrate large language models and AI capabilities into existing products to automate workflows and improve decision making.',
    icon: 'brain-circuit',
    technologies: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'RAG'],
    href: '/services/#ai-integration',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description:
      'Build autonomous AI agents capable of reasoning, planning, document processing, customer support, and business automation.',
    icon: 'bot',
    technologies: ['OpenAI Agents', 'LangGraph', 'Vector Database', 'Memory', 'Workflows'],
    href: '/services/#ai-agents',
  },
  {
    id: 'automation-systems',
    title: 'Automation Systems',
    description:
      'Automate repetitive business processes and connect your existing tools into intelligent workflows.',
    icon: 'workflow',
    technologies: ['n8n', 'Zapier', 'Make', 'Slack', 'HubSpot', 'Stripe'],
    href: '/services/#automation-systems',
  },
  {
    id: 'cloud-backend-engineering',
    title: 'Cloud & Backend Engineering',
    description:
      'Scalable APIs, cloud infrastructure, authentication systems, databases, and deployment pipelines.',
    icon: 'server-cog',
    technologies: ['Node.js', 'NestJS', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
    href: '/services/#cloud-backend-engineering',
  },
];
