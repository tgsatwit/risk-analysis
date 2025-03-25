import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SetupProvider } from '@/lib/setup-context';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CPS 230 Risk Assessment Copilot Setup',
  description: 'Setup wizard for deploying a CPS 230 Risk Assessment Copilot for Australian superannuation companies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SetupProvider>
          {children}
          <Toaster />
        </SetupProvider>
      </body>
    </html>
  );
}
