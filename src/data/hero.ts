import type { NavItem } from '@/data/site';
import { siteConfig } from '@/data/site';

export interface HeroContent {
  badge: string;
  headingLines: [string, string, string];
  subheading: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
}

export const heroContent: HeroContent = {
  badge: 'AI • Software • Automation',
  headingLines: ['Build Software', 'Powered by AI.', 'Designed to Scale.'],
  subheading:
    'We help startups and businesses build modern web platforms, AI-powered applications, mobile experiences, and intelligent automation workflows that accelerate growth.',
  primaryCta: {
    label: 'Book Discovery Call',
    href: siteConfig.bookingUrl,
  },
  secondaryCta: {
    label: 'View Our Work',
    href: '/work/',
  },
};

export const primaryNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
];
