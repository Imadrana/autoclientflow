import './globals.css';
import MainLayout from '../components/layout/MainLayout';

export const metadata = {
  title: 'AutoClientFlow CRM',
  description: 'A simple CRM for managing client relationships',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}