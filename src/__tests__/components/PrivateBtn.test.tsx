import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateBtn from '@/src/components/Buttons/PrivateBtn/PrivateBtn';

describe('PrivateBtn Component', () => {
  it('renders the button with the correct label', () => {
    const label = 'Private Area';
    render(<PrivateBtn label={label} className="custom-class" />);

    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('custom-class');
  });
});
