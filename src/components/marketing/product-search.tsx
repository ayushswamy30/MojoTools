import Form from 'next/form'
import { Search } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export const PRODUCT_SEARCH_ID = 'product-search'
export const MAX_SEARCH_CHARS = 80

export type SearchLabels = { search: string; searchPlaceholder: string; searchSubmit: string }

/** Plain GET form to /products?q=…, so search still works before JavaScript loads. */
export function ProductSearch({
  id,
  labels,
  defaultValue,
  prominent,
  onSubmit,
}: {
  id: string
  labels: SearchLabels
  defaultValue?: string
  /** The large bar on the Products page; otherwise the compact one in the header. */
  prominent?: boolean
  onSubmit?: () => void
}) {
  return (
    <Form
      action="/products"
      role="search"
      aria-label={labels.search}
      onSubmit={onSubmit}
      className={cn('flex w-full gap-2', prominent && 'max-w-2xl')}
    >
      <label htmlFor={id} className="sr-only">
        {labels.search}
      </label>
      <input
        id={id}
        type="search"
        name="q"
        required
        maxLength={MAX_SEARCH_CHARS}
        autoComplete="off"
        enterKeyHint="search"
        defaultValue={defaultValue}
        placeholder={labels.searchPlaceholder}
        className={cn(
          'min-h-11 min-w-0 flex-1 rounded-sm border bg-white px-3 text-base text-ink-900 placeholder:text-steel-500',
          prominent ? 'border-white md:min-h-12 md:px-4' : 'border-steel-400',
        )}
      />
      <button
        type="submit"
        className={cn(
          buttonVariants({ variant: 'primary' }),
          'shrink-0',
          prominent ? 'md:min-h-12' : 'px-3',
        )}
      >
        <Search aria-hidden="true" className="size-5" />
        <span className={prominent ? 'sr-only sm:not-sr-only' : 'sr-only'}>
          {labels.searchSubmit}
        </span>
      </button>
    </Form>
  )
}
