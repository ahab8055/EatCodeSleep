import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '@/lib/constants';
import { blogPageSeo, sortPostsByDate } from '@/data/blog';

export async function GET(context: { site?: URL }) {
  const posts = sortPostsByDate(
    await getCollection('blog', ({ data }) => !data.draft),
  );

  return rss({
    title: 'EatCodeSleep Insights',
    description: blogPageSeo.description,
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/blog/${post.id}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
