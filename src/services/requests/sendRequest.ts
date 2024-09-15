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
    toast.error(`${error}`);
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
    if (!res.ok) {
      toast.error(`Error request, please check the form`);
      return;
    }
    const responseText = await res.text();
    const result = responseText ? JSON.parse(responseText) : {};
    const encodedHistoryUrl = encodedUrl(endpointUrl, headers, query, parsedVariables) as string;
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
    toast.error(`${error}`);
  }
}
