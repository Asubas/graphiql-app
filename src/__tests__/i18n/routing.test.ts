import { getNavigationFunctions, routing } from '@/src/i18n/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

jest.mock('next-intl/navigation', () => ({
  createSharedPathnamesNavigation: jest.fn(),
}));

describe('Shared Pathnames Navigation', () => {
  it('should call createSharedPathnamesNavigation with the routing configuration', () => {
    const mockNavigation = {
      Link: jest.fn(),
      redirect: jest.fn(),
      usePathname: jest.fn(),
      useRouter: jest.fn(),
    };

    (createSharedPathnamesNavigation as jest.Mock).mockReturnValue(mockNavigation);

    const { Link, redirect, usePathname, useRouter } = getNavigationFunctions();

    expect(createSharedPathnamesNavigation).toHaveBeenCalledWith(routing);

    expect(Link).toBe(mockNavigation.Link);
    expect(redirect).toBe(mockNavigation.redirect);
    expect(usePathname).toBe(mockNavigation.usePathname);
    expect(useRouter).toBe(mockNavigation.useRouter);
  });
});
