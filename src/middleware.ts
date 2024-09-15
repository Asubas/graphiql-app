import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/GRAPHQL')) {
    const newPath = pathname.replace('/GRAPHQL', '/graphql');
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  if (
    (!token && request.nextUrl.pathname.startsWith('/rest')) ||
    (!token && request.nextUrl.pathname.startsWith('/graphql')) ||
    (!token && request.nextUrl.pathname.startsWith('/history')) ||
    (!token && request.nextUrl.pathname.startsWith('/GRAPHQL')) ||
    (!token && request.nextUrl.pathname.startsWith('/GET')) ||
    (!token && request.nextUrl.pathname.startsWith('/POST')) ||
    (!token && request.nextUrl.pathname.startsWith('/DELETE')) ||
    (!token && request.nextUrl.pathname.startsWith('/PATH'))
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
