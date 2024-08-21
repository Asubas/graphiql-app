import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home page', () => {
  it('renders the Vercel logo', () => {
    render(<Home />);
    const vercelLogos = screen.getAllByAltText('Vercel Logo');
    expect(vercelLogos).toHaveLength(1);
  });

  it('renders the Next.js logo', () => {
    render(<Home />);
    const nextLogos = screen.getAllByAltText('Next.js Logo');
    expect(nextLogos).toHaveLength(1);
  });

  it('renders the description text', () => {
    render(<Home />);
    const descriptionTexts = screen.getAllByText(/Get started by editing/i);
    expect(descriptionTexts).toHaveLength(1);
  });

  it('renders the Docs, Learn, and Deploy links', () => {
    render(<Home />);
    const docsLinks = screen.getAllByText(/Docs/i);
    const learnLinks = screen.getAllByText(/Learn/i);
    const deployLinks = screen.getAllByText(/Deploy/i);
    expect(docsLinks).toHaveLength(1);
    expect(learnLinks).toHaveLength(2);
    expect(deployLinks).toHaveLength(2);
  });
});
