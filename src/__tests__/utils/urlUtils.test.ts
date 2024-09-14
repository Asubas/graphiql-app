import { encodeBase64, encodeUrl } from '@/src/utils/urlUtils';

describe('encodeBase64', () => {
  it('should correctly encode a simple string to Base64', () => {
    const data = 'Hello, World!';
    const encodedData = encodeBase64(data);
    expect(encodedData).toBe('SGVsbG8sIFdvcmxkIQ==');
  });

  it('should correctly encode special characters', () => {
    const data = 'Test@123!';
    const encodedData = encodeBase64(data);
    expect(encodedData).toBe('VGVzdEAxMjMh');
  });

  it('should correctly encode an empty string', () => {
    const data = '';
    const encodedData = encodeBase64(data);
    expect(encodedData).toBe('');
  });
});

describe('encodeUrl', () => {
  it('should correctly encode URL components', () => {
    const params = {
      method: 'GET',
      endpointUrl: 'https://api.example.com/data',
      body: '{"key": "value"}',
      headers: [{ key: 'Authorization', value: 'Bearer token' }],
      queries: [{ key: 'search', value: 'query' }],
      variables: [{ key: 'var1', value: 'value1' }],
    };

    const encodedString = encodeUrl(params);

    const expectedEncodedEndpointUrl = encodeBase64('https://api.example.com/data');
    const expectedEncodedBody = encodeBase64('{"key": "value"}');
    const expectedEncodedHeaders = encodeBase64(
      JSON.stringify([{ key: 'Authorization', value: 'Bearer token' }]),
    );
    const expectedEncodedQueries = encodeBase64(
      JSON.stringify([{ key: 'search', value: 'query' }]),
    );
    const expectedEncodedVariables = encodeBase64(
      JSON.stringify([{ key: 'var1', value: 'value1' }]),
    );

    expect(encodedString).toContain(expectedEncodedEndpointUrl);
    expect(encodedString).toContain(expectedEncodedBody);
    expect(encodedString).toContain(expectedEncodedHeaders);
    expect(encodedString).toContain(expectedEncodedQueries);
    expect(encodedString).toContain(expectedEncodedVariables);
  });

  it('should handle empty optional fields correctly', () => {
    const params = {
      method: 'POST',
      endpointUrl: 'https://api.example.com/data',
    };

    const encodedString = encodeUrl(params);

    const expectedEncodedEndpointUrl = encodeBase64('https://api.example.com/data');
    const expectedEncodedBody = encodeBase64('{}');
    const expectedEncodedHeaders = encodeBase64('{}');
    const expectedEncodedQueries = encodeBase64('{}');
    const expectedEncodedVariables = encodeBase64('{}');

    expect(encodedString).toContain(expectedEncodedEndpointUrl);
    expect(encodedString).toContain(expectedEncodedBody);
    expect(encodedString).toContain(expectedEncodedHeaders);
    expect(encodedString).toContain(expectedEncodedQueries);
    expect(encodedString).toContain(expectedEncodedVariables);
  });

  it('should only include valid headers, queries, and variables in the encoded URL', () => {
    const params = {
      method: 'GET',
      endpointUrl: 'https://api.example.com/data',
      headers: [
        { key: 'Authorization', value: 'Bearer token' },
        { key: '', value: '' },
      ],
      queries: [
        { key: 'search', value: 'query' },
        { key: '', value: '' },
      ],
      variables: [
        { key: 'var1', value: 'value1' },
        { key: '', value: '' },
      ],
    };

    const encodedString = encodeUrl(params);

    const expectedEncodedHeaders = encodeBase64(
      JSON.stringify([{ key: 'Authorization', value: 'Bearer token' }]),
    );
    const expectedEncodedQueries = encodeBase64(
      JSON.stringify([{ key: 'search', value: 'query' }]),
    );
    const expectedEncodedVariables = encodeBase64(
      JSON.stringify([{ key: 'var1', value: 'value1' }]),
    );

    expect(encodedString).toContain(expectedEncodedHeaders);
    expect(encodedString).toContain(expectedEncodedQueries);
    expect(encodedString).toContain(expectedEncodedVariables);
  });
});
