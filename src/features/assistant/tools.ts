import 'server-only'
import { tool } from 'ai'
import { z } from 'zod'
import { enquiryTypes } from '@/features/content/site'
import type { AssistantLink } from './config'
import {
  businessFacts,
  contactLinks,
  quoteHref,
  searchCatalog,
  sitePages,
  type SitePage,
} from './catalog'

const pageKeys = Object.keys(sitePages) as [SitePage, ...SitePage[]]
const typeValues = enquiryTypes.map((t) => t.value) as [string, ...string[]]

/**
 * Agent tools. Every tool returns `links` the chat UI renders as buttons, so the visitor
 * can act in one tap. Tools only read content or build URLs: nothing is submitted on the
 * visitor's behalf (the quote form keeps consent and validation).
 */
export const assistantTools = {
  searchCatalog: tool({
    description:
      'Find product categories and brands Mojo Tools supplies that match what the visitor needs.',
    inputSchema: z.object({
      query: z.string().min(2).max(200).describe('What the visitor is looking for'),
    }),
    execute: async ({ query }) => {
      const result = searchCatalog(query)
      const links: AssistantLink[] = [
        ...result.categories.slice(0, 2).map((c) => ({ label: c.name, href: c.page })),
        ...result.brands.slice(0, 2).map((b) => ({ label: b.name, href: b.page })),
      ]
      return { ...result, links }
    },
  }),
  openPage: tool({
    description: 'Give the visitor a link to a page on the Mojo Tools website.',
    inputSchema: z.object({ page: z.enum(pageKeys) }),
    execute: async ({ page }) => ({ links: [sitePages[page]] }),
  }),
  prepareQuote: tool({
    description:
      'Prepare a pre-filled quote / enquiry form link once you know what the visitor needs. The visitor reviews and submits it.',
    inputSchema: z.object({
      type: z
        .enum(typeValues)
        .describe('quote for prices/bulk, price_list, dealer, support, or contact'),
      category: z.string().optional().describe('Category slug, e.g. power-tools'),
      brand: z.string().optional().describe('Brand slug, e.g. brand-a'),
      summary: z
        .string()
        .max(500)
        .describe('Short summary of items and quantities for the message box'),
    }),
    execute: async ({ type, category, brand, summary }) => {
      const href = quoteHref({
        type: type as (typeof enquiryTypes)[number]['value'],
        category,
        brand,
        message: summary,
      })
      return { links: [{ label: 'Open your pre-filled quote form', href }] }
    },
  }),
  contactTeam: tool({
    description: 'Connect the visitor with a person at Mojo Tools by WhatsApp or phone.',
    inputSchema: z.object({ topic: z.string().max(120).optional() }),
    execute: async ({ topic }) => ({ links: contactLinks(topic) }),
  }),
  getBusinessInfo: tool({
    description: 'Address, opening hours, phone, WhatsApp, email and reply time.',
    inputSchema: z.object({}),
    execute: async () => ({ ...businessFacts(), links: [sitePages.contact] }),
  }),
}
