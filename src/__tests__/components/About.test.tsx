import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '@/src/components/About/About';
import { useTranslations } from 'next-intl';

// Mocking necessary modules
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: { [key: string]: string } = {
      'AboutPage.text': 'Welcome to the About page.',
      'AboutPage.rsLinkText': 'enroll in the frontend development course',
      'AboutPage.descriptionBeggining': 'Welcome to the home of ',
      'AboutPage.descriptionEnd':
        '! We are a team of budding developers, unafraid of challenges and always moving forward. Our application is built to assist others by enabling requests to any open APIs. Whether you are making RESTful requests or diving into GraphQL, our platform is designed to empower your projects.',
      'AboutPage.team': 'Our Team',
      'AboutPage.asubasName': 'Alex (Asubas)',
      'AboutPage.asubasRole': 'Team lead, developer',
      'AboutPage.asubasLocation': 'Russia, Yaroslavl',
      'AboutPage.lipanName': 'Anton (lipan4836)',
      'AboutPage.lipanRole': 'developer',
      'AboutPage.lipanLocation': 'Russia, Voronezh',
      'AboutPage.pdasyaName': 'Daria (pdasya)',
      'AboutPage.pdasyaRole': 'developer',
      'AboutPage.pdasyaLocation': 'Japan, Tsukuba',
      'AboutPage.throwError': 'Throw Error',
    };
    return translations[key] || key;
  },
}));

describe('About Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders About page content correctly', () => {
    render(<About />);

    expect(screen.getByText(/descriptionBegginin/i)).toBeInTheDocument();
    expect(screen.getByText('rsLinkText')).toBeInTheDocument();
    expect(screen.getByText(/descriptionEnd/i)).toBeInTheDocument();
    expect(screen.getByText('team')).toBeInTheDocument();
  });

  it('renders team member links correctly', () => {
    render(<About />);

    const teamMemberLinks = screen.getAllByTestId('team-member-link');
    expect(teamMemberLinks.length).toBe(3);

    expect(teamMemberLinks[0]).toHaveAttribute('href', 'https://github.com/Asubas');
    expect(teamMemberLinks[1]).toHaveAttribute('href', 'https://github.com/lipan4836');
    expect(teamMemberLinks[2]).toHaveAttribute('href', 'https://github.com/pdasya');
  });

  it('renders team member names and roles correctly', () => {
    render(<About />);

    expect(screen.getByText('asubasName')).toBeInTheDocument();
    expect(screen.getByText(/asubasRole/i)).toBeInTheDocument();
    expect(screen.getByText(/asubasLocation/i)).toBeInTheDocument();

    expect(screen.getByText('lipanName')).toBeInTheDocument();
    expect(screen.getByText(/lipanRole/i)).toBeInTheDocument();
    expect(screen.getByText(/lipanLocation/i)).toBeInTheDocument();

    expect(screen.getByText('pdasyaName')).toBeInTheDocument();
    expect(screen.getByText(/pdasyaRole/i)).toBeInTheDocument();
    expect(screen.getByText(/pdasyaLocation/i)).toBeInTheDocument();
  });

  it('throws an error when the "Throw Test Error" button is clicked', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<About />);

    const throwErrorButton = screen.getByText('throwError');
    expect(throwErrorButton).toBeInTheDocument();

    expect(() => {
      fireEvent.click(throwErrorButton);
    }).toThrow('Это тестовая ошибка!');

    consoleErrorSpy.mockRestore();
  });
});
