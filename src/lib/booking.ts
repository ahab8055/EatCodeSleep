/**
 * Google Calendar Appointment Schedule booking URL.
 * Create a schedule with Google Meet, then set PUBLIC_GOOGLE_BOOKING_URL.
 */

const BOOKING_FALLBACK = '/contact/#contact-options';

function readEnvBookingUrl(): string {
  try {
    const raw = (import.meta as ImportMeta & { env?: Record<string, unknown> }).env
      ?.PUBLIC_GOOGLE_BOOKING_URL;
    return typeof raw === 'string' ? raw.trim() : '';
  } catch {
    return '';
  }
}

export function isAbsoluteHttpUrl(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://');
}

/**
 * Public booking page URL for discovery / Meet calls.
 * Falls back to the contact page in DEV when unset (with a loud console error);
 * invalid absolute URLs throw so a blank or broken href does not ship.
 */
export function resolveBookingUrl(): string {
  const url = readEnvBookingUrl();

  if (!url) {
    const message =
      '[booking] PUBLIC_GOOGLE_BOOKING_URL is not set. Create a Google Calendar Appointment Schedule with Meet enabled and add the public booking link to .env (see .env.example).';
    console.error(message);
    return BOOKING_FALLBACK;
  }

  if (!isAbsoluteHttpUrl(url)) {
    throw new Error(
      `[booking] PUBLIC_GOOGLE_BOOKING_URL must be an absolute https URL (Google Appointment Schedule link). Received: ${url}`,
    );
  }

  try {
    // Validate shape; Appointment Schedule / calendar.app.google hosts both accepted.
    new URL(url);
  } catch {
    throw new Error(`[booking] PUBLIC_GOOGLE_BOOKING_URL is not a valid URL: ${url}`);
  }

  return url;
}

export const bookingUrl = resolveBookingUrl();
