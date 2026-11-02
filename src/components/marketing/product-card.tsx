import Link from 'next/link'
import type { Product } from '@/features/content/products'
import type { CategoryIcon } from '@/features/content/site'
import { formatPrice } from '@/lib/format'
import { cn } from '@/lib/cn'
import { CategoryArt } from './category-art'

export type ProductLabels = { sampleBadge: string; plusGst: string; off: string }

/** Picture panel with the product type on a dark band (stand-in until real photos, A8). */
export function ProductVisual({
  product,
  icon,
  sampleBadge,
  className,
}: {
  product: Product
  icon: CategoryIcon
  sampleBadge?: string
  className?: string
}) {
  return (
    <div
      className={cn('relative flex flex-col overflow-hidden rounded-sm bg-steel-100', className)}
    >
      {sampleBadge ? (
        <span className="absolute top-3 left-3 rounded-sm bg-white px-2 py-0.5 font-mono text-xs text-steel-600">
          {sampleBadge}
        </span>
      ) : null}
      <div className="grid flex-1 place-items-center p-6">
        <CategoryArt name={icon} className="size-1/2 text-ink-900" />
      </div>
      <span className="bg-ink-900 px-3 py-2 text-center font-display text-sm font-extrabold tracking-wider text-white uppercase [font-stretch:125%]">
        {product.type}
      </span>
    </div>
  )
}

export function Price({
  product,
  labels,
  size = 'md',
}: {
  product: Product
  labels: ProductLabels
  size?: 'md' | 'lg'
}) {
  const saving =
    product.mrpPaise && product.mrpPaise > product.pricePaise
      ? product.mrpPaise - product.pricePaise
      : 0
  return (
    <p className="flex flex-wrap items-baseline gap-x-2">
      <span className={cn('font-bold text-ink-900', size === 'lg' ? 'text-3xl' : 'text-base')}>
        {formatPrice(product.pricePaise)}
      </span>
      <span className="text-xs text-steel-500">{labels.plusGst}</span>
      {saving > 0 && product.mrpPaise ? (
        <>
          <s className="text-sm text-steel-500">{formatPrice(product.mrpPaise)}</s>
          <span className="text-sm font-semibold text-danger">
            {labels.off.replace('{amount}', formatPrice(saving))}
          </span>
        </>
      ) : null}
    </p>
  )
}

/** Listing card: opens the detail box on the same page (?product=…). */
export function ProductCard({
  product,
  icon,
  brand,
  href,
  labels,
}: {
  product: Product
  icon: CategoryIcon
  brand: string
  href: string
  labels: ProductLabels
}) {
  return (
    <Link href={href} scroll={false} className="group flex h-full flex-col">
      <ProductVisual
        product={product}
        icon={icon}
        sampleBadge={labels.sampleBadge}
        className="aspect-[4/5] transition-shadow duration-200 ease-brand group-hover:shadow-hover"
      />
      <h3 className="mt-3 border-b border-steel-200 pb-1 font-sans text-sm leading-snug font-bold text-ink-900 underline-offset-4 group-hover:underline">
        {product.name}
      </h3>
      <p className="mt-1 text-sm text-steel-500">{brand}</p>
      <div className="mt-1">
        <Price product={product} labels={labels} />
      </div>
    </Link>
  )
}
