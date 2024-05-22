'use client';

import { Hero } from '@/components/Hero';
import { MdiLambda } from '@/components/Icons';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import gsap from 'gsap';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
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
            className="w-full "
            viewBox="0 0 195 446"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 1.00001L93.7838 1.00001C93.7838 1.00001 194.005 0.652054 194.005 113.194V446"
              stroke="white"
            />
          </svg>
        </div>
        <div className="col-span-6  mt-[-80px] flex justify-center items-center">
          <div className="w-[330px] text-xl  text-[#FB4500]">
            Nowadays, it has become difficult to host Events with cost
            efficiency without compromising its quality.
          </div>
        </div>
      </section>
      <section className="font-DM-Sans font-medium relative">
        <div className="py-5 justify-center">
          <p className="text-center text-[#FB4500]">CUSTOMIZABLE EVENTS</p>
          <p className="text-[80px] leading-none text-center text-white">
            hundreds of
            <br />
            plugins to choose
            <br />
            from
          </p>
        </div>
        <div className="grid grid-cols-12 px-20 ">
          <p className="col-span-5  text-[#FB4500] text-xl place-content-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <div className="col-span-2 place-self-center ml-[1px]">
            <svg
              width="1.8"
              height="350"
              viewBox="0 0 1.8 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.962067 932.513C0.962067 932.513 0.961914 1044.85 0.961914 932.514V0.000976562"
                stroke="white"
                strokeWidth={2}
              />
            </svg>
          </div>
          <div className="col-span-5 col-start-9 h-full w-full bg-white rounded-[60px] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white border-opacity-10" />
        </div>
        <div className="flex justify-center">
          <svg
            className="row_squiggle"
            xmlns="http://www.w3.org/2000/svg"
            width="50%"
            viewBox="0 0 621 311"
            fill="none"
          >
            <path
              d="M310.5 0V3.5C310.5 58.7285 265.728 103.5 210.5 103.5H52.75C24.1693 103.5 1 126.669 1 155.25V155.25C1 183.831 24.1693 207 52.75 207H210.5C265.728 207 310.5 251.772 310.5 307V310.5"
              stroke="white"
              strokeWidth={1}
            ></path>
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
