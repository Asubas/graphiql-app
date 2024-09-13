import input from './input.module.scss';
import pages from '../../../app/[locale]/graphql/graphql.module.scss';
import { IconButton, InputAdornment, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FieldValues, UseFormRegister, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import beautify from 'js-beautify';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const options = {
  indent_size: 4,
  indent_with_tabs: false,
  space_in_empty_paren: true,
  preserve_newlines: true,
  max_preserve_newlines: 2,
};

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

  '& .MuiInputLabel-root.Mui-error': {
    color: '#ff9001',
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ff9001',
  },
  '& .MuiFormHelperText-root.Mui-error': {
    color: '#ff9001',
    margin: '10px 0',
  },
}));

function TextFieldInput<TFieldValues extends FieldValues>({
  label,
  type,
  register,
  multilineArea = false,
  rows = 0,
  customClass = '',
  placeholder = '',
  onBlur,
  prettier = '',
  defaultValue = '',
  error,
  startIcon,
  showPasswordToggle,
  onTogglePasswordVisibility,
  autocomplete,
  id,
}: {
  id?: string;
  label?: string;
  type?: string;
  register?: ReturnType<UseFormRegister<TFieldValues>>;
  multilineArea?: boolean;
  rows?: number;
  customClass?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  prettier?: string;
  defaultValue?: string;
  error?: string | null;
  startIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
  autocomplete?: string;
}) {
  const { getValues, setValue } = useFormContext();
  const handleFormat = async () => {
    const query = getValues('query');
    if (query) {
      const TextToJson = JSON.stringify(query);
      const formattedText = beautify.js(JSON.parse(TextToJson), options);
      setValue('query', formattedText);
    }
  };

  return (
    <>
      <StyledTextField
        className={`${input.text} ${multilineArea ? input.area : ''} ${customClass}`}
        id={id ? id : 'outlined-basic'}
        label={label}
        type={type}
        variant="outlined"
        size="small"
        color="warning"
        multiline={multilineArea}
        rows={multilineArea ? rows : 0}
        {...register}
        onBlur={onBlur}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
      />
      {prettier && prettier === 'query' && (
        <Button
          className={`${pages.queryButton} ${input.formattingButton}`}
          variant="contained"
          type="button"
          onClick={handleFormat}
        >
          formatting
        </Button>
      )}
    </>
  );
}

export { TextFieldInput };
