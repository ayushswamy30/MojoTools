import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPolicy, policies } from '@/features/content/policies'
import { getDictionary } from '@/i18n/dictionary'
import { Container } from '@/components/ui/container'
import { PageHero } from '@/components/marketing/page-hero'

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/policies/[slug]'>): Promise<Metadata> {
  const policy = getPolicy((await params).slug)
  return policy
    ? { title: policy.title, alternates: { canonical: `/policies/${policy.slug}` } }
    : {}
}

export default async function PolicyPage({ params }: PageProps<'/[lang]/policies/[slug]'>) {
  const policy = getPolicy((await params).slug)
  if (!policy) notFound()
  const dict = await getDictionary()
  return (
    <>
      <PageHero
        title={policy.title}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: policy.title }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="max-w-3xl py-12">
        <p className="text-sm font-semibold text-warning">{policy.updated}</p>
        {policy.sections.map((section) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-xl font-bold">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-3 leading-7">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </Container>
    </>
  )
}
