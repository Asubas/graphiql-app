import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorUI from '@/src/app/error';

describe('ErrorUI Component', () => {
  const errorMock = new Error('Test error message');
  const resetMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the error message', () => {
    render(<ErrorUI error={errorMock} reset={resetMock} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(screen.getByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });

  it('toggles the display of error details when the button is clicked', async () => {
    render(<ErrorUI error={errorMock} reset={resetMock} />);

    const toggleButton = screen.getByText('Show Details');
    fireEvent.click(toggleButton);

    expect(screen.getByText('Hide Details')).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByText('Show Details')).toBeInTheDocument();
    expect(screen.queryByText(errorMock.stack || '')).not.toBeInTheDocument();
  });

  it('renders a link to try again from start', () => {
    render(<ErrorUI error={errorMock} reset={resetMock} />);

    const tryAgainLink = screen.getByText('Try again from Start');
    expect(tryAgainLink).toBeInTheDocument();
    expect(tryAgainLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('logs the error to the console on mount', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ErrorUI error={errorMock} reset={resetMock} />);

    expect(consoleErrorSpy).toHaveBeenCalledWith(errorMock);
    consoleErrorSpy.mockRestore();
  });
});
