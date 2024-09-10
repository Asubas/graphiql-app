import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import beautify from 'js-beautify';
import { TextFieldInput } from '@/src/components/inputs/textFieldInput/textFieldInput';

jest.mock('js-beautify', () => ({
  js: jest.fn((jsonString) => jsonString),
}));

const RenderWithFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('TextFieldInput Component', () => {
  it('renders the TextFieldInput component with label and placeholder', () => {
    render(
      <RenderWithFormProvider>
        <TextFieldInput label="Some label" placeholder="Some type" />
      </RenderWithFormProvider>,
    );

    expect(screen.getByLabelText(/Some label/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Some type/i)).toBeInTheDocument();
  });

  it('calls handleFormat and formats the query', () => {
    render(
      <RenderWithFormProvider>
        <TextFieldInput label="Some label" placeholder="Some type" prettier="query" />
      </RenderWithFormProvider>,
    );

    const button = screen.getByText(/formatting/i);
    const input = screen.getByLabelText(/Some label/i);

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: '{"key": "value"}' } });
    fireEvent.blur(input);
  });
});
