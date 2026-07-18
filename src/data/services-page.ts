import type {
  DeliveryModel,
  ServiceDetail,
  ServiceNavItem,
  ServicesHeroContent,
} from '@/types/services-page';
import { SITE } from '@/lib/constants';
import { buildCanonicalUrl } from '@/utils/seo';

export const servicesPageSeo = {
  title: 'Software Development & AI Automation Services',
  description:
    'EatCodeSleep helps businesses build custom software, AI applications, mobile apps, and automation systems using modern technologies.',
  canonical: buildCanonicalUrl('/services'),
  keywords: [
    'Custom software development',
    'AI development services',
    'AI automation agency',
    'Web application development',
    'Mobile app development',
    'SaaS development',
    'Business workflow automation',
  ],
} as const;

export const servicesPageJsonLd = {
  type: 'ItemList',
  data: {
    name: 'EatCodeSleep Software Development & AI Automation Services',
    description: servicesPageSeo.description,
    url: servicesPageSeo.canonical,
    itemListElement: [
      {
        '@type': 'Service',
        position: 1,
        name: 'Custom Web Applications',
        description: 'Scalable SaaS platforms, dashboards, portals, and internal tools.',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: 'Worldwide',
        serviceType: 'Web application development',
      },
      {
        '@type': 'Service',
        position: 2,
        name: 'AI-Powered Applications',
        description: 'Practical AI assistants, agents, RAG systems, and LLM integrations.',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: 'Worldwide',
        serviceType: 'AI development services',
      },
      {
        '@type': 'Service',
        position: 3,
        name: 'Mobile Applications',
        description: 'Reliable iOS, Android, and cross-platform mobile products.',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: 'Worldwide',
        serviceType: 'Mobile app development',
      },
      {
        '@type': 'Service',
        position: 4,
        name: 'Business Workflow Automation',
        description: 'AI workflows and automation that remove repetitive operational work.',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: 'Worldwide',
        serviceType: 'Business workflow automation',
      },
      {
        '@type': 'Service',
        position: 5,
        name: 'Scalable Backend Systems',
        description: 'APIs, databases, authentication, and cloud infrastructure.',
        provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        areaServed: 'Worldwide',
        serviceType: 'Backend and cloud engineering',
      },
    ],
  },
};

export const servicesHero: ServicesHeroContent = {
  headingLines: ['Software solutions', 'built around your business goals.'],
  description:
    'From MVP development to AI-powered platforms and automation systems, we help companies design, build, and scale reliable digital products.',
  primaryCta: { label: 'Discuss Your Project', href: '/contact/' },
  secondaryCta: { label: 'Explore Our Work', href: '/#work' },
};

export const serviceDetails: ServiceDetail[] = [
  {
    id: 'web-application-development',
    navLabel: 'Web Development',
    icon: 'monitor',
    title: 'Custom Web Applications',
    problem: 'Businesses need scalable platforms instead of simple websites.',
    description:
      'We design and ship production web products that support real operations, growth, and long-term maintainability.',
    solutions: [
      'SaaS platforms',
      'Dashboards',
      'Customer portals',
      'Internal tools',
      'Marketplace platforms',
    ],
    technologies: ['React', 'Astro', 'TypeScript', 'Node.js', 'PostgreSQL'],
    deliverables: [
      'Product architecture and UX flows',
      'Responsive application frontend',
      'Secure API integrations',
      'Launch-ready deployment pipeline',
    ],
    visual: 'web',
    ctaLabel: 'Discuss Web Development',
    ctaHref: '/contact?service=web',
  },
  {
    id: 'ai-integration',
    aliases: ['ai-agents'],
    navLabel: 'AI Solutions',
    icon: 'brain-circuit',
    title: 'AI-Powered Applications',
    problem: 'Companies want to use AI but need practical implementation.',
    description:
      'We integrate AI into products where it creates measurable value—grounded answers, reliable workflows, and observable systems.',
    solutions: [
      'AI assistants',
      'AI agents',
      'RAG systems',
      'Document intelligence',
      'LLM integrations',
      'AI search',
    ],
    technologies: ['OpenAI', 'Claude', 'Gemini', 'LangChain', 'Vector databases'],
    deliverables: [
      'Use-case discovery and model strategy',
      'Retrieval and evaluation pipelines',
      'Production AI features in your product',
      'Monitoring and iteration playbooks',
    ],
    visual: 'ai',
    ctaLabel: 'Discuss AI Solutions',
    ctaHref: '/contact?service=ai',
  },
  {
    id: 'mobile-app-development',
    navLabel: 'Mobile Apps',
    icon: 'smartphone',
    title: 'Mobile Applications',
    problem: 'Businesses need reliable mobile experiences.',
    description:
      'We build cross-platform mobile products with shared architecture, strong UX, and backends that stay dependable in production.',
    solutions: [
      'iOS applications',
      'Android applications',
      'Cross-platform apps',
      'Mobile dashboards',
      'Consumer apps',
    ],
    technologies: ['React Native', 'Expo', 'Firebase', 'REST APIs'],
    deliverables: [
      'Mobile product architecture',
      'Shared React Native codebase',
      'Auth, offline, and push flows',
      'Store-ready release process',
    ],
    visual: 'mobile',
    ctaLabel: 'Discuss Mobile Apps',
    ctaHref: '/contact?service=mobile',
  },
  {
    id: 'automation-systems',
    navLabel: 'Automation',
    icon: 'workflow',
    title: 'Business Workflow Automation',
    problem: 'Teams waste time on repetitive manual processes.',
    description:
      'We connect tools and AI into workflows that reduce operational load without creating fragile, unmaintainable glue.',
    solutions: [
      'AI workflows',
      'CRM automation',
      'Internal automation tools',
      'Data processing',
      'Notification systems',
    ],
    technologies: ['n8n', 'Zapier', 'Make', 'OpenAI', 'APIs'],
    deliverables: [
      'Process mapping and automation plan',
      'Reliable multi-system workflows',
      'Human-in-the-loop checkpoints',
      'Failure handling and monitoring',
    ],
    visual: 'automation',
    ctaLabel: 'Discuss Automation',
    ctaHref: '/contact?service=automation',
  },
  {
    id: 'cloud-backend-engineering',
    navLabel: 'Backend & Cloud',
    icon: 'server',
    title: 'Scalable Backend Systems',
    problem: 'Growing products need reliable infrastructure.',
    description:
      'We engineer APIs, data layers, and cloud systems that stay secure, observable, and ready for scale.',
    solutions: [
      'API development',
      'Database architecture',
      'Authentication',
      'Cloud deployment',
      'Performance optimization',
    ],
    technologies: ['Node.js', 'Python', 'NestJS', 'AWS', 'Docker', 'PostgreSQL', 'Redis'],
    deliverables: [
      'API and data architecture',
      'Auth and access control',
      'Containerized cloud deployments',
      'Observability and performance baseline',
    ],
    visual: 'backend',
    ctaLabel: 'Discuss Backend & Cloud',
    ctaHref: '/contact?service=backend',
  },
];

export const serviceNavItems: ServiceNavItem[] = serviceDetails.map((service) => ({
  id: service.id,
  label: service.navLabel,
  href: `#${service.id}`,
}));

export const deliveryModels: DeliveryModel[] = [
  {
    id: 'build-from-scratch',
    title: 'Build From Scratch',
    description: 'For startups and new products that need a solid first version.',
    includes: ['Research', 'Architecture', 'Development', 'Launch'],
  },
  {
    id: 'extend-your-team',
    title: 'Extend Your Team',
    description: 'For companies needing additional senior engineering capacity.',
    includes: ['Frontend engineers', 'Backend engineers', 'AI specialists'],
  },
  {
    id: 'technical-consulting',
    title: 'Technical Consulting',
    description: 'For companies that need focused expertise before or during delivery.',
    includes: ['Architecture reviews', 'AI strategy', 'Optimization'],
  },
];
