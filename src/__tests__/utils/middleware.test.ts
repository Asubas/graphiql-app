import { NextRequest, NextResponse } from 'next/server';
import { middleware } from '@/src/middleware';

jest.mock('next/server', () => {
  return {
    NextResponse: {
      redirect: jest.fn(),
      next: jest.fn(),
    },
    NextRequest: jest.fn(),
  };
});

describe('Middleware', () => {
  const { NextRequest, NextResponse } = require('next/server');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //   it('should redirect to home if no token and accessing /restfull', () => {
  //     const request = {
  //       cookies: { get: jest.fn().mockReturnValue({ value: undefined }) },
  //       nextUrl: { pathname: '/restfull', href: 'http://localhost/restfull' },
  //     } as unknown as NextRequest;

  //     const response = middleware(request);

  //     expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', request.nextUrl.href));
  //   });

  it('should redirect to home if no token and accessing /graphql', () => {
    const request = {
      cookies: { get: jest.fn().mockReturnValue({ value: null }) },
      nextUrl: { pathname: '/graphql', href: 'http://localhost/graphql' },
    } as unknown as NextRequest;

    const response = middleware(request);
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('http://localhost/', request.nextUrl.origin),
    );
  });

  it('should not redirect if token is present and accessing /restfull', () => {
    const request = {
      cookies: { get: jest.fn().mockReturnValue({ value: 'valid_token' }) },
      nextUrl: { pathname: '/restfull', href: 'http://localhost/restfull' },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });

  it('should redirect to home if token is present and accessing /signIn', () => {
    const request = {
      cookies: { get: jest.fn().mockReturnValue({ value: 'valid_token' }) },
      nextUrl: { pathname: '/signIn', href: 'http://localhost/signIn' },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', request.nextUrl.href));
  });

  it('should redirect to home if token is present and accessing /signUp', () => {
    const request = {
      cookies: { get: jest.fn().mockReturnValue({ value: 'valid_token' }) },
      nextUrl: { pathname: '/signUp', href: 'http://localhost/signUp' },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(NextResponse.redirect).toHaveBeenCalledWith(new URL('/', request.nextUrl.href));
  });

  it('should call NextResponse.next() for other routes', () => {
    const request = {
      cookies: { get: jest.fn().mockReturnValue({ value: 'valid_token' }) },
      nextUrl: { pathname: '/otherRoute', href: 'http://localhost/otherRoute' },
    } as unknown as NextRequest;

    const response = middleware(request);

    expect(NextResponse.next).toHaveBeenCalled();
    expect(NextResponse.redirect).not.toHaveBeenCalled();
  });
});
