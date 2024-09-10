import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import { useRouter } from 'next/navigation';
import { getLocale } from '@/src/utils/cookies';
import { useSignInValidationSchema, useSignUpValidationSchema } from '@/src/utils/validation';
import { useTranslations } from 'next-intl';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../../utils/cookies', () => ({
  getLocale: jest.fn(),
}));

jest.mock('../../utils/validation', () => ({
  useSignInValidationSchema: jest.fn(),
  useSignUpValidationSchema: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

describe('AuthForm Component', () => {
  const mockPush = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (getLocale as jest.Mock).mockReturnValue('en');
    mockPush.mockClear();
    mockOnSubmit.mockClear();
  });

  it('renders the sign-in form with all fields', () => {
    render(<AuthForm title="signInTitle" onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i, { selector: 'input' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument();
  });

  it('renders the sign-up form with all fields', () => {
    render(<AuthForm title="signUpTitle" onSubmit={mockOnSubmit} />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'submit' })).toBeInTheDocument();
  });

  it('navigates to the correct page when link is clicked in sign-in form', () => {
    render(<AuthForm title="signInTitle" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('isSignInText'));

    expect(mockPush).toHaveBeenCalledWith('/en/signUp');
  });

  it('navigates to the correct page when link is clicked in sign-up form', () => {
    render(<AuthForm title="signUpTitle" onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('isNotSignInText'));

    expect(mockPush).toHaveBeenCalledWith('/en/signIn');
  });
});
