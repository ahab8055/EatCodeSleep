/**
 * Scroll-triggered reveal primitives.
 */
import {
  MOTION,
  clearMotion,
  createMotionTimeline,
  gsap,
  isReducedMotion,
  registerMotion,
  toArray,
  type MotionTarget,
  type MotionVars,
} from '@/animations/gsap';

export interface ScrollRevealOptions extends MotionVars {
  trigger?: Element | string;
  start?: string;
  once?: boolean;
  markers?: boolean;
}

function withScrollTrigger(
  trigger: Element | string | undefined,
  targets: MotionTarget,
  options: ScrollRevealOptions,
): {
  trigger: gsap.DOMTarget;
  start: string;
  once: boolean;
  markers: boolean;
} {
  const { start = MOTION.scroll.start, once = true, markers = false } = options;
  return {
    trigger: (trigger ?? (Array.isArray(targets) ? targets[0] : targets)) as gsap.DOMTarget,
    start,
    once,
    markers,
  };
}

function playFromTo(
  targets: MotionTarget,
  from: MotionVars,
  to: MotionVars,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  if (isReducedMotion()) {
    clearMotion(targets);
    return null;
  }

  registerMotion();
  const { trigger, start, once, markers, ...tweenOptions } = options;

  return gsap.fromTo(targets, from, {
    ...to,
    duration: to.duration ?? MOTION.duration.slow,
    ease: to.ease ?? MOTION.ease.power3,
    stagger: to.stagger ?? MOTION.stagger.base,
    scrollTrigger: withScrollTrigger(trigger, targets, { start, once, markers }),
    ...tweenOptions,
  });
}

/** Fade + rise into place. */
export function fadeUp(
  targets: MotionTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  return playFromTo(
    targets,
    { opacity: 0, y: MOTION.distance.md },
    { opacity: 1, y: 0 },
    options,
  );
}

/** Slide in from the left. */
export function slideFromLeft(
  targets: MotionTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  return playFromTo(
    targets,
    { opacity: 0, x: -MOTION.distance.lg },
    { opacity: 1, x: 0 },
    options,
  );
}

/** Slide in from the right. */
export function slideFromRight(
  targets: MotionTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  return playFromTo(
    targets,
    { opacity: 0, x: MOTION.distance.lg },
    { opacity: 1, x: 0 },
    options,
  );
}

/** Scale up from slightly smaller. */
export function scaleReveal(
  targets: MotionTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  return playFromTo(
    targets,
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1 },
    options,
  );
}

/** Blur softens into sharp focus. */
export function blurReveal(
  targets: MotionTarget,
  options: ScrollRevealOptions = {},
): gsap.core.Tween | null {
  return playFromTo(
    targets,
    { opacity: 0, filter: 'blur(12px)', y: MOTION.distance.sm },
    { opacity: 1, filter: 'blur(0px)', y: 0 },
    options,
  );
}

/**
 * Stagger children inside a container on scroll.
 * Useful for card grids and icon rows.
 */
export function staggerChildren(
  container: Element | string,
  childSelector: string,
  options: ScrollRevealOptions & { effect?: 'fadeUp' | 'scale' | 'blur' } = {},
): gsap.core.Tween | null {
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) return null;

  const children = toArray<HTMLElement>(childSelector, root);
  if (!children.length) return null;

  const effect = options.effect ?? 'fadeUp';
  if (effect === 'scale') return scaleReveal(children, { ...options, trigger: root });
  if (effect === 'blur') return blurReveal(children, { ...options, trigger: root });
  return fadeUp(children, { ...options, trigger: root });
}

/**
 * Orchestrate a section header + body reveal.
 */
export function revealSection(
  section: HTMLElement,
  options: {
    header?: string;
    items?: string;
    start?: string;
  } = {},
): gsap.core.Timeline | null {
  if (isReducedMotion()) {
    clearMotion(section.querySelectorAll('[data-motion]'));
    return null;
  }

  const header = options.header
    ? toArray<HTMLElement>(options.header, section)
    : toArray<HTMLElement>('[data-motion-header]', section);
  const items = options.items
    ? toArray<HTMLElement>(options.items, section)
    : toArray<HTMLElement>('[data-motion-item]', section);

  const timeline = createMotionTimeline({
    scrollTrigger: {
      trigger: section,
      start: options.start ?? MOTION.scroll.start,
      once: true,
    },
  });

  if (header.length) {
    timeline.fromTo(
      header,
      { opacity: 0, y: MOTION.distance.md },
      {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.slow,
        stagger: MOTION.stagger.base,
      },
    );
  }

  if (items.length) {
    timeline.fromTo(
      items,
      { opacity: 0, y: MOTION.distance.md },
      {
        opacity: 1,
        y: 0,
        duration: MOTION.duration.slow,
        stagger: MOTION.stagger.section,
      },
      header.length ? '-=0.45' : 0,
    );
  }

  return timeline;
}
