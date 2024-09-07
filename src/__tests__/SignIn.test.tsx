import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import Loader from '@/src/components/Loader/Loader';
import SignIn from '../app/[locale]/signIn/page';
import { useAuth } from '../hooks/useAuthRedirect';

jest.mock('../hooks/useAuthRedirect');
jest.mock('../components/AuthForm/AuthForm');
jest.mock('../components/Loader/Loader');

const mockUseAuth = useAuth as jest.Mock;
const mockAuthForm = AuthForm as jest.Mock;
const mockLoader = Loader as jest.Mock;

describe('SignIn Component', () => {
  beforeEach(() => {
    mockAuthForm.mockImplementation(({ onSubmit }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit('test@example.com', 'password123');
        }}
      >
        <button type="submit">Submit</button>
      </form>
    ));
    mockLoader.mockReturnValue(<div>Loading...</div>);
  });

  it('renders the loading state when loading is true', () => {
    mockUseAuth.mockReturnValue({ loading: true, signIn: jest.fn() });

    render(<SignIn />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the AuthForm component when loading is false', () => {
    mockUseAuth.mockReturnValue({ loading: false, signIn: jest.fn() });

    render(<SignIn />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls signIn with correct email and password on form submit', async () => {
    const mockSignIn = jest.fn();
    mockUseAuth.mockReturnValue({ loading: false, signIn: mockSignIn });

    render(<SignIn />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123'));
  });
});
