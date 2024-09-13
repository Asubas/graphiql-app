'use client';

import pages from '../graphql/graphql.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller, FormProvider } from 'react-hook-form';
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import styles from './rest.module.scss';
import { statusMessages } from '@/src/services/constant';
import { useRouter } from 'next/navigation';
import { encodeUrl } from '@/src/utils/urlUtils';
import { formatJson } from '@/src/utils/formatJson';
import { saveGetHistory } from '@/src/utils/saveGetHistory';
import { RequestTextField } from '@/src/components/inputs/requestFieldInput/requestTextField';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import {
  RestContentProps,
  FormData,
  QueryParam,
  Header,
} from '@/src/components/types/restFullTypes';
import { BodyFieldInput } from '@/src/components/inputs/bodyFieldInput/bodyFieldInput';
import { MethodSelectInput } from '@/src/components/inputs/methodSelectInput/MethodSelectInput';

export default function RestContent({
  method,
  endpointUrl,
  body,
  headers,
  queries,
}: RestContentProps) {
  const methods = useForm<FormData>({
    defaultValues: {
      method: 'GET',
      endpointUrl: 'https://api.restful-api.dev/objects',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      queries: [{ key: '', value: '' }],
      variables: [{ key: '', value: '' }],
      body: '',
    },
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({ control: methods.control, name: 'headers' });

  const {
    fields: queryFields,
    append: appendQuery,
    remove: removeQuery,
  } = useFieldArray({ control: methods.control, name: 'queries' });

  const {
    fields: variablesFields,
    append: appendVariables,
    remove: removeVariables,
  } = useFieldArray({ control: methods.control, name: 'variables' });

  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<{ code: number; text: string } | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'json' | 'text'>('json');
  const [encodedHistoryUrl, setEncodedHistoryUrl] = useState('');
  const router = useRouter();

  const updateUrl = useCallback(() => {
    const currentData = methods.getValues();
    const newUrl = encodeUrl({
      method: currentData.method,
      endpointUrl: currentData.endpointUrl,
      body: currentData.body,
      variables: currentData.variables,
      headers: currentData.headers,
      queries: currentData.queries,
    });
    setEncodedHistoryUrl(newUrl);
    router.replace(newUrl);
    window.history.pushState(null, '', newUrl);
  }, [methods, router]);

  // смотрим обновление url
  useEffect(() => {
    const subscription = methods.watch((_, { type }) => {
      if (type === 'blur') {
        updateUrl();
      }
    });
    return () => subscription.unsubscribe();
  }, [updateUrl, methods]);

  const handleFormatJson = () => {
    const currentBody = methods.getValues('body');
    const formattedJson = formatJson(currentBody);

    if (formattedJson) {
      methods.setValue('body', formattedJson);
      setJsonError(null);
    } else {
      setJsonError('Invalid JSON format');
    }
  };

  const handleInputModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMode(event.target.value as 'json' | 'text');
    methods.setValue('body', '');
    setJsonError(null);
  };

  const onSubmit = async (data: FormData) => {
    try {
      const { method, endpointUrl, headers, variables, queries, body } = data;
      const requestHeaders = headers.reduce<Record<string, string>>((acc, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});

      const queryParams = queries
        .reduce<string[]>((acc, query) => {
          if (query.key && query.value) {
            acc.push(`${encodeURIComponent(query.key)}=${encodeURIComponent(query.value)}`);
          }
          return acc;
        }, [])
        .join('&');

      const fullUrl = queryParams ? `${endpointUrl}?${queryParams}` : endpointUrl;

      const res = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body:
          method !== 'GET' && (body || variables.length > 0)
            ? JSON.stringify({ body, variables })
            : undefined,
      });

      const statusText = res.statusText || statusMessages[res.status] || 'Unknown Status';
      setResponseStatus({ code: res.status, text: statusText });

      const result = await res.json();
      setResponseBody(JSON.stringify(result, null, 2));
      setJsonError(null);
      saveGetHistory({
        endpointUrl,
        headers,
        variables,
        body,
        queryParams,
        timestamp: new Date().toISOString(),
        encodedHistoryUrl,
      });
      updateUrl();
    } catch (error) {
      setJsonError('Invalid JSON in request body');
      console.error('Error sending request:', error);
    }
  };

  const onReset = () => {
    methods.reset();
    setResponseBody(null);
    setJsonError(null);
  };

  return (
    <section className={`${styles.restCont} hide-formatting`}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className={styles.head}>RESTfull Client</h2>

          <Box className={styles.methodUrl}>
            {/* выбор метода */}
            <MethodSelectInput label="Method" name="method" control={methods.control} />

            {/* эндпоинт */}
            <TextFieldInput
              customClass={pages.query}
              label="Endpoint URL"
              register={methods.register('endpointUrl')}
              multilineArea
              rows={1}
              onBlur={updateUrl}
            />
          </Box>

          <Box className={styles.headersParams}>
            {/* добавление хэдэров */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Headers:
              </Typography>
              {headerFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextFieldInput
                    customClass={pages.query}
                    label="Header key"
                    register={methods.register(`headers.${index}.key`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />
                  <TextFieldInput
                    customClass={pages.query}
                    label="Header Value"
                    register={methods.register(`headers.${index}.value`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />
                  <IconButton
                    onClick={() => removeHeader(index)}
                    color="error"
                    aria-label="delete header"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                className={pages.queryButton}
                variant="contained"
                type="button"
                onClick={() => appendHeader({ key: '', value: '' })}
              >
                Add Header
              </Button>
            </Box>

            {/* добавление кверей */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Query Parameters:
              </Typography>
              {queryFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextFieldInput
                    customClass={pages.query}
                    label="Query Key"
                    register={methods.register(`queries.${index}.key`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />

                  <TextFieldInput
                    customClass={pages.query}
                    label="Query Value"
                    register={methods.register(`queries.${index}.value`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />
                  <IconButton
                    onClick={() => removeQuery(index)}
                    color="error"
                    aria-label="delete query"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                className={pages.queryButton}
                variant="contained"
                type="button"
                onClick={() => appendQuery({ key: '', value: '' })}
              >
                Add Query Parameter
              </Button>
            </Box>

            {/*Добавление вариаблес */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Variables:
              </Typography>
              {variablesFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextFieldInput
                    customClass={pages.query}
                    label="Variable Key"
                    register={methods.register(`variables.${index}.key`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />

                  <TextFieldInput
                    customClass={pages.query}
                    label="Variable Value"
                    register={methods.register(`variables.${index}.value`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />
                  <IconButton
                    onClick={() => removeVariables(index)}
                    color="error"
                    aria-label="delete variables"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                className={pages.queryButton}
                variant="contained"
                type="button"
                onClick={() => appendVariables({ key: '', value: '' })}
              >
                Add Variables
              </Button>
            </Box>
          </Box>

          {/* ввод боди */}
          {/* Переключатель режимов ввода */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Input Mode:</Typography>
            <div className={styles.radioErrorJson}>
              <RadioGroup row value={inputMode} onChange={handleInputModeChange}>
                <FormControlLabel value="json" control={<Radio />} label="JSON" />
                <FormControlLabel value="text" control={<Radio />} label="Text" />
              </RadioGroup>
              {jsonError && (
                <Typography variant="body2" color="error">
                  {jsonError}
                </Typography>
              )}
            </div>
          </Box>
          <BodyFieldInput
            customClass={`${pages.query} ${pages.bodyRestful}`}
            label="Body"
            register={methods.register('body')}
            multilineArea
            rows={20}
            onBlur={updateUrl}
            prettier={'query'}
          />
          {inputMode === 'json' && (
            <Button
              className={`${pages.queryButton} ${styles.formatButton}`}
              variant="contained"
              type="button"
              onClick={handleFormatJson}
            >
              Format Body
            </Button>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" className={pages.queryButton} variant="contained">
              Send Request
            </Button>
            <Button
              className={pages.queryButton}
              variant="contained"
              type="button"
              onClick={onReset}
            >
              Reset Form
            </Button>
          </Box>
        </form>

        {/* ответ */}
        <div className={`${pages.response} ${pages.restResponse}`}>
          <p className={styles.responseText}>
            Status: {responseStatus ? `${responseStatus.code} - ${responseStatus.text}` : ''}
          </p>
          <RequestTextField
            response={responseBody ? JSON.parse(responseBody) : ''}
            client="restFull"
          />
        </div>
      </FormProvider>
    </section>
  );
}
