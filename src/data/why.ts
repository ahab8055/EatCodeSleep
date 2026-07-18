import type {
  ComparisonColumn,
  ValueCardItem,
  WhyChooseMetric,
} from '@/types/why';

export const whyChooseSection = {
  label: 'Why EatCodeSleep',
  headingLines: ['Built by engineers.', 'Focused on outcomes.'] as const,
  description:
    'Successful software projects are built through strong engineering practices, thoughtful collaboration, and long-term partnerships rather than shortcuts.',
  quote:
    'We believe software should solve business problems, remain maintainable for years, and evolve alongside the people who use it.',
} as const;

export const valueCards: ValueCardItem[] = [
  {
    id: 'performance-first',
    title: 'Performance First',
    description:
      'Every application is optimized for speed, responsiveness, scalability, and an exceptional user experience from day one.',
    icon: 'rocket',
  },
  {
    id: 'secure-by-design',
    title: 'Secure by Design',
    description:
      'Authentication, authorization, infrastructure, and data security are considered from the beginning of every project.',
    icon: 'shield-check',
  },
  {
    id: 'ai-ready-architecture',
    title: 'AI-Ready Architecture',
    description:
      'Products are designed with future AI integrations and automation opportunities in mind rather than treating AI as an afterthought.',
    icon: 'cpu',
  },
  {
    id: 'clean-engineering',
    title: 'Clean Engineering',
    description:
      'Maintainable code, reusable components, documentation, testing, and scalable architecture make every project easier to evolve.',
    icon: 'git-branch',
  },
  {
    id: 'long-term-partnership',
    title: 'Long-Term Partnership',
    description:
      "We don't disappear after launch. We continue improving products through monitoring, optimization, and feature development.",
    icon: 'handshake',
  },
  {
    id: 'business-impact',
    title: 'Business Impact',
    description:
      'Technology decisions are driven by measurable business outcomes, helping clients reduce costs, improve efficiency, and grow confidently.',
    icon: 'sparkles',
  },
];

export const comparisonColumns: ComparisonColumn[] = [
  {
    id: 'traditional',
    title: 'Traditional Development',
    tone: 'negative',
    items: [
      { label: 'Generic templates' },
      { label: 'Limited scalability' },
      { label: 'Weak documentation' },
      { label: 'Minimal automation' },
      { label: 'Slow iterations' },
    ],
  },
  {
    id: 'eatcodesleep',
    title: 'EatCodeSleep Approach',
    tone: 'positive',
    items: [
      { label: 'Tailored architecture' },
      { label: 'Scalable solutions' },
      { label: 'Clean documentation' },
      { label: 'AI-powered automation' },
      { label: 'Continuous improvement' },
    ],
  },
];

export const whyChooseMetrics: WhyChooseMetric[] = [
  {
    id: 'modern-technologies',
    label: 'Modern Technologies',
    value: 20,
    suffix: '+',
  },
  {
    id: 'automation-opportunities',
    label: 'Automation Opportunities Identified',
    value: 100,
    suffix: '+',
  },
  {
    id: 'architecture-for-scale',
    label: 'Architecture Designed for Scale',
    display: 'Always',
  },
  {
    id: 'long-term-client-focus',
    label: 'Long-Term Client Focus',
    value: 100,
    suffix: '%',
  },
];
