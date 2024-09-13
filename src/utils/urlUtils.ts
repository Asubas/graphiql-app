interface EncodeUrlParams {
  method: string;
  endpointUrl: string;
  body?: string;
  headers?: { key: string; value: string }[];
  queries?: { key: string; value: string }[];
  variables?: { key: string; value: string }[];
}

interface DecodeUrlParams {
  method: string;
  url: string;
  body: string;
  headers: { key: string; value: string }[];
  queries: { key: string; value: string }[];
}

export function encodeBase64(data: string): string {
  return btoa(unescape(encodeURIComponent(data)));
}
export function encodeUrl({
  method,
  endpointUrl,
  body = '',
  headers = [],
  queries = [],
  variables = [],
}: EncodeUrlParams): string {
  const encodedUrl = encodeBase64(endpointUrl);
  const encodedBody = body ? encodeBase64(body) : encodeBase64('{}');
  const filteredHeaders = headers.filter((header) => header.key && header.value);
  const encodedHeaders = filteredHeaders.length
    ? encodeBase64(JSON.stringify(filteredHeaders))
    : encodeBase64('{}');
  const filteredQueries = queries.filter((query) => query.key && query.value);
  const encodedQueries = filteredQueries.length
    ? encodeBase64(JSON.stringify(filteredQueries))
    : encodeBase64('{}');
  const filteredVariables = variables.filter((variable) => variable.key && variable.value);
  const encodedVariables = filteredVariables.length
    ? encodeBase64(JSON.stringify(filteredVariables))
    : encodeBase64('{}');

  const urlParts = [
    `/rest/${method}`,
    encodedUrl,
    encodedBody,
    encodedQueries,
    encodedVariables,
    encodedHeaders,
  ];

  return urlParts.join('/');
}
