import { toast } from 'react-toastify';

function encodedUrl(
  endpointUrl: string,
  headersValue: string | null,
  query: string,
  variables: string | null,
) {
  try {
    const encodedEndPointUrl = btoa(endpointUrl);
    const body = {
      query,
      variables: variables ? JSON.parse(variables) : null,
    };
    const encodedBody = btoa(JSON.stringify(body));
    const encodedHeaders = headersValue ? btoa(headersValue) : '';

    const encodedUrl = `http://localhost:3000/GRAPHQL/${encodedEndPointUrl}/${encodedBody}?${encodedHeaders}`;

    window.history.pushState({}, '', encodedUrl);

    return encodedUrl;
  } catch (error) {
    toast.error(`${error}`);
  }
}

export { encodedUrl };
