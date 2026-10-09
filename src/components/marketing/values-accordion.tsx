'use client'

import { Accordion } from 'radix-ui'
import { Minus, Plus } from 'lucide-react'

/** Radix accordion: buttons with aria-expanded, ↑/↓ between headers (DESIGN §8.7). */
export function ValuesAccordion({ items }: { items: { title: string; body: string }[] }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={items[0]?.title}
      className="divide-y divide-steel-200 border-y border-steel-200"
    >
      {items.map((item) => (
        <Accordion.Item key={item.title} value={item.title}>
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-4 text-left font-display text-lg font-bold text-ink-900">
              {item.title}
              <Plus aria-hidden="true" className="size-5 group-data-[state=open]:hidden" />
              <Minus aria-hidden="true" className="hidden size-5 group-data-[state=open]:block" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-4 text-steel-600">{item.body}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
