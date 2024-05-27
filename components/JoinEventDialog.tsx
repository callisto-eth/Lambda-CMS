'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { MaterialSymbolsJoin } from '@/components/Icons';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function JoinEventDialog() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] py-1.5 px-2 hover:bg-[#FB4500] rounded-full text-base space-x-2 bg-[#FB4500] text-[#212325]">
        <MaterialSymbolsJoin className="text-xl" />
        <p className="px-1">Join</p>
      </DialogTrigger>
      <DialogContent className="p-6 w-[350px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10 flex flex-col justify-center items-center text-center">
        <MaterialSymbolsJoin className="text-6xl text-[#d83e08]" />
        <div className="leading-tight">
          <p className="text-3xl font-semibold">Join an Event</p>
          <p className="text-lg mb-2">Use an event code</p>
          <InputOTP
            className=""
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="my-4 select-none">(or)</p>
          <p className="text-lg mb-2">Paste an event link</p>
          <Input
            placeholder="lambda.events/e/..."
            type="text"
            className="p-2 text-lg text-center"
          />
          <Button className="font-DM-Sans p-3 rounded-md w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132] my-4">Join</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
