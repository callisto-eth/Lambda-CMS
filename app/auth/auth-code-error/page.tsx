'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CodeError() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error_code');

  return (
    <main className="flex flex-col justify-center items-center h-screen font-DM-Sans">
      <div className="relative">
        <Image src={'/Error.svg'} width={350} height={350} alt="Error" />
        <p className="absolute top-[30px] right-[20px] text-5xl text-[#212325] flex justify-center items-center  font-black">
          {errorCode ? errorCode : 500}
        </p>
      </div>
    </main>
  );
}

export default function AuthCodeError() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CodeError />
    </Suspense>
  );
}
