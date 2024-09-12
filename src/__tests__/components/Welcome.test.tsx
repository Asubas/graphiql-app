import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@/src/components/Welcome/Welcome';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../hooks/useAuthRedirect', () => ({
  useAuth: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    info: jest.fn(),
  },
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      'Welcome.welcome': 'Welcome to our platform!',
      'Welcome.description': 'Please sign in or sign up to continue.',
      'Welcome.signInLabel': 'Sign In',
      'Welcome.signUpLabel': 'Sign Up',
      'Welcome.alreadySignIn': 'You are already signed in!',
      'Welcome.alreadySignUp': 'You are already signed up!',
      'Welcome.restLabel': 'REST Client',
      'Welcome.graphQLLabel': 'GraphQL Client',
      'Welcome.history': 'History',
    };
    return translations[key] || key;
  },
}));

jest.mock('../../utils/cookies', () => ({
  getLocale: jest.fn(() => 'en'),
}));

describe('Welcome Component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    const mockUseRouter = useRouter as jest.Mock;
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    });

    jest.clearAllMocks();
  });

  it('renders sign-in and sign-up buttons when user is not logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({ user: null });

    render(<Welcome />);

    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText('signInLabel')).toBeInTheDocument();
    expect(screen.getByText('signUpLabel')).toBeInTheDocument();
  });

  test('renders private buttons when user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { name: 'John Doe' }, signOut: mockSignOut });
    document.cookie = 'token=someToken';
    render(<Welcome />);

    expect(screen.getByText('restLabel')).toBeInTheDocument();
    expect(screen.getByText('graphQLLabel')).toBeInTheDocument();
    expect(screen.getByText('history')).toBeInTheDocument();
  });

  test('redirects to sign-in page when sign-in button is clicked and user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, signOut: mockSignOut });
    document.cookie = 'token=someToken; max-age=0';
    render(<Welcome />);
    fireEvent.click(screen.getByText('Sign In'));
    expect(mockPush).toHaveBeenCalledWith('/signIn');
    expect(toast.info).not.toHaveBeenCalled();
  });

  test('redirects to sign-up page when sign-up button is clicked and user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, signOut: mockSignOut });
    document.cookie = 'token=someToken; max-age=0';
    render(<Welcome />);
    fireEvent.click(screen.getByText('Sign Up'));
    expect(mockPush).toHaveBeenCalledWith('/signUp');
    expect(toast.info).not.toHaveBeenCalled();
  });
});
