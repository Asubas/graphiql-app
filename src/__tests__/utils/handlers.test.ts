import { encodedUrl } from '@/src/services/requests/encodedUrl';
import { handlerBlurInput } from '@/src/utils/handlers';

jest.mock('../../services/requests/encodedUrl');

describe('handlerBlurInput', () => {
  it('should call encodedUrl with correct parameters', () => {
    const endpointUrl = 'https://rickandmortyapi.com/graphql';
    const headersValue = 'Authorization: Bearer token';
    const query = '{ users { id name } }';
    const variables = '{ "id": 1 }';

    handlerBlurInput(endpointUrl, headersValue, query, variables);

    expect(encodedUrl).toHaveBeenCalledTimes(1);
    expect(encodedUrl).toHaveBeenCalledWith(endpointUrl, headersValue, query, variables);
  });

  it('should call encodedUrl with undefined headersValue', () => {
    const endpointUrl = 'https://rickandmortyapi.com/graphql';
    const query = '{ users { id name } }';
    const variables = '{ "id": 1 }';

    handlerBlurInput(endpointUrl, undefined, query, variables);

    // expect(encodedUrl).toHaveBeenCalledTimes(2);
    expect(encodedUrl).toHaveBeenCalledWith(endpointUrl, undefined, query, variables);
  });
});
