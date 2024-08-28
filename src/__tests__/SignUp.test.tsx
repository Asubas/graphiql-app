import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAuth } from '@/src/hooks/useAuthRedirect';
import AuthForm from '@/src/components/AuthForm/AuthForm';
import Loader from '@/src/components/Loader/Loader';
import SignUp from '../app/signUp/page';

jest.mock('../hooks/useAuthRedirect');
jest.mock('../components/AuthForm/AuthForm');
jest.mock('../components/Loader/Loader');

const mockUseAuth = useAuth as jest.Mock;
const mockAuthForm = AuthForm as jest.Mock;
const mockLoader = Loader as jest.Mock;

describe('SignUp Component', () => {
  beforeEach(() => {
    mockAuthForm.mockImplementation(({ onSubmit }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit('test@example.com', 'password123', 'testuser');
        }}
      >
        <button type="submit">Submit</button>
      </form>
    ));
    mockLoader.mockReturnValue(<div>Loading...</div>);
  });

  it('renders the loading state when loading is true', () => {
    mockUseAuth.mockReturnValue({ loading: true, signUp: jest.fn() });

    render(<SignUp />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders the AuthForm component when loading is false', () => {
    mockUseAuth.mockReturnValue({ loading: false, signUp: jest.fn() });

    render(<SignUp />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('calls signUp with correct email, password, and username on form submit', async () => {
    const mockSignUp = jest.fn();
    mockUseAuth.mockReturnValue({ loading: false, signUp: mockSignUp });

    render(<SignUp />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() =>
      expect(mockSignUp).toHaveBeenCalledWith('test@example.com', 'password123', 'testuser'),
    );
  });
});
