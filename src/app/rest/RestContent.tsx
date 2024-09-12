'use client';

import pages from '../graphql/graphql.module.scss';
import { useCallback, useEffect, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import {
  TextField,
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

type QueryParam = { key: string; value: string };
type Header = { key: string; value: string };

type FormData = {
  method: string;
  endpointUrl: string;
  headers: { key: string; value: string }[];
  queries: { key: string; value: string }[];
  variables: { key: string; value: string }[];
  body: string;
};

type RestContentProps = {
  method?: string;
  endpointUrl?: string;
  body?: string;
  headers?: Header[];
  queries?: QueryParam[];
};

export default function RestContent({
  method,
  endpointUrl,
  body,
  headers,
  queries,
}: RestContentProps) {
  const { control, register, handleSubmit, reset, watch, getValues, setValue } = useForm<FormData>({
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
  } = useFieldArray({ control, name: 'headers' });

  const {
    fields: queryFields,
    append: appendQuery,
    remove: removeQuery,
  } = useFieldArray({ control, name: 'queries' });

  const {
    fields: variablesFields,
    append: appendVariables,
    remove: removeVariables,
  } = useFieldArray({ control, name: 'variables' });

  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<{ code: number; text: string } | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<'json' | 'text'>('json');
  const [encodedHistoryUrl, setEncodedHistoryUrl] = useState('');
  const router = useRouter();

  const updateUrl = useCallback(() => {
    const currentData = getValues();
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
  }, [getValues, router]);

  // смотрим обновление url
  useEffect(() => {
    const subscription = watch((_, { type }) => {
      if (type === 'blur') {
        updateUrl();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateUrl]);

  const handleFormatJson = () => {
    const currentBody = getValues('body');
    const formattedJson = formatJson(currentBody);

    if (formattedJson) {
      setValue('body', formattedJson);
      setJsonError(null);
    } else {
      setJsonError('Invalid JSON format');
    }
  };

  const handleInputModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMode(event.target.value as 'json' | 'text');
    setValue('body', '');
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
    reset();
    setResponseBody(null);
    setJsonError(null);
  };

  return (
    <section className={styles.restCont}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.head}>RESTfull Client</h2>

        <Box className={styles.methodUrl}>
          {/* выбор метода */}
          <FormControl
            fullWidth
            size="small"
            className={styles.customSelect}
            sx={{ mb: 2, width: 130 }}
          >
            <InputLabel>Method</InputLabel>
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Method" sx={{ color: 'white', borderColor: 'white' }}>
                  <MenuItem value="GET">GET</MenuItem>
                  <MenuItem value="POST">POST</MenuItem>
                  <MenuItem value="PUT">PUT</MenuItem>
                  <MenuItem value="DELETE">DELETE</MenuItem>
                  <MenuItem value="PATCH">PATCH</MenuItem>
                </Select>
              )}
            />
          </FormControl>

          {/* эндпоинт */}
          <TextField
            className={styles.customInput}
            {...register('endpointUrl', { onBlur: updateUrl })}
            label="Endpoint URL"
            size="small"
            fullWidth
            variant="outlined"
            required
            sx={{ mb: 2 }}
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
                <TextField
                  {...register(`headers.${index}.key`, { onBlur: updateUrl })}
                  label="Header Key"
                  fullWidth
                  size="small"
                  className={styles.customInput}
                />
                <TextField
                  {...register(`headers.${index}.value`, { onBlur: updateUrl })}
                  label="Header Value"
                  fullWidth
                  size="small"
                  className={styles.customInput}
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
              variant="contained"
              color="primary"
              onClick={() => appendHeader({ key: '', value: '' })}
              sx={{
                backgroundColor: '#3C3B3F',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: '#4F4E52',
                },
              }}
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
                <TextField
                  {...register(`queries.${index}.key`, { onBlur: updateUrl })}
                  label="Query Key"
                  fullWidth
                  size="small"
                  className={styles.customInput}
                />
                <TextField
                  {...register(`queries.${index}.value`, { onBlur: updateUrl })}
                  label="Query Value"
                  fullWidth
                  size="small"
                  className={styles.customInput}
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
              variant="contained"
              color="primary"
              onClick={() => appendQuery({ key: '', value: '' })}
              sx={{
                backgroundColor: '#3C3B3F',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: '#4F4E52',
                },
              }}
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
                <TextField
                  {...register(`variables.${index}.key`, { onBlur: updateUrl })}
                  label="Variable Key"
                  fullWidth
                  size="small"
                  className={styles.customInput}
                />
                <TextField
                  {...register(`variables.${index}.value`, { onBlur: updateUrl })}
                  label="Variable Value"
                  fullWidth
                  size="small"
                  className={styles.customInput}
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
              variant="contained"
              color="primary"
              onClick={() => appendVariables({ key: '', value: '' })}
              sx={{
                backgroundColor: '#3C3B3F',
                color: 'white',
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: '#4F4E52',
                },
              }}
            >
              Add Variables
            </Button>
          </Box>
        </Box>

        {/* ввод боди */}
        {/* Переключатель режимов ввода */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1">Input Mode:</Typography>
          <RadioGroup row value={inputMode} onChange={handleInputModeChange}>
            <FormControlLabel value="json" control={<Radio />} label="JSON" />
            <FormControlLabel value="text" control={<Radio />} label="Text" />
          </RadioGroup>
        </Box>
        <TextField
          {...register('body', { onBlur: updateUrl })}
          label="Body"
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          className={styles.customInput}
        />

        {inputMode === 'json' && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleFormatJson}
            sx={{
              backgroundColor: '#3C3B3F',
              color: 'white',
              borderColor: '#3C3B3F',
              '&:hover': {
                backgroundColor: '#4F4E52',
              },
              mb: 2,
            }}
          >
            Format Body
          </Button>
        )}

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              backgroundColor: '#3C3B3F',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: '#4F4E52',
              },
            }}
          >
            Send Request
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={onReset}
            sx={{
              backgroundColor: '#3C3B3F',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: '#4F4E52',
              },
            }}
          >
            Reset Form
          </Button>
        </Box>
      </form>

      {/* ответ */}
      {/* <div className={styles.responseCont}>
        <Typography variant="h6">Response</Typography>
        {jsonError ? (
          <Typography color="error">{jsonError}</Typography>
        ) : (
          <>
            {responseStatus && (
              <Typography variant="subtitle1">
                Status: {responseStatus.code} {responseStatus.text}
              </Typography>
            )}
            <pre className={styles.responseBody}>{responseBody}</pre>
          </>
        )}
      </div>  тут как вариант т.к в тз требуется такой же поле для ответа как в грапхкл сделайт.. ток его немног над стилизовать под рест*/}
      <div className={`${pages.response} ${pages.restResponse}`}>
        {' '}
        <p>Status: {responseStatus ? responseStatus.code : ''}</p>
        <RequestTextField response={responseBody ? responseBody : ''} />
      </div>
    </section>
  );
}
