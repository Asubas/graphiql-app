import { Inter } from 'next/font/google';
import '../../styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '404 Error',
  description: '404 Error Page Not Found',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} id="body">
        {children}
      </body>
    </html>
  );
}
