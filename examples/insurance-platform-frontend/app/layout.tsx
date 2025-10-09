import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Private Insurance Platform - Universal FHEVM SDK',
  description: 'Secure vehicle insurance with Fully Homomorphic Encryption using Universal FHEVM SDK',
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
