import type { MetadataRoute } from 'next'
import { brands } from '@/features/content/site'
import { policies } from '@/features/content/policies'
import { publicEnv } from '@/lib/public-env'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/about',
    '/products',
    '/awards',
    '/distributorship',
    '/contact',
    '/quote',
    ...brands.map((brand) => `/distributorship/${brand.slug}`),
    ...policies.map((policy) => `/policies/${policy.slug}`),
  ]
  return paths.map((path) => ({ url: `${publicEnv.siteUrl}${path === '/' ? '' : path}` }))
}
