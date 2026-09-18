import type { MetadataRoute } from 'next'

const siteUrl = 'https://veyra-blush-five.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}