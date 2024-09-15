export type QueryParam = { key: string; value: string };
export type Header = { key: string; value: string };

export type FormData = {
  method: string;
  endpointUrl: string;
  headers: { key: string; value: string }[];
  queries: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  body: string;
};
