'use client';
import pages from './graphql.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { GraphQLResponse, FormData } from '@/src/components/interfaces/graphQlInterface';
import { Button } from '@mui/material';
import { sendResponse } from '../../services/responses/sendResponse';
import { RequestTextField } from '../../components/inputs/requestFieldInput/requestTextField';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { handlerBlurInput } from '@/src/utils/handlers';
import { encodedUrl } from '@/src/services/responses/encodedUrl';
import {
  DEFAULT_QUERY_JSON,
  DEFAULT_SDL_ENDPOINT,
  DEFAULT_URL_ENDPOINT,
} from '@/src/services/constant';
import { DocSection } from '@/src/components/documentation/docSection';
import { HistorySection } from '@/src/components/history/historySection';

const GraphQLClient = () => {
  const methods = useForm<FormData>();
  const [showHeaders, setShowHeaders] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const headersObj: Record<string, string> = {};

  const onSubmit = async (data: FormData) => {
    const { endpointUrl, headersValue, query, variables } = data;
    if (headersValue) {
      const headers = JSON.parse(headersValue);
      Object.keys(headers).forEach((key) => {
        headersObj[key] = headers[key];
      });
    }
    const { result, status } = await sendResponse(endpointUrl, headersObj, query, variables);
    if (result) {
      setResponse(result as GraphQLResponse);
      setStatus(status);
      encodedUrl(endpointUrl, headersObj, query, variables);
    } else {
      setResponse({ errors: [{ message: 'Что-то пошло не так.' }] });
      setStatus(500);
    }
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
    const { endpointUrl, headersValue, query, variables } = methods.getValues();
    if (status) handlerBlurInput(endpointUrl, headersValue, query, variables);
  };
  // Если не придумаю, как делать ридерект , удалю ето
  // const hasRunRef = useRef(false);
  // useEffect(() => {
  //   if (!hasRunRef.current) {
  //     hasRunRef.current = true;
  //     const parts = pathname.split('/');
  //     if (parts[2]) {
  //       decodingUrl(pathname);
  //       router.push('http://localhost:3000/graphql');
  //     }
  //   }
  // }, [pathname, router]);

  // const showDocumentation = () => {
  // setIsShowDocumentation((prevState) => !prevState);
  // };

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
              defaultValue={DEFAULT_URL_ENDPOINT}
            />
            <TextFieldInput
              label="SDL Url:"
              register={methods.register('sdlUrl')}
              defaultValue={DEFAULT_SDL_ENDPOINT}
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
              defaultValue={DEFAULT_QUERY_JSON}
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
            <HistorySection />
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
            />
            <TextFieldInput
              label="Headers: "
              register={methods.register('headersValue')}
              multilineArea
              rows={5}
              customClass={showHeaders ? pages.show : pages.hidden}
              placeholder="{ headers }"
              onBlur={handlePushUrl}
            />
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
export default GraphQLClient;
