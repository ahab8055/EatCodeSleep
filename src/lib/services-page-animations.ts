import { ANIMATION } from '@/lib/constants';
import { gsap, registerGsapPlugins } from '@/lib/gsap';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';
import { shouldRunAmbient } from '@/lib/motionBudget';

export function playServicesHero(root: HTMLElement): void {
  if (root.dataset.heroAnimated === 'true') return;
  root.dataset.heroAnimated = 'true';
  registerGsapPlugins();

  const label = root.querySelector<HTMLElement>('[data-services-hero-label]');
  const lines = root.querySelectorAll<HTMLElement>('[data-services-hero-line]');
  const copy = root.querySelector<HTMLElement>('[data-services-hero-copy]');
  const actions = root.querySelectorAll<HTMLElement>('[data-services-hero-action]');
  const visual = root.querySelector<HTMLElement>('[data-services-hero-visual]');
  const nodes = root.querySelectorAll<HTMLElement>('[data-ecosystem-node]');

  if (getPrefersReducedMotion()) {
    gsap.set([label, lines, copy, actions, visual, nodes], {
      clearProps: 'all',
      opacity: 1,
      y: 0,
      scale: 1,
    });
    return;
  }

  gsap.set([label, lines, copy, actions], { opacity: 0, y: 24 });
  if (visual) gsap.set(visual, { opacity: 0, y: 20, scale: 0.97 });
  if (nodes.length) gsap.set(nodes, { opacity: 0, y: 12 });

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
  if (visual) timeline.to(visual, { opacity: 1, y: 0, scale: 1 }, 0.3);
  if (nodes.length) {
    timeline.to(nodes, { opacity: 1, y: 0, stagger: 0.08 }, 0.45);
  }
}

export function playServicesReveal(
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

export function playServiceSection(section: HTMLElement): void {
  if (section.dataset.sectionAnimated === 'true') return;
  section.dataset.sectionAnimated = 'true';
  registerGsapPlugins();

  const content = section.querySelector<HTMLElement>('[data-service-content]');
  const visual = section.querySelector<HTMLElement>('[data-service-visual]');
  const badges = section.querySelectorAll<HTMLElement>('[data-tech-badge]');

  if (getPrefersReducedMotion()) {
    gsap.set([content, visual, badges], { clearProps: 'all', opacity: 1, y: 0, x: 0 });
    return;
  }

  if (content) gsap.set(content, { opacity: 0, y: 28 });
  if (visual) gsap.set(visual, { opacity: 0, y: 24 });
  if (badges.length) gsap.set(badges, { opacity: 0, y: 10 });

  const rect = section.getBoundingClientRect();
  const alreadyVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;

  const timeline = gsap.timeline({
    defaults: {
      duration: ANIMATION.duration.slow,
      ease: ANIMATION.ease.power3,
    },
    scrollTrigger: alreadyVisible
      ? undefined
      : {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
  });

  if (content) timeline.to(content, { opacity: 1, y: 0 });
  if (visual) timeline.to(visual, { opacity: 1, y: 0 }, '-=0.55');
  if (badges.length) {
    timeline.to(badges, { opacity: 1, y: 0, stagger: 0.04 }, '-=0.4');
  }
}

export function initServiceNav(nav: HTMLElement): void {
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('[data-service-nav-link]'));
  if (!links.length) return;

  const sections = links
    .map((link) => {
      const id = link.getAttribute('href')?.replace('#', '');
      return id ? document.getElementById(id) : null;
    })
    .filter((el): el is HTMLElement => Boolean(el));

  const setActive = (id: string): void => {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.dataset.active = isActive ? 'true' : 'false';
      link.setAttribute('aria-current', isActive ? 'true' : 'false');
    });

    const activeLink = links.find((link) => link.dataset.active === 'true');
    if (activeLink && nav.scrollWidth > nav.clientWidth) {
      activeLink.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
    }
  };

  if (getPrefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
    setActive(sections[0]?.id ?? links[0]?.getAttribute('href')?.slice(1) ?? '');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) {
        setActive(visible.target.id);
      }
    },
    {
      rootMargin: '-30% 0px -55% 0px',
      threshold: [0.15, 0.35, 0.55],
    },
  );

  sections.forEach((section) => observer.observe(section));
  if (sections[0]) setActive(sections[0].id);
}

export function startServicesAmbient(root: HTMLElement): void {
  if (!shouldRunAmbient()) return;
  registerGsapPlugins();

  root.querySelectorAll<HTMLElement>('[data-services-glow]').forEach((el, index) => {
    gsap.to(el, {
      x: index % 2 === 0 ? 18 : -14,
      y: index % 2 === 0 ? -12 : 16,
      duration: 9 + index,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  });

  root.querySelectorAll<HTMLElement>('[data-services-float]').forEach((el, index) => {
    gsap.to(el, {
      y: index % 2 === 0 ? -8 : 10,
      duration: 4 + index * 0.35,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.12,
    });
  });
}
