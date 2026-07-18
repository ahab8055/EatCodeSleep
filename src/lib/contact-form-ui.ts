import {
  hasContactErrors,
  validateContactStep,
} from '@/lib/contact-form-validation';
import { submitContactForm } from '@/lib/contact-form-submit';
import type { ContactFormPayload } from '@/types/contact';

const TOTAL_STEPS = 4;

function readPayload(form: HTMLFormElement): ContactFormPayload {
  const data = new FormData(form);
  return {
    buildType: String(data.get('buildType') ?? ''),
    projectStage: String(data.get('projectStage') ?? ''),
    budget: String(data.get('budget') ?? ''),
    name: String(data.get('name') ?? ''),
    email: String(data.get('email') ?? ''),
    company: String(data.get('company') ?? ''),
    description: String(data.get('description') ?? ''),
    timeline: String(data.get('timeline') ?? ''),
    source: String(data.get('source') ?? 'contact-page'),
  };
}

function clearFieldErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-field-error]').forEach((el) => {
    el.textContent = '';
    el.hidden = true;
  });
  form.querySelectorAll('[aria-invalid="true"]').forEach((el) => {
    el.setAttribute('aria-invalid', 'false');
  });
}

function showFieldError(form: HTMLFormElement, field: string, message: string): void {
  const error = form.querySelector<HTMLElement>(`[data-field-error="${field}"]`);
  if (error) {
    error.textContent = message;
    error.hidden = false;
  }

  const control = form.querySelector<HTMLElement>(`[name="${field}"]`);
  if (control) {
    control.setAttribute('aria-invalid', 'true');
  }

  const choiceGroup = form.querySelector<HTMLElement>(`[data-choice-group="${field}"]`);
  if (choiceGroup) {
    choiceGroup.setAttribute('aria-invalid', 'true');
  }
}

function setStep(root: HTMLElement, step: number): void {
  root.dataset.step = String(step);

  root.querySelectorAll<HTMLElement>('[data-form-step]').forEach((panel) => {
    const panelStep = Number(panel.dataset.formStep);
    const active = panelStep === step;
    panel.hidden = !active;
    panel.dataset.active = active ? 'true' : 'false';
  });

  root.querySelectorAll<HTMLElement>('[data-step-indicator]').forEach((indicator) => {
    const indicatorStep = Number(indicator.dataset.stepIndicator);
    indicator.dataset.state =
      indicatorStep < step ? 'complete' : indicatorStep === step ? 'current' : 'upcoming';
    indicator.setAttribute('aria-current', indicatorStep === step ? 'step' : 'false');
  });

  const meta = root.querySelector<HTMLElement>('[data-form-step-meta]');
  if (meta) {
    meta.textContent = `Step ${step} of ${TOTAL_STEPS}`;
  }

  const back = root.querySelector<HTMLButtonElement>('[data-form-back]');
  const next = root.querySelector<HTMLButtonElement>('[data-form-next]');
  const submit = root.querySelector<HTMLButtonElement>('[data-form-submit]');

  if (back) back.hidden = step === 1;
  if (next) next.hidden = step === TOTAL_STEPS;
  if (submit) submit.hidden = step !== TOTAL_STEPS;
}

function syncChoiceButtons(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLButtonElement>('[data-choice-option]').forEach((button) => {
    const field = button.dataset.choiceField;
    const value = button.dataset.choiceValue;
    if (!field || !value) return;

    const input = form.querySelector<HTMLInputElement>(`input[name="${field}"]`);
    const selected = input?.value === value;
    button.dataset.selected = selected ? 'true' : 'false';
    button.setAttribute('aria-pressed', String(selected));
  });
}

export function initProjectForm(root: HTMLElement): void {
  if (root.dataset.formReady === 'true') return;
  root.dataset.formReady = 'true';

  const form = root.querySelector<HTMLFormElement>('[data-project-form]');
  if (!form) return;

  let step = 1;
  let advanceTimer: number | undefined;
  setStep(root, step);
  syncChoiceButtons(form);

  form.querySelectorAll<HTMLButtonElement>('[data-choice-option]').forEach((button) => {
    button.addEventListener('click', () => {
      const field = button.dataset.choiceField;
      const value = button.dataset.choiceValue;
      if (!field || !value) return;

      const input = form.querySelector<HTMLInputElement>(`input[name="${field}"]`);
      if (input) input.value = value;
      syncChoiceButtons(form);
      clearFieldErrors(form);

      if (step >= TOTAL_STEPS) return;

      window.clearTimeout(advanceTimer);
      const fromStep = step;
      advanceTimer = window.setTimeout(() => {
        if (Number(root.dataset.step) !== fromStep) return;
        const payload = readPayload(form);
        const errors = validateContactStep(fromStep, payload);
        if (hasContactErrors(errors)) return;
        step = fromStep + 1;
        setStep(root, step);
      }, 320);
    });
  });

  const back = root.querySelector<HTMLButtonElement>('[data-form-back]');
  const next = root.querySelector<HTMLButtonElement>('[data-form-next]');
  const submit = root.querySelector<HTMLButtonElement>('[data-form-submit]');
  const status = root.querySelector<HTMLElement>('[data-form-status]');
  const success = root.querySelector<HTMLElement>('[data-form-success]');

  back?.addEventListener('click', () => {
    if (step <= 1) return;
    step -= 1;
    setStep(root, step);
  });

  next?.addEventListener('click', () => {
    const payload = readPayload(form);
    const errors = validateContactStep(step, payload);
    clearFieldErrors(form);

    if (hasContactErrors(errors)) {
      Object.entries(errors).forEach(([field, message]) => {
        if (message) showFieldError(form, field, message);
      });
      return;
    }

    if (step < TOTAL_STEPS) {
      step += 1;
      setStep(root, step);
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const payload = readPayload(form);
    const errors = validateContactStep(4, payload);
    clearFieldErrors(form);

    if (hasContactErrors(errors)) {
      Object.entries(errors).forEach(([field, message]) => {
        if (message) showFieldError(form, field, message);
      });
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.dataset.loading = 'true';
    }
    if (status) {
      status.hidden = false;
      status.textContent = 'Sending your project details…';
      status.dataset.state = 'loading';
    }

    const result = await submitContactForm(payload);

    if (submit) {
      submit.disabled = false;
      submit.dataset.loading = 'false';
    }

    if (!result.ok) {
      if (status) {
        status.hidden = false;
        status.textContent = result.message;
        status.dataset.state = 'error';
      }
      return;
    }

    form.hidden = true;
    if (success) {
      success.hidden = false;
    }
    if (status) {
      status.hidden = true;
    }
  });
}
