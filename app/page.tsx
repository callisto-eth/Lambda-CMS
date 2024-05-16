'use client';

import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="md:h-screen bg-[#212325] grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 overflow-hidden gap-y-16 pb-20 md:pb-0">
      <div className="col-span-1 font-DM-Sans my-6 flex flex-col justify-between space-y-6 md:space-y-0">
        <Image
          src="/Logo.svg"
          width={70}
          height={50}
          alt="Logo"
          className="mx-6"
        />
        <div className="text-white space-y-6 px-10">
          <p className="md:text-[70px] text-[60px] font-semibold leading-none">
            Build the Perfect
            <br />
            event for your
            <br />
            audience.
          </p>
          <p className="text-lg">
            Supercharge your Socials with our Plugin-Driven Event Management
            Platform
          </p>
          <Dialog>
            <DialogTrigger className="border border-[#FB4500] bg-transparent rounded-3xl text-md px-10 py-3.5 text-[#FB4500] hover:bg-[#FB4500] hover:text-white transition-all duration-200">
              Build your Event
            </DialogTrigger>
            <DialogContent>Hello</DialogContent>
          </Dialog>
        </div>
        <div />
      </div>
      <div className="relative col-span-1">
        <Image
          src="/Lambda.svg"
          width={500}
          height={500}
          className="z-40 absolute top-[25%] md:top-1/2 left-1/2 -translate-x-1/2 md:-translate-y-1/2 w-[300px] h-auto md:w-[500px] md:h-auto"
          objectFit="cover"
          alt="Lambda"
        />
        <Image
          src="/Grid.svg"
          layout="fill"
          objectFit="cover"
          className="z-10"
          alt="Grid"
        />
        <div className="md:w-[500px] md:h-[400px] w-[200px] h-[200px] bg-[#fb4500] absolute right-20 md:right-0 blur-[50px] md:blur-[100px] md:top-[20px] top-[70px]" />
        <div className="md:w-[400px] md:h-[400px] w-[200px] h-[200px] bg-[#fb4500] absolute left-[50%] -translate-x-1/2 md:top-[200px] top-[130px] blur-[50px] md:blur-[100px]" />
      </div>
    </main>
  );
}
