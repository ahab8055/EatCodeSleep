import Lenis from 'lenis';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

export interface LenisInitOptions {
  duration?: number;
  smoothWheel?: boolean;
}

let lenisInstance: Lenis | null = null;
let rafId = 0;

export function initLenis(options: LenisInitOptions = {}): Lenis | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (getPrefersReducedMotion()) {
    return null;
  }

  // Native scroll is smoother + cheaper on touch / low-power contexts.
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );
  if (coarse || saveData) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: options.duration ?? 1.1,
    smoothWheel: options.smoothWheel ?? true,
    touchMultiplier: 1.5,
  });

  const raf = (time: number) => {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  };

  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

export function destroyLenis(): void {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  lenisInstance?.destroy();
  lenisInstance = null;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
