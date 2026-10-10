import type { NextConfig } from 'next'

// Security headers from R0 (RULES §5). Script sources are not locked down here because
// Next.js inline bootstrap scripts need a nonce-based CSP, which forces dynamic rendering.
// Revisit with nonces when the shop (R1) adds Razorpay (TASKS T17.6).
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'frame-src https://www.google.com https://challenges.cloudflare.com',
    ].join('; '),
  },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Enquiry attachments are up to 10 MB (RULES §5); leave room for multipart overhead.
    serverActions: { bodySizeLimit: '11mb' },
    proxyClientMaxBodySize: '11mb',
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async redirects() {
    // Brands was renamed to Distributorship (DECISIONS P14); keep old links working.
    return [
      { source: '/brands', destination: '/distributorship', permanent: true },
      { source: '/brands/:slug', destination: '/distributorship/:slug', permanent: true },
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
