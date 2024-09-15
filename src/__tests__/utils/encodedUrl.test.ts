import { encodedUrl } from '@/src/services/requests/encodedUrl';

beforeAll(() => {
  window.history.pushState = jest.fn();
});

describe('encodedUrl', () => {
  it('should encode url, query, variables and call pushState', () => {
    const endpointUrl = 'https://rickandmortyapi.com/graphql';
    const headersValue = 'Authorization: Bearer token';
    const query = '{ users { id name } }';
    const variables = JSON.stringify({ id: 1 });

    const result = encodedUrl(endpointUrl, headersValue, query, variables);

    const encodedEndpointUrl = btoa(endpointUrl);
    const body = {
      query,
      variables: JSON.parse(variables),
    };
    const encodedBody = btoa(JSON.stringify(body));
    const encodedHeaders = btoa(headersValue);
    const expectedUrl = `http://localhost:3000/GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${encodedHeaders}`;

    expect(result).toBe(expectedUrl);
    expect(window.history.pushState).toHaveBeenCalledTimes(1);
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', expectedUrl);
  });

  it('should handle empty headersValue', () => {
    const endpointUrl = 'https://rickandmortyapi.com/graphql';
    const query = '{ users { id name } }';
    const variables = JSON.stringify({ id: 1 });

    const result = encodedUrl(endpointUrl, '', query, variables);

    const encodedEndpointUrl = btoa(endpointUrl);
    const body = {
      query,
      variables: JSON.parse(variables),
    };
    const encodedBody = btoa(JSON.stringify(body));
    const expectedUrl = `http://localhost:3000/GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${btoa('')}`;

    expect(result).toBe(expectedUrl);
    expect(window.history.pushState).toHaveBeenCalledTimes(2);
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', expectedUrl);
  });

  it('should handle null variables', () => {
    const endpointUrl = 'https://rickandmortyapi.com/graphql';
    const headersValue = 'Authorization: Bearer token';
    const query = '{ users { id name } }';

    const result = encodedUrl(endpointUrl, headersValue, query, null);

    const encodedEndpointUrl = btoa(endpointUrl);
    const body = {
      query,
      variables: null,
    };
    const encodedBody = btoa(JSON.stringify(body));
    const encodedHeaders = btoa(headersValue);
    const expectedUrl = `http://localhost:3000/GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${encodedHeaders}`;

    expect(result).toBe(expectedUrl);
    expect(window.history.pushState).toHaveBeenCalledTimes(3);
    expect(window.history.pushState).toHaveBeenCalledWith({}, '', expectedUrl);
  });
});
