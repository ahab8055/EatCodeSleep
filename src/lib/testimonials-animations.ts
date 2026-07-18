import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playTestimonialsHeader(root: HTMLElement): void {
  if (root.dataset.testimonialsHeaderAnimated === 'true') {
    return;
  }

  root.dataset.testimonialsHeaderAnimated = 'true';
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

export function playTrustMetrics(root: HTMLElement): void {
  if (root.dataset.trustMetricsAnimated === 'true') {
    return;
  }

  root.dataset.trustMetricsAnimated = 'true';
  registerGsapPlugins();

  const items = root.querySelectorAll<HTMLElement>('[data-trust-metric]');
  const counters = root.querySelectorAll<HTMLElement>('[data-trust-counter]');

  if (getPrefersReducedMotion()) {
    gsap.set(items, { clearProps: 'all', opacity: 1, y: 0 });
    counters.forEach((el) => {
      const value = Number(el.dataset.count ?? 0);
      const prefix = el.dataset.prefix ?? '';
      const suffix = el.dataset.suffix ?? '';
      el.textContent = `${prefix}${value}${suffix}`;
    });
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
      trigger: root.querySelector('[data-trust-metrics]') ?? root,
      start: 'top 85%',
      once: true,
    },
  });

  counters.forEach((element) => {
    const endValue = Number(element.dataset.count ?? 0);
    const prefix = element.dataset.prefix ?? '';
    const suffix = element.dataset.suffix ?? '';
    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        once: true,
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
      },
    });
  });
}

export function playClientLogoMarquee(root: HTMLElement): void {
  if (root.dataset.clientMarqueeAnimated === 'true') {
    return;
  }

  root.dataset.clientMarqueeAnimated = 'true';
  registerGsapPlugins();

  const marquee = root.querySelector<HTMLElement>('[data-client-marquee]');

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

export function playTestimonialCards(root: HTMLElement): void {
  if (root.dataset.testimonialCardsAnimated === 'true') {
    return;
  }

  root.dataset.testimonialCardsAnimated = 'true';
  registerGsapPlugins();

  const cards = root.querySelectorAll<HTMLElement>('[data-testimonial-card]');

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
      trigger: root.querySelector('[data-testimonials-grid]') ?? root,
      start: 'top 80%',
      once: true,
    },
  });
}

export function playSuccessStories(root: HTMLElement): void {
  if (root.dataset.successStoriesAnimated === 'true') {
    return;
  }

  root.dataset.successStoriesAnimated = 'true';
  registerGsapPlugins();

  const left = root.querySelector<HTMLElement>('[data-success-story="0"]');
  const right = root.querySelector<HTMLElement>('[data-success-story="1"]');
  const trigger = root.querySelector('[data-success-stories]') ?? root;

  if (getPrefersReducedMotion()) {
    gsap.set([left, right], { clearProps: 'all', opacity: 1, x: 0 });
    return;
  }

  if (left) {
    gsap.fromTo(
      left,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.power3,
        scrollTrigger: { trigger, start: 'top 80%', once: true },
      },
    );
  }

  if (right) {
    gsap.fromTo(
      right,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.power3,
        delay: 0.1,
        scrollTrigger: { trigger, start: 'top 80%', once: true },
      },
    );
  }
}

export function playRecognitionPanel(root: HTMLElement): void {
  if (root.dataset.recognitionAnimated === 'true') {
    return;
  }

  root.dataset.recognitionAnimated = 'true';
  registerGsapPlugins();

  const panel = root.querySelector<HTMLElement>('[data-recognition-panel]');

  if (!panel) {
    return;
  }

  if (getPrefersReducedMotion()) {
    gsap.set(panel, { clearProps: 'all', opacity: 1, scale: 1 });
    return;
  }

  gsap.fromTo(
    panel,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
      scrollTrigger: {
        trigger: panel,
        start: 'top 85%',
        once: true,
      },
    },
  );
}

export function startTestimonialsAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-trust-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 16 : -14,
      y: index % 2 === 0 ? -12 : 18,
      duration: 10 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-trust-particle]').forEach((el, index) => {
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
