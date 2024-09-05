import { Dispatch, SetStateAction } from 'react';
import { encodedUrl } from '../services/requests/encodedUrl';

export const handleHeaderKeyChange = (
  index: number,
  value: string,
  headerList: { key: string; value: string }[],
  setHeadersList: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >,
) => {
  const newHeadersList = [...headerList];
  newHeadersList[index].key = value;
  if (value.trim() && newHeadersList.length === index + 1) {
    newHeadersList.push({ key: '', value: '' });
  }
  setHeadersList(newHeadersList);
};
export const handleHeaderValueChange = (
  index: number,
  value: string,
  headerList: { key: string; value: string }[],
  setHeadersList: Dispatch<
    SetStateAction<
      {
        key: string;
        value: string;
      }[]
    >
  >,
) => {
  const newHeadersList = [...headerList];
  newHeadersList[index].value = value;
  setHeadersList(newHeadersList);
};

export const handlerBlurInput = (
  endpointUrl: string,
  headersValue: string | undefined,
  query: string,
  variables: string,
) => {
  const newHeadersObj: Record<string, string> = {};
  if (headersValue) {
    const headers = JSON.parse(headersValue);
    Object.keys(headers).forEach((key) => {
      newHeadersObj[key] = headers[key];
    });
  }
  encodedUrl(endpointUrl, newHeadersObj, query, variables);
};
