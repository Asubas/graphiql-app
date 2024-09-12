import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Welcome Component', () => {
  const mockPush = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    jest.clearAllMocks();
  });

  test('renders sign-in and sign-up buttons when user is not logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: null, signOut: mockSignOut });

    render(<Welcome />);

    expect(screen.getByText('Welcome!!')).toBeInTheDocument();
    expect(
      screen.getByText('If you want to try playground, please sign in or sign up'),
    ).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders private buttons when user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({ user: { name: 'John Doe' }, signOut: mockSignOut });
    document.cookie = 'token=someToken';
    render(<Welcome />);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
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
