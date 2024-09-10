import React, { useEffect } from 'react';
import { render, act, screen } from '@testing-library/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '@/src/hooks/useAuthRedirect';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('react-toastify');
jest.mock('../../utils/auth', () => ({
  auth: {
    currentUser: null,
  },
}));

const TestComponent = ({ action }: { action: (hook: ReturnType<typeof useAuth>) => void }) => {
  const hook = useAuth();

  useEffect(() => {
    action(hook);
  }, [action, hook]);

  return <div>{hook.loading ? 'Loading...' : 'Not Loading'}</div>;
};

describe('useAuth hook', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('should initialize in loading state', () => {
    (onAuthStateChanged as jest.Mock).mockImplementation(() => {
      return jest.fn();
    });

    render(<TestComponent action={() => {}} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should handle user state change', async () => {
    const mockUser: Partial<User> = {
      getIdTokenResult: jest.fn().mockResolvedValue({ expirationTime: '3600' }),
    };

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    await act(async () => {
      render(<TestComponent action={() => {}} />);
    });

    // expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('should handle token expiration', async () => {
    jest.useFakeTimers();

    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const mockUser: Partial<User> = {
      getIdTokenResult: jest.fn().mockResolvedValue({ expirationTime: '3600' }),
    };

    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    await act(async () => {
      render(<TestComponent action={() => {}} />);
    });

    expect(setTimeoutSpy).toHaveBeenCalled();

    jest.runAllTimers();

    expect(toast.info).toHaveBeenCalledWith(
      'Your session has expired. You will be redirected to the main page.',
    );
    expect(mockRouterPush).toHaveBeenCalledWith('/');

    setTimeoutSpy.mockRestore();
  });
});
