import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface TextInputFieldProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  startIcon: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  type,
  value,
  onChange,
  error,
  startIcon,
  showPasswordToggle,
  onTogglePasswordVisibility,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      variant="outlined"
      type={type}
      required
      value={value}
      onChange={onChange}
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
    />
  );
};

export default TextInputField;
