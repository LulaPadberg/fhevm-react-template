import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Universal FHEVM SDK - Next.js Showcase',
  description: 'Framework-agnostic FHEVM SDK demonstration with Next.js',
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
