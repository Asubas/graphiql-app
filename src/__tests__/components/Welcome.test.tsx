import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@/src/components/Welcome/Welcome';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import { toast } from 'react-toastify';

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

  it('renders private buttons when user is logged in', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({ user: { displayName: 'John Doe' } });

    render(<Welcome />);

    expect(screen.getByText('restLabel')).toBeInTheDocument();
    expect(screen.getByText('graphQLLabel')).toBeInTheDocument();
    expect(screen.getByText('history')).toBeInTheDocument();
  });

  it('navigates to sign-in page when Sign In button is clicked (user not logged in)', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({ user: null });

    render(<Welcome />);

    const signInButton = screen.getByText('signInLabel');
    fireEvent.click(signInButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/en/signIn');
  });

  it('navigates to sign-up page when Sign Up button is clicked (user not logged in)', () => {
    const mockUseAuth = useAuth as jest.Mock;
    mockUseAuth.mockReturnValue({ user: null });

    render(<Welcome />);

    const signUpButton = screen.getByText('signUpLabel');
    fireEvent.click(signUpButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/en/signUp');
  });
});
