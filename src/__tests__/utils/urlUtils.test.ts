import { encodeBase64, decodeBase64, encodeUrl, decodeUrl } from '@/src/utils/urlUtils';

describe('URL Utils', () => {
  describe('encodeBase64', () => {
    it('should encode a string to base64 correctly', () => {
      const input = 'Hello, World!';
      const encoded = encodeBase64(input);
      expect(encoded).toBe('SGVsbG8sIFdvcmxkIQ==');
    });
  });

  describe('decodeBase64', () => {
    it('should decode a base64 string correctly', () => {
      const encoded = 'SGVsbG8sIFdvcmxkIQ==';
      const decoded = decodeBase64(encoded);
      expect(decoded).toBe('Hello, World!');
    });

    it('should return an empty string if decoding fails', () => {
      const invalidEncoded = 'Invalid base64 string';
      const decoded = decodeBase64(invalidEncoded);
      expect(decoded).toBe('');
    });
  });

  describe('encodeUrl', () => {
    it('should encode URL parameters correctly', () => {
      const params = {
        method: 'GET',
        endpointUrl: 'https://api.example.com/data',
        body: '{"key":"value"}',
        headers: [{ key: 'Authorization', value: 'Bearer token' }],
        queries: [{ key: 'page', value: '1' }],
      };

      const encodedUrl = encodeUrl(params);

      expect(encodedUrl).toContain('/rest/GET/');
      expect(encodedUrl).toContain(encodeBase64(params.endpointUrl));
      expect(encodedUrl).toContain(encodeBase64(params.body!));
      expect(encodedUrl).toContain(encodeBase64(JSON.stringify(params.headers)));
      expect(encodedUrl).toContain(encodeBase64(JSON.stringify(params.queries)));
    });
  });

  describe('decodeUrl', () => {
    it('should decode URL parameters correctly', () => {
      const params = [
        'GET',
        encodeBase64('https://api.example.com/data'),
        encodeBase64('{"key":"value"}'),
        encodeBase64(JSON.stringify([{ key: 'Authorization', value: 'Bearer token' }])),
        encodeBase64(JSON.stringify([{ key: 'page', value: '1' }])),
      ];

      const decoded = decodeUrl(params);

      expect(decoded.method).toBe('GET');
      expect(decoded.url).toBe('https://api.example.com/data');
      expect(decoded.body).toBe('{"key":"value"}');
      expect(decoded.headers).toEqual([{ key: 'Authorization', value: 'Bearer token' }]);
      expect(decoded.queries).toEqual([{ key: 'page', value: '1' }]);
    });

    it('should handle decoding errors and return default values', () => {
      const params = ['GET', 'invalidBase64', '', 'invalidBase64Headers', 'invalidBase64Queries'];

      const decoded = decodeUrl(params);

      expect(decoded.method).toBe('GET');
      expect(decoded.url).toBe('');
      expect(decoded.body).toBe('');
      expect(decoded.headers).toEqual([]);
      expect(decoded.queries).toEqual([]);
    });
  });
});
