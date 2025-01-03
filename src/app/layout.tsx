import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import ScrollToTop from '@/components/layout/scroll-to-top';
import '@rainbow-me/rainbowkit/styles.css';
import { WalletProvider } from '@/contexts/providers/WalletProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blockchain Learning Platform',
  description: 'Learn blockchain development step by step',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <Toaster />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ScrollToTop />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
