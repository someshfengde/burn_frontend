import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ['latin'] });

let title = 'Burn: Fitness App';
let description = 'Burn makes it simple to calculate calories and track your workouts.';
let url = 'https://burnfrontend.vercel.app';
let ogimage = '🔥';
let sitename = 'Burn: Fitness App';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="qrgpt.io" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
