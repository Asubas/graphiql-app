import { encodedUrl } from '../services/requests/encodedUrl';

export const handlerBlurInput = (
  endpointUrl: string,
  headersValue: string | undefined,
  query: string,
  variables: string,
) => {
  encodedUrl(endpointUrl, headersValue, query, variables);
};
