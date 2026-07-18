import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playFeaturedWorkHeader(root: HTMLElement): void {
  if (root.dataset.featuredHeaderAnimated === 'true') {
    return;
  }

  root.dataset.featuredHeaderAnimated = 'true';
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
      duration: ANIMATION.duration.feature,
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
    timeline.to(lines, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.5');
  }

  if (description) {
    timeline.to(description, { opacity: 1, y: 0 }, '-=0.45');
  }
}

export function playFeaturedProjectCards(root: HTMLElement): void {
  if (root.dataset.featuredProjectsAnimated === 'true') {
    return;
  }

  root.dataset.featuredProjectsAnimated = 'true';
  registerGsapPlugins();

  const cards = root.querySelectorAll<HTMLElement>('[data-project-card]');

  if (getPrefersReducedMotion()) {
    cards.forEach((card) => {
      gsap.set(card.querySelectorAll('[data-project-animate]'), {
        clearProps: 'all',
        opacity: 1,
        y: 0,
        scale: 1,
      });
    });
    return;
  }

  cards.forEach((card) => {
    const media = card.querySelector<HTMLElement>('[data-project-media]');
    const content = card.querySelectorAll<HTMLElement>('[data-project-content]');
    const badges = card.querySelectorAll<HTMLElement>('[data-tech-badge]');
    const results = card.querySelectorAll<HTMLElement>('[data-business-result]');
    const cta = card.querySelector<HTMLElement>('[data-project-cta]');

    if (media) {
      gsap.set(media, { opacity: 0, scale: 0.96 });
    }
    gsap.set(content, { opacity: 0, y: 28 });
    gsap.set(badges, { opacity: 0, y: 12 });
    gsap.set(results, { opacity: 0, y: 12 });
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 12 });
    }

    const timeline = gsap.timeline({
      defaults: {
        duration: ANIMATION.duration.feature,
        ease: ANIMATION.ease.power3,
      },
      scrollTrigger: {
        trigger: card,
        start: 'top 78%',
        once: true,
      },
    });

    if (media) {
      timeline.to(media, { opacity: 1, scale: 1 });
    }

    timeline.to(content, { opacity: 1, y: 0, stagger: 0.08 }, media ? '-=0.55' : 0);

    if (badges.length) {
      timeline.to(
        badges,
        {
          opacity: 1,
          y: 0,
          stagger: ANIMATION.featureStagger,
          duration: ANIMATION.duration.slow,
        },
        '-=0.45',
      );
    }

    if (results.length) {
      timeline.to(
        results,
        {
          opacity: 1,
          y: 0,
          stagger: ANIMATION.featureStagger,
          duration: ANIMATION.duration.slow,
        },
        '-=0.4',
      );
    }

    if (cta) {
      timeline.to(cta, { opacity: 1, y: 0, duration: ANIMATION.duration.slow }, '-=0.3');
    }
  });
}

export function playFeaturedWorkCta(root: HTMLElement): void {
  if (root.dataset.featuredCtaAnimated === 'true') {
    return;
  }

  root.dataset.featuredCtaAnimated = 'true';
  registerGsapPlugins();

  const panel = root.querySelector<HTMLElement>('[data-work-cta]');

  if (!panel) {
    return;
  }

  if (getPrefersReducedMotion()) {
    gsap.set(panel, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    panel,
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.feature,
      ease: ANIMATION.ease.power3,
      scrollTrigger: {
        trigger: panel,
        start: 'top 85%',
        once: true,
      },
    },
  );
}

export function startFeaturedWorkAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-work-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 22 : -18,
      y: index % 2 === 0 ? -16 : 20,
      duration: 11 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}
