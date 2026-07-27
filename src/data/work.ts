import type { FeaturedProject } from '@/types/work';
import { siteConfig } from '@/data/site';

export const featuredWorkSection = {
  label: 'Featured Work',
  headingLines: ['Products built', 'for real impact.'] as const,
  description:
    'Every project is designed around performance, scalability, usability, and measurable business results.',
} as const;

export const featuredWorkCta = {
  title: "Have an idea you'd like to build?",
  description:
    "Whether you're launching a startup, modernizing an existing platform, or exploring AI solutions, we're ready to help.",
  primary: {
    label: 'Start Your Project',
    href: '/contact/',
  },
  secondary: {
    label: 'Schedule a Discovery Call',
    href: siteConfig.bookingUrl,
  },
} as const;

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'stax-fun',
    category: 'AI EdTech',
    title: 'Stax Fun',
    description:
      'AI edtech platform: visual game editor + copilot so learners ship shareable projects faster.',
    technologies: ['React', 'Flask', 'PostgreSQL', 'Nginx', 'Stripe', 'AWS'],
    results: [
      {
        icon: 'sparkles',
        metric: 'AI',
        description: 'Copilot-assisted creation',
      },
      {
        icon: 'layout-dashboard',
        metric: 'Blocks',
        description: 'Visual game editor',
      },
      {
        icon: 'users',
        metric: 'Share',
        description: 'Community remix publishing',
      },
    ],
    href: 'https://stax.fun/',
    mockup: 'ai-workflow',
    imageAlt: 'Stylized product mockup of Stax Fun visual game editor with AI assistance',
  },
  {
    id: 'qreates',
    category: 'AI Commerce',
    title: 'Qreates',
    description:
      'Commerce brands cut photoshoot turnaround with studio-quality AI product imagery ready for channels.',
    technologies: ['Next.js', 'Clerk', 'PostgreSQL', 'Amazon SST', 'Drizzle ORM'],
    results: [
      {
        icon: 'zap',
        metric: 'Faster',
        description: 'Product shoot turnaround',
      },
      {
        icon: 'sparkles',
        metric: 'AI',
        description: 'Studio-style generation',
      },
      {
        icon: 'trending-up',
        metric: 'ROI',
        description: 'Channel-ready assets',
      },
    ],
    href: 'https://qreates.com/',
    mockup: 'ai-workflow',
    imageAlt: 'Stylized product mockup of Qreates AI product photography generation',
  },
  {
    id: 'croptalk',
    category: 'AI Agriculture',
    title: 'Croptalk',
    description:
      'AgriTech AI chat with crop context, history, and subscription trial—guidance that persists across sessions.',
    technologies: ['Next.js', 'Clerk', 'DynamoDB', 'FastAPI', 'OpenAI', 'LangChain'],
    results: [
      {
        icon: 'sparkles',
        metric: 'Chat',
        description: 'Crop-focused AI guidance',
      },
      {
        icon: 'activity',
        metric: 'History',
        description: 'Saved conversations',
      },
      {
        icon: 'gauge',
        metric: 'Trial',
        description: 'Stripe subscription access',
      },
    ],
    href: 'https://croptalk.ai/',
    mockup: 'fintech',
    imageAlt: 'Stylized product mockup of Croptalk AI crop advisory chat product',
  },
];
