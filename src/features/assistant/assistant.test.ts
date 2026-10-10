import { generateText, isStepCount } from 'ai'
import { MockLanguageModelV4 } from 'ai/test'
import { describe, expect, it } from 'vitest'
import { quoteHref, searchCatalog } from './catalog'
import { assistantTools } from './tools'

const usage = {
  inputTokens: { total: 10, noCache: 10, cacheRead: undefined, cacheWrite: undefined },
  outputTokens: { total: 10, text: 10, reasoning: undefined },
}

describe('catalog helpers', () => {
  it('finds categories and their brands from plain language', () => {
    const result = searchCatalog('I need an angle grinder')
    expect(result.categories[0]?.name).toBe('Power Tools')
    expect(result.categories[0]?.brands).toContain('Brand A')
    expect(result.categories[0]?.page).toBe('/products#power-tools')
  })

  it('builds safe pre-filled quote links', () => {
    expect(quoteHref({ type: 'quote', category: 'welding', message: '2 welding machines' })).toBe(
      '/quote?type=quote&category=welding&message=2+welding+machines',
    )
    // Unknown slugs are dropped rather than passed through.
    expect(quoteHref({ type: 'quote', brand: 'evil"><script>' })).toBe('/quote?type=quote')
  })
})

describe('Mojo Mitra agent loop', () => {
  it('calls prepareQuote, then answers with the link available to the UI', async () => {
    let call = 0
    const model = new MockLanguageModelV4({
      doGenerate: async () => {
        call += 1
        if (call === 1) {
          return {
            content: [
              {
                type: 'tool-call',
                toolCallId: 'call-1',
                toolName: 'prepareQuote',
                input: JSON.stringify({
                  type: 'quote',
                  category: 'power-tools',
                  summary: '20 angle grinders',
                }),
              },
            ],
            finishReason: { unified: 'tool-calls', raw: undefined },
            usage,
            warnings: [],
          }
        }
        return {
          content: [{ type: 'text', text: 'Here is your quote form.' }],
          finishReason: { unified: 'stop', raw: undefined },
          usage,
          warnings: [],
        }
      },
    })

    const result = await generateText({
      model,
      tools: assistantTools,
      stopWhen: isStepCount(3),
      prompt: 'Quote for 20 angle grinders',
    })

    expect(result.text).toBe('Here is your quote form.')
    const toolResult = result.steps[0]?.toolResults[0]
    expect(toolResult?.toolName).toBe('prepareQuote')
    expect(toolResult?.output).toEqual({
      links: [
        {
          label: 'Open your pre-filled quote form',
          href: '/quote?type=quote&category=power-tools&message=20+angle+grinders',
        },
      ],
    })
  })
})

describe('chat route', () => {
  it('returns 503 when no AI key is configured (demo mode)', async () => {
    const { POST } = await import('@/app/api/chat/route')
    const response = await POST(
      new Request('http://localhost/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'hi' }] }],
        }),
      }),
    )
    expect(response.status).toBe(503)
  })
})
