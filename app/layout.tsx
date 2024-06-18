import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import { MdiLambda } from '@/components/common/Icons';
import { ThemeProvider } from '@/components/common/theme-provider';

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
          <footer className="md:my-20 md:px-20 px-10 my-10 font-DM-Sans">
            <div className="flex justify-between items-center ">
              <MdiLambda className="md:text-6xl text-4xl text-[#FB4500] " />
              <p className="md:text-3xl text-xl font-medium text-white">
                Supercharge your Socials.
              </p>
            </div>
          </footer>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
