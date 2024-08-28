export async function sendResponse(
  endpointUrl: string,
  headersObj: Record<string, string>,
  query: string,
  variables: string,
) {
  const encodedUrl = btoa(endpointUrl);
  const body = {
    query,
    variables: variables ? JSON.parse(variables) : null,
  };
  const encodedBody = btoa(JSON.stringify(body));

  const encodedHeaders = Object.entries(headersObj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  const baseUrl = 'http://localhost:3000/api/graphql';
  const finalUrl = `http://localhost:3000/graphql/GRAPHQL/${encodedUrl}/${encodedBody}?${encodedHeaders}`;

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      ...headersObj,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ endpointUrl, headersObj, query, variables: body.variables }),
  });

  const result = await res.json();
  return { finalUrl, result, status: res.status };
}
