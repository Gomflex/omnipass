import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import Chatbot from '@/components/Chatbot';
import { ThemeProvider } from '@/components/ThemeProvider';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'OMNI Pass - Universal Points Platform for Tourists',
  description: 'Earn and spend OMNI Points at duty-free shops, partner stores, transportation, and cultural events in South Korea',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} ${roboto.className} pb-16`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <div className="max-w-md mx-auto relative min-h-screen bg-white dark:bg-gray-950">
            <Navbar />
            {children}
            <Footer />
            <Chatbot />
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
