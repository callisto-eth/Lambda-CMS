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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-[#212325]">
        <div className="fixed h-screen animateOnEventCreation w-screen z-[-1] opacity-0 flex justify-center items-center flex-col">
          <p className="font-DM-Sans text-4xl font-medium text-white text-center">
            🎉 Your event has been successfully created!
          </p>
        </div>
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
