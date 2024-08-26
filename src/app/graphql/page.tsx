'use client';
import pages from './graphql.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { GraphQLResponse, FormData } from '@/src/components/interfaces/graphQlInterface';
import { Button, TextField } from '@mui/material';
import { sendResponse } from '../../services/responses/sendResponse';
import { RequestTextField } from '../../components/inputs/requestFieldInput/requestTextField';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';

const GraphQLClient = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headersList, setHeadersList] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' },
  ]);
  const onSubmit = async (data: FormData) => {
    const { endpointUrl, sdlUrl, headersKey, headersValue, query, variables } = data;
    const headersObj: Record<string, string> = {};

    if (headersKey && headersValue) {
      headersList.forEach(({ key, value }: { key: string; value: string }) => {
        headersObj[key.trim()] = value.trim();
      });
    }

    const { result, status } = await sendResponse(endpointUrl, headersObj, query, variables);
    if (result) {
      console.log(result);
      setResponse(result as GraphQLResponse);
      setStatus(status);
      setValue('variables', JSON.stringify(result.variables, null, 2));
    } else {
      setResponse({ errors: [{ message: 'Что-то пошло не так.' }] });
      setStatus(500);
    }
  };

  const handleHeaderKeyChange = (index: number, value: string) => {
    const newHeadersList = [...headersList];
    newHeadersList[index].key = value;
    if (value.trim() && newHeadersList.length === index + 1) {
      newHeadersList.push({ key: '', value: '' });
    }
    setHeadersList(newHeadersList);
  };
  const handleHeaderValueChange = (index: number, value: string) => {
    const newHeadersList = [...headersList];
    newHeadersList[index].value = value;
    setHeadersList(newHeadersList);
  };

  return (
    <section className={pages.graphql}>
      <section className={pages['graphql-container']}>
        <p>GraphQL Client</p>
        <form onSubmit={handleSubmit(onSubmit)} className={pages.form}>
          <div className={pages.endpoints}>
            <TextFieldInput label="Endpoint Url:" register={register('endpointUrl')} />
            <TextFieldInput label="SDL Url:" register={register('sdlUrl')} />
          </div>
          <p className={pages.headerTitle}>Headers:</p>
          <div className={pages.headers}>
            {headersList.map((header, index) => (
              <div key={index} className={pages.headersContainer}>
                <TextFieldInput
                  label="Key:"
                  customClass={pages.header}
                  InputProps={{
                    onChange: (e) => handleHeaderKeyChange(index, e.target.value),
                  }}
                />
                <TextFieldInput
                  label="Value:"
                  customClass={pages.header}
                  InputProps={{
                    onChange: (e) => handleHeaderValueChange(index, e.target.value),
                  }}
                />
              </div>
            ))}
          </div>
          <Button className={pages.submit} variant="contained" type="submit">
            Submit
          </Button>
          <div className={pages.area}>
            <TextFieldInput label="Query:" register={register('query')} multilineArea rows={20} />
            <TextFieldInput
              label="Variables (JSON format):"
              register={register('variables')}
              multilineArea
              rows={20}
            />
          </div>
        </form>
      </section>
      <section className={pages['response-container']}>
        <p> Response</p>
        <div className={pages.response}>
          <p>Status: {status ? status : ''}</p>
          <RequestTextField response={response ? response : ''} />
        </div>
        <p>
          Documentation:{' '}
          {response && response.data
            ? 'Link to documentation here'
            : 'If response success show link to documentation'}
        </p>
      </section>
    </section>
  );
};

export default GraphQLClient;
