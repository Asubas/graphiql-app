import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageNotFound from '@/src/app/not-found';

jest.mock('next/image', () => {
  const MockImage = ({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

jest.mock('next/link', () => {
  const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('not-found Component', () => {
  it('renders the 404 error message', () => {
    render(<PageNotFound />);
    expect(screen.getByText('Error: 404 page not found')).toBeInTheDocument();
  });

  it('renders the 404 error image', () => {
    render(<PageNotFound />);
    const imageElement = screen.getByAltText('page not found');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/error.svg');
  });

  it('renders the Go Home link with correct href', () => {
    render(<PageNotFound />);
    const homeLink = screen.getByText('Go Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('a')).toHaveAttribute('href', '/');
  });

  it('renders the correct structure and classes', () => {
    render(<PageNotFound />);
    const mainElement = screen.getByRole('main');
    const h2Element = screen.getByText('Error: 404 page not found');
    const messageElement = screen.getByText(
      "Sorry, the page you're looking for cannot be accessed",
    );

    expect(mainElement).toHaveClass('notFound');
    expect(h2Element).toHaveClass('h2head');
    expect(messageElement).toHaveClass('message');
  });
});
