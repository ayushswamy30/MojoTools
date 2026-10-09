import { MapPin } from 'lucide-react'
import { business } from '@/features/content/site'

/** Map with the address always available as text (DESIGN §8.6). Placeholder until the address is final. */
export function MapCard() {
  const address = `${business.address.line1}, ${business.address.city}, ${business.address.state} ${business.address.pincode}`
  return (
    <section
      aria-labelledby="map-title"
      className="overflow-hidden rounded-md border border-steel-200"
    >
      {business.mapEmbedUrl ? (
        <iframe
          title={`${business.name} location map`}
          src={business.mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full border-0"
        />
      ) : (
        <div className="flex h-72 items-center justify-center bg-steel-100 p-6 text-center text-sm text-steel-600">
          Map appears here once the shop address is confirmed (placeholder).
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div className="flex gap-3">
          <MapPin aria-hidden="true" className="mt-0.5 size-5 text-ink-900" />
          <div>
            <h2 id="map-title" className="font-sans text-base font-semibold">
              Find us
            </h2>
            <p className="text-sm">{address}</p>
          </div>
        </div>
        {business.directionsUrl ? (
          <a
            href={business.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-info underline underline-offset-4"
          >
            Get directions <span className="sr-only">(opens in a new tab)</span>
          </a>
        ) : null}
      </div>
    </section>
  )
}
