import Header from '@/src/components/Header/Header';
import { render, screen, fireEvent } from '@testing-library/react';

window.scrollTo = jest.fn();

describe('Header component', () => {
  it('renders the logo and heading', () => {
    render(<Header />);

    const logo = screen.getByAltText('Client logo');
    expect(logo).toBeInTheDocument();

    const heading = screen.getByText('API Client');
    expect(heading).toBeInTheDocument();
  });

  it('renders language options', () => {
    render(<Header />);

    const englishLabel = screen.getByLabelText('EN');
    const russianLabel = screen.getByLabelText('RU');
    expect(englishLabel).toBeInTheDocument();
    expect(russianLabel).toBeInTheDocument();
  });

  it('shrinks the header on scroll', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).not.toHaveClass('shrink');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(header).toHaveClass('shrink');
  });

  it('calls handleClick when header buttons are clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Header />);

    const signinButton = screen.getByTestId('signin-btn');
    fireEvent.click(signinButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    const signupButton = screen.getByTestId('signup-btn');
    fireEvent.click(signupButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    const logoutButton = screen.getByTestId('logout-btn');
    fireEvent.click(logoutButton);
    expect(consoleSpy).toHaveBeenCalledWith('header click');

    consoleSpy.mockRestore();
  });

  it('toggles the nav menu when the burger icon is clicked', () => {
    render(<Header />);

    global.innerWidth = 500;

    const burgerIcon = screen.getByTestId('burger-icon');
    const nav = screen.getByRole('navigation');

    expect(nav).not.toHaveClass('active');

    fireEvent.click(burgerIcon);
    expect(nav).toHaveClass('active');

    fireEvent.click(burgerIcon);
    expect(nav).not.toHaveClass('active');
  });

  it('closes the nav menu when clicking outside of it', () => {
    render(<Header />);

    global.innerWidth = 500;

    const burgerIcon = screen.getByTestId('burger-icon');
    const nav = screen.getByRole('navigation');

    fireEvent.click(burgerIcon);
    expect(nav).toHaveClass('active');

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);
    expect(nav).not.toHaveClass('active');
  });
});
