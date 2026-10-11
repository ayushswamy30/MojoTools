import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPolicy, policies, type PolicyBlock } from '@/features/content/policies'
import { isDemoContent } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import { Container } from '@/components/ui/container'
import { PageHero } from '@/components/marketing/page-hero'
import { CookieSettingsButton } from '@/components/layout/cookie-settings-button'
import { buttonVariants } from '@/components/ui/button'

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/policies/[slug]'>): Promise<Metadata> {
  const policy = getPolicy((await params).slug)
  return policy
    ? {
        title: policy.title,
        description: policy.description,
        alternates: { canonical: `/policies/${policy.slug}` },
      }
    : {}
}

const linkClass = 'text-info underline underline-offset-4'

/** Renders our own policy text: `[label](href)` becomes a link and `code` a code span. */
function inline(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\)|`[^`]+`)/g).map((part, index) => {
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part)
    if (link) {
      const [, label, href] = link
      return href!.startsWith('/') ? (
        <Link key={index} href={href!} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a key={index} href={href} className={linkClass}>
          {label}
        </a>
      )
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={index} className="font-mono text-[0.9em] text-ink-900">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

function Block({ block }: { block: PolicyBlock }) {
  if (typeof block === 'string') return <p className="mt-3 leading-7">{inline(block)}</p>
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
      {block.list.map((item) => (
        <li key={item}>{inline(item)}</li>
      ))}
    </ul>
  )
}

export default async function PolicyPage({ params }: PageProps<'/[lang]/policies/[slug]'>) {
  const policy = getPolicy((await params).slug)
  if (!policy) notFound()
  const dict = await getDictionary()
  const p = dict.policyPage
  return (
    <>
      <PageHero
        title={policy.title}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: policy.title }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      <Container className="max-w-3xl py-12">
        <p className="text-sm text-steel-600">{t(p.lastUpdated, { date: policy.updated })}</p>
        {isDemoContent ? (
          <p className="mt-2 text-sm font-semibold text-warning">{p.draft}</p>
        ) : null}
        {policy.sections.length > 3 ? (
          <nav aria-labelledby="policy-contents" className="mt-8 rounded-md bg-steel-50 p-5">
            <h2 id="policy-contents" className="font-sans text-base font-semibold">
              {p.contents}
            </h2>
            <ul className="mt-2 grid gap-x-6 sm:grid-cols-2">
              {policy.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-11 items-center text-sm text-info underline underline-offset-4 md:min-h-8"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        {policy.sections.map((section) => (
          <section key={section.id} aria-labelledby={section.id} className="mt-10">
            <h2 id={section.id} className="text-xl font-bold">
              {section.heading}
            </h2>
            {section.body.map((block, index) => (
              <Block key={index} block={block} />
            ))}
          </section>
        ))}
        {policy.showCookieSettings ? (
          <CookieSettingsButton
            label={p.cookieSettings}
            className={`${buttonVariants({ variant: 'secondary' })} mt-8`}
          />
        ) : null}
      </Container>
    </>
  )
}
