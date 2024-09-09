import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/src/components/Header/Header';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('../../hooks/useAuthRedirect', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../../utils/cookies', () => ({
  getLocale: jest.fn(() => 'en'),
  setLocale: jest.fn(),
}));

describe('Header Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({
      loading: false,
      user: null,
      signOut: jest.fn(),
    });
  });

  it('renders logo and heading', () => {
    render(<Header />);

    const logo = screen.getByAltText('Client logo');
    expect(logo).toBeInTheDocument();
    expect(screen.getByText('API Client')).toBeInTheDocument();
  });

  it('toggles menu on burger icon click', () => {
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    expect(burgerIcon).toBeInTheDocument();

    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  it('renders sign-in and sign-up buttons when user is not logged in', () => {
    render(<Header />);

    expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-btn')).not.toBeInTheDocument();
  });

  it('renders logout button and user name when user is logged in', () => {
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

  it('changes locale when clicking on language radio buttons', () => {
    render(<Header />);

    const enRadio = screen.getByLabelText('EN');
    const ruRadio = screen.getByLabelText('RU');

    expect(enRadio).toBeInTheDocument();
    expect(ruRadio).toBeInTheDocument();

    fireEvent.click(ruRadio);
    expect(mockRouterPush).toHaveBeenCalledWith('/ru/');
  });

  it('adds shrink class on scroll', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).not.toHaveClass('shrink');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(headerElement).toHaveClass('shrink');
  });
});
