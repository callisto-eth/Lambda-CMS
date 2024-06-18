import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { MdiLambda } from '@/components/common/Icons';
import { ThemeProvider } from '@/components/common/theme-provider';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Lambda | Supercharge your Socials',
  description: 'Supercharge your Socials',

  icons: [
    {
      url: '/Lambda.png',
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-[#212325] *:font-DM-Sans">
        <ThemeProvider
          enableSystem
          defaultTheme="dark"
          disableTransitionOnChange
          attribute="class"
        >
          <div className="fixed h-screen animateModal w-screen z-[-1] opacity-0 flex justify-center items-center flex-col"></div>
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
