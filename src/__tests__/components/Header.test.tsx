import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/src/components/Header/Header';

interface MockProps {
  onClick: () => void;
  className: string;
  'data-testid'?: string;
}

jest.mock('../../components/Buttons/HeaderAuthBtn/HeaderAuthBtn', () => {
  const MockHeaderAuthBtn = ({ onClick, className, 'data-testid': testId }: MockProps) => (
    <button className={className} onClick={onClick} data-testid={testId}>
      Mock Button
    </button>
  );

  MockHeaderAuthBtn.displayName = 'HeaderAuthBtn';

  return MockHeaderAuthBtn;
});

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logo and heading', () => {
    render(<Header isLogined={false} userName={null} />);

    const logo = screen.getByAltText('Client logo');
    expect(logo).toBeInTheDocument();

    const heading = screen.getByText('API Client');
    expect(heading).toBeInTheDocument();
  });

  it('renders language options', () => {
    render(<Header isLogined={false} userName={null} />);

    const englishLabel = screen.getByLabelText('EN');
    const russianLabel = screen.getByLabelText('RU');
    expect(englishLabel).toBeInTheDocument();
    expect(russianLabel).toBeInTheDocument();
  });

  it('shrinks the header on scroll', () => {
    render(<Header isLogined={false} userName={null} />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('shrink');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(header).toHaveClass('shrink');
  });

  it('calls handleClick when signin/signup buttons are clicked when user is not logged in', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Header isLogined={false} userName={null} />);

    const signinButton = screen.getByTestId('signin-btn');
    fireEvent.click(signinButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    const signupButton = screen.getByTestId('signup-btn');
    fireEvent.click(signupButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    consoleSpy.mockRestore();
  });

  it('renders username and logout button when user is logged in', () => {
    render(<Header isLogined={true} userName="John Doe" />);

    const userNameElement = screen.getByText('John Doe');
    expect(userNameElement).toBeInTheDocument();

    const logoutButton = screen.getByTestId('logout-btn');
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls handleClick when logout button is clicked when user is logged in', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Header isLogined={true} userName="John Doe" />);

    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    consoleSpy.mockRestore();
  });

  it('toggles menu on burger icon click', () => {
    render(<Header isLogined={false} userName={null} />);

    const burgerIcon = screen.getByTestId('burger-icon');
    let overlay = screen.queryByTestId('overlay');

    expect(overlay).not.toBeInTheDocument();

    fireEvent.click(burgerIcon);
    overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    overlay = screen.queryByTestId('overlay');
    expect(overlay).not.toBeInTheDocument();
  });

  it('locks scroll when menu is open', () => {
    render(<Header isLogined={false} userName={null} />);

    const burgerIcon = screen.getByTestId('burger-icon');

    fireEvent.click(burgerIcon);
    expect(document.body).toHaveClass('bodyLock');
    expect(document.documentElement).toHaveClass('bodyLock');

    fireEvent.click(burgerIcon);
    expect(document.body).not.toHaveClass('bodyLock');
    expect(document.documentElement).not.toHaveClass('bodyLock');
  });
});
