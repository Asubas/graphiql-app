import { DEFAULT_QUERY_JSON } from '@/src/services/constant';
import { encodedUrl } from '@/src/services/requests/encodedUrl';
import { sendRequest } from '@/src/services/requests/sendRequest';
import { saveGetHistory } from '@/src/utils/saveGetHistory';

jest.mock('../../services/requests/encodedUrl', () => ({
  encodedUrl: jest.fn(() => 'mockEncodedUrl'),
}));
jest.mock('../../utils/saveGetHistory');

describe('sendRequest', () => {
  const endpointUrl = 'https://rickandmortyapi.com/graphql';
  const headers = '';
  const query = DEFAULT_QUERY_JSON;
  const variables = null;

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
      url: 'https://rickandmortyapi.com/graphql',
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

    expect(fetch).toHaveBeenCalledWith(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: null,
      }),
    });

    const expectedEncodedUrl = 'mockEncodedUrl';
    (encodedUrl as jest.Mock).mockReturnValue(expectedEncodedUrl);
    expect(saveGetHistory).toHaveBeenCalledWith({
      endpointUrl,
      headers: '',
      query,
      variables: null,
      timestamp: expect.any(String),
      encodedHistoryUrl: expectedEncodedUrl,
    });

    expect(result).toEqual({ result: { data: [] }, status: 200 });
  });
});
