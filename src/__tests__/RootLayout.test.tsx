import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToastContainer } from 'react-toastify';
import RootLayout, { metadata } from '../app/layout';

jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => <div data-testid="toast-container" />),
}));

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="child-element">Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByTestId('child-element')).toHaveTextContent('Test Child');
  });

  it('renders ToastContainer with correct props', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(ToastContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
        theme: 'colored',
      }),
      {},
    );
  });

  it('sets correct metadata', () => {
    expect(metadata).toEqual({
      title: 'REST/GraphiQL Client',
      description: 'REST/GraphiQL Client',
      icons: {
        icon: '/favicon.svg',
      },
    });
  });
});
