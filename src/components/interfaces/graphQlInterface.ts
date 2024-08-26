import { InputProps, TextFieldVariants } from '@mui/material';

export interface ErrorResponse {
  message: string;
}

export interface FormData {
  endpointUrl: string;
  sdlUrl: string;
  headersKey?: string;
  headersValue?: string;
  query: string;
  variables: string;
}
export interface GraphQLResponse {
  data?: FormData;
  errors?: ErrorResponse[];
}

export type CustomTextFieldVariants =
  | 'outlined'
  | 'filled'
  | 'standard'
  | 'outlined-multiline-static'
  | 'fullWidth';
