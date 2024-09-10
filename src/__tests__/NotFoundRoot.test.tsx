import { render, screen } from '@testing-library/react';
import RootLayout from '../app/[...not-found]/layout';

describe('RootLayout component', () => {
  it('should apply the correct class and id to the body element', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    const bodyElement = document.getElementById('body');
    expect(bodyElement).toHaveAttribute('id', 'body');
    expect(bodyElement).toHaveClass('className');
  });

  it('should render children correctly', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
