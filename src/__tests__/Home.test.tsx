import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '@/src/app/page';

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
  it('renders the main container with correct styles', () => {
    const { container } = render(<Home />);

    expect(container.firstChild).toHaveClass('main');
  });

  it('renders the About component', () => {
    render(<Home />);

    expect(screen.getByText('About Section')).toBeInTheDocument();
  });

  it('renders the Welcome component', () => {
    render(<Home />);

    expect(screen.getByText('Welcome Section')).toBeInTheDocument();
  });
});
