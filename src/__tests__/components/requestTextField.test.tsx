import React from 'react';
import { render, screen } from '@testing-library/react';
import { RequestTextField } from '@/src/components/inputs/requestFieldInput/requestTextField';
import { NextIntlClientProvider } from 'next-intl';

const messages = {};
describe('RequestTextField Component', () => {
  it('renders correctly with initial props', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RequestTextField response={null} />
      </NextIntlClientProvider>,
    );

    const textField = screen.getByLabelText(/RequestTextField.textFieldLabel/i);
    expect(textField).toBeInTheDocument();

    expect(textField).toHaveValue('');
  });

  it('renders correctly with valid response', () => {
    const mockResponse = { key: 'value' };
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RequestTextField response={mockResponse} />
      </NextIntlClientProvider>,
    );

    const textField = screen.getByLabelText(/RequestTextField.textFieldLabel/i);
    expect(textField).toHaveValue(JSON.stringify(mockResponse, null, 2));
  });

  it('has correct styles applied', () => {
    const { container } = render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <RequestTextField response={null} />
      </NextIntlClientProvider>,
    );

    const textField = container.querySelector('.MuiOutlinedInput-notchedOutline');
    expect(textField).toHaveStyle('border-color: rgba(0, 0, 0, 0.23);');
  });
});
