import type {
  AboutCapability,
  AboutCtaContent,
  AboutHeroContent,
  AboutPrinciple,
  AboutStoryContent,
  AboutTechCategory,
  AboutTimelineItem,
  AboutValue,
} from '@/types/about';
import { SITE } from '@/lib/constants';
import { buildCanonicalUrl } from '@/utils/seo';
import { siteConfig } from '@/data/site';

export const aboutPageSeo = {
  title: 'About · Software Engineering & AI Innovation',
  description:
    'Learn about EatCodeSleep, a software engineering company building modern applications, AI solutions, and automation systems for businesses worldwide.',
  canonical: buildCanonicalUrl('/about'),
  keywords: [
    'About EatCodeSleep',
    'software engineering company',
    'AI innovation',
    'software craftsmanship',
    'engineering philosophy',
  ],
  socialTitle: 'About EatCodeSleep | Software Engineering & AI Innovation',
} as const;

export const aboutPageJsonLd = {
  type: 'Organization',
  data: {
    name: SITE.name,
    url: SITE.url,
    email: siteConfig.email,
    description: aboutPageSeo.description,
    foundingPhilosophy: 'Great software is built with intention, craftsmanship, and measurable impact.',
    knowsAbout: [
      'Custom software development',
      'AI solutions',
      'Business automation',
      'Cloud engineering',
      'Product design',
    ],
    sameAs: [],
  },
};

export const aboutHero: AboutHeroContent = {
  label: 'ABOUT EATCODESLEEP',
  headingLines: ['We build technology', 'that creates impact.'],
  description:
    'EatCodeSleep is a software engineering company focused on building scalable digital products, AI-powered solutions, and automation systems that help businesses grow.',
  primaryCta: { label: 'Work With Us', href: '/contact/' },
  secondaryCta: { label: 'View Projects', href: '/work/' },
};

export const aboutStory: AboutStoryContent = {
  headingLines: ['Built by engineers,', 'driven by curiosity.'],
  lead: 'EatCodeSleep was created around a simple idea:',
  body: 'Great software is not just about writing code. It is about understanding problems, designing thoughtful solutions, and building technology that creates measurable value.',
  highlights: [
    { id: 'modern-engineering', label: 'Modern Engineering' },
    { id: 'ai-innovation', label: 'AI Innovation' },
    { id: 'product-thinking', label: 'Product Thinking' },
    { id: 'long-term-partnerships', label: 'Long-Term Partnerships' },
  ],
};

export const aboutPrinciples: AboutPrinciple[] = [
  {
    id: 'simplicity',
    title: 'Simplicity',
    description: 'Complex problems deserve simple solutions.',
    icon: 'sparkles',
  },
  {
    id: 'scalability',
    title: 'Scalability',
    description: 'Build systems that grow with users and businesses.',
    icon: 'scaling',
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Clean architecture and maintainable code matter.',
    icon: 'gem',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description: 'Use emerging technologies when they create real value.',
    icon: 'lightbulb',
  },
];

export const aboutValues: AboutValue[] = [
  {
    id: 'craftsmanship',
    title: 'Craftsmanship',
    description: 'We care about details, quality, and building software we are proud of.',
    icon: 'code',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description: 'Technology evolves constantly. We continuously explore better approaches.',
    icon: 'brain',
  },
  {
    id: 'user-focus',
    title: 'User Focus',
    description: 'Products succeed when they solve real human problems.',
    icon: 'users',
  },
  {
    id: 'responsibility',
    title: 'Responsibility',
    description: 'Security, performance, and reliability are built into our process.',
    icon: 'shield',
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: "We work collaboratively and become an extension of our clients' teams.",
    icon: 'handshake',
  },
  {
    id: 'growth-mindset',
    title: 'Growth Mindset',
    description: 'Every product is an opportunity to improve and evolve.',
    icon: 'rocket',
  },
];

export const aboutCapabilities: AboutCapability[] = [
  { id: 'frontend', title: 'Frontend Engineers', icon: 'monitor' },
  { id: 'backend', title: 'Backend Engineers', icon: 'server' },
  { id: 'ai', title: 'AI Engineers', icon: 'brain-circuit' },
  { id: 'cloud', title: 'Cloud Specialists', icon: 'cloud' },
  { id: 'product', title: 'Product Thinkers', icon: 'compass' },
];

export const aboutTechCriteria = [
  'Performance',
  'Maintainability',
  'Scalability',
  'Business requirements',
] as const;

export const aboutTechCategories: AboutTechCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: ['React', 'Astro', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'Python', 'FastAPI'],
  },
  {
    id: 'ai',
    title: 'AI',
    items: ['OpenAI', 'Claude', 'LangChain', 'Vector DBs'],
  },
  {
    id: 'cloud',
    title: 'Cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions'],
  },
  {
    id: 'automation',
    title: 'Automation',
    items: ['n8n', 'Zapier', 'Make', 'Webhooks'],
  },
  {
    id: 'database',
    title: 'Database',
    items: ['PostgreSQL', 'Redis', 'Firebase', 'Supabase'],
  },
];

export const aboutTimeline: AboutTimelineItem[] = [
  {
    id: 'foundation',
    number: '01',
    title: 'Foundation',
    description: 'Building expertise in modern software development.',
  },
  {
    id: 'expansion',
    number: '02',
    title: 'Expansion',
    description: 'Growing into AI and automation solutions.',
  },
  {
    id: 'today',
    number: '03',
    title: 'Today',
    description: 'Helping businesses build scalable digital products.',
  },
];

export const aboutCta: AboutCtaContent = {
  heading: "Let's build something meaningful.",
  description:
    "Have an idea, challenge, or product vision? Let's discuss how technology can help.",
  primaryCta: { label: 'Start a Conversation', href: '/contact/' },
  secondaryCta: { label: 'Contact Us', href: '/contact/' },
};
