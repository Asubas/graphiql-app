import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/src/components/Footer/Footer';

describe('Footer Component', () => {
  test('renders GitHub logo', () => {
    render(<Footer />);

    const githubLogo = screen.getByAltText('github logo');
    expect(githubLogo).toBeInTheDocument();
  });

  test('renders team members links', () => {
    render(<Footer />);

    const members = [
      { name: 'Asubas', link: 'https://github.com/Asubas' },
      { name: 'lipan4836', link: 'https://github.com/lipan4836' },
      { name: 'pdasya', link: 'https://github.com/pdasya' },
    ];

    members.forEach((member) => {
      const linkElement = screen.getByText(member.name);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.closest('a')).toHaveAttribute('href', member.link);
    });
  });

  test('renders year correctly', () => {
    render(<Footer />);

    const year = screen.getByText('2024');
    expect(year).toBeInTheDocument();
    expect(year).toHaveAttribute('dateTime', '2024');
  });

  test('renders RSSchool logo with link', () => {
    render(<Footer />);

    const rsLogo = screen.getByAltText('RSSchool logo');
    expect(rsLogo).toBeInTheDocument();
    expect(rsLogo.closest('a')).toHaveAttribute('href', 'https://rs.school/courses');
  });

  test('all links open in a new tab', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
    });
  });
});
