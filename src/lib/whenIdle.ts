/**
 * Run work after the browser is idle (or shortly after load as a fallback).
 * Also starts earlier on first user interaction so FX feel snappy.
 */
export function whenIdle(task: () => void, timeout = 2200): () => void {
  let done = false;
  let idleId: number | undefined;
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const run = () => {
    if (done) return;
    done = true;
    cleanup();
    task();
  };

  const onInteract = () => run();

  const cleanup = () => {
    if (idleId !== undefined && typeof cancelIdleCallback === 'function') {
      cancelIdleCallback(idleId);
      idleId = undefined;
    }
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
    window.removeEventListener('pointerdown', onInteract);
    window.removeEventListener('keydown', onInteract);
    window.removeEventListener('touchstart', onInteract);
  };

  window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
  window.addEventListener('keydown', onInteract, { once: true });
  window.addEventListener('touchstart', onInteract, { once: true, passive: true });

  if (typeof requestIdleCallback === 'function') {
    idleId = requestIdleCallback(run, { timeout });
  } else {
    timeoutId = setTimeout(run, Math.min(timeout, 400));
  }

  return () => {
    done = true;
    cleanup();
  };
}
