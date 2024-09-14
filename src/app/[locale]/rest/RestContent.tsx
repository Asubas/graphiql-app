'use client';

import pages from '../graphql/graphql.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import {
  Button,
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
import { saveGetHistory } from '@/src/utils/saveGetHistory';
import { RequestTextField } from '@/src/components/inputs/requestFieldInput/requestTextField';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { FormData } from '@/src/interfaces/restFullTypes';
import { BodyFieldInput } from '@/src/components/inputs/bodyFieldInput/bodyFieldInput';
import { MethodSelectInput } from '@/src/components/inputs/methodSelectInput/MethodSelectInput';
import { DefaultParams } from '@/src/interfaces/graphQlInterface';
import { HistoryButton } from '@/src/components/history/historySection';
import { useTranslations } from 'next-intl';

export default function RestContent({
  defaultParams,
  decodingHeaders,
  decodingQuery,
}: {
  defaultParams?: DefaultParams;
  decodingHeaders?: { key: string; value: string }[];
  decodingQuery?: { key: string; value: string }[];
}) {
  const methods = useForm<FormData>({
    defaultValues: {
      method: defaultParams?.method ? defaultParams?.method : 'GET',
      endpointUrl: defaultParams?.endpointUrl
        ? defaultParams.endpointUrl
        : 'https://api.restful-api.dev/objects',
      headers:
        decodingHeaders && decodingHeaders.length > 0
          ? decodingHeaders
          : [{ key: 'Content-Type', value: 'application/json' }],
      queries: decodingQuery && decodingQuery.length > 0 ? decodingQuery : [{ key: '', value: '' }],
      variables:
        Array.isArray(defaultParams?.variables) && defaultParams.variables.length > 0
          ? defaultParams.variables
          : [{ key: '', value: '' }],
      body: defaultParams?.body && defaultParams.body !== '{}' ? defaultParams?.body : '',
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
  const [showVariables, setShowVariables] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations('RestContent');

  const updateUrl = useCallback(() => {
    const currentData = methods.getValues();
    const newUrl = encodeUrl({
      method: currentData.method,
      endpointUrl: currentData.endpointUrl,
      body: currentData.body,
      headers: currentData.headers,
      queries: currentData.queries,
      variables: currentData.variables,
    });
    setEncodedHistoryUrl(newUrl);
    router.replace(newUrl);
    window.history.pushState(null, '', newUrl);
  }, [methods, router]);

  useEffect(() => {
    if (encodedHistoryUrl) {
      saveGetHistory({
        endpointUrl: methods.getValues().endpointUrl,
        headers: methods.getValues().headers,
        variables: methods.getValues().variables,
        body: methods.getValues().body,
        queryParams: methods.getValues().queries,
        timestamp: new Date().toISOString(),
        encodedHistoryUrl,
      });
    }
  }, [encodedHistoryUrl, methods]);

  useEffect(() => {
    const subscription = methods.watch((_, { type }) => {
      if (type === 'blur') {
        updateUrl();
      }
    });
    return () => subscription.unsubscribe();
  }, [updateUrl, methods]);

  const handleInputModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMode(event.target.value as 'json' | 'text');
    methods.setValue('body', '');
    setJsonError(null);
  };

  function replaceVariablesInBody(body: string, variables: Record<string, string>): string {
    return body.replace(/\{\{(.*?)\}\}/g, (_, varName) => variables[varName.trim()] || '');
  }

  const onSubmit = async (data: FormData) => {
    try {
      const { method, endpointUrl, headers, variables, queries, body } = data;

      const variablesObject = variables.reduce<Record<string, string>>((acc, variable) => {
        if (variable.key && variable.value) {
          acc[variable.key] = variable.value;
        }
        return acc;
      }, {});

      const bodyWithVariables = replaceVariablesInBody(body, variablesObject);

      const requestHeaders = headers.reduce<Record<string, string>>((acc, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});

      const queryParamsObj = queries.reduce<Record<string, string>>((acc, query) => {
        if (query.key && query.value) {
          acc[query.key] = query.value;
        }
        return acc;
      }, {});

      const queryParams = Object.entries(queryParamsObj)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

      const fullUrl = queryParams ? `${endpointUrl}?${queryParams}` : endpointUrl;

      const res = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: method !== 'GET' ? JSON.stringify({ body: bodyWithVariables, variables }) : undefined,
      });

      const statusText = res.statusText || statusMessages[res.status] || t('unknownStatus');
      setResponseStatus({ code: res.status, text: statusText });

      const result = await res.json();
      setResponseBody(JSON.stringify(result, null, 2));
      setJsonError(null);

      updateUrl();
    } catch (error) {
      setJsonError(t('jsonError'));
      console.error('Error sending request:', error);
    }
  };

  const onReset = () => {
    methods.reset();
    setResponseBody(null);
    setJsonError(null);
    setShowVariables(false);
  };

  return (
    <section className={`${styles.restCont} hide-formatting`}>
      <FormProvider {...methods}>
        <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className={styles.head}>{t('restClientTitle')}</h2>

          <Box className={styles.methodUrl}>
            <MethodSelectInput
              label={t('methodLabel')}
              name="method"
              control={methods.control}
              onBlur={updateUrl}
            />

            <TextFieldInput
              customClass={pages.query}
              label={t('endPointURL')}
              register={methods.register('endpointUrl')}
              multilineArea
              rows={1}
              onBlur={updateUrl}
            />
          </Box>

          <Box className={styles.headersParams}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t('headers')}
              </Typography>
              {headerFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextFieldInput
                    customClass={pages.query}
                    label={t('headerKeyLabel')}
                    register={methods.register(`headers.${index}.key`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />
                  <TextFieldInput
                    customClass={pages.query}
                    label={t('headerValueLabel')}
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
                {t('addHeaderButton')}
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t('queryParameters')}
              </Typography>
              {queryFields.map((field, index) => (
                <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <TextFieldInput
                    customClass={pages.query}
                    label={t('queryKeyLabel')}
                    register={methods.register(`queries.${index}.key`)}
                    multilineArea
                    rows={1}
                    onBlur={updateUrl}
                  />

                  <TextFieldInput
                    customClass={pages.query}
                    label={t('queryValueLabel')}
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
                {t('queryButton')}
              </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Button
                className={pages.queryButton}
                variant="contained"
                type="button"
                onClick={() => setShowVariables(!showVariables)}
              >
                {showVariables ? t('hideVariablesButton') : t('showVariablesButton')}
              </Button>

              {showVariables && (
                <>
                  <Typography variant="h6" sx={{ mb: 1, mt: 2 }}>
                    {t('variablesTitle')}
                  </Typography>
                  {variablesFields.map((field, index) => (
                    <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
                      <TextFieldInput
                        customClass={pages.query}
                        label={t('variableKeyLabel')}
                        register={methods.register(`variables.${index}.key`)}
                        multilineArea
                        rows={1}
                        onBlur={updateUrl}
                      />

                      <TextFieldInput
                        customClass={pages.query}
                        label={t('variableValueLabel')}
                        register={methods.register(`variables.${index}.value`)}
                        multilineArea
                        rows={3}
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
                    {t('addVariableButton')}
                  </Button>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{t('inputModeTitle')}</Typography>
            <div className={styles.radioErrorJson}>
              <RadioGroup row value={inputMode} onChange={handleInputModeChange}>
                <FormControlLabel value="json" control={<Radio />} label="JSON" />
                <FormControlLabel value="text" control={<Radio />} label={t('textLabel')} />
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
            label={t('bodyLabel')}
            register={methods.register('body')}
            multilineArea
            rows={20}
            onBlur={updateUrl}
            prettier={'body'}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" className={pages.queryButton} variant="contained">
              {t('sendRequestButton')}
            </Button>
            <Button
              className={pages.queryButton}
              variant="contained"
              type="button"
              onClick={onReset}
            >
              {t('resetFormButton')}
            </Button>
            <HistoryButton />
          </Box>
        </form>

        <div className={`${pages.response} ${pages.restResponse}`}>
          <p className={styles.responseText}>
            {t('statusText')}{' '}
            {responseStatus ? `${responseStatus.code} - ${responseStatus.text}` : ''}
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
