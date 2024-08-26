'use client';

import { FC, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockIcon from '@mui/icons-material/Lock';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../utils/auth';
import style from './page.module.css';

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

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
    setGeneralError(null);

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
      alert('Logged in successfully!');
    } catch (error) {
      setGeneralError('Invalid email or password');
      console.error('Error signing in:', error);
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
              type="password"
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
              }}
            />
          </Grid>
          {generalError && (
            <Grid item xs={12}>
              <div style={{ color: 'red', textAlign: 'center' }}>{generalError}</div>
            </Grid>
          )}
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
