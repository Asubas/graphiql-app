import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import beautify from 'js-beautify';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('js-beautify', () => ({
  js: jest.fn((jsonString) => jsonString),
}));

const RenderWithFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};
const messages = {};

describe('TextFieldInput Component', () => {
  it('renders the TextFieldInput component with label and placeholder', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RenderWithFormProvider>
          <TextFieldInput label="Some label" placeholder="Some type" />
        </RenderWithFormProvider>
      </NextIntlClientProvider>,
    );

    expect(screen.getByLabelText(/Some label/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Some type/i)).toBeInTheDocument();
  });

  it('calls handleFormat and formats the query', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RenderWithFormProvider>
          <TextFieldInput label="Some label" placeholder="Some type" prettier="query" />
        </RenderWithFormProvider>
      </NextIntlClientProvider>,
    );

    const button = screen.getByText(/TextFieldInput.textFieldButton/i);
    const input = screen.getByLabelText(/Some label/i);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '{"key": "value"}' } });
    fireEvent.blur(input);
  });
});
