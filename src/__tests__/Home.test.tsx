import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/src/app/page';
import { useUser } from '@/src/context/UserContext';

jest.mock('../context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('../components/About/About', () => {
  const MockAbout = () => <div>About Section</div>;
  MockAbout.displayName = 'About';
  return MockAbout;
});

jest.mock('../components/Welcome/Welcome', () => {
  const MockWelcome = ({
    isLogined,
    userName,
  }: {
    isLogined: boolean;
    userName: string | null;
  }) => <div>{isLogined ? `Welcome, ${userName}` : 'Welcome Section'}</div>;
  MockWelcome.displayName = 'Welcome';
  return MockWelcome;
});

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    (useUser as jest.Mock).mockReturnValue({
      isLogined: false,
      userName: null,
      toggleLoginState: jest.fn(),
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

  it('renders the Welcome component with default state (not logged in)', () => {
    render(<Home />);
    expect(screen.getByText('Welcome Section')).toBeInTheDocument();
  });

  it('toggles login state and updates Welcome component', () => {
    const toggleLoginStateMock = jest.fn();

    (useUser as jest.Mock).mockReturnValue({
      isLogined: false,
      userName: 'Test User',
      toggleLoginState: toggleLoginStateMock,
    });

    render(<Home />);

    const toggleButton = screen.getByText('Toggle Login');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(toggleLoginStateMock).toHaveBeenCalled();
  });

  it('renders the Welcome component with stored login state', () => {
    (useUser as jest.Mock).mockReturnValue({
      isLogined: true,
      userName: 'Stored User',
      toggleLoginState: jest.fn(),
    });

    render(<Home />);

    expect(screen.getByText('Welcome, Stored User')).toBeInTheDocument();
  });
});
