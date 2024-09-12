import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { request } from 'graphql-request';
import { DocSection } from '@/src/components/documentation/docSection';

jest.mock('graphql-request', () => ({
  request: jest.fn(),
}));

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

    render(<DocSection endpointSdl="http://mocked-endpoint/graphql" />);

    const button = screen.getByText(/Show documentation/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText(/Loading documentation.../i)).toBeInTheDocument();
  });
});
