'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/features/analytics/events'

export function BrandViewTracker({ brand }: { brand: string }) {
  useEffect(() => {
    trackEvent('brand_view', { brand })
  }, [brand])
  return null
}
