import input from './input.module.scss';
import pages from '../../../app/graphql/graphql.module.scss';
import { styled, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { DEFAULTQUERYJSON, DEFAULTURLENDPOINT } from '@/src/services/constant';
import beautify from 'js-beautify';
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
}));

function TextFieldInput<TFieldValues extends FieldValues>({
  label,
  register,
  multilineArea = false,
  rows = 0,
  customClass = '',
  placeholder = '',
  onBlur,
  prettier = '',
}: {
  label?: string;
  register?: ReturnType<UseFormRegister<TFieldValues>>;
  multilineArea?: boolean;
  rows?: number;
  customClass?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  prettier?: string;
}) {
  const theme = useTheme();
  const [inputText, setInputText] = useState<string | null>('');
  const handleFormat = async () => {
    if (inputText) {
      const parsedJson = JSON.stringify(inputText, null, 2);
      const test = JSON.parse(parsedJson);
      const formattedText = beautify.js(inputText, options);
      setInputText(formattedText);
    } else {
      console.log('тут надо добавить тоастифай мб');
    }
  };

  useEffect(() => {
    if (prettier === 'query') {
      setInputText(DEFAULTQUERYJSON);
    } else if (prettier === 'endpoint') {
      setInputText(DEFAULTURLENDPOINT);
    }
  }, [prettier]);
  return (
    <>
      <StyledTextField
        className={`${input.text} ${multilineArea ? input.area : ''} ${customClass}`}
        id={'outlined-basic'}
        label={label}
        variant="outlined"
        size="small"
        color="warning"
        multiline={multilineArea}
        rows={multilineArea ? rows : 0}
        {...register}
        onBlur={onBlur}
        placeholder={placeholder}
        value={inputText || ''}
        onChange={(e) => setInputText(e.target.value)}
      />
      {prettier && prettier === 'query' && (
        <Button
          className={`${pages.queryButton} ${pages.formattingButton}`}
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
