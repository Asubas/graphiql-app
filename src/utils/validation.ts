import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters long')
    .max(30, 'First name must be at most 30 characters long'),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters long')
    .max(30, 'Last name must be at most 30 characters long'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]+)$/,
      'Email must be at example user@example.com',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[0-9]/, 'Password must contain at least 1 digit')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter.')
    .matches(/[\W_]/, 'The password must contain at least one special character.')
    .required('This field is required!'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});
