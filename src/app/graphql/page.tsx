'use client';
import { useForm } from 'react-hook-form';
import pages from './graphql.module.scss';
import { useState } from 'react';
import { GraphQLResponse, FormData } from '@/src/components/interfaces/graphQlInterface';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { Button } from '@mui/material';

const GraphQLClient = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const onSubmit = async (data: FormData) => {
    const { endpointUrl, sdlUrl, headers, query, variables } = data;
    const headersObj: Record<string, string> = {};
    console.log('вызывалас');
    if (headers) {
      const headerArray = headers.split(',');
      headerArray.forEach((header: string) => {
        const [key, value] = header.split(':');
        headersObj[key.trim()] = value.trim();
      });
    }

    try {
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
      setResponse(result);
      setStatus(res.status);
    } catch (error) {
      setResponse({ errors: [{ message: 'Что-то пошло не так.' }] });
      setStatus(500);
    }
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
          <TextFieldInput
            label="Headers(key: value):"
            register={register('headers')}
            customClass={pages.header}
          />
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
        <div className={pages.response}>
          <p> Response: </p>
          <p>Status: {status ? status : 'null'}</p>
          <TextFieldInput
            label="Body:"
            multilineArea
            rows={20}
            InputProps={{
              readOnly: true,
              variant: 'outlined-multiline-static',
            }}
            defaultValue={response ? JSON.stringify(response, null, 2) : 'null'}
          />
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
