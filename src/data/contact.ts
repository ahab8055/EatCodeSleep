import type {
  ContactChoiceOption,
  ContactCtaContent,
  ContactHeroContent,
  ContactOption,
  ContactProcessStep,
  ContactTrustItem,
} from '@/types/contact';
import { SITE } from '@/lib/constants';
import { buildCanonicalUrl } from '@/utils/seo';
import { siteConfig } from '@/data/site';

export const contactPageSeo = {
  title: 'Contact · Start Your Software & AI Project',
  socialTitle: 'Contact EatCodeSleep | Start Your Software & AI Project',
  description:
    'Contact EatCodeSleep to discuss custom software development, AI solutions, automation workflows, and digital product development.',
  canonical: buildCanonicalUrl('/contact'),
  keywords: [
    'contact EatCodeSleep',
    'start a software project',
    'AI development inquiry',
    'hire software engineers',
  ],
} as const;

export const contactPageJsonLd = {
  type: 'Organization',
  data: {
    name: SITE.name,
    url: SITE.url,
    email: siteConfig.email,
    description: contactPageSeo.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: siteConfig.email,
      availableLanguage: ['English'],
    },
  },
};

export const contactHero: ContactHeroContent = {
  label: 'START A PROJECT',
  headingLines: ['Have an idea?', "Let's build it."],
  description:
    'Tell us about your idea, challenge, or product vision. Our team will help you understand the right technical approach.',
  availability: 'Currently accepting new projects',
};

export const contactOptions: ContactOption[] = [
  {
    id: 'discovery-call',
    icon: 'calendar',
    title: 'Book a Discovery Call',
    description: 'Discuss your idea, goals, timeline, and technical requirements.',
    ctaLabel: 'Schedule Call',
    href: siteConfig.bookingUrl,
  },
  {
    id: 'project-details',
    icon: 'message-square',
    title: 'Send Project Details',
    description: 'Share your requirements and receive a recommended approach.',
    ctaLabel: 'Start Discussion',
    href: '#project-form',
  },
  {
    id: 'email',
    icon: 'mail',
    title: 'Email Us',
    description: 'For general questions and partnership opportunities.',
    ctaLabel: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    email: siteConfig.email,
  },
];

export const buildTypeOptions: ContactChoiceOption[] = [
  { id: 'web-application', label: 'Web Application' },
  { id: 'mobile-application', label: 'Mobile Application' },
  { id: 'ai-solution', label: 'AI Solution' },
  { id: 'automation-system', label: 'Automation System' },
  { id: 'saas-product', label: 'SaaS Product' },
  { id: 'other', label: 'Other' },
];

export const projectStageOptions: ContactChoiceOption[] = [
  { id: 'idea-stage', label: 'Idea Stage' },
  { id: 'mvp', label: 'MVP' },
  { id: 'existing-product', label: 'Existing Product' },
  { id: 'scaling-product', label: 'Scaling Product' },
  { id: 'enterprise-solution', label: 'Enterprise Solution' },
];

export const budgetOptions: ContactChoiceOption[] = [
  { id: 'under-5k', label: 'Under $5k' },
  { id: '5k-15k', label: '$5k - $15k' },
  { id: '15k-50k', label: '$15k - $50k' },
  { id: '50k-plus', label: '$50k+' },
  { id: 'need-consultation', label: 'Need Consultation' },
];

export const contactProcessSteps: ContactProcessStep[] = [
  {
    id: 'review',
    number: '01',
    title: 'Review',
    description: 'We analyze your requirements and project goals.',
  },
  {
    id: 'discovery',
    number: '02',
    title: 'Discovery',
    description: 'We discuss your vision, challenges, and technical options.',
  },
  {
    id: 'proposal',
    number: '03',
    title: 'Proposal',
    description: 'We provide recommended solutions, timeline, and approach.',
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    description: 'Our team starts creating your product.',
  },
];

export const contactTrustItems: ContactTrustItem[] = [
  {
    id: 'senior-engineering',
    title: 'Senior Engineering',
    description: 'Experienced developers focused on quality.',
  },
  {
    id: 'modern-technology',
    title: 'Modern Technology',
    description: 'Using current tools and proven architectures.',
  },
  {
    id: 'transparent-communication',
    title: 'Transparent Communication',
    description: 'Clear updates throughout development.',
  },
  {
    id: 'long-term-support',
    title: 'Long-Term Support',
    description: 'Helping products evolve after launch.',
  },
];

export const contactCta: ContactCtaContent = {
  heading: 'Ready to turn your idea into reality?',
  description:
    "Let's discuss how software, AI, and automation can help your business grow.",
  primaryCta: { label: 'Book a Call', href: siteConfig.bookingUrl },
  secondaryCta: { label: 'Send Project Details', href: '#project-form' },
};

export const contactFormCopy = {
  title: 'Project Builder',
  description:
    'Answer a few questions — it feels like product onboarding, and helps us prepare a sharp technical recommendation.',
  submitLabel: 'Start My Project',
  successTitle: 'Message received',
  successDescription:
    'Thanks for reaching out. We will review your details and respond with next steps shortly.',
} as const;
