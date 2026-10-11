'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import type { Dictionary } from '@/i18n/dictionary'

type Props = {
  labels: Dictionary['mapCard']
  name: string
  address: string
  embedUrl: string | null
  directionsUrl: string | null
  newTabLabel: string
}

/**
 * Map with the address always available as text (DESIGN §8.6). The Google Maps embed sets
 * third-party cookies, so it loads only when the visitor asks for it (click to load).
 */
export function MapCard({ labels, name, address, embedUrl, directionsUrl, newTabLabel }: Props) {
  const [showMap, setShowMap] = useState(false)
  return (
    <section
      aria-labelledby="map-title"
      className="overflow-hidden rounded-md border border-steel-200"
    >
      {embedUrl && showMap ? (
        <iframe
          title={labels.frameTitle.replace('{name}', name)}
          src={embedUrl}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-72 w-full border-0"
        />
      ) : (
        <div className="flex h-72 flex-col items-center justify-center gap-4 bg-steel-100 p-6 text-center text-sm text-steel-600">
          {embedUrl ? (
            <>
              <p className="max-w-sm">{labels.notice}</p>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="inline-flex min-h-11 items-center rounded-sm border border-ink-900 bg-white px-4 font-semibold text-ink-900"
              >
                {labels.show}
              </button>
            </>
          ) : (
            <p>{labels.placeholder}</p>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex gap-3">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 text-ink-900" />
          <div>
            <h2 id="map-title" className="font-sans text-base font-semibold">
              {labels.title}
            </h2>
            <p className="text-sm">{address}</p>
          </div>
        </div>
        {directionsUrl ? (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-info underline underline-offset-4"
          >
            {labels.directions} <span className="sr-only">{newTabLabel}</span>
          </a>
        ) : null}
      </div>
    </section>
  )
}
