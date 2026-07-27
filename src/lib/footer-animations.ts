import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playFooterEntrance(root: HTMLElement): void {
  if (root.dataset.footerAnimated === 'true') {
    return;
  }

  root.dataset.footerAnimated = 'true';
  registerGsapPlugins();

  const brand = root.querySelector<HTMLElement>('[data-footer-brand] a, [data-footer-brand] [data-footer-logo]');
  const description = root.querySelector<HTMLElement>('[data-footer-description]');
  const columns = root.querySelectorAll<HTMLElement>('[data-footer-column]');
  const newsletter = root.querySelector<HTMLElement>('[data-footer-newsletter]');
  const cta = root.querySelector<HTMLElement>('[data-footer-cta]');
  const bottom = root.querySelector<HTMLElement>('[data-footer-bottom]');

  if (getPrefersReducedMotion()) {
    gsap.set([brand, description, columns, newsletter, cta, bottom], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
    });
    return;
  }

  gsap.set(brand, { opacity: 0, y: 40 });
  gsap.set(description, { opacity: 0, y: 24 });
  gsap.set(columns, { opacity: 0, y: 28 });
  gsap.set(newsletter, { opacity: 0, y: 24 });
  gsap.set(cta, { opacity: 0, y: 20 });
  gsap.set(bottom, { opacity: 0, y: 16 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 85%',
      once: true,
    },
  });

  if (brand) {
    timeline.to(brand, { opacity: 1, y: 0 });
  }

  if (description) {
    timeline.to(description, { opacity: 1, y: 0 }, '-=0.45');
  }

  if (columns.length) {
    timeline.to(columns, { opacity: 1, y: 0, stagger: 0.08 }, '-=0.35');
  }

  if (newsletter) {
    timeline.to(newsletter, { opacity: 1, y: 0 }, '-=0.35');
  }

  if (cta) {
    timeline.to(cta, { opacity: 1, y: 0 }, '-=0.4');
  }

  if (bottom) {
    timeline.to(bottom, { opacity: 1, y: 0 }, '-=0.45');
  }
}

export function startFooterAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  const brandBlock = root.querySelector<HTMLElement>('[data-footer-brand]');

  if (brandBlock) {
    gsap.to(brandBlock, {
      y: -8,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }

  root.querySelectorAll<HTMLElement>('[data-footer-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 20 : -16,
      y: index % 2 === 0 ? -14 : 18,
      duration: 12 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}
