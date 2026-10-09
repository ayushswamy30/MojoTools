import type { Metadata } from 'next'
import { brands, productTypes, stats } from '@/features/content/site'
import { getDictionary } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { BrandGrid } from '@/components/marketing/brand-grid'
import { PageHero } from '@/components/marketing/page-hero'
import { StatsStrip } from '@/components/marketing/stats-strip'

export const metadata: Metadata = {
  title: en.brandsPage.metaTitle,
  description: en.brandsPage.metaDescription,
  alternates: { canonical: '/brands' },
}

export default async function BrandsPage() {
  const dict = await getDictionary()
  return (
    <>
      <PageHero
        title={dict.brandsPage.title}
        subtitle={dict.brandsPage.subtitle}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.brands }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <section aria-label={dict.brandsPage.title} className="bg-ink-900 pb-16">
        <Container>
          <div className="rounded-md bg-white p-6 md:p-8">
            <BrandGrid brands={brands} productTypes={productTypes} labels={dict.brands} />
          </div>
          <div className="on-dark mt-12">
            <StatsStrip stats={stats} onDark />
          </div>
        </Container>
      </section>
    </>
  )
}
