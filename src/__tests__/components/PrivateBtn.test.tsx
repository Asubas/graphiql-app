import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrivateBtn from '@/src/components/Buttons/PrivateBtn/PrivateBtn';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('PrivateBtn Component', () => {
  it('renders the button with the correct label', () => {
    const label = 'Private Area';
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    render(<PrivateBtn label={label} className="custom-class" path="/private" />);

    const button = screen.getByRole('button', { name: label });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(label);
    expect(button).toHaveClass('custom-class');
    button.click();
    expect(mockRouter.push).toHaveBeenCalledWith('/private');
  });
});
