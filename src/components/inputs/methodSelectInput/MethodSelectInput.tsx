import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, UseFormRegisterReturn } from 'react-hook-form';
import { styled } from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '130px',
  '& .MuiInputBase-input': {
    color: 'wheat',
  },
  '& .MuiInputLabel-root': {
    color: 'wheat',
    '&.Mui-focused': {
      color: theme.palette.warning.main,
    },
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.warning.main,
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
}));

const MethodSelectInput = ({
  label,
  name,
  control,
  onBlur,
}: {
  label: string;
  name: string;
  control: any;
  onBlur: () => void;
}) => {
  return (
    <StyledFormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={label}
            onBlur={() => {
              field.onBlur();
              onBlur();
            }}
          >
            <MenuItem value="GET">GET</MenuItem>
            <MenuItem value="POST">POST</MenuItem>
            <MenuItem value="PUT">PUT</MenuItem>
            <MenuItem value="DELETE">DELETE</MenuItem>
            <MenuItem value="PATCH">PATCH</MenuItem>
          </Select>
        )}
      />
    </StyledFormControl>
  );
};

export { MethodSelectInput };
