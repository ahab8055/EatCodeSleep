/**
 * Text reveal utilities — character, word, line, blur, gradient.
 */
import {
  MOTION,
  clearMotion,
  createMotionTimeline,
  gsap,
  isReducedMotion,
  registerMotion,
  toArray,
  type MotionVars,
} from '@/animations/gsap';

export type TextSplitMode = 'chars' | 'words' | 'lines';

export interface TextRevealScrollTrigger {
  trigger?: Element | string;
  start?: string;
  once?: boolean;
}

export interface TextRevealOptions {
  mode?: TextSplitMode;
  stagger?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  blur?: boolean;
  /** Cascading diagonal stagger (e.g. Build / intelligent / software). */
  cascade?: boolean;
  scrollTrigger?: boolean | TextRevealScrollTrigger;
}

const SPLIT_ATTR = 'data-motion-split';

function wrapToken(token: string, kind: 'char' | 'word' | 'line'): HTMLSpanElement {
  const outer = document.createElement('span');
  outer.className = `motion-${kind}`;
  outer.dataset.motionUnit = kind;
  outer.style.display = kind === 'line' ? 'block' : 'inline-block';

  if (kind === 'char' || kind === 'word') {
    const inner = document.createElement('span');
    inner.className = `motion-${kind}__inner`;
    inner.dataset.motionInner = kind;
    inner.style.display = 'inline-block';
    inner.textContent = token === ' ' ? '\u00A0' : token;
    outer.appendChild(inner);
    if (token === ' ') outer.style.width = '0.3em';
  } else {
    outer.textContent = token;
  }

  return outer;
}

/**
 * Split element text into animated spans.
 * Idempotent — skips if already split.
 */
export function splitText(element: HTMLElement, mode: TextSplitMode = 'words'): HTMLElement[] {
  if (element.dataset[SPLIT_ATTR] === mode) {
    return toArray<HTMLElement>(`[data-motion-inner], [data-motion-unit="line"]`, element);
  }

  const text = element.textContent ?? '';
  element.textContent = '';
  element.dataset[SPLIT_ATTR] = mode;

  if (mode === 'chars') {
    Array.from(text).forEach((char) => {
      element.appendChild(wrapToken(char, 'char'));
    });
    return toArray<HTMLElement>('[data-motion-inner]', element);
  }

  if (mode === 'words') {
    text.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        element.appendChild(document.createTextNode(part));
        return;
      }
      element.appendChild(wrapToken(part, 'word'));
    });
    return toArray<HTMLElement>('[data-motion-inner]', element);
  }

  // lines — split on existing <br> or treat whole as one line group by words as block lines
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const source = lines.length > 1 ? lines : text.split(/\s+/).filter(Boolean);
  source.forEach((line) => {
    const lineEl = wrapToken(line, 'line');
    // For single-line text split by words into cascading lines
    if (lines.length <= 1) {
      lineEl.style.overflow = 'hidden';
      const inner = document.createElement('span');
      inner.dataset.motionInner = 'line';
      inner.style.display = 'inline-block';
      inner.textContent = line;
      lineEl.textContent = '';
      lineEl.appendChild(inner);
    }
    element.appendChild(lineEl);
    element.appendChild(document.createTextNode(' '));
  });

  return toArray<HTMLElement>('[data-motion-inner], [data-motion-unit="line"]', element).filter(
    (el) => el.dataset.motionInner || el.children.length === 0,
  );
}

function resolveTargets(element: HTMLElement, mode: TextSplitMode): HTMLElement[] {
  return splitText(element, mode);
}

function buildScrollTrigger(
  element: HTMLElement,
  scrollTrigger: boolean | TextRevealScrollTrigger | undefined,
): TextRevealScrollTrigger | undefined {
  if (!scrollTrigger) return undefined;
  if (scrollTrigger === true) {
    return { trigger: element, start: MOTION.scroll.start, once: true };
  }
  return { trigger: element, start: MOTION.scroll.start, once: true, ...scrollTrigger };
}

/** Word / char / line reveal with optional cascade stagger. */
export function revealText(
  target: HTMLElement | string,
  options: TextRevealOptions = {},
): gsap.core.Timeline | null {
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return null;

  const mode = options.mode ?? 'words';
  const units = resolveTargets(element, mode);

  if (isReducedMotion()) {
    clearMotion(units);
    clearMotion(element);
    return null;
  }

  registerMotion();

  const stagger = options.stagger ?? (options.cascade ? MOTION.stagger.dramatic : MOTION.stagger.base);
  const from: MotionVars = {
    opacity: 0,
    y: options.cascade ? MOTION.distance.lg : MOTION.distance.md,
    ...(options.blur ? { filter: 'blur(10px)' } : {}),
    ...(options.cascade ? { x: MOTION.distance.sm } : {}),
  };

  const timeline = createMotionTimeline({
    delay: options.delay ?? 0,
    scrollTrigger: buildScrollTrigger(element, options.scrollTrigger),
  });

  timeline.fromTo(units, from, {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    duration: options.duration ?? MOTION.duration.slow,
    ease: options.ease ?? MOTION.ease.power3,
    stagger: options.cascade
      ? { each: stagger, from: 'start' }
      : stagger,
  });

  return timeline;
}

/** Character-by-character reveal. */
export function revealChars(
  target: HTMLElement | string,
  options: Omit<TextRevealOptions, 'mode'> = {},
): gsap.core.Timeline | null {
  return revealText(target, { ...options, mode: 'chars', stagger: options.stagger ?? MOTION.stagger.tight });
}

/** Word-by-word reveal. */
export function revealWords(
  target: HTMLElement | string,
  options: Omit<TextRevealOptions, 'mode'> = {},
): gsap.core.Timeline | null {
  return revealText(target, { ...options, mode: 'words' });
}

/**
 * Line reveal — each word becomes its own line with cascading indent.
 * Example: "Build intelligent software" → staggered descending lines.
 */
export function revealLines(
  target: HTMLElement | string,
  options: Omit<TextRevealOptions, 'mode'> = {},
): gsap.core.Timeline | null {
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return null;

  if (element.dataset[SPLIT_ATTR] !== 'cascade-lines') {
    const words = (element.textContent ?? '').trim().split(/\s+/).filter(Boolean);
    element.textContent = '';
    element.dataset[SPLIT_ATTR] = 'cascade-lines';

    words.forEach((word, index) => {
      const line = document.createElement('span');
      line.className = 'motion-cascade-line';
      line.dataset.motionUnit = 'cascade-line';
      line.style.display = 'block';
      line.style.overflow = 'hidden';
      if (index > 0) {
        line.style.paddingLeft = `${index * 1.25}rem`;
      }

      const inner = document.createElement('span');
      inner.dataset.motionInner = 'cascade-line';
      inner.style.display = 'inline-block';
      inner.textContent = word;
      line.appendChild(inner);
      element.appendChild(line);
    });
  }

  const units = toArray<HTMLElement>('[data-motion-inner="cascade-line"]', element);

  if (isReducedMotion()) {
    clearMotion(units);
    return null;
  }

  registerMotion();

  const timeline = createMotionTimeline({
    delay: options.delay ?? 0,
    scrollTrigger: buildScrollTrigger(element, options.scrollTrigger),
  });

  timeline.fromTo(
    units,
    {
      opacity: 0,
      y: '110%',
      ...(options.blur ? { filter: 'blur(8px)' } : {}),
    },
    {
      opacity: 1,
      y: '0%',
      filter: 'blur(0px)',
      duration: options.duration ?? MOTION.duration.slow,
      ease: options.ease ?? MOTION.ease.power3,
      stagger: options.stagger ?? MOTION.stagger.dramatic,
    },
  );

  return timeline;
}

/** Soft blur → sharp text. */
export function revealBlurText(
  target: HTMLElement | string,
  options: Omit<TextRevealOptions, 'blur'> = {},
): gsap.core.Timeline | null {
  return revealText(target, { ...options, blur: true, mode: options.mode ?? 'words' });
}

/**
 * Animate a gradient shimmer across text.
 * Element should use background-clip:text (or gets it applied).
 */
export function animateGradientText(
  target: HTMLElement | string,
  options: { duration?: number; repeat?: number } = {},
): gsap.core.Tween | null {
  const element =
    typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!element) return null;

  if (isReducedMotion()) return null;

  registerMotion();

  element.classList.add('motion-gradient-text');
  element.style.backgroundImage =
    element.style.backgroundImage ||
    'linear-gradient(110deg, #ffffff 0%, #06b6d4 35%, #4f46e5 55%, #ffffff 100%)';
  element.style.backgroundSize = '220% 100%';
  element.style.webkitBackgroundClip = 'text';
  element.style.backgroundClip = 'text';
  element.style.color = 'transparent';

  return gsap.to(element, {
    backgroundPosition: '100% 50%',
    duration: options.duration ?? 4,
    ease: 'sine.inOut',
    repeat: options.repeat ?? -1,
    yoyo: true,
  });
}
