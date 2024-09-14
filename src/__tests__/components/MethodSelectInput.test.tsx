import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import { MethodSelectInput } from '@/src/components/inputs/methodSelectInput/MethodSelectInput';
import '@testing-library/jest-dom';

const Wrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      method: 'GET',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('MethodSelectInput', () => {
  it('renders with the correct initial value', () => {
    const WrapperWithForm: React.FC = () => {
      const { control } = useForm({
        defaultValues: { method: 'GET' },
      });

      return (
        <Wrapper>
          <MethodSelectInput label="Method" name="method" control={control} onBlur={jest.fn()} />
        </Wrapper>
      );
    };

    render(<WrapperWithForm />);

    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveTextContent('GET');
  });

  it('allows changing the method', () => {
    const WrapperWithForm: React.FC = () => {
      const { control } = useForm({
        defaultValues: { method: 'GET' },
      });

      return (
        <Wrapper>
          <MethodSelectInput label="Method" name="method" control={control} onBlur={jest.fn()} />
        </Wrapper>
      );
    };

    render(<WrapperWithForm />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);

    const optionElement = screen.getByRole('option', { name: /post/i });
    fireEvent.click(optionElement);

    expect(selectElement).toHaveTextContent('POST');
  });

  it('calls onBlur when the input loses focus', () => {
    const handleBlur = jest.fn();

    const WrapperWithForm: React.FC = () => {
      const { control } = useForm({
        defaultValues: { method: 'GET' },
      });

      return (
        <Wrapper>
          <MethodSelectInput label="Method" name="method" control={control} onBlur={handleBlur} />
        </Wrapper>
      );
    };

    render(<WrapperWithForm />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.mouseDown(selectElement);

    const optionElement = screen.getByRole('option', { name: /post/i });
    fireEvent.click(optionElement);

    fireEvent.blur(selectElement);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
