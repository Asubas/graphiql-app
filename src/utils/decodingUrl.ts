function decodingUrl(pathname: string) {
  const parts = pathname.split('/');
  if (parts[2]) {
    const encodedEndPointUrl = parts[parts.length - 2];
    const encodedBody = parts[parts.length - 1].split('?')[0];
    const endpointUrl = decodeURIComponent(atob(encodedEndPointUrl));
    const decodedBody = atob(encodedBody);
    const body = JSON.parse(decodedBody);
    const query = body.query;
    const variables = body.variables;
    const headersString = parts[parts.length - 1].split('?')[1];
    const headers = Object.fromEntries(new URLSearchParams(headersString));
    console.log(endpointUrl, headers, query, variables);
    return {
      endpointUrl,
      headers,
      query,
      variables,
    };
  } else {
    return;
  }
}

export { decodingUrl };
