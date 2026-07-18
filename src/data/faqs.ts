import type { FaqItem, FaqSidebarContent } from '@/types/faq';
import { siteConfig } from '@/data/site';

export const faqSection = {
  label: 'FAQ',
  headingLines: ['Questions?', "We've got answers."] as const,
  description:
    'Every project is different, but these are some of the most common questions businesses ask before starting a software or AI project.',
} as const;

export const faqSidebar: FaqSidebarContent = {
  title: 'Need a custom solution?',
  description:
    'Have a unique requirement? Our team can help design the right technical approach for your business.',
  primaryCta: {
    label: 'Start a Project',
    href: '/contact/',
  },
  secondaryCta: {
    label: 'Book Discovery Call',
    href: siteConfig.bookingUrl,
  },
  indicators: [
    {
      id: 'response-time',
      label: 'Response within 24 hours',
      icon: 'mail',
    },
    {
      id: 'engagement',
      label: 'Flexible engagement models',
      icon: 'clock',
    },
    {
      id: 'engineering',
      label: 'Senior engineering team',
      icon: 'code',
    },
  ],
};

export const faqs: FaqItem[] = [
  {
    id: 'project-cost',
    question: 'How much does a software project cost?',
    answer:
      'Project cost depends on scope, complexity, integrations, and timeline. After understanding your requirements, we provide a clear estimate and recommended approach.',
  },
  {
    id: 'project-timeline',
    question: 'How long does it take to build a product?',
    answer:
      'Timelines vary depending on the project. MVP products usually take several weeks, while larger platforms require a phased development approach.',
  },
  {
    id: 'startups',
    question: 'Do you work with startups?',
    answer:
      'Yes. We help startups validate ideas, build MVPs, and create scalable foundations that can grow with their users.',
  },
  {
    id: 'existing-team',
    question: 'Can you work with our existing development team?',
    answer:
      'Absolutely. We can work as an extension of your engineering team by handling specific features, architecture, AI integrations, or complete product development.',
  },
  {
    id: 'ai-integration',
    question: 'Do you provide AI integration services?',
    answer:
      'Yes. We help businesses integrate AI capabilities including AI assistants, automation workflows, document processing, RAG systems, and custom AI agents.',
  },
  {
    id: 'technologies',
    question: 'What technologies do you use?',
    answer:
      'We choose technologies based on project requirements but commonly work with React, Astro, Node.js, Python, PostgreSQL, AWS, Docker, OpenAI, and modern automation platforms.',
  },
  {
    id: 'maintenance',
    question: 'Do you provide maintenance after launch?',
    answer:
      'Yes. We offer ongoing support including monitoring, optimization, new features, security updates, and product improvements.',
  },
  {
    id: 'get-started',
    question: 'How do we get started?',
    answer:
      'Start by scheduling a discovery call. We will discuss your goals, challenges, technical requirements, and the best path forward.',
  },
];
