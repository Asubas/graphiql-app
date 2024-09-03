import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/src/app/page';
import { useAuth } from '../hooks/useAuthRedirect';

jest.mock('../hooks/useAuthRedirect', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../components/About/About', () => {
  const MockAbout = () => <div>About Section</div>;
  MockAbout.displayName = 'About';
  return MockAbout;
});

jest.mock('../components/Welcome/Welcome', () => {
  const MockWelcome = () => <div>Welcome Section</div>;
  MockWelcome.displayName = 'Welcome';
  return MockWelcome;
});

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      signOut: jest.fn(),
    });
  });

  it('renders the main container with correct styles', () => {
    render(<Home />);
    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('main');
  });

  it('renders the About component', () => {
    render(<Home />);
    expect(screen.getByText('About Section')).toBeInTheDocument();
  });

  it('renders the Welcome component when user is not logged in', () => {
    render(<Home />);
    expect(screen.getByText('Welcome Section')).toBeInTheDocument();
  });

  it('renders welcome message with user name when user is logged in', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { displayName: 'Test User' },
      signOut: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText('Welcome back, Test User!')).toBeInTheDocument();
    expect(screen.getByText('Welcome Section')).toBeInTheDocument();
  });

  it('renders welcome message with default user name when displayName is not available', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {},
      signOut: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText('Welcome back, User!')).toBeInTheDocument();
    expect(screen.getByText('Welcome Section')).toBeInTheDocument();
  });
});
