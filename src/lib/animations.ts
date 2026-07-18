import { ANIMATION } from '@/lib/constants';
import { createTimeline, fadeInUp, gsap, registerGsapPlugins, revealOnScroll } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

export function animateHeroEntrance(root: HTMLElement): gsap.core.Timeline | null {
  if (getPrefersReducedMotion()) {
    gsap.set(root.querySelectorAll('[data-animate]'), { clearProps: 'all', opacity: 1, y: 0 });
    return null;
  }

  registerGsapPlugins();

  const timeline = createTimeline();
  const items = root.querySelectorAll<HTMLElement>('[data-animate]');

  timeline.fromTo(
    items,
    { opacity: 0, y: 28 },
    {
      opacity: 1,
      y: 0,
      duration: ANIMATION.duration.slow,
      stagger: ANIMATION.stagger,
      ease: ANIMATION.ease.expo,
    },
  );

  return timeline;
}

export function animateTextReveal(elements: NodeListOf<Element> | Element[]): void {
  if (getPrefersReducedMotion()) {
    gsap.set(elements, { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  fadeInUp(elements, {
    stagger: ANIMATION.stagger,
    duration: ANIMATION.duration.slow,
    ease: ANIMATION.ease.expo,
  });
}

export function animateCounters(elements: NodeListOf<HTMLElement> | HTMLElement[]): void {
  registerGsapPlugins();

  elements.forEach((element) => {
    const endValue = Number(element.dataset.count ?? element.textContent ?? 0);
    const suffix = element.dataset.suffix ?? '';
    const duration = Number(element.dataset.duration ?? ANIMATION.duration.slow);

    if (getPrefersReducedMotion()) {
      element.textContent = `${endValue}${suffix}`;
      return;
    }

    const counter = { value: 0 };

    gsap.to(counter, {
      value: endValue,
      duration,
      ease: ANIMATION.ease.out,
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        element.textContent = `${Math.round(counter.value)}${suffix}`;
      },
    });
  });
}

export { revealOnScroll };
