import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

export function playServicesEntrance(root: HTMLElement): void {
  if (root.dataset.servicesAnimated === 'true') {
    return;
  }

  root.dataset.servicesAnimated = 'true';

  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-section-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-section-line]');
  const description = root.querySelector<HTMLElement>('[data-section-description]');
  const cards = root.querySelectorAll<HTMLElement>('[data-service-card]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, description, cards], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
    });
    return;
  }

  gsap.set([label, lines, description], { opacity: 0, y: 28 });
  gsap.set(cards, { opacity: 0, y: 40 });

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
    timeline.to(
      lines,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
      },
      '-=0.45',
    );
  }

  if (description) {
    timeline.to(description, { opacity: 1, y: 0 }, '-=0.4');
  }

  if (cards.length) {
    timeline.to(
      cards,
      {
        opacity: 1,
        y: 0,
        stagger: ANIMATION.sectionStagger,
      },
      '-=0.25',
    );
  }
}
