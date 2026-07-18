/**
 * Hover / pointer interaction primitives.
 * Magnetic buttons, card tilt, glow, border, image zoom, icon motion.
 */
import { CARD_TILT } from '@/lib/constants';
import {
  MOTION,
  gsap,
  isReducedMotion,
  registerMotion,
  toArray,
} from '@/animations/gsap';

export interface MagneticOptions {
  strength?: number;
  ease?: number;
  selector?: string;
}

export interface TiltOptions {
  maxDeg?: number;
  scale?: number;
  selector?: string;
}

export interface GlowOptions {
  selector?: string;
}

function prefersFinePointer(): boolean {
  return window.matchMedia('(pointer: fine)').matches;
}

/**
 * Magnetic pull toward the cursor for buttons / CTAs.
 */
export function initMagnetic(
  root: ParentNode = document,
  options: MagneticOptions = {},
): () => void {
  if (isReducedMotion() || !prefersFinePointer()) return () => undefined;

  registerMotion();

  const strength = options.strength ?? 0.35;
  const ease = options.ease ?? 0.18;
  const nodes = toArray<HTMLElement>(
    options.selector ?? '[data-magnetic]',
    root,
  );

  const cleanups: Array<() => void> = [];

  nodes.forEach((node) => {
    if (node.dataset.magneticReady === 'true') return;
    node.dataset.magneticReady = 'true';

    let raf = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      gsap.set(node, { x: currentX, y: currentY });

      if (
        Math.abs(targetX - currentX) > 0.1 ||
        Math.abs(targetY - currentY) > 0.1
      ) {
        raf = requestAnimationFrame(tick);
        return;
      }
      raf = 0;
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      targetX = relX * strength;
      targetY = relY * strength;
      queue();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      queue();
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);

    cleanups.push(() => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      gsap.set(node, { clearProps: 'x,y' });
      delete node.dataset.magneticReady;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Perspective card tilt following pointer.
 */
export function initCardTilt(
  root: ParentNode = document,
  options: TiltOptions = {},
): () => void {
  if (isReducedMotion() || !prefersFinePointer()) return () => undefined;

  const maxDeg = options.maxDeg ?? CARD_TILT.maxDeg;
  const scale = options.scale ?? CARD_TILT.scale;
  const cards = toArray<HTMLElement>(
    options.selector ?? '[data-tilt]',
    root,
  );

  const cleanups: Array<() => void> = [];

  cards.forEach((card) => {
    if (card.dataset.tiltReady === 'true') return;
    card.dataset.tiltReady = 'true';
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = `${CARD_TILT.perspective}px`;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const apply = (rotateX: number, rotateY: number, nextScale: number) => {
      card.style.transform = `perspective(${CARD_TILT.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${nextScale})`;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      const active = targetX !== 0 || targetY !== 0;
      apply(currentX, currentY, active ? scale : 1);

      if (
        Math.abs(targetX - currentX) > 0.01 ||
        Math.abs(targetY - currentY) > 0.01
      ) {
        raf = requestAnimationFrame(tick);
        return;
      }

      apply(0, 0, 1);
      raf = 0;
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty('--mouse-x', `${x * 100}%`);
      card.style.setProperty('--mouse-y', `${y * 100}%`);
      targetY = (x - 0.5) * maxDeg * 2;
      targetX = (0.5 - y) * maxDeg * 2;
      queue();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      queue();
    };

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerleave', onLeave);

    cleanups.push(() => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
      card.style.removeProperty('transform');
      delete card.dataset.tiltReady;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Pointer-following glow highlight via CSS variables.
 */
export function initGlowFollow(
  root: ParentNode = document,
  options: GlowOptions = {},
): () => void {
  if (isReducedMotion() || !prefersFinePointer()) return () => undefined;

  const nodes = toArray<HTMLElement>(
    options.selector ?? '[data-glow]',
    root,
  );
  const cleanups: Array<() => void> = [];

  nodes.forEach((node) => {
    if (node.dataset.glowReady === 'true') return;
    node.dataset.glowReady = 'true';

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty('--glow-x', `${x}%`);
      node.style.setProperty('--glow-y', `${y}%`);
    };

    node.addEventListener('pointermove', onMove);
    cleanups.push(() => {
      node.removeEventListener('pointermove', onMove);
      delete node.dataset.glowReady;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Animated border gradient rotation on hover.
 */
export function initBorderMotion(
  root: ParentNode = document,
  selector = '[data-border-motion]',
): () => void {
  if (isReducedMotion()) return () => undefined;
  registerMotion();

  const nodes = toArray<HTMLElement>(selector, root);
  const tweens: gsap.core.Tween[] = [];

  nodes.forEach((node) => {
    if (node.dataset.borderMotionReady === 'true') return;
    node.dataset.borderMotionReady = 'true';

    const tween = gsap.to(node, {
      '--border-angle': '360deg',
      duration: 4,
      ease: 'none',
      repeat: -1,
      paused: true,
    });

    const play = () => tween.play();
    const pause = () => tween.pause();

    node.addEventListener('pointerenter', play);
    node.addEventListener('pointerleave', pause);
    tweens.push(tween);
  });

  return () => {
    tweens.forEach((tween) => tween.kill());
  };
}

/**
 * Image zoom on parent hover — expects [data-zoom-media] inside [data-zoom].
 */
export function initImageZoom(
  root: ParentNode = document,
  selector = '[data-zoom]',
): () => void {
  if (isReducedMotion()) return () => undefined;
  registerMotion();

  const nodes = toArray<HTMLElement>(selector, root);
  const cleanups: Array<() => void> = [];

  nodes.forEach((node) => {
    if (node.dataset.zoomReady === 'true') return;
    node.dataset.zoomReady = 'true';

    const media =
      node.querySelector<HTMLElement>('[data-zoom-media]') ?? node;

    const enter = () => {
      gsap.to(media, {
        scale: 1.05,
        duration: MOTION.duration.base,
        ease: MOTION.ease.out,
      });
    };
    const leave = () => {
      gsap.to(media, {
        scale: 1,
        duration: MOTION.duration.base,
        ease: MOTION.ease.out,
      });
    };

    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);

    cleanups.push(() => {
      node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave);
      gsap.set(media, { clearProps: 'scale' });
      delete node.dataset.zoomReady;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Subtle icon nudge / rotate on parent hover.
 */
export function initIconMotion(
  root: ParentNode = document,
  selector = '[data-icon-motion]',
): () => void {
  if (isReducedMotion()) return () => undefined;
  registerMotion();

  const nodes = toArray<HTMLElement>(selector, root);
  const cleanups: Array<() => void> = [];

  nodes.forEach((node) => {
    if (node.dataset.iconMotionReady === 'true') return;
    node.dataset.iconMotionReady = 'true';

    const icon =
      node.querySelector<HTMLElement>('[data-icon]') ?? node;

    const enter = () => {
      gsap.to(icon, {
        x: 3,
        rotate: 6,
        duration: MOTION.duration.fast,
        ease: MOTION.ease.snappy,
      });
    };
    const leave = () => {
      gsap.to(icon, {
        x: 0,
        rotate: 0,
        duration: MOTION.duration.fast,
        ease: MOTION.ease.out,
      });
    };

    node.addEventListener('pointerenter', enter);
    node.addEventListener('pointerleave', leave);

    cleanups.push(() => {
      node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave);
      gsap.set(icon, { clearProps: 'x,rotate' });
      delete node.dataset.iconMotionReady;
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/**
 * Initialize all hover interaction layers for a page root.
 */
export function initHoverSystem(root: ParentNode = document): () => void {
  const disposers = [
    initMagnetic(root),
    initCardTilt(root),
    initGlowFollow(root),
    initBorderMotion(root),
    initImageZoom(root),
    initIconMotion(root),
  ];

  return () => disposers.forEach((dispose) => dispose());
}
