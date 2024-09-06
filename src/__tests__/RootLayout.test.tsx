import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';
import '@testing-library/jest-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { ToastContainer } from 'react-toastify';
import { ReactNode, AwaitedReactNode, JSX } from 'react';

jest.mock('../components/Header/Header', () => jest.fn(() => <header data-testid="header" />));
jest.mock('../components/Footer/Footer', () => jest.fn(() => <footer data-testid="footer" />));

describe('RootLayout', () => {
  const renderWithRootLayout = (
    children:
      | string
      | number
      | bigint
      | boolean
      | Iterable<ReactNode>
      | Promise<AwaitedReactNode>
      | JSX.Element
      | null
      | undefined,
  ) =>
    render(<RootLayout>{children}</RootLayout>, {
      container: document.body,
    });

  it('renders Header component', () => {
    renderWithRootLayout(<div>Test</div>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders children', () => {
    renderWithRootLayout(<div data-testid="children">Test Children</div>);
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    renderWithRootLayout(<div>Test</div>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
