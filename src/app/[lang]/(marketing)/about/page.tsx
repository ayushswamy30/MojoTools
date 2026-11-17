import type { Metadata } from 'next'
import { about, expert, stats, whatsappHref } from '@/features/content/site'
import { getDictionary, t } from '@/i18n/dictionary'
import en from '@/i18n/messages/en.json'
import { Container } from '@/components/ui/container'
import { PlaceholderVisual } from '@/components/ui/placeholder-visual'
import { SectionTitle } from '@/components/ui/section-title'
import { ExpertCard } from '@/components/marketing/expert-card'
import { Milestones } from '@/components/marketing/milestones'
import { PageHero } from '@/components/marketing/page-hero'
import { StatsStrip } from '@/components/marketing/stats-strip'

export const metadata: Metadata = {
  title: en.about.metaTitle,
  description: en.about.metaDescription,
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const dict = await getDictionary()
  const a = dict.about
  return (
    <>
      <PageHero
        title={a.title}
        crumbs={[{ label: dict.chrome.home, href: '/' }, { label: dict.chrome.about }]}
        breadcrumbLabel={dict.chrome.breadcrumb}
      />
      {stats.length > 0 ? (
        <Container className="-mt-6 md:-mt-10">
          <div className="relative rounded-md bg-white p-6 shadow-overlay md:p-8">
            <StatsStrip stats={stats} />
          </div>
        </Container>
      ) : null}

      {/* Background shifts white → ink as Our story scrolls in (globals.css .scroll-dusk). */}
      <div className="scroll-dusk">
        <section aria-labelledby="purpose-title" className="py-16 md:py-24">
          <Container>
            <SectionTitle id="purpose-title" title={a.whyTitle} />
            <div className="grid gap-10 md:grid-cols-12 md:gap-12">
              {/* The one loud element: the purpose, set like the wordmark. */}
              <p className="font-display text-3xl leading-[1.1] font-extrabold text-ink-900 uppercase [font-stretch:125%] md:col-span-5 md:text-4xl lg:text-5xl">
                {about.purpose}
              </p>
              <div className="grid content-start gap-8 border-l-4 border-brand-yellow pl-6 md:col-span-7 md:pl-10">
                <div>
                  <h3 className="text-xl font-semibold">{a.philosophyTitle}</h3>
                  <p className="mt-2 text-lg">{about.philosophy}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{a.missionTitle}</h3>
                  <p className="mt-2">{about.mission}</p>
                </div>
              </div>
            </div>
            <PlaceholderVisual
              tone="warehouse"
              label="Placeholder: team / warehouse photo"
              className="mt-14 aspect-[16/9] rounded-md md:aspect-[21/9]"
            />
          </Container>
        </section>
        <section aria-labelledby="values-title" className="pb-4">
          <Container>
            <SectionTitle id="values-title" title={a.valuesTitle} />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {about.values.map((value) => (
                // Same hover as the home "Why Mojo Tools" cards: yellow border, lift, bottom sweep.
                <li
                  key={value.title}
                  className="group relative overflow-hidden rounded-md border border-steel-200 bg-white p-6 transition-[transform,border-color] duration-200 ease-brand hover:border-brand-yellow motion-safe:hover:-translate-y-0.5"
                >
                  <h3 className="text-lg leading-snug font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm">{value.body}</p>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-yellow transition-transform duration-300 ease-brand group-hover:scale-x-100"
                  />
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {expert ? (
          <ExpertCard
            {...expert}
            title={a.expertTitle}
            body={t(a.expertBody, { name: expert.name })}
            ctaLabel={t(a.expertCta, { name: expert.name })}
            href={whatsappHref(t(a.expertMessage, { name: expert.name }))}
            newTabLabel={dict.chrome.opensNewTab}
          />
        ) : null}

        {about.timeline.length > 0 ? (
          <Milestones
            items={about.timeline}
            title={a.storyTitle}
            yearsLabel={a.storyYears}
            skipLabel={a.storySkip}
          />
        ) : null}
      </div>
    </>
  )
}
