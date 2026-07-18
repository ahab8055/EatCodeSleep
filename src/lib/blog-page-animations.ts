import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';
import type { BlogFilterId } from '@/data/blog';

export function playBlogHero(root: HTMLElement): void {
  if (root.dataset.heroAnimated === 'true') return;
  root.dataset.heroAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-blog-hero-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-blog-hero-line]');
  const copy = root.querySelector<HTMLElement>('[data-blog-hero-copy]');
  const visual = root.querySelector<HTMLElement>('[data-blog-hero-visual]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, copy, visual], { clearProps: 'all', opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set([label, lines, copy], { opacity: 0, y: 24 });
  if (visual) gsap.set(visual, { opacity: 0, y: 20, scale: 0.97 });

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
  });

  if (label) timeline.to(label, { opacity: 1, y: 0 });
  if (lines.length) timeline.to(lines, { opacity: 1, y: 0, stagger: 0.1 }, '-=0.5');
  if (copy) timeline.to(copy, { opacity: 1, y: 0 }, '-=0.45');
  if (visual) timeline.to(visual, { opacity: 1, y: 0, scale: 1 }, 0.3);
}

export function playBlogReveal(
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
      trigger: triggerSelector ? (root.querySelector(triggerSelector) ?? root) : root,
      start: 'top 82%',
      once: true,
    },
  });
}

export function initBlogCategoryFilter(root: HTMLElement): void {
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('[data-blog-filter]'),
  );
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-article-card]'));
  if (!buttons.length || !cards.length) return;

  const reduced = getPrefersReducedMotion();
  registerGsapPlugins();

  const setActive = (filter: BlogFilterId): void => {
    buttons.forEach((button) => {
      const isActive = button.dataset.blogFilter === filter;
      button.dataset.active = isActive ? 'true' : 'false';
      button.setAttribute('aria-pressed', String(isActive));
    });

    const visible: HTMLElement[] = [];
    const hidden: HTMLElement[] = [];

    cards.forEach((card) => {
      const cardFilter = card.dataset.filter ?? 'all';
      const matches = filter === 'all' || cardFilter === filter;
      if (matches) visible.push(card);
      else hidden.push(card);
    });

    if (reduced) {
      visible.forEach((card) => {
        card.hidden = false;
        gsap.set(card, { clearProps: 'all', opacity: 1 });
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
      const filter = (button.dataset.blogFilter ?? 'all') as BlogFilterId;
      setActive(filter);
    });
  });

  setActive('all');
}

export function startBlogAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) return;
  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-blog-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 14 : -12,
      y: index % 2 === 0 ? -10 : 12,
      duration: 9 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-blog-float]').forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -8 : 10,
      duration: 4 + index * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1,
    });
  });
}
