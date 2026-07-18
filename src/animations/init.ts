/**
 * Optional page bootstrap for the motion design system.
 * Call from a page script when you want declarative data-attribute wiring.
 */
import { initHoverSystem } from '@/animations/magnetic';
import { initParallax } from '@/animations/parallax';
import { revealSection } from '@/animations/scroll';
import { playEnterTransitions } from '@/animations/transitions';
import { isReducedMotion, registerMotion } from '@/animations/gsap';

export interface MotionSystemOptions {
  hover?: boolean;
  parallax?: boolean;
  sections?: boolean;
  enter?: boolean;
}

/**
 * Initialize shared motion behaviors for the current document/root.
 */
export function initMotionSystem(
  root: ParentNode = document,
  options: MotionSystemOptions = {},
): () => void {
  registerMotion();

  const {
    hover = true,
    parallax = true,
    sections = true,
    enter = true,
  } = options;

  const disposers: Array<() => void> = [];

  if (hover) {
    disposers.push(initHoverSystem(root));
  }

  if (parallax && !isReducedMotion()) {
    initParallax(root);
  }

  if (sections && root instanceof Element) {
    root.querySelectorAll<HTMLElement>('[data-motion-section]').forEach((section) => {
      revealSection(section);
    });
  } else if (sections) {
    document.querySelectorAll<HTMLElement>('[data-motion-section]').forEach((section) => {
      revealSection(section);
    });
  }

  if (enter) {
    playEnterTransitions(root);
  }

  return () => disposers.forEach((dispose) => dispose());
}
