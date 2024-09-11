import createMiddleware from 'next-intl/middleware';
import { config } from '../middleware';
import { routing } from '../i18n/routing';

jest.mock('next-intl/middleware', () => jest.fn());

describe('Middleware tests', () => {
  it('should call createMiddleware with the correct routing configuration', () => {
    expect(createMiddleware).toHaveBeenCalledWith(routing);
  });

  it('should have the correct matcher configuration', () => {
    expect(config.matcher).toEqual(['/((?!api|_next|.*\\..*).*)']);
  });
});
