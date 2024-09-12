import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Проверка на доступность токена для определённых маршрутов
  if (
    (!token && request.nextUrl.pathname === '/restfull') ||
    (!token && request.nextUrl.pathname.startsWith('/graphql')) ||
    (!token && request.nextUrl.pathname === '/history')
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl.href));
  }

  if (
    (token && request.nextUrl.pathname === '/signIn') ||
    (token && request.nextUrl.pathname === '/signUp')
  ) {
    return NextResponse.redirect(new URL('/', request.nextUrl.href));
  }

  const intlResponse = intlMiddleware(request);
  if (intlResponse) {
    return intlResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
