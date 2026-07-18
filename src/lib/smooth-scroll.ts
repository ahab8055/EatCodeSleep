import { getLenis } from '@/lib/lenis';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

/** Offset for fixed navbar (h-16 / md:h-20). */
export const ANCHOR_SCROLL_OFFSET = -80;

/** Extra breathing room below sticky chrome when scrolling to anchors. */
const ANCHOR_GAP_PX = 12;

export interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
}

function readDataOffset(anchor: HTMLAnchorElement): number | null {
  const raw = anchor.dataset.scrollOffset;
  if (raw === undefined || raw === '') return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

/**
 * Prefer explicit data-scroll-offset; otherwise account for sticky service nav when present.
 */
export function resolveAnchorOffset(
  target: HTMLElement,
  anchor?: HTMLAnchorElement | null,
): number {
  if (anchor) {
    const explicit = readDataOffset(anchor);
    if (explicit !== null) return explicit;
  }

  const serviceNav = document.querySelector<HTMLElement>('[data-service-nav]');
  const isServiceTarget =
    Boolean(target.closest('[data-service-section]')) ||
    target.hasAttribute('data-service-section');

  if (serviceNav && isServiceTarget) {
    const header = document.querySelector<HTMLElement>('#site-header');
    const headerHeight = header?.getBoundingClientRect().height ?? 80;
    const navHeight = serviceNav.getBoundingClientRect().height;
    return -(headerHeight + navHeight + ANCHOR_GAP_PX);
  }

  return ANCHOR_SCROLL_OFFSET;
}

export function scrollToElement(
  target: string | HTMLElement,
  options: SmoothScrollOptions = {},
): void {
  const element =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(target.startsWith('#') ? target : `#${target}`)
      : target;

  if (!element) {
    return;
  }

  const offset = options.offset ?? resolveAnchorOffset(element);
  const duration = options.duration ?? 1.2;
  const lenis = getLenis();

  if (lenis && !getPrefersReducedMotion()) {
    lenis.scrollTo(element, { offset, duration });
    return;
  }

  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({
    top,
    behavior: getPrefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/**
 * Intercept same-page hash links so Lenis (or native smooth scroll) handles them.
 */
export function initAnchorSmoothScroll(root: ParentNode = document): void {
  root.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    if (anchor.dataset.smoothScrollReady === 'true') {
      return;
    }

    const href = anchor.getAttribute('href');
    if (!href || href === '#') {
      return;
    }

    anchor.dataset.smoothScrollReady = 'true';

    anchor.addEventListener('click', (event) => {
      const target = document.querySelector<HTMLElement>(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToElement(target, { offset: resolveAnchorOffset(target, anchor) });
      history.pushState(null, '', href);
    });
  });
}
