import { render, screen, fireEvent } from '@testing-library/react';

import { useTranslations } from 'next-intl';
import ErrorUI from '../app/[locale]/error';

type TranslationKeys = 'title' | 'errorMessage' | 'showDetails' | 'hideDetails' | 'tryAgain';

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(),
}));

describe('ErrorUI Component', () => {
  const mockTranslations: Record<TranslationKeys, string> = {
    title: 'Error Occurred',
    errorMessage: 'An error has occurred:',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    tryAgain: 'Try Again',
  };

  const mockError = new Error('Something went wrong');
  mockError.stack = 'Error stack trace';

  const mockReset = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: TranslationKeys) => mockTranslations[key]);
  });

  it('should render error message and show try again link', () => {
    render(<ErrorUI error={mockError} reset={mockReset} />);

    expect(screen.getByText(mockTranslations.title)).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        if (!element) return false;

        const hasText = (node: Element) =>
          node.textContent === `${mockTranslations.errorMessage} ${mockError.message}`;
        const elementHasText = hasText(element);
        const childrenDontHaveText = Array.from(element.children).every((child) => !hasText(child));
        return elementHasText && childrenDontHaveText;
      }),
    ).toBeInTheDocument();

    expect(screen.getByText(mockTranslations.showDetails)).toBeInTheDocument();

    expect(screen.getByText(mockTranslations.tryAgain)).toHaveAttribute('href', '/');
  });

  it('should toggle details on button click', () => {
    render(<ErrorUI error={mockError} reset={mockReset} />);

    if (mockError.stack) {
      expect(screen.queryByText(mockError.stack)).toBeNull();
    }

    fireEvent.click(screen.getByText(mockTranslations.showDetails));

    if (mockError.stack) {
      expect(screen.getByText(mockError.stack)).toBeInTheDocument();
    }

    expect(screen.getByText(mockTranslations.hideDetails)).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockTranslations.hideDetails));

    if (mockError.stack) {
      expect(screen.queryByText(mockError.stack)).toBeNull();
    }
  });

  it('should log the error in useEffect', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<ErrorUI error={mockError} reset={mockReset} />);
    expect(consoleSpy).toHaveBeenCalledWith(mockError);

    consoleSpy.mockRestore();
  });
});
