import { ANIMATION } from '@/lib/constants';
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion';

const ACCORDION_DURATION_MS = ANIMATION.duration.base * 1000;

function setExpanded(item: HTMLElement, expanded: boolean): void {
  const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
  const panel = item.querySelector<HTMLElement>('[data-faq-panel]');

  if (!trigger || !panel) {
    return;
  }

  trigger.setAttribute('aria-expanded', String(expanded));
  item.dataset.open = expanded ? 'true' : 'false';

  if (getPrefersReducedMotion()) {
    panel.style.height = expanded ? 'auto' : '0px';
    return;
  }

  if (expanded) {
    panel.style.height = `${panel.scrollHeight}px`;

    const onEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'height') {
        return;
      }
      panel.style.height = 'auto';
      panel.removeEventListener('transitionend', onEnd);
    };

    panel.addEventListener('transitionend', onEnd);
    return;
  }

  panel.style.height = `${panel.scrollHeight}px`;
  // Force reflow so the browser registers the starting height.
  void panel.offsetHeight;
  panel.style.height = '0px';
}

export function initFaqAccordion(root: ParentNode = document): void {
  const accordion = root.querySelector<HTMLElement>('[data-faq-accordion]');

  if (!accordion || accordion.dataset.faqReady === 'true') {
    return;
  }

  accordion.dataset.faqReady = 'true';
  accordion.style.setProperty('--faq-accordion-duration', `${ACCORDION_DURATION_MS}ms`);

  const items = Array.from(accordion.querySelectorAll<HTMLElement>('[data-faq-item]'));

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
    const panel = item.querySelector<HTMLElement>('[data-faq-panel]');

    if (!trigger || !panel) {
      return;
    }

    panel.style.height = '0px';
    setExpanded(item, false);

    trigger.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';

      items.forEach((other) => {
        if (other !== item) {
          setExpanded(other, false);
        }
      });

      setExpanded(item, !isOpen);
    });
  });
}
