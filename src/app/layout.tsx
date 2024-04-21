import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import '../styles/globals.css';

import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
import { Nav } from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Learning App (NURE)',
  description: 'Developer by Mykytenko Valdyslav',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <div className="container flex">
          <Nav />
          <main className="grow">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
