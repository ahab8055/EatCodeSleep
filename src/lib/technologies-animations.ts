import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playTechnologiesHeader(root: HTMLElement): void {
  if (root.dataset.techHeaderAnimated === 'true') {
    return;
  }

  root.dataset.techHeaderAnimated = 'true';
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

export function playTechnologyCategories(root: HTMLElement): void {
  if (root.dataset.techCategoriesAnimated === 'true') {
    return;
  }

  root.dataset.techCategoriesAnimated = 'true';
  registerGsapPlugins();

  const cards = root.querySelectorAll<HTMLElement>('[data-tech-category]');

  if (getPrefersReducedMotion()) {
    gsap.set(cards, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set(cards, { opacity: 0, y: 36 });

  gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.ease.power3,
    stagger: ANIMATION.sectionStagger,
    scrollTrigger: {
      trigger: root.querySelector('[data-tech-grid]') ?? root,
      start: 'top 80%',
      once: true,
    },
  });
}

export function playEngineeringPrinciples(root: HTMLElement): void {
  if (root.dataset.techPrinciplesAnimated === 'true') {
    return;
  }

  root.dataset.techPrinciplesAnimated = 'true';
  registerGsapPlugins();

  const items = root.querySelectorAll<HTMLElement>('[data-engineering-principle]');

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
      trigger: root.querySelector('[data-engineering-principles]') ?? root,
      start: 'top 85%',
      once: true,
    },
  });
}

export function playTechnologyMarquee(root: HTMLElement): void {
  if (root.dataset.techMarqueeAnimated === 'true') {
    return;
  }

  root.dataset.techMarqueeAnimated = 'true';
  registerGsapPlugins();

  const marquee = root.querySelector<HTMLElement>('[data-tech-marquee]');

  if (!marquee) {
    return;
  }

  if (getPrefersReducedMotion()) {
    gsap.set(marquee, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    marquee,
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
      scrollTrigger: {
        trigger: marquee,
        start: 'top 90%',
        once: true,
      },
    },
  );
}

export function startTechnologiesAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-tech-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 18 : -14,
      y: index % 2 === 0 ? -12 : 16,
      duration: 10 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-tech-particle]').forEach((el, index) => {
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
