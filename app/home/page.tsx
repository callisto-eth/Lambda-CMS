'use client';

import {
  MaterialSymbolsAddBoxRounded,
  MingcuteFullMoonFill,
  PhBellFill,
  PhChatTeardropFill,
  PhGearFill,
  SolarHomeAngleBold,
} from '@/components/Icons';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CommunityPage() {
  return (
    <main className="flex">
      <nav className="w-[70px] flex flex-col h-screen py-5 text-[#b3b3b3]">
        <div>
          <MingcuteFullMoonFill className="text-5xl mx-auto text-[#FB4500]" />
        </div>
        <div className="place-items-center text-3xl space-y-6 flex-grow flex flex-col justify-center">
          <Link href="/@me" className="hover:text-[#FB4500] transition-colors">
            <SolarHomeAngleBold />
          </Link>
          <Link href="/chat" className="hover:text-[#FB4500] transition-colors">
            <PhChatTeardropFill />
          </Link>
          <Link
            href="/notifications"
            className="hover:text-[#FB4500] transition-colors"
          >
            <PhBellFill />
          </Link>
          <Link
            href="/settings"
            className="hover:text-[#FB4500] transition-colors"
          >
            <PhGearFill />
          </Link>
        </div>
        <div>
          <MingcuteFullMoonFill className="text-5xl mx-auto" />
        </div>
      </nav>
      <section className="w-full flex justify-center items-center flex-col">
        <h1 className="text-4xl font-semibold text-[#b3b3b3] py-5 text-center">
          You&apos;re not part of any events yet!
          <br />
          Join one using an event link or code
        </h1>
        <Dialog>
          <DialogTrigger className=" text-8xl bg-transparent hover:text-[#FB4500] text-[#b3b3b3] transition-all duration-200">
            <MaterialSymbolsAddBoxRounded />
          </DialogTrigger>
          <DialogContent className="p-6 w-[350px] bg-black rounded-xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
            <div className="leading-tight">
              <p className="text-3xl font-semibold w-full text-center">
                Join with event code
              </p>
              {/* <p className="text-lg">Please sign up or sign in below</p> */}
            </div>
            <div className="space-y-1 flex w-full justify-center items-center">
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <p className="w-full text-center">(or)</p>
            <p className="text-3xl font-semibold w-full text-center">
              Paste an invite link
            </p>
            <Input type="text" placeholder="Invite link" />
            <Button
              type="submit"
              className="font-DM-Sans p-3 rounded-xl bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
            >
              Join
            </Button>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
}
