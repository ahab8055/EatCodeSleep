import type { JsonLdProps, SeoProps } from '@/types/seo';
import { SITE } from '@/lib/constants';
import { siteConfig } from '@/data/site';
import { socialLinks } from '@/data/navigation';

export function buildPageTitle(title: string, includeBrand = true): string {
  // Full keyword+brand titles (homepage) already include the brand — do not append again.
  if (
    !includeBrand ||
    title === SITE.name ||
    title.includes(SITE.name)
  ) {
    return title;
  }

  return `${title} | ${SITE.name}`;
}

/** Canonical URLs always use trailing slashes to match `trailingSlash: 'always'`. */
export function buildCanonicalUrl(path = '/'): string {
  let normalized = path.startsWith('/') ? path : `/${path}`;
  normalized = normalized.split('?')[0]?.split('#')[0] ?? '/';

  if (normalized !== '/' && !normalized.endsWith('/')) {
    const isFile = /\.[a-z0-9]+$/i.test(normalized);
    if (!isFile) normalized += '/';
  }

  return new URL(normalized, SITE.url).toString();
}

export function serializeJsonLd(entries: JsonLdProps | JsonLdProps[]): string {
  const list = Array.isArray(entries) ? entries : [entries];

  const payload = list.map((entry) => ({
    '@context': 'https://schema.org',
    '@type': entry.type ?? 'Organization',
    ...entry.data,
  }));

  return JSON.stringify(payload.length === 1 ? payload[0] : payload);
}

export function resolveSeoDefaults(seo: SeoProps): Required<
  Pick<SeoProps, 'title' | 'description' | 'canonical' | 'noindex' | 'nofollow'>
> &
  SeoProps {
  return {
    ...seo,
    title: buildPageTitle(seo.title),
    description: seo.description,
    canonical: seo.canonical ?? buildCanonicalUrl('/'),
    noindex: seo.noindex ?? false,
    nofollow: seo.nofollow ?? false,
  };
}

export function organizationJsonLd(): JsonLdProps {
  const sameAs = socialLinks.map((link) => link.href);

  return {
    type: 'Organization',
    data: {
      '@type': ['Organization', 'ProfessionalService'],
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      description: siteConfig.description,
      logo: `${SITE.url}/og-default.png`,
      image: `${SITE.url}/og-default.png`,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: siteConfig.email,
          availableLanguage: ['English'],
        },
      ],
      ...(sameAs.length > 0 ? { sameAs } : {}),
    },
  };
}

/** FAQPage JSON-LD from FAQ section content. */
export function faqPageJsonLd(
  items: Array<{ question: string; answer: string }>,
): JsonLdProps {
  return {
    type: 'FAQPage',
    data: {
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  };
}

export function websiteJsonLd(): JsonLdProps {
  return {
    type: 'WebSite',
    data: {
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: 'en-US',
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): JsonLdProps {
  return {
    type: 'BreadcrumbList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: buildCanonicalUrl(item.path),
      })),
    },
  };
}
