import { TextField, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: 'orange',
  },
  '& .MuiInputBase-input': {
    color: 'orange',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'orange',
  },
}));

function RequestTextField({ response }: { response: unknown }) {
  return (
    <StyledTextField
      id={'outlined-basic'}
      label="Response: "
      variant="outlined"
      size="small"
      color="warning"
      multiline
      rows={20}
      fullWidth={true}
      value={response ? JSON.stringify(response, null, 2) : ''}
    />
  );
}

export { RequestTextField };
