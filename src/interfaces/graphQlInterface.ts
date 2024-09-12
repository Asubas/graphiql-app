export interface ErrorResponse {
  message: string;
}

export interface FormData {
  endpointUrl: string;
  sdlUrl: string;
  headers: string;
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

export interface FormDataHistory {
  endpointUrl: string;
  headers: string;
  query: string;
  variables: string | null;
  timestamp: string;
  encodedHistoryUrl: string;
}

export interface DefaultParams {
  endpointUrl: string;
  headers: string;
  query: string;
  variables: string;
}
