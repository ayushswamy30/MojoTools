'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dialog } from 'radix-ui'
import { X } from 'lucide-react'
import type { Product } from '@/features/content/products'
import type { CategoryIcon } from '@/features/content/site'
import { buttonVariants } from '@/components/ui/button'
import { WhatsAppIcon } from '@/components/ui/whatsapp-icon'
import { Price, ProductVisual, type ProductLabels } from './product-card'

type Labels = ProductLabels & {
  brand: string
  itemCode: string
  exclGst: string
  specs: string
  getQuote: string
  whatsapp: string
  close: string
  opensNewTab: string
}

/**
 * Product detail as a large box over the listing. Open state lives in the URL (?product=…),
 * so it can be shared and Esc/close returns to the category without losing scroll.
 */
export function ProductDialog({
  product,
  icon,
  brand,
  closeHref,
  quoteHref,
  whatsappHref,
  labels,
}: {
  product: Product
  icon: CategoryIcon
  brand: string
  closeHref: string
  quoteHref: string
  whatsappHref: string
  labels: Labels
}) {
  const router = useRouter()
  const [open, setOpen] = useState(true)

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) router.push(closeHref, { scroll: false })
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--z-dialog)] bg-black/60" />
        <Dialog.Content className="fixed inset-x-4 top-1/2 z-[var(--z-dialog)] mx-auto max-h-[90dvh] max-w-5xl -translate-y-1/2 overflow-y-auto rounded-md bg-white shadow-overlay">
          <Dialog.Close className="absolute top-3 right-3 z-10 inline-flex size-11 items-center justify-center rounded-sm bg-white text-ink-900 hover:bg-steel-100">
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">{labels.close}</span>
          </Dialog.Close>
          <div className="grid md:grid-cols-2">
            <ProductVisual
              product={product}
              icon={icon}
              sampleBadge={labels.sampleBadge}
              className="aspect-square rounded-none md:aspect-auto md:min-h-[32rem]"
            />
            <div className="flex flex-col p-6 md:p-10">
              <p className="text-sm font-semibold tracking-wide text-steel-500 uppercase">
                {brand}
              </p>
              <Dialog.Title className="mt-2 font-display text-2xl leading-tight font-extrabold text-ink-900 uppercase [font-stretch:125%] md:text-3xl">
                {product.name}
              </Dialog.Title>
              <p className="mt-2 text-sm text-steel-500">
                {labels.itemCode}: <span className="font-mono">{product.sku}</span>
              </p>
              <div className="mt-6">
                <Price product={product} labels={labels} size="lg" />
                <p className="mt-1 text-xs text-steel-500">{labels.exclGst}</p>
              </div>
              <Dialog.Description className="mt-6 text-base">
                {product.description}
              </Dialog.Description>
              <h3 className="mt-6 font-sans text-sm font-semibold tracking-wide text-steel-500 uppercase">
                {labels.specs}
              </h3>
              <dl className="mt-2 divide-y divide-steel-200 border-y border-steel-200 text-sm">
                {[[labels.brand, brand], ...product.specs].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-2">
                    <dt className="text-steel-500">{label}</dt>
                    <dd className="text-right font-semibold text-ink-900">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={quoteHref}
                  className={buttonVariants({ variant: 'primary', size: 'lg' })}
                >
                  {labels.getQuote}
                </Link>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'outline', size: 'lg' })}
                >
                  <WhatsAppIcon className="size-4" /> {labels.whatsapp}
                  <span className="sr-only"> {labels.opensNewTab}</span>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
