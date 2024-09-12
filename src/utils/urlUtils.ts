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
  console.log('encode', btoa(unescape(encodeURIComponent(data))));
  return btoa(unescape(encodeURIComponent(data)));
}
// export function decodeBase64(data: string): string {
//   try {
//     return decodeURIComponent(escape(atob(data)));
//   } catch (error) {
//     console.error('Error decoding Base64 string:', error);
//     return '';
//   }
// }

export function encodeUrl({
  method,
  endpointUrl,
  body = '',
  headers = [],
  queries = [],
  variables = [],
}: EncodeUrlParams): string {
  const encodedUrl = encodeBase64(endpointUrl);
  const encodedBody = body ? encodeBase64(body) : '';
  const filteredHeaders = headers.filter((header) => header.key && header.value);
  const encodedHeaders = filteredHeaders.length
    ? encodeBase64(JSON.stringify(filteredHeaders))
    : '';
  const filteredQueries = queries.filter((query) => query.key && query.value);
  const encodedQueries = filteredQueries.length
    ? encodeBase64(JSON.stringify(filteredQueries))
    : '';
  const filteredVariables = variables.filter((variable) => variable.key && variable.value);
  const encodedVariables = filteredVariables.length
    ? encodeBase64(JSON.stringify(filteredVariables))
    : '';

  return `/rest/${method}/${encodedUrl}/${encodedBody}/${encodedHeaders}/${encodedQueries}`;
}

// export function decodeUrl(params: string[]): DecodeUrlParams {
//   const [method, encodedUrl, encodedBody, encodedHeaders, encodedQueries] = params as string[];

//   const url = decodeBase64(encodedUrl);
//   const body = encodedBody ? decodeBase64(encodedBody) : '';
//   let headers: { key: string; value: string }[];
//   let queries: { key: string; value: string }[];

//   try {
//     headers = encodedHeaders ? JSON.parse(decodeBase64(encodedHeaders)) : [];
//   } catch (error) {
//     console.error('Error decoding headers:', error);
//     headers = [];
//   }

//   try {
//     queries = encodedQueries ? JSON.parse(decodeBase64(encodedQueries)) : [];
//   } catch (error) {
//     console.error('Error decoding queries:', error);
//     queries = [];
//   }

//   return {
//     method,
//     url,
//     body,
//     headers,
//     queries,
//   };
// }
