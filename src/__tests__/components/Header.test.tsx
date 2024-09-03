import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/src/components/Header/Header';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../hooks/useAuthRedirect', () => ({
  useAuth: jest.fn(),
}));

beforeEach(() => {
  const mockUseRouter = useRouter as jest.Mock;
  mockUseRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    pathname: '/',
    route: '/',
    asPath: '/',
    query: {},
  });

  const mockUseAuth = useAuth as jest.Mock;
  mockUseAuth.mockReturnValue({
    loading: false,
    user: null,
    signOut: jest.fn(),
  });

  jest.clearAllMocks();
});

describe('Header Component', () => {
  test('renders logo and heading', () => {
    render(<Header />);
    expect(screen.getByAltText('Client logo')).toBeInTheDocument();
    expect(screen.getByText('API Client')).toBeInTheDocument();
  });

  test('toggles menu on burger icon click', () => {
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    expect(burgerIcon).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  test('closes menu when overlay is clicked', () => {
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    fireEvent.click(burgerIcon);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();

    fireEvent.click(overlay);
    expect(overlay).not.toBeInTheDocument();
  });

  test('renders sign-in and sign-up buttons when user is not logged in', () => {
    render(<Header />);

    expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-btn')).not.toBeInTheDocument();
  });

  test('renders logout button and user name when user is logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      loading: false,
      user: { displayName: 'John Doe' },
      signOut: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('signin-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-btn')).not.toBeInTheDocument();
  });

  test('renders private buttons in the menu when user is logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      loading: false,
      user: { displayName: 'John Doe' },
      signOut: jest.fn(),
    });

    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    fireEvent.click(burgerIcon);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  test('adds shrink class on scroll', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).not.toHaveClass('shrink');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(headerElement).toHaveClass('shrink');
  });
});
