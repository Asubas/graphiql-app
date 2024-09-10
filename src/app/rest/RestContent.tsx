'use client';

import { useState } from 'react';
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
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import styles from './rest.module.scss';
import { color } from '@mui/system';
import { statusMessages } from '@/src/services/constant';

type QueryParam = { key: string; value: string };
type Header = { key: string; value: string };

type FormData = {
  method: string;
  endpointUrl: string;
  headers: { key: string; value: string }[];
  queries: { key: string; value: string }[];
  body: string;
};

export default function RestContent() {
  const { control, register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      method: 'GET',
      endpointUrl: 'https://api.restful-api.dev/objects',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      queries: [{ key: '', value: '' }],
      body: '',
    },
  });

  const {
    fields: headerFields,
    append: appendHeader,
    remove: removeHeader,
  } = useFieldArray({
    control,
    name: 'headers',
  });

  const {
    fields: queryFields,
    append: appendQuery,
    remove: removeQuery,
  } = useFieldArray({
    control,
    name: 'queries',
  });

  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<{ code: number; text: string } | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const { method, endpointUrl, headers, queries, body } = data;

      const requestHeaders = headers.reduce((acc: Record<string, string>, header) => {
        if (header.key && header.value) {
          acc[header.key] = header.value;
        }
        return acc;
      }, {});

      const queryParams = queries
        .reduce((acc: string[], query) => {
          if (query.key && query.value) {
            acc.push(`${encodeURIComponent(query.key)}=${encodeURIComponent(query.value)}`);
          }
          return acc;
        }, [])
        .join('&');

      const fullUrl = queryParams ? `${endpointUrl}?${queryParams}` : endpointUrl;
      console.log('Full URL:', fullUrl);

      const res = await fetch(fullUrl, {
        method,
        headers: requestHeaders,
        body: method !== 'GET' && body ? body : undefined,
      });

      const statusText = res.statusText || statusMessages[res.status] || 'Unknown Status';

      setResponseStatus({ code: res.status, text: statusText });
      console.log(res.status, res.statusText);

      const result = await res.json();
      setResponseBody(JSON.stringify(result, null, 2));
      setJsonError(null);
    } catch (error) {
      console.error('Error sending request:', error);
      setJsonError('Invalid JSON in request body');
    }
  };

  // сброс формы
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
            {...register('endpointUrl')}
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
                  {...register(`headers.${index}.key`)}
                  label="Header Key"
                  fullWidth
                  size="small"
                  className={styles.customInput}
                />
                <TextField
                  {...register(`headers.${index}.value`)}
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
                  {...register(`queries.${index}.key`)}
                  label="Query Key"
                  fullWidth
                  size="small"
                  className={styles.customInput}
                />
                <TextField
                  {...register(`queries.${index}.value`)}
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
        </Box>

        {/* ввод боди */}
        <TextField
          {...register('body')}
          label="Body"
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          className={styles.customInput}
        />

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
      <div className={styles.responseCont}>
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
      </div>
    </section>
  );
}
