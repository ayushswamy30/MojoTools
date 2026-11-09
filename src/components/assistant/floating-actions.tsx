'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useChat } from '@ai-sdk/react'
import { Bot, Phone, Send, Square } from 'lucide-react'
import { trackEvent } from '@/features/analytics/events'
import { MAX_MESSAGE_CHARS, type AssistantLink } from '@/features/assistant/config'
import type { Dictionary } from '@/i18n/dictionary'
import { cn } from '@/lib/cn'

type Props = {
  labels: Dictionary['assistant']
  enabled: boolean
  provider: string | null
  whatsappHref: string
  telHref: string
  newTabLabel: string
}

/**
 * Bottom-right Mojo Mitra launcher (a turning seal badge; WhatsApp lives in page content).
 * The chat panel is a non-modal dialog (Esc closes, focus returns to the launcher);
 * messages are announced through a polite live log.
 */
export function FloatingActions({
  labels,
  enabled,
  provider,
  whatsappHref,
  telHref,
  newTabLabel,
}: Props) {
  const [open, setOpen] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)

  const toggle = (next: boolean) => {
    setOpen(next)
    if (next) trackEvent('assistant_open', {})
    else launcherRef.current?.focus()
  }

  return (
    <div className="fixed right-4 bottom-[calc(1rem+var(--cookie-banner-height))] z-[var(--z-fab)] flex flex-col items-end gap-3">
      {open ? (
        <ChatPanel
          labels={labels}
          enabled={enabled}
          provider={provider}
          whatsappHref={whatsappHref}
          telHref={telHref}
          newTabLabel={newTabLabel}
          onClose={() => toggle(false)}
        />
      ) : null}
      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        onClick={() => toggle(!open)}
        className="group relative size-[72px] rounded-full drop-shadow-[0_6px_12px_rgb(17_19_21/0.25)] transition-transform duration-200 ease-brand hover:scale-105 sm:size-[88px]"
      >
        <SealBadge open={open} />
        <span className="sr-only">{open ? labels.close : labels.launcher}</span>
        {open ? null : (
          // Visual repeat of the accessible name for people who can't read the turning ring.
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-full mr-3 translate-x-1 -translate-y-1/2 rounded-full bg-ink-900 px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-white opacity-0 ring-1 ring-brand-yellow/60 transition duration-200 ease-brand group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
          >
            {labels.launcher}
          </span>
        )}
      </button>
    </div>
  )
}

// Scalloped seal edge: 20 outward semicircles between points on a circle (viewBox 0 0 100 100).
const SEAL_PATH = (() => {
  const n = 20
  const r = 43.7
  const bump = r * Math.sin(Math.PI / n)
  const pt = (i: number) => {
    const a = (2 * Math.PI * i) / n
    return `${(50 + r * Math.sin(a)).toFixed(2)} ${(50 - r * Math.cos(a)).toFixed(2)}`
  }
  let d = `M${pt(0)}`
  for (let i = 1; i <= n; i++) d += ` A${bump.toFixed(2)} ${bump.toFixed(2)} 0 0 1 ${pt(i)}`
  return `${d}Z`
})()
// Text sits outside its baseline circle, so cap tops land near r≈39, clear of the edge.
const RING_RADIUS = 32.5

/**
 * Decorative launcher art: ink seal with a yellow edge (visible on light and dark sections),
 * "ASK MITRA" ring turning once per 24s, plus an extra hover spin layered on top so the speed-up
 * never jumps. Reduced motion stops both (motion-safe + the global rule).
 */
function SealBadge({ open }: { open: boolean }) {
  const ringId = useId()
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="size-full">
      <path d={SEAL_PATH} className="fill-ink-900 stroke-brand-yellow" strokeWidth="1.5" />
      <circle
        cx="50"
        cy="50"
        r="26"
        fill="none"
        strokeWidth="0.9"
        strokeDasharray="2.2 2.2"
        className="stroke-brand-yellow opacity-70"
      />
      <g className="origin-center [transform-box:view-box] motion-safe:animate-seal-spin">
        <g className="origin-center [transform-box:view-box] motion-safe:animate-[seal-spin_4s_linear_infinite_paused] motion-safe:group-hover:[animation-play-state:running]">
          <path
            id={ringId}
            d={`M50 50m-${RING_RADIUS} 0a${RING_RADIUS} ${RING_RADIUS} 0 1 1 ${2 * RING_RADIUS} 0a${RING_RADIUS} ${RING_RADIUS} 0 1 1 -${2 * RING_RADIUS} 0`}
            fill="none"
          />
          <text className="fill-brand-yellow font-display text-[8.5px] font-extrabold tracking-wider uppercase">
            <textPath
              href={`#${ringId}`}
              textLength={(2 * Math.PI * RING_RADIUS).toFixed(2)}
              lengthAdjust="spacing"
            >
              Ask Mitra • Ask Mitra •{' '}
            </textPath>
          </text>
        </g>
      </g>
      {open ? (
        <path
          d="M42 42l16 16M58 42L42 58"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="stroke-brand-yellow"
        />
      ) : (
        // Logo wedge (same right-angle triangle as the header logo).
        <path d="M43 43h20L43 63Z" className="fill-brand-yellow" />
      )}
    </svg>
  )
}

function ChatPanel({
  labels,
  enabled,
  provider,
  whatsappHref,
  telHref,
  newTabLabel,
  onClose,
}: Props & { onClose: () => void }) {
  const titleId = useId()
  const inputId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState('')
  const { messages, sendMessage, status, error, stop, regenerate } = useChat()
  const busy = status === 'submitted' || status === 'streaming'

  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })
  useEffect(() => {
    inputRef.current?.focus()
    // Esc closes the panel from anywhere (DESIGN §8.7); a document listener keeps the dialog
    // container free of handlers.
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [messages, status])

  const send = (text: string) => {
    const trimmed = text.trim().slice(0, MAX_MESSAGE_CHARS)
    if (!trimmed || busy) return
    void sendMessage({ text: trimmed })
    trackEvent('assistant_message', {})
    setInput('')
  }

  const quick = [
    { label: labels.quickFind, prompt: labels.quickFindPrompt },
    { label: labels.quickQuote, prompt: labels.quickQuotePrompt },
    { label: labels.quickDealer, prompt: labels.quickDealerPrompt },
    { label: labels.quickPerson, prompt: labels.quickPersonPrompt },
  ]
  const offlineLinks: AssistantLink[] = [
    { label: 'Products', href: '/products' },
    { label: 'Distributorship', href: '/distributorship' },
    { label: 'Get a quote', href: '/quote' },
    { label: 'WhatsApp', href: whatsappHref, external: true },
  ]

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      className="fixed inset-x-2 top-20 bottom-[calc(5.5rem+var(--cookie-banner-height))] flex flex-col overflow-hidden rounded-lg border border-steel-200 bg-white shadow-overlay sm:static sm:h-[min(560px,calc(100dvh-10rem))] sm:w-[380px]"
    >
      <div className="on-dark flex items-center justify-between gap-3 bg-ink-900 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-yellow">
            <Bot aria-hidden="true" className="size-5 text-ink-900" />
          </span>
          <div>
            <h2 id={titleId} className="font-display text-base font-bold text-white">
              {labels.title}
            </h2>
            <p className="text-[13px] text-steel-200">{labels.subtitle}</p>
          </div>
        </div>
        <a
          href={telHref}
          className="inline-flex size-11 items-center justify-center rounded-sm text-white hover:bg-white/10"
        >
          <Phone aria-hidden="true" className="size-5" />
          <span className="sr-only">Call</span>
        </a>
      </div>

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        <Bubble from="assistant">{enabled ? labels.welcome : labels.offline}</Bubble>
        {!enabled ? <LinkChips links={offlineLinks} newTabLabel={newTabLabel} /> : null}
        {enabled && messages.length === 0 ? (
          <div role="group" aria-label={labels.suggestions} className="flex flex-wrap gap-2">
            {quick.map((q) => (
              <button
                key={q.label}
                type="button"
                onClick={() => send(q.prompt)}
                className="min-h-11 rounded-full border border-steel-400 px-3 text-sm font-semibold text-ink-900 hover:bg-steel-100"
              >
                {q.label}
              </button>
            ))}
          </div>
        ) : null}
        {messages.map((message) => (
          <div key={message.id} className="space-y-2">
            {message.parts.map((part, index) => {
              if (part.type === 'text') {
                return part.text.trim() ? (
                  <Bubble
                    key={index}
                    from={message.role === 'user' ? 'user' : 'assistant'}
                    youLabel={labels.you}
                  >
                    {part.text}
                  </Bubble>
                ) : null
              }
              if (
                part.type.startsWith('tool-') &&
                'state' in part &&
                part.state === 'output-available'
              ) {
                const links = (part as { output?: { links?: AssistantLink[] } }).output?.links
                return links?.length ? (
                  <LinkChips key={index} links={links} newTabLabel={newTabLabel} />
                ) : null
              }
              return null
            })}
          </div>
        ))}
        {status === 'submitted' ? (
          <p className="text-sm text-steel-500">{labels.thinking}</p>
        ) : null}
        {error ? (
          <div role="alert" className="rounded-md border border-danger p-3 text-sm">
            <p>{labels.error}</p>
            <button
              type="button"
              onClick={() => void regenerate()}
              className="mt-2 font-semibold text-info underline"
            >
              {labels.retry}
            </button>
          </div>
        ) : null}
      </div>

      {enabled ? (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            send(input)
          }}
          className="border-t border-steel-200 p-3"
        >
          <label htmlFor={inputId} className="sr-only">
            {labels.inputLabel}
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id={inputId}
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={MAX_MESSAGE_CHARS}
              placeholder={labels.placeholder}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  send(input)
                }
              }}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-sm border border-steel-400 px-3 py-2.5 text-base text-ink-900"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => void stop()}
                className="inline-flex size-11 items-center justify-center rounded-sm bg-ink-900 text-white"
              >
                <Square aria-hidden="true" className="size-4" />
                <span className="sr-only">{labels.stop}</span>
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex size-11 items-center justify-center rounded-sm bg-brand-yellow text-ink-900 hover:bg-brand-yellow-hover"
              >
                <Send aria-hidden="true" className="size-5" />
                <span className="sr-only">{labels.send}</span>
              </button>
            )}
          </div>
          <p className="mt-2 text-[13px] text-steel-500">
            {labels.privacy.replace('{provider}', provider ?? 'our AI provider')}{' '}
            <Link href="/policies/privacy" className="text-info underline underline-offset-2">
              {labels.privacyLink}
            </Link>
          </p>
        </form>
      ) : null}
    </div>
  )
}

/** Renders plain text with **bold** support (models often use it); no HTML is injected. */
function Bubble({
  from,
  children,
  youLabel,
}: {
  from: 'user' | 'assistant'
  children: string
  youLabel?: string
}) {
  const parts = children.replace(/^\s*[-*]\s+/gm, '• ').split(/(\*\*[^*]+\*\*)/g)
  return (
    <div className={cn('flex', from === 'user' ? 'justify-end' : 'justify-start')}>
      <p
        className={cn(
          'max-w-[85%] rounded-lg px-3 py-2 text-[15px] leading-6 whitespace-pre-wrap',
          from === 'user' ? 'bg-ink-900 text-white' : 'bg-steel-100 text-ink-900',
        )}
      >
        {from === 'user' && youLabel ? <span className="sr-only">{youLabel}: </span> : null}
        {parts.map((part, i) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
          ) : (
            part
          ),
        )}
      </p>
    </div>
  )
}

function LinkChips({ links, newTabLabel }: { links: AssistantLink[]; newTabLabel: string }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          {link.external || !link.href.startsWith('/') ? (
            <a
              href={link.href}
              target={link.href.startsWith('tel:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-brand-yellow px-4 text-sm font-semibold text-ink-900 hover:bg-brand-yellow-hover"
            >
              {link.label}
              {link.href.startsWith('tel:') ? null : (
                <span className="sr-only"> {newTabLabel}</span>
              )}
            </a>
          ) : (
            <Link
              href={link.href}
              className="inline-flex min-h-11 items-center rounded-full bg-brand-yellow px-4 text-sm font-semibold text-ink-900 hover:bg-brand-yellow-hover"
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
