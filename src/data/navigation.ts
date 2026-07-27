import type { NavItem } from '@/data/site';

export interface FooterNavColumn {
  id: string;
  title: string;
  links: NavItem[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: 'linkedin' | 'github' | 'x';
}

export interface FooterContent {
  description: string;
  email: string;
  location: string;
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
  };
  cta: {
    text: string;
    buttonLabel: string;
    href: string;
  };
  copyright: string;
  legal: NavItem[];
}

export const footerContent: FooterContent = {
  description:
    'EatCodeSleep builds modern software products, AI-powered solutions, and automation systems that help businesses innovate, scale, and operate efficiently.',
  email: 'hello@eatcodesleep.com',
  location: 'Remote Worldwide',
  newsletter: {
    title: 'Stay updated.',
    description:
      'Get insights about software engineering, AI, automation, and product development.',
    placeholder: 'Email address',
    buttonLabel: 'Subscribe',
  },
  cta: {
    text: 'Have a project in mind?',
    buttonLabel: "Let's Talk",
    href: '/contact/',
  },
  copyright: '© 2026 EatCodeSleep. All rights reserved.',
  legal: [
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Terms', href: '/terms/' },
  ],
};

export const footerNavColumns: FooterNavColumn[] = [
  {
    id: 'services',
    title: 'Services',
    links: [
      { label: 'Web Development', href: '/services/#web-application-development' },
      { label: 'Mobile Development', href: '/services/#mobile-app-development' },
      { label: 'AI Integration', href: '/services/#ai-integration' },
      { label: 'AI Agents', href: '/services/#ai-agents' },
      { label: 'Automation', href: '/services/#automation-systems' },
      { label: 'Cloud Solutions', href: '/services/#cloud-backend-engineering' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Our Process', href: '/#process' },
      { label: 'Case Studies', href: '/work/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    id: 'resources',
    title: 'Resources',
    links: [
      { label: 'Technology Stack', href: '/#technologies' },
      { label: 'Insights', href: '/blog/' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/eatcodesleep',
    icon: 'linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/eatcodesleep',
    icon: 'github',
  },
  {
    id: 'x',
    label: 'X (Twitter)',
    href: 'https://x.com/eatcodesleep',
    icon: 'x',
  },
];
