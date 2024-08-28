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

  //   it('renders Sign In form correctly', () => {
  //     render(<AuthForm title="Sign In" onSubmit={mockOnSubmit} />);

  //     expect(screen.getByText('Sign In')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Email')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Password')).toBeInTheDocument();
  //     expect(screen.queryByLabelText('Username')).not.toBeInTheDocument();
  //   });

  //   it('renders Sign Up form correctly', () => {
  //     render(<AuthForm title="Sign Up" onSubmit={mockOnSubmit} />);

  //     expect(screen.getByText('Sign Up')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Username')).toBeInTheDocument();
  //     expect(screen.getByLabelText('First name')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Email')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Password')).toBeInTheDocument();
  //     expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  //   });

  //   it('submits the form correctly on Sign In', async () => {
  //     render(<AuthForm title="Sign In" onSubmit={mockOnSubmit} />);

  //     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  //     fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' }), {
  //       target: { value: 'password123' },
  //     });

  //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  //     await waitFor(() =>
  //       expect(mockOnSubmit).toHaveBeenCalledWith('test@example.com', 'password123'),
  //     );
  //   });
  //   it('submits the form correctly on Sign Up', async () => {
  //     render(<AuthForm title="Sign Up" onSubmit={mockOnSubmit} />);

  //     fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
  //     fireEvent.change(screen.getByLabelText(/First name/i), { target: { value: 'Test' } });
  //     fireEvent.change(screen.getByLabelText(/Last name/i), { target: { value: 'User' } });
  //     fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
  //     fireEvent.change(screen.getByLabelText(/Password/i, { selector: 'input[name="password"]' }), {
  //       target: { value: 'password123' },
  //     });

  //     fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
  //       target: { value: 'password123' },
  //     });

  //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  //     await waitFor(() =>
  //       expect(mockOnSubmit).toHaveBeenCalledWith(
  //         'test@example.com',
  //         'password123',
  //         'testuser'
  //       ),
  //     );
  //   });

  //   it('handles validation errors correctly on Sign Up', async () => {
  //     render(<AuthForm title="Sign Up" onSubmit={mockOnSubmit} />);

  //     fireEvent.change(screen.getByRole('textbox', { name: /email/i }), { target: { value: 'invalid-email' } });
  //     fireEvent.change(screen.getByRole('textbox', { name: /password/i }));
  //     fireEvent.change(screen.getByLabelText(/Confirm Password/i), { target: { value: 'different' } });

  //     fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

  //     await waitFor(() => {
  //       expect(screen.getByText('Invalid email address')).toBeInTheDocument();
  //       expect(screen.getByText('Password is too short')).toBeInTheDocument();
  //       expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  //     });

  //     expect(mockOnSubmit).not.toHaveBeenCalled();
  //   });

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
