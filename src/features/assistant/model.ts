import 'server-only'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createGroq } from '@ai-sdk/groq'
import { env } from '@/lib/env'

/** Defaults are fast, low-cost models with good tool calling; override with AI_MODEL. */
const DEFAULT_MODELS = {
  gemini: 'gemini-3.5-flash',
  groq: 'openai/gpt-oss-120b',
} as const

export type AssistantProvider = keyof typeof DEFAULT_MODELS

/** Picks Gemini or Groq from the configured keys (AI_PROVIDER decides when both exist). */
export function resolveProvider(): AssistantProvider | null {
  const hasGemini = Boolean(env.GOOGLE_GENERATIVE_AI_API_KEY)
  const hasGroq = Boolean(env.GROQ_API_KEY)
  if (env.AI_PROVIDER === 'groq' && hasGroq) return 'groq'
  if (env.AI_PROVIDER === 'gemini' && hasGemini) return 'gemini'
  if (hasGemini) return 'gemini'
  if (hasGroq) return 'groq'
  return null
}

export function getAssistantModel() {
  const provider = resolveProvider()
  if (!provider) return null
  const modelId = env.AI_MODEL ?? DEFAULT_MODELS[provider]
  const model =
    provider === 'gemini'
      ? createGoogleGenerativeAI({ apiKey: env.GOOGLE_GENERATIVE_AI_API_KEY })(modelId)
      : createGroq({ apiKey: env.GROQ_API_KEY })(modelId)
  return { provider, modelId, model }
}
