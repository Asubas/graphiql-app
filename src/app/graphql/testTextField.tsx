import { TextField, styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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

function MyTextField({ response }) {
  return (
    <StyledTextField
      id={'outlined-basic'}
      label="Body: "
      variant="outlined"
      size="small"
      color="warning"
      multiline
      rows={25}
      defaultValue=""
      value={response ? JSON.stringify(response, null, 2) : 'null'}
    />
  );
}

export default MyTextField;
