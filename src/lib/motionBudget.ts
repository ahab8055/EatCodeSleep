import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Gate continuous ambient GSAP loops on low-power / mobile contexts.
 * Entrance / scroll reveals can still run — this is for repeat:-1 drifts only.
 */
export function shouldRunAmbient(): boolean {
  if (typeof window === 'undefined') return false;
  if (getPrefersReducedMotion()) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  if (window.matchMedia('(max-width: 768px)').matches) return false;

  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
    .connection;
  if (connection?.saveData) return false;

  return true;
}
