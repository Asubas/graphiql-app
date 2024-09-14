import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import HistorySection from '../app/[locale]/history/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('HistorySection Component', () => {
  const mockedRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
    localStorage.clear();
  });

  test('renders empty history message when there is no history', () => {
    render(<HistorySection />);

    expect(screen.getByText('historyDescription')).toBeInTheDocument();
    expect(screen.getByText('graphiQLButton')).toBeInTheDocument();
    expect(screen.getByText('restFullApi')).toBeInTheDocument();
  });

  test('renders history entries from localStorage', () => {
    const mockHistory = JSON.stringify([
      {
        timestamp: '2023-01-01T12:00:00Z',
        endpointUrl: 'http://test.com/api',
        encodedHistoryUrl: '/rest/GET/test',
      },
    ]);
    localStorage.setItem('history', mockHistory);

    render(<HistorySection />);

    expect(
      screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'span' && /01\.01\.2023.*15:00/.test(content);
      }),
    ).toBeInTheDocument();

    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByText('http://test.com/api')).toBeInTheDocument();
  });

  test('clears history when clear button is clicked', () => {
    localStorage.setItem(
      'history',
      JSON.stringify([
        {
          timestamp: '2023-01-01T12:00:00Z',
          endpointUrl: 'http://test.com/api',
          encodedHistoryUrl: '/rest/GET/test',
        },
      ]),
    );

    render(<HistorySection />);

    fireEvent.click(screen.getByText('clearButton'));

    expect(localStorage.getItem('history')).toBeNull();
    expect(screen.getByText('historyDescription')).toBeInTheDocument();
  });

  test('navigates to REST page on restFullApi button click', () => {
    render(<HistorySection />);

    fireEvent.click(screen.getByText('restFullApi'));

    expect(mockedRouter.push).toHaveBeenCalledWith('http://localhost:3000/rest');
  });

  test('navigates to GraphQL page on graphiQLButton click', () => {
    render(<HistorySection />);

    fireEvent.click(screen.getByText('graphiQLButton'));

    expect(mockedRouter.push).toHaveBeenCalledWith('http://localhost:3000/graphql');
  });
});
