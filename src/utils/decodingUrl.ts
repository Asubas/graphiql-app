function decodingUrl(pathname: string) {
  const parts = pathname.split('/');
  if (parts[1] !== 'GRAPHQL' && parts[2]) {
    const method = parts[1];
    const encodedEndPointUrl = parts[2];
    const encodedBody = parts[3];
    const encodedQuery = parts[4];
    const encodedVariables = parts[5];
    const encodedHeaders = parts[6];
    const endpointUrl = decodeURIComponent(atob(encodedEndPointUrl));
    const body = encodedBody ? atob(encodedBody) : '';
    const query = encodedQuery ? JSON.parse(atob(encodedQuery)) : [];
    const headers = encodedHeaders ? JSON.parse(atob(encodedHeaders)) : [];
    const variables = encodedVariables ? JSON.parse(atob(encodedVariables)) : [];

    return {
      method,
      endpointUrl,
      query,
      headers,
      body,
      variables,
    };
  } else if ((parts[1] === 'GRAPHQL' && parts[2]) || (parts[1] === 'graphql' && parts[2])) {
    const encodedEndPointUrl = parts[parts.length - 2];
    const encodedBody = parts[parts.length - 1].split('?')[0];
    const endpointUrl = decodeURIComponent(atob(encodedEndPointUrl));
    const decodedBody = atob(encodedBody);
    const body = JSON.parse(decodedBody);
    const query = body.query;
    const variables = body.variables;
    const encodedHeaders = parts[parts.length - 1].split('?')[1];
    const headers = encodedHeaders ? JSON.parse(atob(encodedHeaders)) : {};
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
