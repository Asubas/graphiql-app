import * as Yup from 'yup';
import { useTranslations } from 'next-intl';

export const useSignInValidationSchema = () => {
  const t = useTranslations('Validation');

  return Yup.object().shape({
    email: Yup.string()
      .required(t('emailRequired'))
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
        t('emailInvalid'),
      ),
    password: Yup.string()
      .required(t('passwordRequired'))
      .min(8, t('passwordMinLength'))
      .matches(/[0-9]/, t('passwordDigit'))
      .matches(/[a-z]/, t('passwordLowercase'))
      .matches(/[A-Z]/, t('passwordUppercase'))
      .matches(/[\W_]/, t('passwordSpecial')),
  });
};

export const useSignUpValidationSchema = () => {
  const t = useTranslations('Validation');

  return Yup.object().shape({
    username: Yup.string()
      .required(t('usernameRequired'))
      .min(3, t('usernameMinLength'))
      .max(15, t('usernameMaxLength')),
    email: Yup.string()
      .required(t('emailRequired'))
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
        t('emailInvalid'),
      ),
    password: Yup.string()
      .required(t('passwordRequired'))
      .min(8, t('passwordMinLength'))
      .matches(/[0-9]/, t('passwordDigit'))
      .matches(/[a-z]/, t('passwordLowercase'))
      .matches(/[A-Z]/, t('passwordUppercase'))
      .matches(/[\W_]/, t('passwordSpecial')),
    confirmPassword: Yup.string()
      .required(t('confirmPasswordRequired'))
      .oneOf([Yup.ref('password')], t('passwordsMustMatch')),
  });
};
