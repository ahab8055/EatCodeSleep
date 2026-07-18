import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

const FAQ_ITEM_DURATION = 0.7;
const FAQ_ITEM_STAGGER = 0.1;
const FAQ_ITEM_OFFSET_Y = 30;

export function playFaqHeader(root: HTMLElement): void {
  if (root.dataset.faqHeaderAnimated === 'true') {
    return;
  }

  root.dataset.faqHeaderAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-section-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-section-line]');
  const description = root.querySelector<HTMLElement>('[data-section-description]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, description], { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set([label, lines, description], { opacity: 0, y: 28 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
    scrollTrigger: {
      trigger: root.querySelector('[data-section-heading]') ?? root,
      start: 'top 75%',
      once: true,
    },
  });

  if (label) {
    timeline.to(label, { opacity: 1, y: 0 });
  }

  if (lines.length) {
    timeline.to(lines, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.45');
  }

  if (description) {
    timeline.to(description, { opacity: 1, y: 0 }, '-=0.4');
  }
}

export function playFaqSidebar(root: HTMLElement): void {
  if (root.dataset.faqSidebarAnimated === 'true') {
    return;
  }

  root.dataset.faqSidebarAnimated = 'true';
  registerGsapPlugins();

  const sidebar = root.querySelector<HTMLElement>('[data-faq-sidebar]');

  if (!sidebar) {
    return;
  }

  if (getPrefersReducedMotion()) {
    gsap.set(sidebar, { clearProps: 'all', opacity: 1, x: 0 });
    return;
  }

  gsap.fromTo(
    sidebar,
    { opacity: 0, x: -36 },
    {
      opacity: 1,
      x: 0,
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
      scrollTrigger: {
        trigger: sidebar,
        start: 'top 80%',
        once: true,
      },
    },
  );
}

export function playFaqItems(root: HTMLElement): void {
  if (root.dataset.faqItemsAnimated === 'true') {
    return;
  }

  root.dataset.faqItemsAnimated = 'true';
  registerGsapPlugins();

  const items = root.querySelectorAll<HTMLElement>('[data-faq-item]');

  if (getPrefersReducedMotion()) {
    gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set(items, { opacity: 0, y: FAQ_ITEM_OFFSET_Y });

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: FAQ_ITEM_DURATION,
    ease: ANIMATION.ease.power3,
    stagger: FAQ_ITEM_STAGGER,
    scrollTrigger: {
      trigger: root.querySelector('[data-faq-accordion]') ?? root,
      start: 'top 80%',
      once: true,
    },
  });
}

export function startFaqAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-faq-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 16 : -14,
      y: index % 2 === 0 ? -12 : 16,
      duration: 10 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-faq-particle]').forEach((el, index) => {
    gsap.to(el, {
      y: -8 - (index % 3) * 3,
      opacity: 0.12,
      duration: 3.2 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    });
  });
}
