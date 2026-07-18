/**
 * Desktop-only custom cursor: glowing dot that expands on interactive hover.
 * RAF only runs while the pointer is moving or catching up — not forever.
 */
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

const HOVER_SELECTOR =
  'a, button, [role="button"], [data-magnetic], [data-cursor-hover], input, textarea, select, summary, label[for]';

function canUseCustomCursor(): boolean {
  if (typeof window === 'undefined') return false;
  if (getPrefersReducedMotion()) return false;
  return window.matchMedia('(pointer: fine)').matches;
}

export function initCustomCursor(root: ParentNode = document): () => void {
  if (!canUseCustomCursor()) return () => undefined;

  const cursor =
    (root instanceof Document ? root : document).querySelector<HTMLElement>('[data-fx-cursor]') ??
    document.querySelector<HTMLElement>('[data-fx-cursor]');

  if (!cursor || cursor.dataset.cursorReady === 'true') {
    return () => undefined;
  }

  cursor.dataset.cursorReady = 'true';
  document.documentElement.classList.add('has-custom-cursor');

  let visible = false;
  let hovering = false;
  let raf = 0;
  let currentX = -100;
  let currentY = -100;
  let targetX = -100;
  let targetY = -100;

  const stopRaf = () => {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const render = () => {
    currentX += (targetX - currentX) * 0.28;
    currentY += (targetY - currentY) * 0.28;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

    const settled =
      Math.abs(targetX - currentX) < 0.35 && Math.abs(targetY - currentY) < 0.35;

    if (settled) {
      currentX = targetX;
      currentY = targetY;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      raf = 0;
      return;
    }

    raf = requestAnimationFrame(render);
  };

  const ensureRaf = () => {
    if (!raf) raf = requestAnimationFrame(render);
  };

  const onMove = (event: PointerEvent) => {
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      visible = true;
      currentX = targetX;
      currentY = targetY;
      cursor.classList.add('is-visible');
    }
    ensureRaf();
  };

  const onOver = (event: PointerEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    hovering = Boolean(target.closest(HOVER_SELECTOR));
    cursor.classList.toggle('is-hover', hovering);
  };

  const onDown = () => cursor.classList.add('is-pressed');
  const onUp = () => cursor.classList.remove('is-pressed');
  const onLeave = () => {
    visible = false;
    cursor.classList.remove('is-visible', 'is-hover', 'is-pressed');
    stopRaf();
  };

  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerover', onOver, { passive: true });
  document.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('pointerup', onUp, { passive: true });
  document.addEventListener('pointerleave', onLeave, { passive: true });

  return () => {
    stopRaf();
    document.removeEventListener('pointermove', onMove);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerup', onUp);
    document.removeEventListener('pointerleave', onLeave);
    document.documentElement.classList.remove('has-custom-cursor');
    cursor.classList.remove('is-visible', 'is-hover', 'is-pressed');
    delete cursor.dataset.cursorReady;
  };
}
