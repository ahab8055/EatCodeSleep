import type { CtaVisualNode, FinalCtaContent } from '@/types/cta';
import { siteConfig } from '@/data/site';

export const finalCtaContent: FinalCtaContent = {
  eyebrow: 'Ready to build something great?',
  headingLines: ['Have an idea?', "Let's turn it into reality."],
  description:
    'Whether you need a new digital product, AI integration, automation workflow, or a scalable software platform, our team is ready to help you build it.',
  primaryCta: {
    label: 'Start Your Project',
    href: '/contact/',
  },
  secondaryCta: {
    label: 'Book Discovery Call',
    href: siteConfig.bookingUrl,
  },
  availability: {
    status: 'Currently accepting new projects',
    detail: 'Available for Q3 2026',
  },
  socialProof:
    'Trusted by startups and businesses building the next generation of digital products.',
  techHints: ['React', 'AI', 'Cloud', 'Automation'],
};

export const ctaVisualNodes: CtaVisualNode[] = [
  { id: 'ai-agent', label: 'AI Agent' },
  { id: 'workflow', label: 'Workflow Engine' },
  { id: 'api', label: 'API Layer' },
  { id: 'database', label: 'Database' },
  { id: 'cloud', label: 'Cloud' },
];
