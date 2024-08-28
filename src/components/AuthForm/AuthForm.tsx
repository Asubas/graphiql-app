import React, { useState } from 'react';
import { Grid, Button, Container, Link } from '@mui/material';
import { EmailRounded, Lock } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useForm, SubmitHandler, FieldErrors } from 'react-hook-form';
import style from './AuthForm.module.scss';
import TextInputField from '../TextInputField/TextInputField';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInValidationSchema, signUpValidationSchema } from '@/src/utils/validation';

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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const isSignIn = title === 'Sign In';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs | SignUpInputs>({
    resolver: yupResolver(isSignIn ? signInValidationSchema : signUpValidationSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const handleLinkClick = () => {
    if (isSignIn) {
      router.push('/signUp');
    } else {
      router.push('/signIn');
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
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container maxWidth="sm" className={style.authWrapper}>
      <h1 className={style.header}>{title}</h1>
      <form onSubmit={handleSubmit(onSubmitForm)} noValidate>
        <Grid container spacing={2} direction="column">
          {!isSignIn && (
            <>
              <Grid item xs={12}>
                <TextInputField
                  label="Username"
                  type="text"
                  error={errors && 'username' in errors ? errors.username?.message || '' : ''}
                  startIcon={<PersonIcon />}
                  register={register('username')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputField
                  label="First name"
                  type="text"
                  error={errors && 'firstName' in errors ? errors.firstName?.message || '' : ''}
                  startIcon={<PersonIcon />}
                  register={register('firstName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputField
                  label="Last name"
                  type="text"
                  error={errors && 'lastName' in errors ? errors.lastName?.message || '' : ''}
                  startIcon={<PersonIcon />}
                  register={register('lastName')}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextInputField
              label="Email"
              type="email"
              error={errors && 'email' in errors ? errors.email?.message || '' : ''}
              startIcon={<EmailRounded />}
              register={register('email')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={errors && 'password' in errors ? errors.password?.message || '' : ''}
              startIcon={<Lock />}
              showPasswordToggle
              onTogglePasswordVisibility={handleClickShowPassword}
              register={register('password')}
            />
          </Grid>
          {!isSignIn && (
            <Grid item xs={12}>
              <TextInputField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                error={
                  errors && 'confirmPassword' in errors ? errors.confirmPassword?.message || '' : ''
                }
                startIcon={<Lock />}
                showPasswordToggle
                onTogglePasswordVisibility={handleClickShowConfirmPassword}
                register={register('confirmPassword')}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <Link variant="body2" onClick={handleLinkClick} className={style.navigationLink}>
        {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
      </Link>
    </Container>
  );
};

export default AuthForm;
