import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserProvider, useUser } from '@/src/context/UserContext';

const TestComponent = () => {
  const { isLogined, userName, toggleLoginState } = useUser();

  return (
    <div>
      <span data-testid="login-state">{isLogined ? 'Logged In' : 'Logged Out'}</span>
      <span data-testid="user-name">{userName || 'No User'}</span>
      <button data-testid="toggle-button" onClick={toggleLoginState}>
        Toggle Login
      </button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides default values', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    expect(screen.getByTestId('login-state')).toHaveTextContent('Logged Out');
    expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
  });

  it('toggles login state and updates values correctly', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    const toggleButton = screen.getByTestId('toggle-button');

    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('login-state')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');

    act(() => {
      toggleButton.click();
    });

    expect(screen.getByTestId('login-state')).toHaveTextContent('Logged Out');
    expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
  });

  it('retrieves stored login state from localStorage', () => {
    localStorage.setItem('isLogined', 'true');
    localStorage.setItem('userName', 'Stored User');

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>,
    );

    expect(screen.getByTestId('login-state')).toHaveTextContent('Logged In');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Stored User');
  });

  it('throws error when useUser is used outside UserProvider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const ErrorComponent = () => {
      useUser();
      return null;
    };

    expect(() => render(<ErrorComponent />)).toThrow('useUser must be used within a UserProvider');

    console.error = originalError;
  });
});
