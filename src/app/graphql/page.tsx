'use client';
import { useForm } from 'react-hook-form';
import pages from './graphql.module.scss';
import { useState } from 'react';
import { GraphQLResponse, FormData } from '@/src/components/interfaces/graphQlInterface';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { Button, TextField, styled } from '@mui/material';
import { sendResponse } from './sendResponse';
import MyTextField from './testTextField';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& label': {
    color: 'orange', // Цвет для label
  },
  '& .MuiInputBase-input': {
    color: 'orange', // Цвет текста
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main, // Цвет границы в обычном состоянии
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main, // Цвет границы при наведении
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.warning.main, // Цвет границы при фокусе
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'orange', // Цвет label при фокусе
  },
}));

const GraphQLClient = () => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();
  const [response, setResponse] = useState<GraphQLResponse | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  const onSubmit = async (data: FormData) => {
    const { endpointUrl, sdlUrl, headers, query, variables } = data;
    const headersObj: Record<string, string> = {};

    if (headers) {
      const headerArray = headers.split(',');
      headerArray.forEach((header: string) => {
        const [key, value] = header.split(':');
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
          {/* <TextField
            className={`${pages.area}`}
            id={'outlined-basic'}
            label="Body: "
            variant="outlined"
            size="small"
            color="warning"
            multiline
            rows={25}
            defaultValue=""
            value={response ? JSON.stringify(response, null, 2) : 'null'}
          /> */}
          <MyTextField response={response ? response : 'null'} />
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
