import style from './AuthForm.module.scss';
import PersonIcon from '@mui/icons-material/Person';
import React, { useState } from 'react';
import { Grid, Button, Container, Link } from '@mui/material';
import { EmailRounded, Lock } from '@mui/icons-material';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInValidationSchema, useSignUpValidationSchema } from '@/src/utils/validation';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/src/utils/cookies';
import { TextFieldInput } from '../inputs/textFieldInput/textFieldInput';
import { AuthFormProps, SignInInputs, SignUpInputs } from '@/src/interfaces/authFormInterfaces';

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const t = useTranslations('AuthForm');
  const isSignIn = title === t('signInTitle');

  const signInValidationSchema = useSignInValidationSchema();
  const signUpValidationSchema = useSignUpValidationSchema();

  const methods = useForm<SignInInputs | SignUpInputs>({
    resolver: yupResolver(isSignIn ? signInValidationSchema : signUpValidationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const locale = getLocale();

  const handleLinkClick = () => {
    if (isSignIn) {
      router.push(`/${locale}/signUp`);
    } else {
      router.push(`/${locale}/signIn`);
    }
  };

  const onSubmitForm: SubmitHandler<SignInInputs | SignUpInputs> = (data) => {
    const { email, password } = data as SignInInputs;
    if (isSignIn) {
      onSubmit(email, password);
    } else {
      const { username } = data as SignUpInputs;
      onSubmit(email, password, username);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container
      maxWidth="sm"
      className={isSignIn ? style.authSignInWrapper : style.authSignUpWrapper}
    >
      <h1 className={style.header}>{title}</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitForm)} noValidate>
          <Grid container spacing={0} direction="column">
            {!isSignIn && (
              <>
                <Grid item xs={12}>
                  <TextFieldInput
                    id={'userName-id'}
                    customClass={style.inputAuthForm}
                    label={t('userName')}
                    type="text"
                    startIcon={<PersonIcon />}
                    error={methods.formState.errors.username?.message || ''}
                    register={methods.register('username')}
                    autocomplete={'userName'}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextFieldInput
                id={'email-id'}
                customClass={style.inputAuthForm}
                label={t('email')}
                type="email"
                startIcon={<EmailRounded />}
                error={methods.formState.errors.email?.message || ''}
                register={methods.register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextFieldInput
                id={'password-id'}
                customClass={style.inputAuthForm}
                label={t('password')}
                type={showPassword ? 'text' : 'password'}
                startIcon={<Lock />}
                showPasswordToggle
                onTogglePasswordVisibility={handleClickShowPassword}
                register={methods.register('password')}
                autocomplete={'new-password'}
                data-testid="password-input"
                error={methods.formState.errors.password?.message || ''}
              />
            </Grid>
            {!isSignIn && (
              <Grid item xs={12}>
                <TextFieldInput
                  id={'confirmPassword-id'}
                  customClass={style.inputAuthForm}
                  label={t('confirmPassword')}
                  type={showPassword ? 'text' : 'password'}
                  startIcon={<Lock />}
                  showPasswordToggle
                  onTogglePasswordVisibility={handleClickShowPassword}
                  register={methods.register('confirmPassword')}
                  autocomplete={'new-password'}
                  data-testid="confirm-password-input"
                  error={methods.formState.errors.confirmPassword?.message || ''}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button className={style.submitButton} fullWidth type="submit" variant="contained">
                {t('submit')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <Link variant="body2" onClick={handleLinkClick} className={style.navigationLink}>
        {isSignIn ? t('isSignInText') : t('isNotSignInText')}
      </Link>
    </Container>
  );
};

export default AuthForm;
