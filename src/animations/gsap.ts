/**
 * Motion design system — GSAP core.
 * Single registration point + shared defaults for all animation modules.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION } from '@/lib/constants';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

let registered = false;

export const MOTION = {
  duration: {
    instant: 0.15,
    fast: ANIMATION.duration.fast,
    base: ANIMATION.duration.base,
    slow: ANIMATION.duration.slow,
    feature: ANIMATION.duration.feature,
    cinematic: 1.2,
  },
  ease: {
    out: ANIMATION.ease.out,
    inOut: ANIMATION.ease.inOut,
    expo: ANIMATION.ease.expo,
    power3: ANIMATION.ease.power3,
    soft: 'power1.out',
    snappy: 'back.out(1.4)',
  },
  stagger: {
    tight: 0.04,
    base: ANIMATION.stagger,
    section: ANIMATION.sectionStagger,
    feature: ANIMATION.featureStagger,
    dramatic: 0.18,
  },
  distance: {
    xs: 12,
    sm: 20,
    md: 28,
    lg: 40,
    xl: 64,
  },
  scroll: {
    start: 'top 85%',
    startEarly: 'top 90%',
    startLate: 'top 75%',
  },
} as const;

export type MotionTarget = gsap.TweenTarget;
export type MotionVars = gsap.TweenVars;

export function isReducedMotion(): boolean {
  return typeof window !== 'undefined' && getPrefersReducedMotion();
}

export function registerMotion(): typeof gsap {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return gsap;
}

export function createMotionTimeline(defaults?: MotionVars): gsap.core.Timeline {
  registerMotion();
  return gsap.timeline({
    defaults: {
      duration: MOTION.duration.base,
      ease: MOTION.ease.power3,
      ...defaults,
    },
  });
}

/** Instantly clear animated state for reduced-motion users. */
export function clearMotion(targets: MotionTarget, props: MotionVars = {}): void {
  registerMotion();
  gsap.set(targets, {
    clearProps: 'all',
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: 'none',
    ...props,
  });
}

export function toArray<T extends Element>(
  targets: string | Element | Element[] | NodeListOf<Element> | null | undefined,
  root: ParentNode = document,
): T[] {
  if (!targets) return [];
  if (typeof targets === 'string') {
    return Array.from(root.querySelectorAll(targets)) as T[];
  }
  if (targets instanceof Element) return [targets as T];
  return Array.from(targets) as T[];
}

export { gsap, ScrollTrigger };
