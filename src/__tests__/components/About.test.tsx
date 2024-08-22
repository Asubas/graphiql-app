import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '@/src/components/About/About';

describe('About Component', () => {
  test('renders the main description', () => {
    render(<About />);

    expect(screen.getByText(/Welcome to the home/i)).toBeInTheDocument();
  });

  test('renders team members with their details and images', () => {
    render(<About />);

    const members = [
      {
        name: 'Alex (Asubas)',
        details: 'Team lead, developer Russia, Yaroslavl',
        altText: 'Photo of developer Anton',
      },
      {
        name: 'Anton (lipan4836)',
        details: 'developer Russia, Voronezh',
        altText: 'Photo of developer Anton',
      },
      {
        name: 'Daria (pdasya)',
        details: 'developer Japan, Tsukuba',
        altText: 'Photo of developer Anton',
      },
    ];

    members.forEach((member) => {
      expect(screen.getByRole('heading', { name: member.name })).toBeInTheDocument();
      expect(screen.getAllByAltText(member.altText)).toHaveLength(3);
    });
  });

  test('each team member has a link to their GitHub profile', () => {
    render(<About />);

    const members = [
      { name: 'Alex (Asubas)', link: 'https://github.com/Asubas' },
      { name: 'Anton (lipan4836)', link: 'https://github.com/lipan4836' },
      { name: 'Daria (pdasya)', link: 'https://github.com/pdasya' },
    ];

    const linkElements = screen.getAllByRole('link');
    members.forEach((member, index) => {
      const linkElement = linkElements[index];
      expect(linkElement).toHaveAttribute('href', member.link);
      expect(linkElement).toHaveAttribute('target', '_blank');
    });
  });
});
