'use client';

import Image from 'next/image';
import Link from 'next/link';

let errorObject = {
  message: 'Something went wrong!',
  digest: '404',
};

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  errorObject.digest = error.message.split(' ')[0];
  errorObject.message = error.message.split(' ')[1];

  return (
    <html>
      <body className="bg-[#212325] *:font-DM-Sans">
        <main className="flex flex-col justify-center items-center h-screen">
          <div className="relative">
            <Image src={'/Error.svg'} width={350} height={350} alt="Error" />
            <p className="absolute top-[30px] right-[20px] text-5xl text-[#212325] flex justify-center items-center  font-black">
              {errorObject.digest}
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
