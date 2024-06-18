import { Button } from '@/components/ui/button';

import { MdiLambda, SolarLogin3BoldDuotone } from '@/components/common/Icons';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

export function Hero() {
  const [email, setEmail] = useState<string>('');
  return (
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    console.log(email);
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
  );
}
