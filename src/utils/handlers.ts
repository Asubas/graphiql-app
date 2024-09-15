import { encodedUrl } from '../services/requests/encodedUrl';

export const handlerBlurInput = (
  endpointUrl: string,
  headersValue: string | null,
  query: string,
  variables: string,
) => {
  encodedUrl(endpointUrl, headersValue, query, variables);
};
