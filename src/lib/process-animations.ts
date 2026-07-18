import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playProcessHeaderEntrance(root: HTMLElement): void {
  if (root.dataset.processHeaderAnimated === 'true') {
    return;
  }

  root.dataset.processHeaderAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-section-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-section-line]');
  const description = root.querySelector<HTMLElement>('[data-section-description]');
  const sticky = root.querySelector<HTMLElement>('[data-process-sticky]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, description, sticky], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
    });
    return;
  }

  gsap.set([label, lines, description, sticky], { opacity: 0, y: 28 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
    scrollTrigger: {
      trigger: root,
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

  if (sticky) {
    timeline.to(sticky, { opacity: 1, y: 0 }, '-=0.35');
  }
}

export function playProcessStepsEntrance(root: HTMLElement): void {
  if (root.dataset.processStepsAnimated === 'true') {
    return;
  }

  root.dataset.processStepsAnimated = 'true';
  registerGsapPlugins();

  const steps = root.querySelectorAll<HTMLElement>('[data-process-step]');

  if (getPrefersReducedMotion()) {
    steps.forEach((step) => {
      gsap.set(step.querySelectorAll('[data-step-animate]'), {
        clearProps: 'all',
        opacity: 1,
        y: 0,
        scale: 1,
        scaleY: 1,
      });
    });
    return;
  }

  steps.forEach((step) => {
    const connector = step.querySelector<HTMLElement>('[data-step-connector]');
    const number = step.querySelector<HTMLElement>('[data-step-number]');
    const icon = step.querySelector<HTMLElement>('[data-step-icon]');
    const title = step.querySelector<HTMLElement>('[data-step-title]');
    const copy = step.querySelector<HTMLElement>('[data-step-copy]');

    if (connector) {
      gsap.set(connector, { scaleY: 0, transformOrigin: 'top center' });
    }
    if (number) {
      gsap.set(number, { opacity: 0, scale: 0.7 });
    }
    if (icon) {
      gsap.set(icon, { opacity: 0 });
    }
    if (title) {
      gsap.set(title, { opacity: 0, y: 20 });
    }
    if (copy) {
      gsap.set(copy, { opacity: 0, y: 16 });
    }

    const timeline = gsap.timeline({
      defaults: {
        duration: ANIMATION.duration.slow,
        ease: ANIMATION.ease.power3,
      },
      scrollTrigger: {
        trigger: step,
        start: 'top 80%',
        once: true,
      },
    });

    if (connector) {
      timeline.to(connector, { scaleY: 1 });
    }

    if (number) {
      timeline.to(number, { opacity: 1, scale: 1 }, connector ? '-=0.45' : 0);
    }

    if (icon) {
      timeline.to(icon, { opacity: 1 }, '-=0.5');
    }

    if (title) {
      timeline.to(title, { opacity: 1, y: 0 }, '-=0.45');
    }

    if (copy) {
      timeline.to(copy, { opacity: 1, y: 0 }, '-=0.5');
    }
  });
}

export function playProcessStatsEntrance(root: HTMLElement): void {
  if (root.dataset.processStatsAnimated === 'true') {
    return;
  }

  root.dataset.processStatsAnimated = 'true';
  registerGsapPlugins();

  const items = root.querySelectorAll<HTMLElement>('[data-stat-item]');
  const counters = root.querySelectorAll<HTMLElement>('[data-stat-counter]');

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
      trigger: root,
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

export function startProcessAmbientMotion(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-process-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 20 : -16,
      y: index % 2 === 0 ? -14 : 18,
      duration: 10 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-process-particle]').forEach((el, index) => {
    gsap.to(el, {
      y: -10 - (index % 3) * 3,
      opacity: 0.12,
      duration: 3 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    });
  });
}

export function startProcessJourney(root: HTMLElement): void {
  const timeline = root.querySelector<HTMLElement>('[data-process-timeline]');
  const journey = root.querySelector<HTMLElement>('[data-process-journey]');
  if (!timeline || !journey) return;

  if (getPrefersReducedMotion()) {
    journey.style.setProperty('--journey-progress', '1');
    return;
  }

  registerGsapPlugins();

  const state = { progress: 0 };

  gsap.to(state, {
    progress: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: timeline,
      start: 'top 70%',
      end: 'bottom 35%',
      scrub: 0.45,
    },
    onUpdate: () => {
      journey.style.setProperty('--journey-progress', String(state.progress));
    },
  });
}
