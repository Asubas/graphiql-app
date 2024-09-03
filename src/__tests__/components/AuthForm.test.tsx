import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = useRouter as jest.Mock;

describe('AuthForm Component', () => {
  beforeEach(() => {
    mockRouter.mockReturnValue({ push: jest.fn() });
  });

  const mockOnSubmit = jest.fn();

  it('toggles password visibility correctly', () => {
    render(<AuthForm title="Sign Up" onSubmit={mockOnSubmit} />);

    const passwordField = screen.getByLabelText(/Password/i, {
      selector: 'input[name="password"]',
    });
    const toggleButton = screen.getAllByLabelText('toggle password visibility')[0];

    expect(passwordField).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);

    expect(passwordField).toHaveAttribute('type', 'text');
  });

  it('navigates to Sign Up page on link click when on Sign In form', () => {
    render(<AuthForm title="Sign In" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText("Don't have an account? Sign Up"));

    expect(mockRouter().push).toHaveBeenCalledWith('/signUp');
  });

  it('navigates to Sign In page on link click when on Sign Up form', () => {
    render(<AuthForm title="Sign Up" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('Already have an account? Sign In'));

    expect(mockRouter().push).toHaveBeenCalledWith('/signIn');
  });
});
