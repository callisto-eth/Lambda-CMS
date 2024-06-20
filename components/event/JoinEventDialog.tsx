'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import { MaterialSymbolsJoin } from '@/components/common/Icons';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../ui/use-toast';

export default function JoinEventDialog() {
  const [inputOTP, setInputOTP] = useState('');
  const [eventLink, setEventLink] = useState('');
  const { toast } = useToast();
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
          value={inputOTP}
          onChange={(eV) => setInputOTP(eV)}
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
          value={eventLink}
          onChange={(eV) => setEventLink(eV.target.value)}
          placeholder="lambda.events/e/..."
          type="text"
          className="p-3 rounded-xl"
        />
        <Button
          disabled={inputOTP.length !== 6 && eventLink.length === 0}
          onClick={async () => {
            const eventCode =
              inputOTP.length === 6
                ? inputOTP
                : eventLink.match(new RegExp('lambda.events/e/[A-Za-z0-9]+'))
                  ? eventLink.split('/')[2]
                  : '';

            if (eventCode.length !== 0) {
              await joinEventWithLink(eventCode, toast);
            }
          }}
          className=" p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
        >
          Join
        </Button>
      </div>
    </DialogContent>
  );
}

async function joinEventWithLink(eventCode: string, toast: any) {
  console.log('eventCode', eventCode);

  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('events')
    .select()
    .eq('slug', eventCode)
    .single();

  if (error) {
    toast({
      title: '❌ Error',
      description: 'Event not found',
    });
  } else {
    if (!data) {
      toast({
        title: '❌ Error',
        description: 'Event not found',
      });
      return;
    } else {
      if (userData.data.user) {
        const { data: attendeeData, error } = await supabase
          .schema('connections')
          .from('event_attendees')
          .insert({
            event: data.id,
            attendee: userData.data.user.id,
          });

        if (error) {
          toast({
            title: '❌ Error',
            description: 'Already joined',
          });
        } else {
          toast({
            title: '🎉 Success',
            description: 'Joined the event',
          });
        }
      } else {
        toast({
          title: '❌ Error',
          description: 'Unauthorized',
        });
      }
    }
  }
}
