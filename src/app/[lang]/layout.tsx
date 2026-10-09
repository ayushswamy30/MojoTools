import type { Metadata, Viewport } from 'next'
import { cacheLife } from 'next/cache'
import { lang } from 'next/root-params'
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google'
import { business, isDemoContent, whatsappHref } from '@/features/content/site'
import { getDictionary } from '@/i18n/dictionary'
import { locales } from '@/i18n/config'
import { publicEnv } from '@/lib/public-env'
import { Analytics } from '@/components/layout/analytics'
import { CookieBanner } from '@/components/layout/cookie-banner'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { SkipLink } from '@/components/layout/skip-link'
import { WhatsAppFab } from '@/components/layout/whatsapp-fab'
import '../globals.css'

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: { default: `${business.name} | ${business.tagline}`, template: `%s | ${business.name}` },
  description: business.description,
  // Previews stay out of search engines until the public launch (TASKS T5.5, T17.11).
  robots: publicEnv.indexable ? undefined : { index: false, follow: false },
  openGraph: { siteName: business.name, type: 'website', locale: 'en_IN' },
}

export const viewport: Viewport = { themeColor: '#141414' }

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }))
}

async function currentYear() {
  'use cache'
  cacheLife('days')
  return new Date().getFullYear()
}

export default async function RootLayout({ children }: LayoutProps<'/[lang]'>) {
  const [locale, dict, year] = await Promise.all([lang(), getDictionary(), currentYear()])
  const c = dict.chrome
  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <SkipLink label={c.skipToContent} />
        {isDemoContent && !publicEnv.indexable ? (
          <p className="bg-brand-yellow-soft px-4 py-1.5 text-center text-[13px] font-semibold text-ink-900">
            {c.previewBanner}
          </p>
        ) : null}
        <Header dict={dict} />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer dict={dict} year={year} />
        <WhatsAppFab href={whatsappHref('Hi, I have an enquiry')} label={c.whatsappFab} />
        <CookieBanner labels={dict.cookies} />
        <Analytics gaId={publicEnv.gaId} />
      </body>
    </html>
  )
}
