import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playFinalCtaEntrance(root: HTMLElement): void {
  if (root.dataset.finalCtaAnimated === 'true') {
    return;
  }

  root.dataset.finalCtaAnimated = 'true';
  registerGsapPlugins();

  const eyebrow = root.querySelector<HTMLElement>('[data-cta-eyebrow]');
  const words = root.querySelectorAll<HTMLElement>('[data-cta-word]');
  const description = root.querySelector<HTMLElement>('[data-cta-description]');
  const actions = root.querySelectorAll<HTMLElement>('[data-cta-action]');
  const availability = root.querySelector<HTMLElement>('[data-cta-availability]');
  const social = root.querySelector<HTMLElement>('[data-cta-social]');
  const visual = root.querySelector<HTMLElement>('[data-cta-visual]');

  if (getPrefersReducedMotion()) {
    gsap.set([eyebrow, words, description, actions, availability, social, visual], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      scale: 1,
    });
    return;
  }

  gsap.set(eyebrow, { opacity: 0, y: 24 });
  gsap.set(words, { opacity: 0, y: 28 });
  gsap.set(description, { opacity: 0, y: 24 });
  gsap.set(actions, { opacity: 0, scale: 0.94, y: 16 });
  gsap.set(availability, { opacity: 0, y: 16 });
  gsap.set(social, { opacity: 0, y: 16 });
  gsap.set(visual, { opacity: 0, y: 40, scale: 0.96 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
    scrollTrigger: {
      trigger: root,
      start: 'top 70%',
      once: true,
    },
  });

  if (eyebrow) {
    timeline.to(eyebrow, { opacity: 1, y: 0 });
  }

  if (words.length) {
    timeline.to(
      words,
      {
        opacity: 1,
        y: 0,
        stagger: 0.06,
      },
      '-=0.35',
    );
  }

  if (description) {
    timeline.to(description, { opacity: 1, y: 0 }, '-=0.35');
  }

  if (actions.length) {
    timeline.to(
      actions,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
      },
      '-=0.3',
    );
  }

  if (availability) {
    timeline.to(availability, { opacity: 1, y: 0 }, '-=0.35');
  }

  if (social) {
    timeline.to(social, { opacity: 1, y: 0 }, '-=0.4');
  }

  if (visual) {
    timeline.to(visual, { opacity: 1, y: 0, scale: 1 }, '-=0.55');
  }
}

export function startFinalCtaAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) {
    return;
  }

  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-cta-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 36 : -28,
      y: index % 2 === 0 ? -24 : 30,
      duration: 12 + index * 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-cta-particle]').forEach((el, index) => {
    gsap.to(el, {
      y: -14 - (index % 4) * 4,
      opacity: 0.15,
      duration: 3.4 + index * 0.25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.12,
    });
  });

  const visual = root.querySelector<HTMLElement>('[data-cta-visual-float]');

  if (visual) {
    gsap.to(visual, {
      y: -12,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }
}
