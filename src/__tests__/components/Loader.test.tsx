import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '@/src/components/Loader/Loader';
import styles from '@/src/components/Loader/Loader.module.scss';

describe('Loader Component', () => {
  test('renders Loader component correctly', () => {
    const { container } = render(<Loader />);

    const overlayElement = container.querySelector(`.${styles.overlay}`);
    expect(overlayElement).toBeInTheDocument();

    const loaderElement = container.querySelector(`.${styles.loader}`);
    expect(loaderElement).toBeInTheDocument();

    const loaderInnerElement = container.querySelector(`.${styles.loaderInner}`);
    expect(loaderInnerElement).toBeInTheDocument();
  });

  test('applies correct styles', () => {
    const { container } = render(<Loader />);

    const overlayElement = container.querySelector(`.${styles.overlay}`);
    const loaderElement = container.querySelector(`.${styles.loader}`);
    const loaderInnerElement = container.querySelector(`.${styles.loaderInner}`);

    expect(overlayElement).toHaveClass(styles.overlay);
    expect(loaderElement).toHaveClass(styles.loader);
    expect(loaderInnerElement).toHaveClass(styles.loaderInner);
  });
});
