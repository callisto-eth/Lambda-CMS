'use client';

import { Database } from '@/types/supabase';
import { SolarTicketBold } from '../common/Icons';
import { Dialog, DialogTrigger } from '../ui/dialog';
import QRCode from 'react-qr-code';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { UserResponse } from '@supabase/supabase-js';
import CTAButton from '../common/CTAButton';
import { GlassDialogContent } from '../common/GlassModalContent';
import { handleErrors } from '@/utils/helpers';

export default function TicketModal({
  eventId,
  userData,
}: {
  eventId: string;
  userData: UserResponse['data']['user'];
}) {
  const [eventAttendeeResponse, setEventAttendeeResponse] =
    useState<Database['connections']['Tables']['event_attendees']['Row']>();
  const supabaseClient = createClient();
  useEffect(() => {
    supabaseClient
      .schema('connections')
      .from('event_attendees')
      .select('*')
      .eq('event', eventId)
      .eq('attendee', userData!.id)
      .single()
      .then(({ data, error }: { data: any; error: any }) => {
        if (error) handleErrors(error.message, 500);
        if (data) setEventAttendeeResponse(data);
      });
  }, [eventId, supabaseClient, userData]);
  return (
    eventAttendeeResponse && (
      <Dialog>
        <DialogTrigger asChild>
          <CTAButton variant="lambdaGlow">
            <SolarTicketBold className="text-2xl" />
            <p>Ticket</p>
          </CTAButton>
        </DialogTrigger>
        <GlassDialogContent>
          <div className="leading-tight space-y-2">
            <p className="text-3xl font-semibold">Ticket</p>
            <p>
              Your ticket for this event. Make sure you dont share it with
              anyone 🤫
            </p>
          </div>
          <div className="flex justify-center p-5">
            <QRCode
              value={JSON.stringify({
                pass_id: eventAttendeeResponse?.pass_id,
              })}
              bgColor="transparent"
              fgColor="#fb4500"
              size={200}
            />
          </div>
        </GlassDialogContent>
      </Dialog>
    )
  );
}
