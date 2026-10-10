import { NextResponse, type NextRequest } from 'next/server'

/**
 * Locale routing with an unprefixed default (DECISIONS D8): `/about` is served by
 * `app/[lang]/about` with lang=en. `/en/...` redirects to the clean URL so there is one
 * canonical address per page. Hindi (`/hi/...`) is added in R2.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/en/, '') || '/'
    return NextResponse.redirect(url, 308)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/en${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    // Skip Next internals, API routes, metadata routes and any file with an extension.
    '/((?!_next|api|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
}
