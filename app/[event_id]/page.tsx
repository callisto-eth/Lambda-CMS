import {
  MaterialSymbolsJoin,
  PhChatsCircleFill,
  SolarExitBold,
} from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function EventInfo({
  params,
}: {
  params: { event_id: string };
}) {
  const supabase = createClient();

  const { data: eventDataResponse, error: eventDataError } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.event_id);

  const userData = await supabase.auth.getUser();

  const { data: eventAttendeesResponse, error: eventAttendeesError } =
    await supabase
      .schema('connections')
      .from('event_attendees')
      .select('attendee')
      .eq('event', params.event_id);

  if (!eventDataError) {
    return (
      <main className="px-10 *:font-DM-Sans">
        <div
          className="w-[calc(100vh - 5rem)] md:h-[250px] h-[200px] bg-cover bg-center rounded-[40px] relative"
          style={{
            backgroundImage: `url(${
              supabase.storage
                .from('event_assets')
                .getPublicUrl(`${eventDataResponse[0].id}/banner.png`).data
                .publicUrl
            })`,
          }}
        >
          <div
            className="absolute md:w-[150px] md:h-[150px] w-[100px] h-[100px] rounded-full bg-cover border-[6px] bottom-[-50px] left-[10%] border-[#212325]"
            style={{
              backgroundImage: `url(${
                supabase.storage
                  .from('event_assets')
                  .getPublicUrl(`${eventDataResponse[0].id}/avatar.png`).data
                  .publicUrl
              })`,
            }}
          ></div>
          <div className="absolute space-x-4 bottom-[-25px] right-[5%] ">
            {!eventAttendeesResponse!.some(
              (attendee) => attendee.attendee === userData.data.user?.id,
            ) ? (
              <Button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]">
                <MaterialSymbolsJoin className="text-2xl m-4" />
              </Button>
            ) : (
              <Button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]">
                <SolarExitBold className="text-2xl m-4" />
              </Button>
            )}
            {eventAttendeesResponse!.some(
              (attendee) => attendee.attendee === userData.data.user?.id,
            ) && (
              <Link
                href={`/${params.event_id}/discussion`}
                className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
              >
                <PhChatsCircleFill className="text-2xl m-4" />
              </Link>
            )}
          </div>
        </div>
        <div className="px-[10%] my-16">
          <p className="text-5xl font-bold">{eventDataResponse[0].name}</p>
          <p className="text-xl mt-4 font-light">
            {eventDataResponse[0].description}
          </p>
        </div>
      </main>
    );
  }
}
