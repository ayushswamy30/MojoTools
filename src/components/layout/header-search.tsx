'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Popover } from 'radix-ui'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import {
  PRODUCT_SEARCH_ID,
  ProductSearch,
  type SearchLabels,
} from '@/components/marketing/product-search'

const iconButton =
  'inline-flex size-11 items-center justify-center rounded-sm transition-colors duration-150'

/**
 * Quiet search icon on every page. On Products, where the large search bar is the main control,
 * the icon turns yellow and jumps to that bar instead of opening a second box.
 */
export function HeaderSearch({ labels }: { labels: SearchLabels }) {
  const onProducts = usePathname().startsWith('/products')
  const [open, setOpen] = useState(false)

  if (onProducts)
    return (
      <button
        type="button"
        onClick={() => {
          const input = document.getElementById(PRODUCT_SEARCH_ID) as HTMLInputElement | null
          input?.focus()
          input?.select()
        }}
        className={cn(iconButton, 'text-brand-yellow hover:bg-ink-800')}
      >
        <Search aria-hidden="true" className="size-5" />
        <span className="sr-only">{labels.search}</span>
      </button>
    )

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        className={cn(iconButton, 'text-white hover:bg-ink-800 hover:text-brand-yellow')}
      >
        <Search aria-hidden="true" className="size-5" />
        <span className="sr-only">{labels.search}</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={12}
          collisionPadding={16}
          className="z-[var(--z-dialog)] w-[min(26rem,calc(100vw-2rem))] rounded-md bg-white p-2 shadow-overlay"
        >
          <ProductSearch id="header-search" labels={labels} onSubmit={() => setOpen(false)} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
