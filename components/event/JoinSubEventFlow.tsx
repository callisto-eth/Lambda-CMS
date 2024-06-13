'use client';

import { subEventMetadata } from '@/types/subevent';
import { z } from 'zod';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import JoinSubEventButton from './JoinSubEventButton';
import Razorpay from 'razorpay';

import { processPayment } from '@/utils/razorpay';
import Script from 'next/script';
import { useToast } from '../ui/use-toast';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Database } from '@/types/supabase';
import useRazorpay, { RazorpayOptions } from 'react-razorpay';
import Rzp from 'razorpay';

export default function JoinSubEventFlow({
  subEventResponse,
  eventId,
  userStatus,
}: {
  subEventResponse: z.infer<typeof subEventMetadata>;
  eventId: string;
  userStatus:
    | Database['connections']['Tables']['event_attendees']['Row']
    | null;
}) {
  const { toast } = useToast();

  const [Razorpay] = useRazorpay();

  const instance = new Rzp({
    key_id: 'rzp_test_20EGtnaYDSgrAM',
  });
  const [checkBox, setCheckBox] = useState<CheckedState | undefined>(false);

  async function createOrder(amount: string, event: string, subevent: string) {
    const resp = await fetch('/api/payment/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        event: event,
        subevent: subevent,
      }),
    });

    const { orderId } = await resp.json();

    if (orderId)
      processPayment(orderId, 'test', 'test@test.com', amount, subevent, event);
  }

  <Script
    id="razorpay-checkout-js"
    src="https://checkout.razorpay.com/v1/checkout.js"
  />;

  return subEventResponse.entry_price > 0 ? (
    <Dialog>
      <DialogTrigger asChild>
        <JoinSubEventButton userStatus={userStatus} onClick={async () => {}} />
      </DialogTrigger>
      <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
        <div className="leading-tight">
          <p className="text-3xl font-semibold">Alert</p>
          <p>This is a paid event and requires you to pay for the Ticket.</p>
        </div>
        <div className="flex space-x-2">
          <Checkbox
            id="disclaimer"
            checked={checkBox}
            onCheckedChange={setCheckBox}
          />
          <label
            htmlFor="disclaimer"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I understand this is a paid event and I am ready to pay for the
            ticket.
          </label>
        </div>
        <Button
          type="submit"
          disabled={!checkBox}
          className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
          onClick={() => {
            createOrder(
              subEventResponse.entry_price.toString(),
              eventId,
              subEventResponse.id,
            );
          }}
        >
          Pay
        </Button>
      </DialogContent>
    </Dialog>
  ) : (
    <JoinSubEventButton
      userStatus={userStatus}
      onClick={async () => {
        const joinEventResponse = await fetch('/api/subevent/join', {
          method: 'POST',
          body: JSON.stringify({
            id: subEventResponse.id,
          }),
        });

        if (joinEventResponse.status === 200) {
          toast({
            title: '✅ Joined Subevent',
            description: 'You have successfully joined the subevent',
          });
        }

        if (joinEventResponse.status === 401) {
          toast({
            title: '❌ Unauthorized',
            description: 'You must be logged in to join the subevent',
          });
        }

        if (joinEventResponse.status === 500) {
          toast({
            title: '❌ Something went Wrong',
            description: 'Please try again later',
          });
        }
      }}
    />
  );
}
