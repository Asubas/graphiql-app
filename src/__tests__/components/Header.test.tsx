import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/src/components/Header/Header';
import { useUser } from '@/src/context/UserContext';

jest.mock('../../context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and heading', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: false, userName: '' });
    render(<Header />);

    expect(screen.getByAltText('Client logo')).toBeInTheDocument();
    expect(screen.getByText('API Client')).toBeInTheDocument();
  });

  test('toggles menu on burger icon click', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: false, userName: '' });
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    const overlay = screen.queryByTestId('overlay');

    expect(burgerIcon).toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.getByTestId('overlay')).toBeInTheDocument();

    fireEvent.click(burgerIcon);
    expect(screen.queryByTestId('overlay')).not.toBeInTheDocument();
  });

  test('closes menu when overlay is clicked', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: false, userName: '' });
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    fireEvent.click(burgerIcon);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();

    fireEvent.click(overlay);
    expect(overlay).not.toBeInTheDocument();
  });

  test('renders sign-in and sign-up buttons when user is not logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: false, userName: '' });
    render(<Header />);

    expect(screen.getByTestId('signin-btn')).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('logout-btn')).not.toBeInTheDocument();
  });

  test('renders logout button and user name when user is logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: true, userName: 'John Doe' });
    render(<Header />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('signin-btn')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-btn')).not.toBeInTheDocument();
  });

  test('renders private buttons in the menu when user is logged in', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: true, userName: 'John Doe' });
    render(<Header />);

    const burgerIcon = screen.getByTestId('burger-icon');
    fireEvent.click(burgerIcon);

    expect(screen.getByText('REST Client')).toBeInTheDocument();
    expect(screen.getByText('GraphQL Client')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
  });

  test('adds shrink class on scroll', () => {
    (useUser as jest.Mock).mockReturnValue({ isLogined: false, userName: '' });
    render(<Header />);

    const headerElement = screen.getByRole('banner');

    expect(headerElement).not.toHaveClass('shrink');

    fireEvent.scroll(window, { target: { scrollY: 100 } });

    expect(headerElement).toHaveClass('shrink');
  });
});
