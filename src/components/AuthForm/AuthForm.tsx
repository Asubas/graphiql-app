import React, { useState } from 'react';
import { Grid, Button, Container } from '@mui/material';
import { EmailRounded, Lock } from '@mui/icons-material';
import style from './AuthForm.module.scss';
import { validateEmail, validatePassword } from '@/src/utils/validation';
import TextInputField from '../TextInputField/TextInputField';

interface AuthFormProps {
  title: string;
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      isValid = false;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long, contain at least one letter, one digit, and one special character.',
      );
      isValid = false;
    }

    if (isValid) {
      onSubmit(email, password);
    }
  };

  return (
    <Container maxWidth="sm" className={style.authWrapper}>
      <h1 className={style.header}>{title}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextInputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              startIcon={<EmailRounded />}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              startIcon={<Lock />}
              showPasswordToggle
              onTogglePasswordVisibility={handleClickShowPassword}
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

export default AuthForm;
