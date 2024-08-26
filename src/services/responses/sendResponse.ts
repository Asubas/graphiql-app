export async function sendResponse(
  endpointUrl: string,
  headersObj: Record<string, string>,
  query: string,
  variables: string,
) {
  const res = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headersObj,
    },
    body: JSON.stringify({
      query,
      variables: variables ? JSON.parse(variables) : null,
    }),
  });
  const result = await res.json();

  return { result, status: res.status };
}
