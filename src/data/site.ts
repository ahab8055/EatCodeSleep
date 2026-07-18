import { bookingUrl } from '@/lib/booking';
import { SITE } from '@/lib/constants';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  locale: string;
  twitterHandle: string;
  email: string;
  /** Google Calendar Appointment Schedule (Meet) public booking page */
  bookingUrl: string;
  navigation: NavItem[];
  footer: {
    navigation: NavItem[];
    legal: NavItem[];
  };
}

export const siteConfig: SiteConfig = {
  name: SITE.name,
  tagline: 'Software that works as hard as you do.',
  description:
    'EatCodeSleep is a premium software agency building high-performance products, platforms, and digital experiences.',
  url: SITE.url,
  locale: SITE.locale,
  twitterHandle: SITE.twitterHandle,
  email: 'hello@eatcodesleep.com',
  bookingUrl,
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Work', href: '/work/' },
    { label: 'About', href: '/about/' },
    { label: 'Insights', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
  ],
  footer: {
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services/' },
      { label: 'Work', href: '/work/' },
      { label: 'About', href: '/about/' },
      { label: 'Insights', href: '/blog/' },
      { label: 'Contact', href: '/contact/' },
    ],
    legal: [
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Terms', href: '/terms/' },
    ],
  },
};
