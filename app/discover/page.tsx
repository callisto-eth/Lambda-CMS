import EventCard from '@/components/EventCard';
import SearchBox from '@/components/SearchBox';
import { Input } from '@/components/ui/input';
import { handleErrors } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Discover() {
  const supabaseClient = createClient();
  const { data: publicEventsRes, error: publicEventsError } =
    await supabaseClient.from('events').select('*').eq('visibility', 'PUBLIC');

  if (publicEventsError) {
    handleErrors(publicEventsError.message, 500);
  }

  return (
    publicEventsRes && (
      <main className="md:px-10 px-5 font-DM-Sans">
        <div
          className=" space-y-6 w-full md:h-[300px] h-[250px] bg-cover bg-center md:rounded-[30px]  rounded-[20px] flex items-center justify-center flex-col px-10 text-center"
          style={{
            backgroundImage: `url(/Discover.svg)`,
          }}
        >
          <div>
            <p className="md:text-5xl text-3xl font-medium tracking-tight">
              Find events that suit you.
            </p>
            <p className="md:text-lg  font-extralight">
              Discover events that are happening around you and join them to
              connect with people.
            </p>
          </div>
          <SearchBox />
        </div>
        {
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mb-5">
            {publicEventsRes.map((event) => (
              <Link href={'/' + event.id} key={event.id}>
                <EventCard key={event.id} fetchedEvent={event} />
              </Link>
            ))}
          </div>
        }
      </main>
    )
  );
}
