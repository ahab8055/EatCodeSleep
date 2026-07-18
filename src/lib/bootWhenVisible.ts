import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { whenIdle } from '@/lib/whenIdle';

type BootResult = void | (() => void);
type BootFn = (root: HTMLElement) => BootResult | Promise<BootResult>;

interface BootWhenVisibleOptions {
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** Prefer idle before loading heavy modules (default true) */
  idle?: boolean;
  idleTimeout?: number;
}

/**
 * Defer section motion until near the viewport, then optionally until idle.
 * Returns a disposer that tears down observers / ambient cleanup.
 */
export function bootWhenVisible(
  selector: string,
  boot: BootFn,
  options: BootWhenVisibleOptions = {},
): () => void {
  const root = document.querySelector<HTMLElement>(selector);
  if (!root) return () => undefined;

  const { rootMargin = '180px 0px', idle = true, idleTimeout = 1800 } = options;

  let cancelled = false;
  let started = false;
  let cleanupBoot: (() => void) | undefined;
  let cancelIdle: (() => void) | undefined;
  let observer: IntersectionObserver | undefined;

  const start = async () => {
    if (cancelled || started) return;
    started = true;
    observer?.disconnect();

    if (getPrefersReducedMotion()) {
      // Still allow boot — animation modules usually no-op / snap to final state.
    }

    const result = await boot(root);
    if (cancelled) {
      if (typeof result === 'function') result();
      return;
    }
    if (typeof result === 'function') cleanupBoot = result;
  };

  const onIntersect: IntersectionObserverCallback = (entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    if (idle) {
      cancelIdle = whenIdle(() => {
        void start();
      }, idleTimeout);
    } else {
      void start();
    }
  };

  // Above-the-fold / already visible — don't wait for a second scroll tick forever.
  const rect = root.getBoundingClientRect();
  const alreadyNear =
    rect.top < window.innerHeight + 180 && rect.bottom > -180;

  if (alreadyNear) {
    if (idle) {
      cancelIdle = whenIdle(() => {
        void start();
      }, Math.min(idleTimeout, 900));
    } else {
      void start();
    }
  } else {
    observer = new IntersectionObserver(onIntersect, { rootMargin, threshold: 0.01 });
    observer.observe(root);
  }

  return () => {
    cancelled = true;
    observer?.disconnect();
    cancelIdle?.();
    cleanupBoot?.();
  };
}
