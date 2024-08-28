import React, { useState } from 'react';
import { Grid, Button, Container, Link } from '@mui/material';
import { EmailRounded, Lock } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from './AuthForm.module.scss';
import TextInputField from '../TextInputField/TextInputField';
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@/src/utils/validation';

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string, username: string) => void;
}

interface FormInputs {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({ resolver: yupResolver(validationSchema) });
  const [showPassword, setShowPassword] = useState(false);

  const isSignIn = title === 'Sign In';
  const router = useRouter();

  const handleLinkClick = () => {
    if (isSignIn) {
      router.push('/signUp');
    } else {
      router.push('/signIn');
    }
  };

  const onSubmitForm: SubmitHandler<FormInputs> = (data) => {
    const { email, password, username } = data;
    onSubmit(email, password, username);
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

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
                  error={errors.username?.message || ''}
                  startIcon={<PersonIcon />}
                  register={register('username', {
                    required: 'Username is required',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputField
                  label="First name"
                  type="text"
                  error={errors.firstName?.message || ''}
                  startIcon={<PersonIcon />}
                  register={register('firstName', {
                    required: 'First name is required',
                  })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputField
                  label="Last name"
                  type="text"
                  error={errors.lastName?.message || ''}
                  startIcon={<PersonIcon />}
                  register={register('lastName', {
                    required: 'Last name is required',
                  })}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <TextInputField
              label="Email"
              type="email"
              error={errors.email?.message || ''}
              startIcon={<EmailRounded />}
              register={register('email', {
                required: 'Email is required',
                // validate: validateEmail,
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              error={errors.password?.message || ''}
              startIcon={<Lock />}
              showPasswordToggle
              onTogglePasswordVisibility={handleClickShowPassword}
              register={register('password', {
                required: 'Password is required',
                // validate: validatePassword,
              })}
            />
          </Grid>
          {!isSignIn && (
            <Grid item xs={12}>
              <TextInputField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                error={errors.confirmPassword?.message || ''}
                startIcon={<Lock />}
                showPasswordToggle
                onTogglePasswordVisibility={handleClickShowPassword}
                register={register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match',
                })}
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
