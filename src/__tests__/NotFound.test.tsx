import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTranslations } from 'next-intl';
import PageNotFound from '../app/[...not-found]/not-found';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      'NotFoundPage.title': 'Page Not Found',
      'NotFoundPage.message': 'Sorry, the page you are looking for does not exist.',
      'NotFoundPage.link': 'Go back to home',
    };
    return translations[key] || key;
  },
}));

describe('PageNotFound Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders 404 message correctly', () => {
    render(<PageNotFound />);

    const errorImage = screen.getByAltText('page not found');
    expect(errorImage).toBeInTheDocument();
    expect(errorImage).toHaveAttribute('src', '/error.svg');

    expect(screen.getByText(/4/i)).toBeInTheDocument();
    expect(screen.getAllByText(/4/i)).toHaveLength(1);

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('message')).toBeInTheDocument();
  });

  it('renders link to home page correctly', () => {
    render(<PageNotFound />);

    const homeLink = screen.getByText('link');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });
});
