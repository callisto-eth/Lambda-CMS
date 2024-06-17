import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import truncate from 'ansi-truncate';
import { Button } from './ui/button';
import { PhCaretRightBold } from './Icons';

export default function EventCard({
  fetchedEvent,
}: {
  fetchedEvent: Database['public']['Tables']['events']['Row'];
}) {
  const supabase = createClient();

  return (
    <div className="w-full bg-black rounded-3xl h-full text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10 grid grid-rows-12 overflow-hidden">
      <div
        className="bg-cover row-span-6 border-b-4 border-[#fb4500]"
        style={{
          backgroundImage: `url(${
            supabase.storage
              .from('event_assets')
              .getPublicUrl(`${fetchedEvent.id}/banner.png`).data.publicUrl
          })`,
        }}
      ></div>
      <div className="p-5 row-span-6 flex gap-x-4 items-center ">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-[#948b96]">
            {new Date(fetchedEvent.start_time).toDateString().toUpperCase() +
              ' UTC'}
          </p>
          <p className="text-3xl font-medium">{fetchedEvent.name}</p>
          <p className="text-[#948b96] text-sm">
            {truncate(fetchedEvent.description as string, 80)}
          </p>
        </div>
        <Button className="rounded-full h-fit p-5 transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] text-base bg-[#FB4500] text-[#212325]">
          <PhCaretRightBold className="text-lg" />
        </Button>
      </div>
    </div>
  );
}
