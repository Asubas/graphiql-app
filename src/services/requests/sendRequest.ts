import { saveGetHistory } from '@/src/utils/saveGetHistory';
import { encodedUrl } from './encodedUrl';
import { toast } from 'react-toastify';

export async function sendRequest(
  endpointUrl: string,
  headers: string,
  query: string,
  variables: string | null,
) {
  let parsedHeaders = {};
  try {
    parsedHeaders = headers ? JSON.parse(headers) : {};
  } catch (error) {
    toast.error(error instanceof Error ? error.message : 'Unknown Error');
    return;
  }
  const parsedVariables = variables ?? null;
  const body = {
    query,
    variables: parsedVariables,
  };

  try {
    const res = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...parsedHeaders,
      },
      body: JSON.stringify(body),
    });
    const responseText = await res.text();
    const result = responseText ? JSON.parse(responseText) : {};
    const encodedHistoryUrl = encodedUrl(endpointUrl, headers, query, parsedVariables);
    saveGetHistory({
      endpointUrl,
      headers,
      query,
      variables: parsedVariables,
      timestamp: new Date().toISOString(),
      encodedHistoryUrl,
    });
    return { result, status: res.status };
  } catch (error) {
    if (error instanceof Error) toast.error(`${error.message}`);
  }
}
