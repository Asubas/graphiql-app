import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import RestContent from '../app/[locale]/rest/RestContent';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn(() => (key: string) => key),
}));

jest.mock('../utils/urlUtils', () => ({
  encodeUrl: jest.fn(() => '/fake-url'),
}));

jest.mock('../utils/saveGetHistory', () => ({
  saveGetHistory: jest.fn(),
}));

describe('RestContent Component', () => {
  const mockedRouter = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);
    jest.clearAllMocks();
  });

  test('renders with default values', () => {
    render(<RestContent />);

    const endpointInput = screen.getByRole('textbox', { name: /endPointURL/i });
    expect(endpointInput).toHaveValue('https://api.restful-api.dev/objects');

    const methodSelectBox = screen.getByRole('combobox');
    expect(methodSelectBox).toHaveTextContent('GET');

    expect(screen.getByText(/sendRequestButton/i)).toBeInTheDocument();
    expect(screen.getByText(/resetFormButton/i)).toBeInTheDocument();
  });

  test('allows adding and removing headers', () => {
    render(<RestContent />);

    fireEvent.click(screen.getByText(/addHeaderButton/i));

    const headerKeyInput = screen.getAllByRole('textbox')[1];
    const headerValueInput = screen.getAllByRole('textbox')[2];

    fireEvent.change(headerKeyInput, { target: { value: 'Authorization' } });
    fireEvent.change(headerValueInput, { target: { value: 'Bearer token' } });

    expect(headerKeyInput).toHaveValue('Authorization');
    expect(headerValueInput).toHaveValue('Bearer token');

    const deleteButtons = screen.getAllByRole('button', { name: /delete header/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByDisplayValue('Authorization')).not.toBeInTheDocument();
  });

  test('switches input modes between JSON and text', () => {
    render(<RestContent />);

    const jsonRadio = screen.getByLabelText('JSON');
    const textRadio = screen.getByLabelText(/textLabel/i);

    expect(jsonRadio).toBeChecked();
    fireEvent.click(textRadio);
    expect(textRadio).toBeChecked();
  });

  test('submitting requests and displaying responses', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        statusText: 'OK',
        json: () => Promise.resolve({ message: 'Success' }),
      }),
    ) as jest.Mock;

    render(<RestContent />);
    fireEvent.submit(screen.getByText(/sendRequestButton/i));

    await waitFor(() => {
      const statusElement = screen.getByText(/statusText/i);
      expect(statusElement).toHaveTextContent('200 - OK');
      const messageElement = screen.getByText(/"message": "Success"/i);
      expect(messageElement).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://api.restful-api.dev/objects'),
      expect.objectContaining({
        method: 'GET',
      }),
    );
  });

  test('resets the form', () => {
    render(<RestContent />);

    const resetButton = screen.getByText(/resetFormButton/i);
    fireEvent.click(resetButton);

    const endpointInput = screen.getByRole('textbox', { name: /endPointURL/i });
    expect(endpointInput).toHaveValue('https://api.restful-api.dev/objects');

    const methodSelectBox = screen.getByRole('combobox');
    expect(methodSelectBox).toHaveTextContent('GET');
  });
});
