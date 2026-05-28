// Next.js Middleware for multi-language routing and browser detection - Vercel Connected Build
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'vi', 'ko', 'zh'];

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static resources, next internals, and api endpoints
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // matches files like favicon.ico, images, etc.
  ) {
    return NextResponse.next();
  }

  // 1. URL Parameter Check (?lang=...)
  const langParam = searchParams.get('lang');
  if (langParam && SUPPORTED_LOCALES.includes(langParam)) {
    const nextUrl = request.nextUrl.clone();
    nextUrl.searchParams.delete('lang');
    
    // Redirect to the clean path (without ?lang=...)
    const response = NextResponse.redirect(nextUrl);
    
    // Save language to cookie
    response.cookies.set('NEXT_LOCALE', langParam, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    return response;
  }

  // 2. Cookie Check
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

  if (!localeCookie || !SUPPORTED_LOCALES.includes(localeCookie)) {
    // 3. Browser Language Check (Fallback)
    const acceptLanguage = request.headers.get('accept-language') || '';
    let detectedLocale = 'en';

    if (acceptLanguage) {
      // Parse e.g. "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7"
      const preferredLanguages = acceptLanguage
        .split(',')
        .map((lang) => lang.split(';')[0].trim().toLowerCase());

      for (const lang of preferredLanguages) {
        if (lang.startsWith('vi')) {
          detectedLocale = 'vi';
          break;
        }
        if (lang.startsWith('ko')) {
          detectedLocale = 'ko';
          break;
        }
        if (lang.startsWith('zh')) {
          detectedLocale = 'zh';
          break;
        }
        if (lang.startsWith('en')) {
          detectedLocale = 'en';
          break;
        }
      }
    }

    // Set cookie and redirect to reload with new cookie state
    const response = NextResponse.redirect(request.url);
    response.cookies.set('NEXT_LOCALE', detectedLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Apply middleware to all routes except static assets
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
