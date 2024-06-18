'use client';

import { subEventMetadata } from '@/types/subevent';
import { z } from 'zod';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { processPayment } from '@/utils/razorpay';
import Script from 'next/script';
import { useToast } from '../ui/use-toast';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Database } from '@/types/supabase';
import useRazorpay from 'react-razorpay';
import Rzp from 'razorpay';
import { handleErrors } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/client';
import CTAButton from '../common/CTAButton';
import { MaterialSymbolsJoin } from '../common/Icons';

export default function JoinSubEventFlow({
  subEventResponse,
  eventId,
  passStatus,
  attendeeID,
}: {
  subEventResponse: z.infer<typeof subEventMetadata>;
  eventId: string;
  passStatus:
    | Database['connections']['Tables']['subevent_attendees']['Row']
    | null;
  attendeeID: string;
}) {
  const { toast } = useToast();

  const [Razorpay] = useRazorpay();

  const instance = new Rzp({
    key_id: 'rzp_test_20EGtnaYDSgrAM',
  });
  const [checkBox, setCheckBox] = useState<CheckedState | undefined>(false);
  const [dialogState, setDialogState] = useState(false);
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

  return (
    <>
      <CTAButton
        variant="lambdaGlow"
        disabled={passStatus ? true : false}
        onClick={async () => {
          if (subEventResponse.entry_price === 0) {
            const supabase = createClient();
            const { error: createSubEventAttendeeError } = await supabase
              .schema('connections')
              .from('subevent_attendees')
              .insert({
                subevent: subEventResponse.id,
                event_attendee: attendeeID,
              });

            if (createSubEventAttendeeError)
              handleErrors(createSubEventAttendeeError.message, 500);

            if (!createSubEventAttendeeError) {
              toast({
                title: '✅ Joined Subevent',
                description: 'You have successfully joined the subevent',
              });

              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }

            if (createSubEventAttendeeError) {
              toast({
                title: '❌ Something went Wrong',
                description: 'Please try again later',
              });
            }
          }
          setDialogState(true);
        }}
      >
        <MaterialSymbolsJoin className="text-2xl" />
        <p>Join</p>
      </CTAButton>
      <Dialog open={dialogState} onOpenChange={setDialogState}>
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
    </>
  );
}
