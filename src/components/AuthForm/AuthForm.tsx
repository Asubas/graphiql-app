import React, { useState } from 'react';
import { Grid, Button, Container, Link } from '@mui/material';
import { EmailRounded, Lock } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './AuthForm.module.scss';
import TextInputField from '../TextInputField/TextInputField';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInValidationSchema, useSignUpValidationSchema } from '@/src/utils/validation';
import { useTranslations } from 'next-intl';
import { getLocale } from '@/src/utils/cookies';

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string, username?: string) => void;
}

interface SignInInputs {
  email: string;
  password: string;
}

interface SignUpInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const t = useTranslations('AuthForm');
  const isSignIn = title === t('signInTitle');

  const signInValidationSchema = useSignInValidationSchema();
  const signUpValidationSchema = useSignUpValidationSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs | SignUpInputs>({
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
      <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
        <Grid container spacing={0} direction="column">
          {!isSignIn && (
            <>
              <Grid item xs={12}>
                <TextInputField
                  label={t('userName')}
                  type="text"
                  error={errors && 'username' in errors ? errors.username?.message || '' : ''}
                  startIcon={<PersonIcon />}
                  register={register('username')}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextInputField
              label={t('email')}
              type="email"
              error={errors && 'email' in errors ? errors.email?.message || '' : ''}
              startIcon={<EmailRounded />}
              register={register('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              error={errors && 'password' in errors ? errors.password?.message || '' : ''}
              startIcon={<Lock />}
              showPasswordToggle
              onTogglePasswordVisibility={handleClickShowPassword}
              register={register('password')}
              autocomplete={'new-password'}
              data-testid="password-input"
            />
          </Grid>
          {!isSignIn && (
            <Grid item xs={12}>
              <TextInputField
                label={t('confirmPassword')}
                type={showPassword ? 'text' : 'password'}
                error={
                  errors && 'confirmPassword' in errors ? errors.confirmPassword?.message || '' : ''
                }
                startIcon={<Lock />}
                showPasswordToggle
                onTogglePasswordVisibility={handleClickShowPassword}
                register={register('confirmPassword')}
                autocomplete={'new-password'}
                data-testid="confirm-password-input"
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              {t('submit')}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Link variant="body2" onClick={handleLinkClick} className={style.navigationLink}>
        {isSignIn ? t('isSignInText') : t('isNotSignInText')}
      </Link>
    </Container>
  );
};

export default AuthForm;
