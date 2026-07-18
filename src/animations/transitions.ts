/**
 * Section / content transition helpers.
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

export interface TransitionOptions extends MotionVars {
  duration?: number;
  stagger?: number;
}

/** Fade content out, useful before route changes or step swaps. */
export function fadeOut(
  targets: MotionTarget,
  options: TransitionOptions = {},
): gsap.core.Tween | null {
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 0 });
    return null;
  }

  registerMotion();
  return gsap.to(targets, {
    opacity: 0,
    y: options.y ?? -MOTION.distance.xs,
    duration: options.duration ?? MOTION.duration.fast,
    ease: options.ease ?? MOTION.ease.out,
    stagger: options.stagger,
    ...options,
  });
}

/** Fade content in. */
export function fadeIn(
  targets: MotionTarget,
  options: TransitionOptions = {},
): gsap.core.Tween | null {
  if (isReducedMotion()) {
    clearMotion(targets);
    return null;
  }

  registerMotion();
  return gsap.fromTo(
    targets,
    { opacity: 0, y: options.y ?? MOTION.distance.sm },
    {
      opacity: 1,
      y: 0,
      duration: options.duration ?? MOTION.duration.base,
      ease: options.ease ?? MOTION.ease.power3,
      stagger: options.stagger ?? MOTION.stagger.base,
      ...options,
    },
  );
}

/**
 * Crossfade between two views (e.g. form steps, tab panels).
 */
export function crossfade(
  from: Element | null,
  to: Element | null,
  options: TransitionOptions = {},
): gsap.core.Timeline | null {
  if (!from || !to) return null;

  if (isReducedMotion()) {
    gsap.set(from, { display: 'none', opacity: 0 });
    gsap.set(to, { display: '', opacity: 1, clearProps: 'transform' });
    return null;
  }

  registerMotion();
  const duration = options.duration ?? MOTION.duration.base;
  const timeline = createMotionTimeline();

  timeline.to(from, {
    opacity: 0,
    y: -MOTION.distance.xs,
    duration,
    ease: MOTION.ease.out,
    onComplete: () => {
      (from as HTMLElement).hidden = true;
      gsap.set(from, { clearProps: 'opacity,y' });
    },
  });

  timeline.add(() => {
    (to as HTMLElement).hidden = false;
  });

  timeline.fromTo(
    to,
    { opacity: 0, y: MOTION.distance.sm },
    {
      opacity: 1,
      y: 0,
      duration,
      ease: MOTION.ease.power3,
    },
    '-=0.1',
  );

  return timeline;
}

/**
 * Staggered enter for a list of elements (page mount / step enter).
 */
export function enterStagger(
  targets: MotionTarget,
  options: TransitionOptions & { from?: 'up' | 'left' | 'right' | 'scale' } = {},
): gsap.core.Tween | null {
  if (isReducedMotion()) {
    clearMotion(targets);
    return null;
  }

  registerMotion();

  const from = options.from ?? 'up';
  const fromVars: MotionVars =
    from === 'left'
      ? { opacity: 0, x: -MOTION.distance.md }
      : from === 'right'
        ? { opacity: 0, x: MOTION.distance.md }
        : from === 'scale'
          ? { opacity: 0, scale: 0.96 }
          : { opacity: 0, y: MOTION.distance.md };

  return gsap.fromTo(targets, fromVars, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    duration: options.duration ?? MOTION.duration.slow,
    ease: options.ease ?? MOTION.ease.power3,
    stagger: options.stagger ?? MOTION.stagger.section,
    ...options,
  });
}

/**
 * Auto-bind `[data-transition="..."]` nodes inside a root after mount.
 */
export function playEnterTransitions(root: ParentNode = document): void {
  const items = toArray<HTMLElement>('[data-transition]', root);
  if (!items.length) return;

  if (isReducedMotion()) {
    clearMotion(items);
    return;
  }

  const groups = new Map<string, HTMLElement[]>();
  items.forEach((item) => {
    const key = item.dataset.transition ?? 'up';
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  });

  groups.forEach((nodes, key) => {
    const from =
      key === 'left' || key === 'right' || key === 'scale' || key === 'up'
        ? key
        : 'up';
    enterStagger(nodes, { from });
  });
}
