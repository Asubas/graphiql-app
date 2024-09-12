import React from 'react';
import { render } from '@testing-library/react';
import * as nextRouter from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';
import GraphQlParams from '@/src/app/graphql/[...params]/page';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('../../utils/decodingUrl', () => ({
  decodingUrl: jest.fn(),
}));

jest.mock('graphql-request', () => ({
  request: jest.fn().mockResolvedValue({}),
}));

describe('GraphQlParams', () => {
  const mockedDecodingPath = 'decoded/path';

  beforeEach(() => {
    (nextRouter.usePathname as jest.Mock).mockReturnValue('/some/path');
    (nextRouter.useSearchParams as jest.Mock).mockReturnValue('someHeaders');
    (nextRouter.useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (decodingUrl as jest.Mock).mockReturnValue(mockedDecodingPath);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders GraphQlContent with decoded params', () => {
    const { getByText } = render(<GraphQlParams />);

    expect(decodingUrl).toHaveBeenCalledWith('/some/path');

    expect(getByText(/GraphQL Client/i)).toBeInTheDocument();
  });
});
