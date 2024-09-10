import React from 'react';
import { render, screen } from '@testing-library/react';
import { RequestTextField } from '@/src/components/inputs/requestFieldInput/requestTextField';

describe('RequestTextField Component', () => {
  it('renders correctly with initial props', () => {
    render(<RequestTextField response={null} />);

    const textField = screen.getByLabelText(/Response:/i);
    expect(textField).toBeInTheDocument();

    expect(textField).toHaveValue('');
  });

  it('renders correctly with valid response', () => {
    const mockResponse = { key: 'value' };
    render(<RequestTextField response={mockResponse} />);

    const textField = screen.getByLabelText(/Response:/i);
    expect(textField).toHaveValue(JSON.stringify(mockResponse, null, 2));
  });

  it('has correct styles applied', () => {
    const { container } = render(<RequestTextField response={null} />);

    const textField = container.querySelector('.MuiOutlinedInput-notchedOutline');
    expect(textField).toHaveStyle('border-color: rgba(0, 0, 0, 0.23);');
  });
});
