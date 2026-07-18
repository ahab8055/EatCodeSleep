/**
 * Client-side reduced-motion helpers for animation scripts.
 * Prefer Astro components; use these only in client islands/scripts.
 */

export function getPrefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function onReducedMotionChange(callback: (reduced: boolean) => void): () => void {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (event: MediaQueryListEvent) => callback(event.matches);

  media.addEventListener('change', handler);
  callback(media.matches);

  return () => media.removeEventListener('change', handler);
}
