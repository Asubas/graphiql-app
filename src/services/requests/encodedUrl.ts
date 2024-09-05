function encodedUrl(
  endpointUrl: string,
  headersObj: Record<string, string>,
  query: string,
  variables: string | null,
) {
  const encodedEndPointUrl = btoa(endpointUrl);
  const body = {
    query,
    variables: variables ? JSON.parse(variables) : null,
  };
  const encodedBody = btoa(JSON.stringify(body));
  const headers = {
    ...headersObj,
    'Content-Type': 'application/json',
  };
  const headersString = Object.entries(headers)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  const encodedUrl = `http://localhost:3000/graphql/GRAPHQL/${encodedEndPointUrl}/${encodedBody}?${headersString}`;

  window.history.pushState({}, '', encodedUrl);

  return encodedUrl;
}

export { encodedUrl };
