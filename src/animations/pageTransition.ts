/**
 * Gradient wipe overlay coordinated with Astro View Transitions.
 */
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

export function initPageTransitions(): () => void {
  if (getPrefersReducedMotion()) return () => undefined;

  const wipe = document.querySelector<HTMLElement>('[data-page-wipe]');
  if (!wipe || wipe.dataset.wipeReady === 'true') return () => undefined;
  wipe.dataset.wipeReady = 'true';

  let revealTimer = 0;

  const onPrepare = () => {
    wipe.classList.remove('is-entering');
    wipe.classList.add('is-leaving');
  };

  const onAfterSwap = () => {
    wipe.classList.remove('is-leaving');
    wipe.classList.add('is-entering');
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(() => {
      wipe.classList.remove('is-entering');
    }, 520);
  };

  document.addEventListener('astro:before-preparation', onPrepare);
  document.addEventListener('astro:after-swap', onAfterSwap);

  return () => {
    window.clearTimeout(revealTimer);
    document.removeEventListener('astro:before-preparation', onPrepare);
    document.removeEventListener('astro:after-swap', onAfterSwap);
    delete wipe.dataset.wipeReady;
    wipe.classList.remove('is-leaving', 'is-entering');
  };
}
