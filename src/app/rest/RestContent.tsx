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
} from '@mui/material';
import styles from './rest.module.scss';

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
      endpointUrl: '',
      headers: [{ key: '', value: '' }],
      queries: [{ key: '', value: '' }],
      body: '',
    },
  });

  const { fields: headerFields, append: appendHeader } = useFieldArray({
    control,
    name: 'headers',
  });

  const { fields: queryFields, append: appendQuery } = useFieldArray({
    control,
    name: 'queries',
  });

  const [responseBody, setResponseBody] = useState<string | null>(null);
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
    <Box sx={{ p: 4, mt: 10 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* выбор метода */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Method</InputLabel>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <Select {...field} label="Method">
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
          {...register('endpointUrl')}
          label="Endpoint URL"
          fullWidth
          variant="outlined"
          required
          sx={{ mb: 2 }}
        />

        {/* добавление хэдэров */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Headers:</Typography>
          {headerFields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <TextField {...register(`headers.${index}.key`)} label="Header Key" fullWidth />
              <TextField {...register(`headers.${index}.value`)} label="Header Value" fullWidth />
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => appendHeader({ key: '', value: '' })}
          >
            Add Header
          </Button>
        </Box>

        {/* добавление кверей */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Query Parameters:</Typography>
          {queryFields.map((field, index) => (
            <Box key={field.id} sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <TextField {...register(`queries.${index}.key`)} label="Query Key" fullWidth />
              <TextField {...register(`queries.${index}.value`)} label="Query Value" fullWidth />
            </Box>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => appendQuery({ key: '', value: '' })}
          >
            Add Query Parameter
          </Button>
        </Box>

        {/* ввод боди */}
        <TextField
          {...register('body')}
          label="Body"
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Request
          </Button>
          <Button variant="outlined" color="secondary" fullWidth onClick={onReset}>
            Reset Form
          </Button>
        </Box>
      </form>

      {/* ответ */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Response:</Typography>
        {jsonError ? <Typography color="error">{jsonError}</Typography> : <pre>{responseBody}</pre>}
      </Box>
    </Box>
  );
}
