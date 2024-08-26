'use client';

import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/auth';
import style from './page.module.css';
import { toast } from 'react-toastify';
import { FirebaseError } from 'firebase/app';

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    setEmailError(null);
    setPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain at least one letter, one digit, and one special character.',
      );
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('You are successfully logged in');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError) {
        console.log(firebaseError.code);
        if (firebaseError.code === 'auth/invalid-credential') {
          toast.error(
            'User with this credentials is not exist. Please check the email and password.',
          );
        } else if (firebaseError.code === 'auth/too-many-requests') {
          toast.error('Too many requests at the same time. Please try later.');
        }
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: 5,
        borderRadius: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minHeight: '400px',
      }}
    >
      <h1 className={style.header}>Sign In</h1>
      <form onSubmit={handleSignIn} noValidate>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError || ' '}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              helperText={passwordError || ' '}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignIn;
