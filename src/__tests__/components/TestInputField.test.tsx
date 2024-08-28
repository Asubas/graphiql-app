import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextInputField from '../../components/TextInputField/TextInputField';
import { UseFormRegisterReturn } from 'react-hook-form';
import '@testing-library/jest-dom';
import { Visibility } from '@mui/icons-material';

describe('TextInputField', () => {
  const mockRegister = {
    name: 'password',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  } as unknown as UseFormRegisterReturn;

  test('renders TextInputField with label and error', () => {
    render(
      <TextInputField
        label="Password"
        type="password"
        error="Password is required"
        startIcon={<Visibility />}
        register={mockRegister}
      />,
    );

    const inputElement = screen.getByLabelText(/password/i);
    expect(inputElement).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('toggles password visibility when icon is clicked', () => {
    const handleToggleVisibility = jest.fn();

    render(
      <TextInputField
        label="Password"
        type="password"
        error={null}
        startIcon={<Visibility />}
        showPasswordToggle
        onTogglePasswordVisibility={handleToggleVisibility}
        register={mockRegister}
      />,
    );

    const toggleButton = screen.getByLabelText('toggle password visibility');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(handleToggleVisibility).toHaveBeenCalled();
  });

  test('displays visibility off icon when password is hidden', () => {
    render(
      <TextInputField
        label="Password"
        type="password"
        error={null}
        startIcon={<Visibility />}
        showPasswordToggle
        onTogglePasswordVisibility={() => {}}
        register={mockRegister}
      />,
    );

    const icons = screen.getAllByTestId('VisibilityOffIcon');
    expect(icons.length).toBeGreaterThan(0);
  });

  test('displays visibility icon when password is visible', () => {
    render(
      <TextInputField
        label="Password"
        type="text"
        error={null}
        startIcon={<Visibility />}
        showPasswordToggle
        onTogglePasswordVisibility={() => {}}
        register={mockRegister}
      />,
    );

    const icons = screen.getAllByTestId('VisibilityIcon');
    expect(icons.length).toBeGreaterThan(0);
  });

  test('renders TextInputField without error', () => {
    render(
      <TextInputField
        label="Email"
        type="email"
        error={null}
        startIcon={<Visibility />}
        register={mockRegister}
      />,
    );

    const inputElement = screen.getByLabelText(/email/i);
    expect(inputElement).toBeInTheDocument();
    expect(screen.queryByText('Password is required')).not.toBeInTheDocument();
  });
});
