/**
 * Parallax movement utilities.
 */
import {
  MOTION,
  clearMotion,
  gsap,
  isReducedMotion,
  registerMotion,
  toArray,
} from '@/animations/gsap';

export interface ParallaxOptions {
  speed?: number;
  direction?: 'y' | 'x';
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Scroll-linked parallax for a single element.
 * Positive speed moves slower than scroll (recedes); negative advances.
 */
export function parallaxElement(
  target: Element | string,
  options: ParallaxOptions = {},
): gsap.core.Tween | null {
  const element =
    typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return null;

  if (isReducedMotion()) {
    clearMotion(element);
    return null;
  }

  registerMotion();

  const speed = options.speed ?? 0.2;
  const direction = options.direction ?? 'y';
  const distance = MOTION.distance.xl * speed;

  return gsap.fromTo(
    element,
    direction === 'y' ? { y: -distance } : { x: -distance },
    {
      ...(direction === 'y' ? { y: distance } : { x: distance }),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: options.start ?? 'top bottom',
        end: options.end ?? 'bottom top',
        scrub: options.scrub ?? true,
      },
    },
  );
}

/**
 * Apply parallax to all `[data-parallax]` nodes.
 * Optional `data-parallax-speed` (number) and `data-parallax-axis` (`x`|`y`).
 */
export function initParallax(
  root: ParentNode = document,
  selector = '[data-parallax]',
): Array<gsap.core.Tween | null> {
  if (isReducedMotion()) return [];

  return toArray<HTMLElement>(selector, root).map((node) => {
    const speed = Number(node.dataset.parallaxSpeed ?? 0.2);
    const direction = (node.dataset.parallaxAxis === 'x' ? 'x' : 'y') as 'x' | 'y';
    return parallaxElement(node, { speed, direction });
  });
}

/**
 * Soft background layer drift for atmospheric sections.
 */
export function parallaxLayers(
  container: Element | string,
  layerSelector = '[data-parallax-layer]',
): gsap.core.Timeline | null {
  const root =
    typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) return null;

  if (isReducedMotion()) {
    clearMotion(root.querySelectorAll(layerSelector));
    return null;
  }

  registerMotion();

  const layers = toArray<HTMLElement>(layerSelector, root);
  if (!layers.length) return null;

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  layers.forEach((layer, index) => {
    const speed = Number(layer.dataset.parallaxSpeed ?? (index + 1) * 0.12);
    timeline.fromTo(
      layer,
      { y: -MOTION.distance.lg * speed },
      { y: MOTION.distance.lg * speed, ease: 'none' },
      0,
    );
  });

  return timeline;
}
