import type { ContactFormErrors, ContactFormPayload } from '@/types/contact';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactStep(
  step: number,
  payload: Partial<ContactFormPayload>,
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (step === 1 && !payload.buildType) {
    errors.buildType = 'Please select what you want to build.';
  }

  if (step === 2 && !payload.projectStage) {
    errors.projectStage = 'Please select your project stage.';
  }

  if (step === 3 && !payload.budget) {
    errors.budget = 'Please select a budget range.';
  }

  if (step === 4) {
    if (!payload.name?.trim()) {
      errors.name = 'Name is required.';
    }
    if (!payload.email?.trim()) {
      errors.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(payload.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (!payload.description?.trim()) {
      errors.description = 'Tell us a bit about your project.';
    }
  }

  return errors;
}

export function validateContactForm(payload: ContactFormPayload): ContactFormErrors {
  return {
    ...validateContactStep(1, payload),
    ...validateContactStep(2, payload),
    ...validateContactStep(3, payload),
    ...validateContactStep(4, payload),
  };
}

export function hasContactErrors(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
