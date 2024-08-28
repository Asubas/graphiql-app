import { Dispatch, SetStateAction } from 'react';

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
