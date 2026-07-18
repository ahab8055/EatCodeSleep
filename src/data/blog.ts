import type { CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export type BlogFilterId =
  | 'all'
  | 'ai'
  | 'software-development'
  | 'automation'
  | 'cloud'
  | 'architecture'
  | 'product'
  | 'engineering';

export interface BlogFilterItem {
  id: BlogFilterId;
  label: string;
}

/** Maps displayed categories onto filter tabs. */
export const blogCategoryToFilter: Record<string, BlogFilterId> = {
  AI: 'ai',
  'Artificial Intelligence': 'ai',
  'Software Development': 'software-development',
  Frontend: 'software-development',
  Automation: 'automation',
  Cloud: 'cloud',
  Architecture: 'architecture',
  'Software Architecture': 'architecture',
  Product: 'product',
  Engineering: 'engineering',
};

export const blogFilters: BlogFilterItem[] = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI' },
  { id: 'software-development', label: 'Software Development' },
  { id: 'automation', label: 'Automation' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'product', label: 'Product' },
  { id: 'engineering', label: 'Engineering' },
];

export const blogPageSeo = {
  title: 'Insights · AI, Software Engineering & Automation',
  socialTitle: 'EatCodeSleep Insights | AI, Software Engineering & Automation',
  description:
    'Explore technical insights about software development, artificial intelligence, automation, cloud architecture, and building scalable digital products.',
  keywords: [
    'software engineering blog',
    'AI insights',
    'automation',
    'cloud architecture',
    'EatCodeSleep Insights',
  ],
} as const;

export const blogHero = {
  label: 'INSIGHTS',
  headingLines: ['Ideas, engineering,', 'and technology insights.'] as const,
  description:
    'Practical knowledge about building software products, AI systems, automation workflows, and scalable technology.',
} as const;

export const blogNewsletter = {
  heading: 'Stay ahead of technology.',
  description:
    'Get practical insights about AI, software engineering, and product development.',
  placeholder: 'Email address',
  buttonLabel: 'Subscribe',
} as const;

export const blogCta = {
  heading: 'Need help building your idea?',
  description: 'Our team helps companies turn ideas into scalable software products.',
  primaryCta: { label: 'Start Your Project', href: '/contact/' },
  secondaryCta: { label: 'Talk To Engineers', href: '/contact/' },
} as const;

export function getPostFilterId(post: BlogPost): BlogFilterId {
  return blogCategoryToFilter[post.data.category] ?? 'engineering';
}

export function sortPostsByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

export function formatPublishDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getRelatedPosts(posts: BlogPost[], current: BlogPost, limit = 3): BlogPost[] {
  const currentFilter = getPostFilterId(current);
  const currentTags = new Set(current.data.tags.map((tag) => tag.toLowerCase()));

  return sortPostsByDate(posts)
    .filter((post) => post.id !== current.id && !post.data.draft)
    .map((post) => {
      let score = 0;
      if (getPostFilterId(post) === currentFilter) score += 3;
      if (post.data.category === current.data.category) score += 2;
      post.data.tags.forEach((tag) => {
        if (currentTags.has(tag.toLowerCase())) score += 1;
      });
      return { post, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.publishDate.valueOf() - a.post.data.publishDate.valueOf())
    .slice(0, limit)
    .map((entry) => entry.post);
}
