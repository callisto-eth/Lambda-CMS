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
    <DialogContent className="p-6 w-[340px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
      <MaterialSymbolsJoin className="text-6xl text-[#d83e08]" />
      <div className="leading-tight *:font-DM-Sans space-y-4">
        <div>
          <p className="text-3xl font-semibold">Join an Event</p>
          <p className="text-lg mb-2">
            You can join an event either using a event code or an event link 😍
          </p>
        </div>
        <InputOTP
          className=""
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="rounded-xl overflow-hidden">
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
        <p className="select-none text-center">or</p>
        <Input
          placeholder="lambda.events/e/..."
          type="text"
          className="p-3 rounded-xl"
        />
        <Button className=" p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]">
          Join
        </Button>
      </div>
    </DialogContent>
  );
}
