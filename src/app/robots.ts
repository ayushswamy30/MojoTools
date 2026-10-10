import type { MetadataRoute } from 'next'
import { publicEnv } from '@/lib/public-env'

export default function robots(): MetadataRoute.Robots {
  if (!publicEnv.indexable) {
    // Previews stay out of search engines until the public launch (TASKS T5.5).
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/account', '/cart', '/checkout', '/dev'],
    },
    sitemap: `${publicEnv.siteUrl}/sitemap.xml`,
  }
}
