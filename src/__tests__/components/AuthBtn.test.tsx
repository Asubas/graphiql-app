import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthBtn from '@/src/components/Buttons/AuthBtn/AuthBtn';

describe('AuthBtn Component', () => {
  it('renders the button with the correct label', () => {
    const label = 'Sign In';
    render(<AuthBtn label={label} className="custom-class" onClick={() => {}} />);

    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-class');
  });

  it('handles button click', () => {
    const handleClick = jest.fn();
    const label = 'Sign In';
    render(<AuthBtn label={label} className="custom-class" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: label });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
