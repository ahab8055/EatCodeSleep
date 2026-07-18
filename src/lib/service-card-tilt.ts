import { CARD_TILT } from '@/lib/constants';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

interface TiltState {
  raf: number;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
}

function applyTilt(card: HTMLElement, rotateX: number, rotateY: number, scale: number): void {
  card.style.setProperty('--tilt-x', `${rotateX}deg`);
  card.style.setProperty('--tilt-y', `${rotateY}deg`);
  card.style.setProperty('--tilt-scale', String(scale));
}

function animateTilt(card: HTMLElement, state: TiltState): void {
  state.currentX += (state.targetX - state.currentX) * 0.12;
  state.currentY += (state.targetY - state.currentY) * 0.12;

  const isActive = state.targetX !== 0 || state.targetY !== 0;
  applyTilt(
    card,
    state.currentX,
    state.currentY,
    isActive || Math.abs(state.currentX) > 0.01 ? CARD_TILT.scale : 1,
  );

  if (
    Math.abs(state.targetX - state.currentX) > 0.01 ||
    Math.abs(state.targetY - state.currentY) > 0.01
  ) {
    state.raf = requestAnimationFrame(() => animateTilt(card, state));
    return;
  }

  applyTilt(card, 0, 0, 1);
  state.raf = 0;
}

export function initServiceCardTilt(root: ParentNode = document): void {
  if (getPrefersReducedMotion()) {
    return;
  }

  const cards = root.querySelectorAll<HTMLElement>('[data-service-card]');

  cards.forEach((card) => {
    if (card.dataset.tiltReady === 'true') {
      return;
    }

    card.dataset.tiltReady = 'true';

    const state: TiltState = {
      raf: 0,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const queue = () => {
      if (!state.raf) {
        state.raf = requestAnimationFrame(() => animateTilt(card, state));
      }
    };

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      card.style.setProperty('--mouse-x', `${x * 100}%`);
      card.style.setProperty('--mouse-y', `${y * 100}%`);

      state.targetY = (x - 0.5) * CARD_TILT.maxDeg * 2;
      state.targetX = (0.5 - y) * CARD_TILT.maxDeg * 2;
      queue();
    });

    card.addEventListener('pointerleave', () => {
      state.targetX = 0;
      state.targetY = 0;
      queue();
    });
  });
}
