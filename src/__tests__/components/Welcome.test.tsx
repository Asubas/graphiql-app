import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Welcome from '@/src/components/Welcome/Welcome';

jest.mock('../../components/Buttons/AuthBtn/AuthBtn', () => {
  const MockAuthBtn = (props: any) => (
    <button onClick={props.onClick} className={props.className}>
      {props.label}
    </button>
  );
  MockAuthBtn.displayName = 'AuthBtn';
  return MockAuthBtn;
});

jest.mock('../../components/Buttons/PrivateBtn/PrivateBtn', () => {
  const MockPrivateBtn = (props: any) => <button className={props.className}>{props.label}</button>;
  MockPrivateBtn.displayName = 'PrivateBtn';
  return MockPrivateBtn;
});

describe('Welcome Component', () => {
  const consoleSpy = jest.spyOn(console, 'log');

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it('renders welcome message for new users', () => {
    render(<Welcome isLogined={false} userName={null} />);

    expect(screen.getByText('Welcome!!')).toBeInTheDocument();
    expect(
      screen.getByText('If you want to try playground, please sign in or sign up'),
    ).toBeInTheDocument();
  });

  it('renders Sign In and Sign Up buttons', () => {
    render(<Welcome isLogined={false} userName={null} />);

    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('renders welcome back message for returning users', () => {
    render(<Welcome isLogined={true} userName="John Doe" />);

    expect(screen.getByText('Welcome back, John Doe!')).toBeInTheDocument();
  });

  it('renders REST, GraphQL, and History buttons', () => {
    render(<Welcome isLogined={true} userName="John Doe" />);

    expect(screen.getByRole('button', { name: /REST Client/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /GraphQL Client/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /History/i })).toBeInTheDocument();
  });

  it('handles Sign In button click', () => {
    render(<Welcome isLogined={false} userName={null} />);

    const signInButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(signInButton);
    expect(consoleSpy).toHaveBeenCalledWith('btn click');
  });

  it('handles Sign Up button click', () => {
    render(<Welcome isLogined={false} userName={null} />);

    const signUpButton = screen.getByRole('button', { name: /Sign Up/i });
    fireEvent.click(signUpButton);
    expect(consoleSpy).toHaveBeenCalledWith('btn click');
  });
});
