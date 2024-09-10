import { decodingUrl } from '@/src/utils/decodingUrl';

describe('decodingUrl', () => {
  it('should decode the URL and return the correct structure', () => {
    const encodedEndpointUrl = btoa(encodeURIComponent('https://api.example.com/endpoint'));
    const body = { query: 'query { items { id } }', variables: { id: 1 } };
    const encodedBody = btoa(JSON.stringify(body));
    const encodedHeaders = btoa(JSON.stringify({ Authorization: 'Bearer token' }));

    const pathname = `/api/${encodedEndpointUrl}/${encodedBody}?${encodedHeaders}`;

    const result = decodingUrl(pathname);

    expect(result).toEqual({
      endpointUrl: 'https://api.example.com/endpoint',
      headers: { Authorization: 'Bearer token' },
      query: 'query { items { id } }',
      variables: { id: 1 },
    });
  });

  it('should return undefined if the pathname does not have enough parts', () => {
    const pathname = '';
    const result = decodingUrl(pathname);

    expect(result).toBeUndefined();
  });
});
