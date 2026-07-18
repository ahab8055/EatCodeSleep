import type { ContactFormPayload } from '@/types/contact';
import { validateContactForm, hasContactErrors } from '@/lib/contact-form-validation';

export interface ContactSubmitResult {
  ok: boolean;
  message: string;
}

export type ContactSubmitProvider = (
  payload: ContactFormPayload,
) => Promise<ContactSubmitResult>;

/**
 * Integration layer for contact submissions.
 * Set PUBLIC_CONTACT_FORM_ENDPOINT to a Formspree / Resend / webhook URL.
 */
export const submitViaEndpoint: ContactSubmitProvider = async (payload) => {
  const endpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT as string | undefined;

  if (!endpoint) {
    // Local / static fallback until a provider is configured.
    console.info('[contact-form]', payload);
    await new Promise((resolve) => setTimeout(resolve, 700));
    return {
      ok: true,
      message: 'Thanks for reaching out. We will get back to you shortly.',
    };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: 'Something went wrong while sending your message. Please try again.',
    };
  }

  return {
    ok: true,
    message: 'Thanks for reaching out. We will get back to you shortly.',
  };
};

export async function submitContactForm(
  payload: ContactFormPayload,
  provider: ContactSubmitProvider = submitViaEndpoint,
): Promise<ContactSubmitResult> {
  const errors = validateContactForm(payload);
  if (hasContactErrors(errors)) {
    return {
      ok: false,
      message: 'Please complete the required fields before submitting.',
    };
  }

  try {
    return await provider(payload);
  } catch {
    return {
      ok: false,
      message: 'Unable to send your message right now. Please email us directly.',
    };
  }
}
