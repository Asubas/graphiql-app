import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  if (
    (!token && request.nextUrl.pathname === '/restfull') ||
    (!token && request.nextUrl.pathname.startsWith('/graphql'))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (
    (token && request.nextUrl.pathname === '/signIn') ||
    (token && request.nextUrl.pathname === '/signUp')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
