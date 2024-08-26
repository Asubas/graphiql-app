import Header from '@/src/components/Header/Header';
import { render, screen, fireEvent } from '@testing-library/react';

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
});
