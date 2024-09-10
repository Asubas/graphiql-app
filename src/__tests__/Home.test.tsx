import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { useRouter } from 'next/navigation';
import Home from '../app/[locale]/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => {
    const translations: { [key: string]: string } = {
      'HomePage.title': 'Welcome back',
    };
    return translations[key] || key;
  }),
}));

jest.mock('../hooks/useAuthRedirect', () => ({
  useAuth: jest.fn(),
}));

describe('Home Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders About component when user is not logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      user: null,
    });

    render(<Home />);

    expect(screen.getByText(/descriptionEnd/i)).toBeInTheDocument();
  });

  it('renders welcome message when user is logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      user: { displayName: 'John Doe' },
    });

    render(<Home />);

    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  it('renders Welcome component', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      user: null,
    });

    render(<Home />);

    expect(screen.getByText(/descriptionBeggining/i)).toBeInTheDocument();
  });

  it('renders fallback name "User" if displayName is not available', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      user: {},
    });

    render(<Home />);

    expect(screen.getByText(/User/i)).toBeInTheDocument();
  });
});
