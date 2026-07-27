/**
 * Design system tokens and shared layout constants.
 * Prefer these over magic numbers in components.
 */

export const COLORS = {
  background: {
    primary: '#050816',
    secondary: '#0B1023',
    card: '#111827',
  },
  brand: {
    primary: '#4F46E5',
    secondary: '#06B6D4',
    accent: '#22C55E',
  },
  text: {
    primary: '#FFFFFF',
    muted: '#94A3B8',
  },
  border: 'rgba(255, 255, 255, 0.08)',
} as const;

export const LAYOUT = {
  containerMaxWidth: 1280,
  radius: 16,
  spacingBase: 8,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.2,
    base: 0.4,
    slow: 0.8,
    feature: 0.9,
  },
  ease: {
    out: 'power2.out',
    inOut: 'power2.inOut',
    expo: 'expo.out',
    power3: 'power3.out',
  },
  stagger: 0.08,
  sectionStagger: 0.15,
  featureStagger: 0.12,
} as const;

export const CARD_TILT = {
  maxDeg: 6,
  scale: 1.01,
  perspective: 900,
  resetMs: 280,
} as const;

export const SITE = {
  name: 'EatCodeSleep',
  url: 'https://eatcodesleep.org',
  locale: 'en_US',
  twitterHandle: '@eatcodesleep',
  /** GA4 Measurement ID (public; not a secret). EAT-170 */
  gaMeasurementId: 'G-4EPHY5DFRX',
} as const;
