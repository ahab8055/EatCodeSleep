export interface OpenGraphProps {
  title?: string;
  description?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  imageAlt?: string;
  siteName?: string;
  locale?: string;
  /** ISO date string for articles */
  publishedTime?: string;
  /** ISO date string for articles */
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

export interface TwitterCardProps {
  card?: 'summary' | 'summary_large_image';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

export interface JsonLdProps {
  type?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

export interface SeoProps {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  openGraph?: OpenGraphProps;
  twitter?: TwitterCardProps;
  jsonLd?: JsonLdProps | JsonLdProps[];
}
