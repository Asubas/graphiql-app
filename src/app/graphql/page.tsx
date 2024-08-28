'use client';
import pages from './graphql.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { GraphQLResponse, FormData } from '@/src/components/interfaces/graphQlInterface';
import { Button } from '@mui/material';
import { sendResponse } from '../../services/responses/sendResponse';
import { RequestTextField } from '../../components/inputs/requestFieldInput/requestTextField';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { handleHeaderKeyChange, handleHeaderValueChange } from '@/src/utils/handlers';
import { useRouter } from 'next/navigation';

const GraphQLClient = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [showHeaders, setShowHeaders] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [headersList, setHeadersList] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' },
  ]);
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    const { endpointUrl, sdlUrl, headersKey, headersValue, query, variables } = data;
    const headersObj: Record<string, string> = {};

    if (headersKey && headersValue) {
      headersList.forEach(({ key, value }: { key: string; value: string }) => {
        headersObj[key.trim()] = value.trim();
      });
    }

    const { finalUrl, result, status } = await sendResponse(
      endpointUrl,
      headersObj,
      query,
      variables,
    );
    if (result) {
      console.log(result, 'ет резултат');
      console.log(finalUrl);
      setResponse(result as GraphQLResponse);
      setStatus(status);
      setValue('variables', JSON.stringify(result.variables, null, 2));
      window.history.pushState({}, '', finalUrl);
    } else {
      setResponse({ errors: [{ message: 'Что-то пошло не так.' }] });
      setStatus(500);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.getAttribute('data-type');
    if (target === 'headers') {
      setShowHeaders((prevState) => !prevState);
    } else {
      setShowVariables((prevState) => !prevState);
    }
  };

  return (
    <section className={pages.graphql}>
      <p>GraphQL Client</p>
      <form onSubmit={handleSubmit(onSubmit)} className={pages.form}>
        <div className={pages.endpoints}>
          <TextFieldInput label="Endpoint Url:" register={register('endpointUrl')} />
          <TextFieldInput label="SDL Url:" register={register('sdlUrl')} />
        </div>
        <div className={pages.area}>
          <TextFieldInput
            customClass={pages.query}
            label="Query:"
            register={register('query')}
            multilineArea
            rows={20}
          />
          <div className={pages.response}>
            <p>Status: {status ? status : ''}</p>
            <RequestTextField response={response ? response : ''} />
          </div>
        </div>
        <div className={pages.documentation}>
          <Button
            className={pages.queryButton}
            variant="contained"
            type="button"
            onClick={handleClick}
          >
            Add variables
          </Button>
          <Button
            className={pages.queryButton}
            variant="contained"
            type="button"
            data-type="headers"
            onClick={handleClick}
          >
            Add headers
          </Button>
          <p>
            Documentation:{' '}
            {response && response.data
              ? 'Link to documentation here'
              : 'If response success show link to documentation'}
          </p>
          <Button className={pages.queryButton} variant="contained" type="submit">
            Submit
          </Button>
        </div>
        <div className={pages.variables}>
          <TextFieldInput
            label="Variables (JSON format):"
            register={register('variables')}
            multilineArea
            rows={5}
            customClass={showVariables ? pages.show : pages.hidden}
            placeholder="{ variables }"
          />
          <TextFieldInput
            label="Headers: "
            register={register('headersValue')}
            multilineArea
            rows={5}
            customClass={showHeaders ? pages.show : pages.hidden}
            placeholder="{ headers }"
          />
        </div>
      </form>
    </section>
  );
};

export default GraphQLClient;
