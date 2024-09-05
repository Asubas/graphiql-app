import { saveGetHistory } from '@/src/utils/saveGetHistory';
import { encodedUrl } from './encodedUrl';

export async function sendRequest(
  endpointUrl: string,
  headersObj: Record<string, string>,
  query: string,
  variables: string | null,
) {
  const body = {
    query,
    variables: variables ? JSON.parse(variables) : null,
  };
  const baseUrl = 'http://localhost:3000/api/graphql';

  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      ...headersObj,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ endpointUrl, headersObj, query, variables: body.variables }),
  });

  const encodedHistoryUrl = encodedUrl(endpointUrl, headersObj, query, body.variables);
  saveGetHistory({
    endpointUrl,
    headersObj,
    query,
    variables: body.variables,
    timestamp: new Date().toISOString(),
    encodedHistoryUrl,
  });

  const result = await res.json();
  return { result, status: res.status };
}
