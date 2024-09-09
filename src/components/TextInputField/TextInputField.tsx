import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextInputFieldProps {
  label: string;
  type: string;
  error: string | null;
  startIcon: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
  register: UseFormRegisterReturn;
  autocomplete?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  type,
  error,
  startIcon,
  showPasswordToggle,
  onTogglePasswordVisibility,
  register,
  autocomplete = 'off',
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      type={type}
      required
      error={!!error}
      helperText={error || ' '}
      InputProps={{
        startAdornment: <InputAdornment position="start">{startIcon}</InputAdornment>,
        endAdornment: showPasswordToggle && onTogglePasswordVisibility && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={onTogglePasswordVisibility}
              edge="end"
            >
              {type === 'password' ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      autoComplete={autocomplete}
      {...register}
    />
  );
};

export default TextInputField;
