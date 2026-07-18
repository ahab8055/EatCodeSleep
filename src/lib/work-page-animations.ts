import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';
import type { ProjectCategoryFilter } from '@/types/projects';

export function playWorkHero(root: HTMLElement): void {
  if (root.dataset.heroAnimated === 'true') return;
  root.dataset.heroAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-work-hero-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-work-hero-line]');
  const copy = root.querySelector<HTMLElement>('[data-work-hero-copy]');
  const actions = root.querySelectorAll<HTMLElement>('[data-work-hero-action]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, copy, actions], { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }

  gsap.set([label, lines, copy, actions], { opacity: 0, y: 24 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
  });

  if (label) timeline.to(label, { opacity: 1, y: 0 });
  if (lines.length) timeline.to(lines, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.5');
  if (copy) timeline.to(copy, { opacity: 1, y: 0 }, '-=0.45');
  if (actions.length) {
    timeline.to(actions, { opacity: 1, y: 0, stagger: 0.08 }, '-=0.35');
  }
}

export function playWorkReveal(
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
    gsap.set(items, { clearProps: 'all', opacity: 1, y: 0, scale: 1 });
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

export function initProjectFilter(root: HTMLElement): void {
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-project-filter]'),
  );
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>('[data-case-study-card]'),
  );
  if (!buttons.length || !cards.length) return;

  const reduced = getPrefersReducedMotion();
  registerGsapPlugins();

  const setActive = (filter: ProjectCategoryFilter): void => {
    buttons.forEach((button) => {
      const isActive = button.dataset.projectFilter === filter;
      button.dataset.active = isActive ? 'true' : 'false';
      button.setAttribute('aria-pressed', String(isActive));
    });

    const visible: HTMLElement[] = [];
    const hidden: HTMLElement[] = [];

    cards.forEach((card) => {
      const filters = (card.dataset.filters ?? '')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
      const matches = filter === 'all' || filters.includes(filter);
      if (matches) visible.push(card);
      else hidden.push(card);
    });

    if (reduced) {
      visible.forEach((card) => {
        card.hidden = false;
        card.style.opacity = '1';
        gsap.set(card, { clearProps: 'all' });
      });
      hidden.forEach((card) => {
        card.hidden = true;
      });
      return;
    }

    const timeline = gsap.timeline({ defaults: { ease: ANIMATION.ease.power3 } });

    if (hidden.length) {
      timeline.to(hidden, {
        opacity: 0,
        y: 12,
        scale: 0.98,
        duration: ANIMATION.duration.fast,
        stagger: 0.02,
        onComplete: () => {
          hidden.forEach((card) => {
            card.hidden = true;
          });
        },
      });
    }

    timeline.add(() => {
      visible.forEach((card) => {
        card.hidden = false;
      });
    });

    if (visible.length) {
      timeline.fromTo(
        visible,
        { opacity: 0, y: 16, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION.duration.base,
          stagger: 0.05,
        },
      );
    }
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = (button.dataset.projectFilter ?? 'all') as ProjectCategoryFilter;
      setActive(filter);
    });
  });

  setActive('all');
}

export function startWorkAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) return;
  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-work-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 16 : -12,
      y: index % 2 === 0 ? -10 : 14,
      duration: 9 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });
}
