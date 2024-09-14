import { render, screen, fireEvent } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import '@testing-library/jest-dom';
import { BodyFieldInput } from '@/src/components/inputs/bodyFieldInput/bodyFieldInput';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      body: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('BodyFieldInput', () => {
  it('renders with the correct props', () => {
    render(
      <Wrapper>
        <BodyFieldInput label="Test Label" placeholder="Test Placeholder" />
      </Wrapper>,
    );

    const textField = screen.getByLabelText('Test Label');

    expect(textField).toBeInTheDocument();
    expect(textField).toHaveAttribute('placeholder', 'Test Placeholder');
  });

  it('calls onBlur when the input loses focus', () => {
    const handleBlur = jest.fn();

    render(
      <Wrapper>
        <BodyFieldInput label="Test Label" onBlur={handleBlur} />
      </Wrapper>,
    );

    const textField = screen.getByLabelText('Test Label');
    fireEvent.blur(textField);

    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('formats input content when formatting button is clicked', async () => {
    render(
      <Wrapper>
        <BodyFieldInput label="Test Label" prettier="body" />
      </Wrapper>,
    );

    const textField = screen.getByLabelText('Test Label');
    const formatButton = screen.getByRole('button', { name: /formatting/i });

    fireEvent.change(textField, { target: { value: '{ "foo": "bar" }' } });

    fireEvent.click(formatButton);

    await screen.findByDisplayValue('{ "foo": "bar" }');
  });

  it('handles multiline and rows attributes correctly', () => {
    render(
      <Wrapper>
        <BodyFieldInput label="Multiline Test" multilineArea={true} rows={5} />
      </Wrapper>,
    );

    const textField = screen.getByLabelText('Multiline Test') as HTMLTextAreaElement;
    expect(textField.tagName).toBe('TEXTAREA');
    expect(textField).toHaveAttribute('rows', '5');
  });
});
