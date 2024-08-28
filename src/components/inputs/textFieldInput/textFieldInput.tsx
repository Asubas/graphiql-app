import { InputProps, TextareaAutosize, styled, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import input from './input.module.scss';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { CustomTextFieldVariants } from '../../interfaces/graphQlInterface';

const StyledTextField = styled(TextField)(({ theme }) => ({
  color: 'wheat',
  '& .MuiInputLabel-root': {
    color: 'wheat',
  },
  '& .MuiInputBase-input': {
    color: 'wheat',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    color: 'wheat',
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    color: 'wheat',
  },
}));

function TextFieldInput<TFieldValues extends FieldValues>({
  label,
  register,
  multilineArea = false,
  rows = 0,
  InputProps = {},
  defaultValue = '',
  customClass = '',
  placeholder = '',
}: {
  label?: string;
  register?: ReturnType<UseFormRegister<TFieldValues>>;
  multilineArea?: boolean;
  rows?: number;
  InputProps?: Partial<InputProps> & { variant?: CustomTextFieldVariants };
  defaultValue?: string | null;
  customClass?: string;
  placeholder?: string;
}) {
  const theme = useTheme();
  return (
    <StyledTextField
      className={`${input.text} ${multilineArea ? input.area : ''} ${customClass}`}
      id={InputProps.variant || 'outlined-basic'}
      label={label}
      variant="outlined"
      size="small"
      color="warning"
      multiline={multilineArea}
      rows={multilineArea ? rows : 0}
      {...register}
      InputProps={{
        ...InputProps,
        onChange: (e) => {
          if (InputProps.onChange) {
            InputProps.onChange(e);
          }
        },
      }}
      defaultValue={defaultValue}
      placeholder={placeholder}
    />
  );
}

export { TextFieldInput };
