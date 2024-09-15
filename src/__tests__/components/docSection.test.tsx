import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { request } from 'graphql-request';
import { DocSection } from '@/src/components/documentation/docSection';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));
const messages = {};

describe('DocSection', () => {
  test('renders and opens drawer with fetched schema', async () => {
    (request as jest.Mock).mockResolvedValue({
      __schema: {
        types: [
          {
            kind: 'OBJECT',
            name: 'ExampleType',
            fields: [{ name: 'exampleField' }],
          },
        ],
      },
    });

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <DocSection endpointSdl="http://mocked-endpoint/graphql" />
      </NextIntlClientProvider>,
    );

    const button = screen.getByText(/DocSection.emptyButton/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText(/DocSection.emptyButton/i)).toBeInTheDocument();
  });
});
