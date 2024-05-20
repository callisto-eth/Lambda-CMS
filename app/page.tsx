'use client';

import { MdiLambda, SolarLogin3BoldDuotone } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [userEmail, setUserEmail] = useState<string>('');

  return (
    <main className="relative">
      <div>
        <div className="md:w-[400px] md:h-[400px] z-[-1] w-[250px] h-[250px] bg-[#fb4500] left-0 absolute top-[850px] blur-[50px] md:blur-[100px]" />
      </div>
      <section
        className="grid md:grid-cols-2 md:h-screen grid-rows-2 md:grid-rows-1"
        style={{
          backgroundImage: 'url(/Grid.svg)',
          backgroundSize: 'cover',
        }}
      >
        <div className="font-DM-Sans flex flex-col justify-between p-8">
          <MdiLambda className="text-6xl text-[#FB4500]" />
          <div className="text-white space-y-6 p-3">
            <p className="md:text-[70px] text-[60px] font-semibold leading-none tracking-wide">
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
              <DialogTrigger className="border border-[#FB4500] bg-transparent rounded-3xl text-md px-16 py-3.5 text-[#FB4500] hover:bg-[#FB4500] hover:text-white transition-all duration-200">
                Build your Event
              </DialogTrigger>
              <DialogContent className="p-6 w-[350px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
                <SolarLogin3BoldDuotone className="text-6xl text-[#d83e08]" />
                <div className="leading-tight">
                  <p className="text-3xl font-semibold">Welcome to Lambda</p>
                  <p className="text-lg">Please sign up or sign in below</p>
                </div>
                <div className="space-y-1">
                  <p>Email</p>
                  <input
                    type="email"
                    className="w-full outline-none py-2 px-4 bg-transparent border border-white border-opacity-10 rounded-xl"
                    onChange={(eV: ChangeEvent<HTMLInputElement>) => {
                      setUserEmail(eV.target.value);
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  className="font-DM-Sans p-3 rounded-xl bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
                >
                  Continue with Email
                </Button>
              </DialogContent>
            </Dialog>
          </div>
          <div />
        </div>
        <div className="flex justify-center items-center relative">
          <div className="md:w-[400px] md:h-[400px] z-[-1] w-[250px] h-[250px] bg-[#fb4500] absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 blur-[50px] md:blur-[150px] rounded-full" />
          <div className="md:w-[400px] md:h-[400px] z-[-1] w-[250px] h-[250px] bg-[#fb4500] absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 blur-[50px] md:blur-[150px] rounded-full" />
          <Image
            src="/Lambda.svg"
            width={500}
            height={500}
            alt="Lambda"
            className="w-[300px] h-auto md:w-[500px]"
          />
        </div>
      </section>
      <div className="h-[300px]" />
      <section className="grid grid-cols-12 font-DM-Sans px-20 space-x-4">
        <p className="text-white text-4xl col-span-4 font-medium h-full mt-[-62px]">
          Today, Event Management
          <br />
          require trade offs between
          <br />
          cost and quality
        </p>
        <div className="col-span-2">
          <svg
            width="195"
            height="446"
            viewBox="0 0 195 446"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.00001L93.7838 1.00001C93.7838 1.00001 194.005 0.652054 194.005 113.194V446"
              stroke="black"
            />
          </svg>
        </div>
        <div className="col-span-6 mt-[-80px] flex justify-center items-center">
          <div className="w-[330px] text-xl  text-[#FB4500]">
            Nowadays, it has become difficult to host Events with cost
            efficiency without compromising its quality.
          </div>
        </div>
      </section>
      <section className="font-DM-Sans font-medium">
        <div className="py-5 ">
          <p className="text-center text-[#FB4500]">CUSTOMIZABLE EVENTS</p>
          <p className="text-[80px] leading-none text-center text-white">
            hundreds of
            <br />
            plugins to choose
            <br />
            from
          </p>
        </div>
        <div className="grid grid-cols-12 px-20">
          <p className="col-span-5 text-[#FB4500] text-xl place-content-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-col items-center col-span-2">
            <div className="border-r-[1px] border-[#FB4500] h-[200px]" />
            <div className="border-r-[1px] border-[#FB4500] h-[200px] relative">
              <div className="w-[15px] h-[15px] absolute left-[-7px] rounded-full bg-[#FB4500]" />
            </div>
          </div>
          <div className="col-span-5 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
        </div>
        <div className="justify-center items-center relative hidden md:flex">
          <div className="absolute w-[70px] h-[70px] rounded-full border border-[#FB4500] top-[50px] left-[37%] bg-[#212325]" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40%"
            viewBox="0 0 621 311"
            fill="none"
          >
            <path
              d="M310.5 0V3.5C310.5 58.7285 265.728 103.5 210.5 103.5H52.75C24.1693 103.5 1 126.669 1 155.25V155.25C1 183.831 24.1693 207 52.75 207H210.5C265.728 207 310.5 251.772 310.5 307V310.5"
              stroke="#FB4500"
              className="text-[#FB4500]"
            />
          </svg>
        </div>
      </section>
      <section className="font-DM-Sans font-medium">
        <div className="py-5 ">
          <p className="text-center text-[#FB4500]">AFFORDABLE PRICING</p>
          <p className="text-[80px] leading-none text-center text-white">
            our plans are
            <br />
            customizable as
            <br />
            well
          </p>
        </div>
        <div className="grid grid-cols-3 px-20 gap-5">
          <div className="col-span-1 w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10 h-[600px]" />
          <div className="col-span-1 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
          <div className="col-span-1 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
        </div>
      </section>
      <footer className="my-20 px-20 font-DM-Sans">
        <div className="flex justify-between items-center">
          <MdiLambda className="text-6xl text-[#FB4500]" />
          <p className="text-3xl font-medium text-white">
            Supercharge your Socials.
          </p>
        </div>
      </footer>
    </main>
  );
}
