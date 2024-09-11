import Cookies from 'js-cookie';

export const getLocale = () => {
  const locale = Cookies.get('NEXT_LOCALE');
  return locale ? locale : 'ru';
};

export const setLocale = (locale: string) => {
  return Cookies.set('NEXT_LOCALE', locale);
};
