import type { MetadataRoute } from 'next'

const siteUrl = 'https://v0-veyra-blush-five.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
