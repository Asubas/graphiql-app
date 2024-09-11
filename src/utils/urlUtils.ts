interface EncodeUrlParams {
  method: string;
  endpointUrl: string;
  body?: string;
  headers?: { key: string; value: string }[];
  queries?: { key: string; value: string }[];
}

interface DecodeUrlParams {
  method: string;
  url: string;
  body: string;
  headers: { key: string; value: string }[];
  queries: { key: string; value: string }[];
}

// кодирую безопасно строку в base64
export function encodeBase64(data: string): string {
  return btoa(encodeURIComponent(data));
}

// декодирую безопасно из base64
export function decodeBase64(data: string): string {
  try {
    return decodeURIComponent(atob(data));
  } catch (error) {
    console.error('Error decoding Base64 string:', error);
    return '';
  }
}

export function encodeUrl({
  method,
  endpointUrl,
  body = '',
  headers = [],
  queries = [],
}: EncodeUrlParams): string {
  const encodedUrl = encodeBase64(endpointUrl);
  const encodedBody = body ? encodeBase64(body) : '';
  const encodedHeaders = headers.length ? encodeBase64(JSON.stringify(headers)) : '';
  const encodedQueries = queries.length ? encodeBase64(JSON.stringify(queries)) : '';

  return `/rest/${method}/${encodedUrl}/${encodedBody}/${encodedHeaders}/${encodedQueries}`;
}

export function decodeUrl(params: string[]): DecodeUrlParams {
  const [method, encodedUrl, encodedBody, encodedHeaders, encodedQueries] = params as string[];

  const url = decodeBase64(encodedUrl);
  const body = encodedBody ? decodeBase64(encodedBody) : '';

  // чек ошибок при парсе
  let headers: { key: string; value: string }[];
  let queries: { key: string; value: string }[];

  try {
    headers = encodedHeaders ? JSON.parse(decodeBase64(encodedHeaders)) : [];
  } catch (error) {
    console.error('Error decoding headers:', error);
    headers = []; // опустошаем в случае ошибки
  }

  try {
    queries = encodedQueries ? JSON.parse(decodeBase64(encodedQueries)) : [];
  } catch (error) {
    console.error('Error decoding queries:', error);
    queries = []; // опустошаем в случае ошибки
  }

  return {
    method,
    url,
    body,
    headers,
    queries,
  };
}
