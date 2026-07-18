/**
 * Normalize internal paths for `trailingSlash: 'always'`.
 * Keeps hashes/query strings, skips external & file URLs.
 */
export function withTrailingSlash(href: string): string {
  if (
    !href ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//')
  ) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const queryIndex = href.indexOf('?');

  let pathEnd = href.length;
  if (hashIndex !== -1) pathEnd = Math.min(pathEnd, hashIndex);
  if (queryIndex !== -1) pathEnd = Math.min(pathEnd, queryIndex);

  const path = href.slice(0, pathEnd);
  const rest = href.slice(pathEnd);

  if (!path || path === '/') return href;
  if (/\.[a-z0-9]+$/i.test(path)) return href;
  if (path.endsWith('/')) return href;

  return `${path}/${rest}`;
}
