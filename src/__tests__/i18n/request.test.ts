import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';
import enMessages from '../../../messages/en.json';
import ruMessages from '../../../messages/ru.json';

// Мокаем методы
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('next-intl/server', () => ({
  getRequestConfig: jest.fn((callback) => callback),
}));

jest.mock(
  '../../messages/en.json',
  () => ({
    default: { message: 'Hello' },
  }),
  { virtual: true },
);

jest.mock(
  '../../messages/ru.json',
  () => ({
    default: { message: 'Привет' },
  }),
  { virtual: true },
);

describe('getRequestConfig', () => {
  beforeEach(() => {
    routing.locales = ['en', 'ru'] as const;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const getMessages = (locale: string) => {
    switch (locale) {
      case 'en':
        return enMessages;
      case 'ru':
        return ruMessages;
      default:
        notFound();
        throw new Error('File not found');
    }
  };

  it('should return the correct messages for a valid locale', async () => {
    const callback = getRequestConfig((params) => {
      return {
        messages: getMessages(params.locale),
      };
    });

    const result = callback({ locale: 'en' });

    expect(result).toEqual({
      messages: enMessages,
    });
  });

  it('should return the correct messages for another valid locale', async () => {
    const callback = getRequestConfig((params) => {
      if (!routing.locales.includes(params.locale as any)) notFound();

      return {
        messages: require(`../../messages/${params.locale}.json`).default,
      };
    });

    const result = await callback({ locale: 'ru' });

    expect(result).toEqual({
      messages: { message: 'Привет' },
    });
  });

  it('should call notFound for an invalid locale', async () => {
    const callback = getRequestConfig((params) => {
      return {
        messages: getMessages(params.locale),
      };
    });

    await expect(() => callback({ locale: 'de' })).toThrow('File not found');

    expect(notFound).toHaveBeenCalled();
  });

  it('should not call notFound for a valid locale', async () => {
    const callback = getRequestConfig((params) => {
      if (!routing.locales.includes(params.locale as any)) notFound();

      return {
        messages: require(`../../messages/${params.locale}.json`).default,
      };
    });

    await callback({ locale: 'en' });

    expect(notFound).not.toHaveBeenCalled();
  });
});
