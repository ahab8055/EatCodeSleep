import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION } from '@/lib/constants';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

let registered = false;

export function registerGsapPlugins(): typeof gsap {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
}

export function createTimeline(defaults?: gsap.TweenVars): gsap.core.Timeline {
  registerGsapPlugins();

  return gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.base,
      ease: ANIMATION.ease.out,
      ...defaults,
    },
  });
}

export function fadeInUp(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars = {},
): gsap.core.Tween | null {
  if (getPrefersReducedMotion()) {
    gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 });
    return null;
  }

  registerGsapPlugins();

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.base,
      ease: ANIMATION.ease.out,
      ...options,
    },
  );
}

export function revealOnScroll(
  targets: gsap.TweenTarget,
  options: gsap.TweenVars & { start?: string } = {},
): gsap.core.Tween | null {
  if (getPrefersReducedMotion()) {
    gsap.set(targets, { clearProps: 'all', opacity: 1, y: 0 });
    return null;
  }

  registerGsapPlugins();

  const { start = 'top 85%', ...tweenOptions } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.out,
      stagger: ANIMATION.stagger,
      scrollTrigger: {
        trigger: targets as gsap.DOMTarget,
        start,
        toggleActions: 'play none none none',
      },
      ...tweenOptions,
    },
  );
}

export { gsap, ScrollTrigger };
