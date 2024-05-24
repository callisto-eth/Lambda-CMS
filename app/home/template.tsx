'use client';

import { MdiLambda } from '@/components/Icons';
import { animatePageIn } from '@/utils/animation';
import { ReactNode, useEffect } from 'react';

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <main className="">
      <div className="fixed h-screen animateOnLogIn w-screen z-50 opacity-0 flex justify-center items-center flex-col">
        <p className="font-DM-Sans text-4xl font-medium text-white">
          Welcome, Vishal
        </p>
        <div className="w-[100px] h-[100px] rounded-full shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_5px_#fb4500,0_0_15px_#fb4500,0_0_30px_#fb4500] my-5" />
      </div>
      {children}
    </main>
  );
}
