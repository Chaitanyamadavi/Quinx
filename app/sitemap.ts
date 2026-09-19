import type { MetadataRoute } from 'next'

const siteUrl = 'https://v0-veyra-blush-five.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${siteUrl}/terms-and-conditions`, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
