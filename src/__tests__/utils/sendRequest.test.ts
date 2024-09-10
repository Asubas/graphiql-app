import { encodedUrl } from '@/src/services/requests/encodedUrl';
import { sendRequest } from '@/src/services/requests/sendRequest';
import { saveGetHistory } from '@/src/utils/saveGetHistory';

jest.mock('../../services/requests/encodedUrl', () => ({
  encodedUrl: jest.fn(() => 'mockEncodedUrl'),
}));
jest.mock('../../utils/saveGetHistory');

describe('sendRequest', () => {
  const endpointUrl = 'https://rickandmortyapi.com/graphql';
  const headers = 'Authorization: Bearer token';
  const query = '{ users { id name } }';
  const variables = JSON.stringify({ id: 1 });

  beforeEach(() => {
    jest.clearAllMocks();

    const mockResponse = {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      redirected: false,
      type: 'default',
      url: 'http://localhost:3000/api/graphql',
      body: null,
      bodyUsed: false,
      clone: jest.fn().mockReturnThis(),
      text: jest.fn().mockResolvedValue(JSON.stringify({ data: [] })),
      json: jest.fn().mockResolvedValue({ data: [] }),
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(0)),
      blob: jest.fn().mockResolvedValue(new Blob()),
      formData: jest.fn().mockResolvedValue(new FormData()),
    };

    global.fetch = jest.fn(() => Promise.resolve(mockResponse as Response));
  });

  it('should send POST request and save history', async () => {
    const result = await sendRequest(endpointUrl, headers, query, variables);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        headers,
      },
      body: JSON.stringify({
        endpointUrl,
        headers,
        query,
        variables: JSON.parse(variables),
      }),
    });

    const expectedEncodedUrl = 'mockEncodedUrl';
    (encodedUrl as jest.Mock).mockReturnValue(expectedEncodedUrl);
    expect(saveGetHistory).toHaveBeenCalledWith({
      endpointUrl,
      headers,
      query,
      variables: JSON.parse(variables),
      timestamp: expect.any(String),
      encodedHistoryUrl: expectedEncodedUrl,
    });

    expect(result).toEqual({ result: { data: [] }, status: 200 });
  });

  it('should handle null variables', async () => {
    const result = await sendRequest(endpointUrl, headers, query, null);

    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: {
        headers,
      },
      body: JSON.stringify({
        endpointUrl,
        headers,
        query,
        variables: null,
      }),
    });

    const expectedEncodedUrl = 'mockEncodedUrl';
    (encodedUrl as jest.Mock).mockReturnValue(expectedEncodedUrl);

    expect(saveGetHistory).toHaveBeenCalledWith({
      endpointUrl,
      headers,
      query,
      variables: null,
      timestamp: expect.any(String),
      encodedHistoryUrl: expectedEncodedUrl,
    });

    expect(result).toEqual({ result: { data: [] }, status: 200 });
  });

  it('should handle fetch error', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    await expect(sendRequest(endpointUrl, headers, query, variables)).rejects.toThrow(
      'Fetch error',
    );
  });
});
