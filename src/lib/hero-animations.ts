import { ANIMATION } from '@/lib/constants';
import { createTimeline, gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playHeroEntrance(root: HTMLElement): void {
  registerGsapPlugins();

  const badge = root.querySelector<HTMLElement>('[data-hero-badge]');
  const lines = root.querySelectorAll<HTMLElement>('[data-hero-line]');
  const copy = root.querySelectorAll<HTMLElement>('[data-hero-copy]');
  const actions = root.querySelectorAll<HTMLElement>('[data-hero-action]');
  const visual = root.querySelector<HTMLElement>('[data-hero-visual]');
  const scroll = root.querySelector<HTMLElement>('[data-hero-scroll]');

  if (getPrefersReducedMotion()) {
    gsap.set([badge, lines, copy, actions, visual, scroll], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      scale: 1,
    });
    return;
  }

  gsap.set([badge, lines, copy, actions, scroll], { opacity: 0, y: 24 });
  gsap.set(visual, { opacity: 0, scale: 0.94, y: 20 });

  const timeline = createTimeline({ ease: ANIMATION.ease.expo });

  if (badge) {
    timeline.to(badge, { opacity: 1, y: 0, duration: ANIMATION.duration.base }, 0.15);
  }

  if (lines.length) {
    timeline.to(
      lines,
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION.duration.slow,
        stagger: 0.12,
      },
      '-=0.1',
    );
  }

  if (copy.length) {
    timeline.to(
      copy,
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION.duration.base,
        stagger: 0.06,
      },
      '-=0.35',
    );
  }

  if (actions.length) {
    timeline.to(
      actions,
      {
        opacity: 1,
        y: 0,
        duration: ANIMATION.duration.base,
        stagger: 0.08,
      },
      '-=0.25',
    );
  }

  if (visual) {
    timeline.to(
      visual,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
      },
      0.35,
    );
  }

  if (scroll) {
    timeline.to(scroll, { opacity: 1, y: 0, duration: ANIMATION.duration.base }, '-=0.2');
  }
}

export function startHeroAmbientMotion(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  const glow = root.querySelectorAll<HTMLElement>('[data-hero-glow]');
  const floats = root.querySelectorAll<HTMLElement>('[data-hero-float]');
  const particles = root.querySelectorAll<HTMLElement>('[data-hero-particle]');

  glow.forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 40 : -30,
      y: index % 2 === 0 ? -28 : 36,
      duration: 8 + index * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  floats.forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -12 : 14,
      x: index % 3 === 0 ? 8 : -6,
      rotation: index % 2 === 0 ? 1.5 : -1.2,
      duration: 4.5 + index * 0.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.2,
    });
  });

  particles.forEach((el, index) => {
    gsap.to(el, {
      y: -18 - (index % 5) * 4,
      opacity: 0.15,
      duration: 3 + (index % 4) * 0.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.15,
    });
  });
}
