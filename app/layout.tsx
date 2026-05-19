import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Stay & Apartment',
  description: 'A luxury boutique hotel experience offering 10 premium rooms and apartments for international guests.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
