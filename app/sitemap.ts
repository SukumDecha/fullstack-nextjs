import { MetadataRoute } from 'next';
import * as articleApi from '@/features/articles/api';
import * as announcementApi from '@/features/announcements/api';

const sitemap = async () => {
  const baseUrl = process.env.NEXTAPP_URL!;
  const siteMap: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
  ];

  const articles = await articleApi.findAll();
  for (const article of articles) {
    siteMap.push({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  const announcements = await announcementApi.findAll();
  for (const announcement of announcements) {
    siteMap.push({
      url: `${baseUrl}/announcements/${announcement.slug}`,
      lastModified: announcement.updatedAt,
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  return siteMap;
};

export default sitemap;
