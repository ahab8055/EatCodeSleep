import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playContactHero(root: HTMLElement): void {
  if (root.dataset.heroAnimated === 'true') return;
  root.dataset.heroAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-contact-hero-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-contact-hero-line]');
  const copy = root.querySelector<HTMLElement>('[data-contact-hero-copy]');
  const badge = root.querySelector<HTMLElement>('[data-contact-availability]');
  const visual = root.querySelector<HTMLElement>('[data-contact-hero-visual]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, copy, badge, visual], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      scale: 1,
    });
    return;
  }

  gsap.set([label, lines, copy, badge], { opacity: 0, y: 24 });
  if (visual) gsap.set(visual, { opacity: 0, y: 20, scale: 0.97 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
  });

  if (label) timeline.to(label, { opacity: 1, y: 0 });
  if (lines.length) timeline.to(lines, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.5');
  if (copy) timeline.to(copy, { opacity: 1, y: 0 }, '-=0.45');
  if (badge) timeline.to(badge, { opacity: 1, y: 0 }, '-=0.35');
  if (visual) timeline.to(visual, { opacity: 1, y: 0, scale: 1 }, 0.35);
}

export function playContactReveal(
  root: HTMLElement,
  itemSelector: string,
  mark: string,
  triggerSelector?: string,
): void {
  if (root.dataset[mark] === 'true') return;
  root.dataset[mark] = 'true';
  registerGsapPlugins();

  const items = root.querySelectorAll<HTMLElement>(itemSelector);
  if (!items.length) return;

  if (getPrefersReducedMotion()) {
    gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set(items, { opacity: 0, y: 28 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.ease.power3,
    stagger: ANIMATION.sectionStagger,
    scrollTrigger: {
      trigger: triggerSelector ? (root.querySelector(triggerSelector) ?? root) : root,
      start: 'top 82%',
      once: true,
    },
  });
}

export function startContactAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) return;
  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-contact-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 16 : -14,
      y: index % 2 === 0 ? -12 : 14,
      duration: 9 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-contact-float]').forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -8 : 10,
      duration: 4.2 + index * 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.12,
    });
  });
}
