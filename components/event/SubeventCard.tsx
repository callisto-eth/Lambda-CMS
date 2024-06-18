import {
  MajesticonsStatusOnline,
  MaterialSymbolsInfo,
  PhUsersFourDuotone,
  SolarTicketBold,
} from '../common/Icons';
import { Button } from '../ui/button';
import { Sheet, SheetTrigger } from '../ui/sheet';

import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';
import SubeventDetails from './SubeventDetails';
import JoinSubEventFlow from './JoinSubEventFlow';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import QRScanner from './QRScanner';

export default async function SubeventCard({
  subEventResponse,
  eventID,
  eventAttendeeResponse,
}: {
  subEventResponse: z.infer<typeof subEventMetadata>;
  eventID: string;
  eventAttendeeResponse?:
    | Database['connections']['Tables']['event_attendees']['Row']
    | null;
}) {
  const supabase = createClient();
  let passStatus:
    | Database['connections']['Tables']['subevent_attendees']['Row']
    | null = null;

  if (eventAttendeeResponse) {
    passStatus = (
      await supabase
        .schema('connections')
        .from('subevent_attendees')
        .select('*')
        .eq('event_attendee', eventAttendeeResponse.id)
        .eq('subevent', subEventResponse.id)
        .single()
    ).data;
  }

  return (
    <div className="grid grid-cols-16 *:font-DM-Sans group">
      <div className="w-[1px] bg-[#fb4500] h-full col-span-1 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b group-last:block hidden from-transparent from-10% via-transparent via-[55%] to-[#212325] to-100%"></div>
        <div className="w-[15px] h-[15px] bg-[#fb4500] rounded-full ml-[-7.5px]"></div>
      </div>
      <div className="col-span-15 lg:col-span-10 space-y-5 mt-[-8px] pb-8">
        <p className="text-xl font-semibold text-[#fb4500]">
          {subEventResponse.start_time
            ?.split('T')[0]
            .split('-')
            .reverse()
            .join('/')}
        </p>
        <div className="p-5 bg-[#2b2d2e] rounded-2xl">
          <p className="text-lg font-medium text-[#c0c0c1]">
            {new Date(subEventResponse.start_time as string)
              .toString()
              .split(' ')[4]
              .split(':')
              .slice(0, 2)
              .join(':')}{' '}
            -{' '}
            {new Date(subEventResponse.end_time as string)
              .toString()
              .split(' ')[4]
              .split(':')
              .slice(0, 2)
              .join(':')}
          </p>
          <p className="text-3xl font-semibold">{subEventResponse.topic}</p>
          <div className="mt-2 flex space-x-4 *:font-medium">
            <p className="flex items-center space-x-2">
              <MajesticonsStatusOnline />
              <span>
                {subEventResponse.platform.charAt(0) +
                  subEventResponse.platform.slice(1).toLowerCase()}
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <PhUsersFourDuotone />
              <span>{subEventResponse.max_attendees}</span>
            </p>
            <p className="flex items-center space-x-2">
              <SolarTicketBold />
              <span>
                {subEventResponse.entry_price !== 0
                  ? subEventResponse.entry_price + '₹'
                  : 'Free'}
              </span>
            </p>
          </div>
          <div className="mt-4 flex space-x-3">
            {eventAttendeeResponse && (
              <JoinSubEventFlow
                attendeeID={eventAttendeeResponse.id}
                subEventResponse={subEventResponse}
                eventId={eventID}
                passStatus={passStatus}
              />
            )}
            {eventAttendeeResponse && (
              <QRScanner
                eventAttendeeResponse={eventAttendeeResponse}
                eventId={eventID}
                subEventId={subEventResponse.id}
              />
            )}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors p-2 text-[#212325] rounded-full bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
                  <MaterialSymbolsInfo className="text-2xl" />
                </Button>
              </SheetTrigger>
              <SubeventDetails subEventResponse={subEventResponse} />
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
