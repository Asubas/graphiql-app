import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.scss';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { UserProvider } from '../context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'REST/GraphiQL Client',
  description: 'REST/GraphiQL Client',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id="body">
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
