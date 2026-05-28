import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, public files, etc.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.includes('.') // static files
  ) {
    return NextResponse.next();
  }

  // Priority 1: Check URL param ?lang=
  const urlLangParam = request.nextUrl.searchParams.get('lang');
  if (urlLangParam && ['en', 'vi', 'ko', 'zh'].includes(urlLangParam)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', urlLangParam, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
      sameSite: 'lax',
    });
    // Remove the lang param from URL and redirect
    request.nextUrl.searchParams.delete('lang');
    return NextResponse.redirect(request.nextUrl);
  }

  // Priority 2: Check cookie
  const cookieLang = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLang && ['en', 'vi', 'ko', 'zh'].includes(cookieLang)) {
    const response = NextResponse.next();
    response.headers.set('x-locale', cookieLang);
    return response;
  }

  // Priority 3: Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  let detectedLang = 'en'; // Default fallback

  if (acceptLanguage.includes('vi')) {
    detectedLang = 'vi';
  } else if (acceptLanguage.includes('ko')) {
    detectedLang = 'ko';
  } else if (acceptLanguage.includes('zh')) {
    detectedLang = 'zh';
  }

  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', detectedLang, {
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
  });
  response.headers.set('x-locale', detectedLang);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};
