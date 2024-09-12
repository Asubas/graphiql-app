'use client';
import pages from './graphql.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  GraphQLResponse,
  FormData,
  DefaultParams,
} from '@/src/components/interfaces/graphQlInterface';
import { Button } from '@mui/material';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { handlerBlurInput } from '@/src/utils/handlers';
import {
  DEFAULT_QUERY_JSON,
  DEFAULT_SDL_ENDPOINT,
  DEFAULT_URL_ENDPOINT,
} from '@/src/services/constant';
import { DocSection } from '@/src/components/documentation/docSection';
import { HistoryButton } from '@/src/components/history/historySection';
import { RequestTextField } from '@/src/components/inputs/requestFieldInput/requestTextField';
import { sendRequest } from '@/src/services/requests/sendRequest';

const GraphQLClient = ({
  defaultParams,
  decodingHeaders,
}: {
  defaultParams?: DefaultParams;
  decodingHeaders?: string;
}) => {
  const methods = useForm<FormData>();
  const [showHeaders, setShowHeaders] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const onSubmit = async (data: FormData) => {
    const { endpointUrl, headers, query, variables } = data;
    const response = (await sendRequest(endpointUrl, headers, query, variables)) || {
      result: null,
      status: 500,
    };
    const { result, status } = response;

    if (result) {
      setResponse(result as GraphQLResponse);
    } else {
      setResponse({ errors: [{ message: 'Error fetch' }] });
    }
    setStatus(status);
    methods.setValue('sdlUrl', `${methods.getValues('endpointUrl')}?sdl`);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.currentTarget.getAttribute('data-type');
    if (target === 'headers') {
      setShowHeaders((prevState) => !prevState);
    } else {
      setShowVariables((prevState) => !prevState);
    }
  };

  const handlePushUrl = () => {
    const { endpointUrl, headers, query, variables } = methods.getValues();
    if (status) handlerBlurInput(endpointUrl, headers, query, variables);
  };

  return (
    <section className={pages.graphql}>
      <p>GraphQL Client</p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={pages.form}>
          <div className={pages.endpoints}>
            <TextFieldInput
              label="Endpoint Url:"
              register={methods.register('endpointUrl')}
              onBlur={handlePushUrl}
              prettier={'endpoint'}
              defaultValue={(defaultParams && defaultParams.endpointUrl) || DEFAULT_URL_ENDPOINT}
            />
            <TextFieldInput
              label="SDL Url:"
              register={methods.register('sdlUrl')}
              defaultValue={
                defaultParams && defaultParams.endpointUrl
                  ? `${defaultParams.endpointUrl}?sdl`
                  : DEFAULT_SDL_ENDPOINT
              }
            />
          </div>
          <div className={pages.area}>
            <TextFieldInput
              customClass={pages.query}
              label="Query:"
              register={methods.register('query')}
              multilineArea
              rows={20}
              onBlur={handlePushUrl}
              prettier={'query'}
              defaultValue={(defaultParams && defaultParams.query) || DEFAULT_QUERY_JSON}
            />
            <div className={pages.response}>
              <p>Status: {status ? status : ''}</p>
              <RequestTextField response={response ? response : ''} />
            </div>
          </div>
          <div className={pages.additionally}>
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
            <HistoryButton />
            <div className={pages.documentation}>
              {status === 500 || !status ? (
                <span className={pages.documentationShowTitle}>
                  If response ok, this should be link to documentation
                </span>
              ) : (
                <DocSection endpointSdl={methods.getValues('sdlUrl')} />
              )}
            </div>
            <Button className={pages.queryButton} variant="contained" type="submit">
              Submit
            </Button>
          </div>
          <div className={pages.variables}>
            <TextFieldInput
              label="Variables (JSON format):"
              register={methods.register('variables')}
              multilineArea
              rows={5}
              customClass={showVariables ? pages.show : pages.hidden}
              placeholder="{ variables }"
              onBlur={handlePushUrl}
              defaultValue={
                defaultParams?.variables && Object.keys(defaultParams.variables).length > 0
                  ? JSON.stringify(defaultParams.variables)
                  : ''
              }
            />
            <TextFieldInput
              label="Headers (JSON format):"
              register={methods.register('headers')}
              multilineArea
              rows={5}
              customClass={showHeaders ? pages.show : pages.hidden}
              placeholder="{ headers }"
              onBlur={handlePushUrl}
              defaultValue={decodingHeaders ? decodingHeaders : ''}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
export default GraphQLClient;
