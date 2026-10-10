import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { z } from 'zod'
import { logger } from '@/lib/logger'
import { rateLimit } from '@/lib/rate-limit'
import { MAX_MESSAGE_CHARS, MAX_MESSAGES } from '@/features/assistant/config'
import { assistantInstructions } from '@/features/assistant/instructions'
import { getAssistantModel } from '@/features/assistant/model'
import { assistantTools } from '@/features/assistant/tools'

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        id: z.string().max(100),
        role: z.enum(['user', 'assistant']),
        parts: z.array(z.looseObject({ type: z.string() })).max(40),
      }),
    )
    .min(1)
    .max(MAX_MESSAGES),
})

const textOf = (message: { parts: { type: string; text?: unknown }[] }) =>
  message.parts
    .map((part) => (part.type === 'text' && typeof part.text === 'string' ? part.text : ''))
    .join('')

/** Mojo Mitra chat endpoint (ARCHITECTURE §14). Keys stay on the server. */
export async function POST(request: Request) {
  const ai = getAssistantModel()
  if (!ai) return Response.json({ error: 'assistant_disabled' }, { status: 503 })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rateLimit(`chat:${ip}`, 20, 60_000)) {
    return Response.json({ error: 'rate_limited' }, { status: 429 })
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return Response.json({ error: 'invalid_request' }, { status: 400 })
  const messages = parsed.data.messages as unknown as UIMessage[]
  const last = parsed.data.messages.at(-1)
  if (!last || last.role !== 'user' || textOf(last as never).length > MAX_MESSAGE_CHARS) {
    return Response.json({ error: 'invalid_request' }, { status: 400 })
  }

  const result = streamText({
    model: ai.model,
    instructions: assistantInstructions(),
    messages: await convertToModelMessages(messages),
    tools: assistantTools,
    stopWhen: isStepCount(4),
    maxOutputTokens: 700,
    temperature: 0.3,
    abortSignal: request.signal,
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        logger.error('assistant error', {
          provider: ai.provider,
          model: ai.modelId,
          error: String(error),
        })
        return 'Sorry, I could not answer that just now. Please try again, or chat with our team on WhatsApp.'
      },
    }),
  })
}
