'use client';

import { Database } from '@/types/supabase';
import { SolarTicketBold } from '../Icons';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import QRCode from 'react-qr-code';

export default function TicketModal({
  passStatus,
}: {
  passStatus:
    | Database['connections']['Tables']['subevent_attendees']['Row']
    | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center py-2 px-3 space-x-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]">
          <SolarTicketBold className="text-2xl" />
          <p>Ticket</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
        <div className="leading-tight space-y-2">
          <p className="text-3xl font-semibold">Ticket</p>
          <p>
            Your ticket for this event. Make sure you dont share it with anyone
            🤫
          </p>
        </div>
        <div className="flex justify-center p-5">
          <QRCode
            size={200}
            bgColor="transparent"
            fgColor="#FB4500"
            value={JSON.stringify({
              pass_id: passStatus?.subevent_pass,
              event_id: passStatus?.subevent,
            })}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
