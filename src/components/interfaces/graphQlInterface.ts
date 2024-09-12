export interface ErrorResponse {
  message: string;
}

export interface FormData {
  endpointUrl: string;
  sdlUrl: string;
  headersValue: string;
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
  headers?:
    | string
    | {
        key: string;
        value: string;
      }[];
  query?: string;
  variables?:
    | string
    | null
    | {
        key: string;
        value: string;
      }[];
  timestamp: string;
  encodedHistoryUrl: string;
  body?: string;
  queryParams?:
    | string
    | {
        key: string;
        value: string;
      }[];
}

export interface DefaultParams {
  endpointUrl: string;
  headers: string;
  query: string;
  variables: string;
}
