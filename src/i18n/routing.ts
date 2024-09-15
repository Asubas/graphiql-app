import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ru'],

  defaultLocale: 'ru',
  localePrefix: 'never',
});

export const getNavigationFunctions = () => {
  return createSharedPathnamesNavigation(routing);
};
