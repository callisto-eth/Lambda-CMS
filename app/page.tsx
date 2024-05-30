'use client';

import AuthModal from '@/components/AuthModal';
import { MdiLambda } from '@/components/Icons';
import { createClient } from '@/utils/supabase/client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const supabaseClient = createClient();

export default function Home() {

  const [userSession, setUserSession] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    supabaseClient.auth
      .getSession()
      .then(({ data: { session } }) => setUserSession(session));
  }, []);

  
  return (
    <main className="relative">
      <div className="fixed h-screen animateOnLogIn w-screen z-[-1] opacity-0 flex justify-center items-center flex-col">
        <p className="font-DM-Sans text-4xl font-medium text-white">
          Welcome, Vishal
        </p>
        <div className="w-[100px] h-[100px] rounded-full shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_5px_#fb4500,0_0_15px_#fb4500,0_0_30px_#fb4500] my-5" />
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
            <p className="text-md">
              Supercharge your Socials with our Plugin-Driven Event Management
              Platform
            </p>
            {!userSession ? (
              <AuthModal setModalOpen={setModalOpen} modalOpen={modalOpen} />
            ) : (
              <div>
                <Link
                  href={'/@me'}
                  className="border border-[#FB4500] bg-transparent rounded-3xl text-md px-16 py-3.5 text-[#FB4500] hover:bg-[#FB4500] hover:text-white transition-all duration-200"
                >
                  Build your Event
                </Link>
              </div>
            )}
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
      <div className="hidden h-[300px] md:block" />
      <section className="grid grid-cols-12 font-DM-Sans md:px-20 px-10 space-x-0 md:space-x-4 grid-rows-2 md:grid-rows-none gap-y-4 md:gap-y-0 ">
        <div className="bg-white w-[1px] col-span-1 row-span-2 md:hidden h-[200px]" />
        <p className="text-white text-2xl md:text-4xl md:col-span-4 font-medium h-full md:mt-[-62px] grid-rows-1 col-span-11">
          Today, Event Management
          <br />
          require trade offs between
          <br />
          cost and quality
        </p>
        <div className="col-span-2 hidden md:block">
          <div className="border-solid border-white border-t-[1px] border-r-[1px] rounded-tr-[100px] h-[300px]" />
          <div className="border-r-[1px] border-[#FB4500] h-[300px] flex justify-end">
            <div className="w-[15px] h-[15px]  rounded-full mr-[-8px] bg-[#FB4500]" />
          </div>
        </div>
        <div className="md:col-span-6  col-span-11 md:mt-[-80px] md:flex justify-center items-center">
          <div className="w-[330px] md:text-xl text-lg  text-[#FB4500]">
            Nowadays, it has become difficult to host Events with cost
            efficiency without compromising its quality.
          </div>
        </div>
      </section>
      <section className="font-DM-Sans font-medium px-10">
        <div className="py-10 md:py-5 ">
          <p className="text-center text-[#FB4500] text-sm md:text-base">
            CUSTOMIZABLE EVENTS
          </p>
          <p className="md:text-[80px] text-4xl leading-none text-center text-white">
            hundreds of
            <br />
            plugins to choose
            <br />
            from
          </p>
        </div>
        <div className="grid grid-cols-12 md:px-20 grid-rows-2 md:grid-rows-none gap-y-6 md:gap-y-0">
          <div className="bg-white w-[1px] col-span-1 row-span-2 md:hidden" />
          <p className="md:col-span-5 col-span-11 text-[#FB4500] md:text-xl text-lg place-content-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex-col items-center col-span-2  relative hidden md:flex">
            <div className="border-r-[1px] border-[#FB4500] h-[200px]" />
            <div className="border-r-[1px] border-[#FB4500] h-[200px]">
              <div className="w-[15px] h-[15px] absolute left-[-7px] rounded-full bg-[#FB4500]" />
            </div>
          </div>
          <div className="md:col-span-5 col-span-11 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
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
      <section className="font-DM-Sans font-medium px-10">
        <div className="py-10 md:py-5 ">
          <p className="text-center text-[#FB4500] text-sm md:text-base">
            DISCOVER PEOPLE
          </p>
          <p className="md:text-[80px] text-4xl leading-none text-center text-white">
            connect with
            <br />
            people who are
            <br />
            nearby
          </p>
        </div>
        <div className="grid grid-cols-12 md:px-20 grid-rows-2 md:grid-rows-none gap-y-6 md:gap-y-0">
          <div className="bg-white w-[1px] col-span-1 row-span-2 md:hidden" />
          <p className="md:col-span-5 col-span-11 text-[#FB4500] md:text-xl text-lg place-content-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="flex-col items-center col-span-2  relative hidden md:flex">
            <div className="border-r-[1px] border-[#FB4500] h-[200px]" />
            <div className="border-r-[1px] border-[#FB4500] h-[200px] relative">
              <div className="w-[15px] h-[15px] absolute left-[-7px] rounded-full bg-[#FB4500]" />
            </div>
          </div>
          <div className="md:col-span-5 col-span-11 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
        </div>
      </section>
      <section className="font-DM-Sans font-medium">
        <div className="py-10 md:py-5">
          <p className="text-center text-[#FB4500] text-sm md:text-base">
            AFFORDABLE PRICING
          </p>
          <p className="md:text-[80px] text-4xl leading-none text-center text-white">
            our plans are
            <br />
            customizable as
            <br />
            well
          </p>
        </div>
        <div className="grid md:grid-cols-3 md:px-20 px-10 gap-5 grid-rows-3 md:grid-rows-none">
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
