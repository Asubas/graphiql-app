function encodedUrl(
  endpointUrl: string,
  headersValue: string | null,
  query: string,
  variables: string | null,
) {
  const encodedEndPointUrl = btoa(endpointUrl);
  const body = {
    query,
    variables: variables ? JSON.parse(variables) : null,
  };
  const encodedBody = btoa(JSON.stringify(body));
  const encodedHeaders = headersValue ? btoa(headersValue) : '';

  const encodedUrl = `http://localhost:3000/graphql/GRAPHQL/${encodedEndPointUrl}/${encodedBody}?${encodedHeaders}`;

  window.history.pushState({}, '', encodedUrl);

  return encodedUrl;
}

export { encodedUrl };
