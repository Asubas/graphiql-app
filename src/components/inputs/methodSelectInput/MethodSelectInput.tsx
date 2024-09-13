import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, UseFormRegisterReturn } from 'react-hook-form';
import { styled } from '@mui/material';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '130px',
  '& .MuiInputLabel-root': {
    color: 'wheat',
  },
  '& .MuiOutlinedInput-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
}));

const MethodSelectInput = ({
  label,
  name,
  control,
}: {
  label: string;
  name: string;
  control: any;
}) => {
  return (
    <StyledFormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} label={label}>
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
