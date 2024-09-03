import input from './input.module.scss';
import pages from '../../../app/graphql/graphql.module.scss';
import { styled, useTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FieldValues, UseFormRegister, useFormContext } from 'react-hook-form';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
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
  defaultValue = '',
}: {
  label?: string;
  register?: ReturnType<UseFormRegister<TFieldValues>>;
  multilineArea?: boolean;
  rows?: number;
  customClass?: string;
  placeholder?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  prettier?: string;
  defaultValue?: string;
}) {
  const theme = useTheme();
  const { getValues, setValue } = useFormContext();
  const [inputText, setInputText] = useState<string | null>('');
  const handleFormat = async () => {
    if (inputText) {
      const parsedJson = JSON.stringify(inputText, null, 2);
      const test = JSON.parse(parsedJson);
      const formattedText = beautify.js(inputText, options);
      setValue('query', formattedText);
    } else {
      console.log('тут надо добавить тоастифай мб');
    }
  };

  useEffect(() => {
    const query = getValues('query');
    setInputText(query);
  }, [getValues]);

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
        defaultValue={defaultValue}
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
