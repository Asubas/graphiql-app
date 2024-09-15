import { decodingUrl } from '@/src/utils/decodingUrl';

describe('decodingUrl', () => {
  it('should decode the URL and return the correct structure without GRAPHQL', () => {
    const encodedEndpointUrl = btoa(encodeURIComponent('https://api.example.com/endpoint'));
    const body = 'eyJxdWVyeSI6ICJxdWVyeSB7IGl0ZW1zIHsgfX0iLCJ2YXJpYWJsZXMiOiB7ImlkIjogMSB9fQ==';
    const encodedBody = btoa(body);
    const encodedHeaders = btoa(JSON.stringify({ Authorization: 'Bearer token' }));

    const pathname = `/api/${encodedEndpointUrl}/${encodedBody}/${encodedHeaders}`;

    const result = decodingUrl(pathname);

    expect(result).toEqual({
      method: 'api',
      endpointUrl: 'https://api.example.com/endpoint',
      query: { Authorization: 'Bearer token' },
      headers: [],
      body: 'eyJxdWVyeSI6ICJxdWVyeSB7IGl0ZW1zIHsgfX0iLCJ2YXJpYWJsZXMiOiB7ImlkIjogMSB9fQ==',
      variables: [],
    });
  });

  it('should decode the URL and return the correct structure with GRAPHQL', () => {
    const encodedEndpointUrl = btoa(encodeURIComponent('https://api.example.com/graphql'));
    const body = { query: 'query { items { id } }', variables: { id: 1 } };
    const encodedBody = btoa(JSON.stringify(body));
    const encodedHeaders = btoa(JSON.stringify({ Authorization: 'Bearer token' }));

    const pathname = `/GRAPHQL/${encodedEndpointUrl}/${encodedBody}?${encodedHeaders}`;

    const result = decodingUrl(pathname);

    expect(result).toEqual({
      endpointUrl: 'https://api.example.com/graphql',
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

  it('should return undefined if it encounters unexpected patterns', () => {
    const pathname = '/api/';
    const result = decodingUrl(pathname);

    expect(result).toBeUndefined();
  });

  it('should handle empty variables and headers', () => {
    const encodedEndpointUrl = btoa(encodeURIComponent('https://api.example.com/endpoint'));
    const body = '{"query": "query { items { id }}", "variables": {}}';
    const encodedBody = btoa(body);

    const pathname = `/api/${encodedEndpointUrl}/${encodedBody}`;

    const result = decodingUrl(pathname);

    expect(result).toEqual({
      method: 'api',
      endpointUrl: 'https://api.example.com/endpoint',
      query: [],
      headers: [],
      body: '{"query": "query { items { id }}", "variables": {}}',
      variables: [],
    });
  });
});
