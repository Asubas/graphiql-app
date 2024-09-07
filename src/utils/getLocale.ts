import Cookies from 'js-cookie';

export const getLocale = () => {
  const locale = Cookies.get('NEXT_LOCALE');
  return locale ? locale : 'ru';
};
