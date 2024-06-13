import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

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
      <body className="bg-[#212325]">
        <div className="fixed h-screen animateModal w-screen z-[-1] opacity-0 flex justify-center items-center flex-col"></div>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
