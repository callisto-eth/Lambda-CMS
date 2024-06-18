import EventCard from '@/components/event/EventCard';
import { PhGearFill } from '@/components/common/Icons';
import { filter, handleErrors } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

export default async function Home() {
  const supabase = createClient();

  const { data: publicEventsRes, error: publicEventsError } = await supabase
    .from('events')
    .select('*')
    .eq('visibility', 'PUBLIC');

  if (publicEventsError) {
    handleErrors(publicEventsError.message, 500);
  }

  const userData = await supabase.auth.getUser();
  if (userData.data.user) {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userData.data.user.id)
      .single();

    console.log(data);

    const { data: userEventResponse, error: userEventError } = await supabase
      .schema('connections')
      .from('event_attendees')
      .select()
      .eq('attendee', userData.data.user.id);

    if (!userEventResponse) handleErrors(userEventError.message, 500);

    return (
      <main className="p-[0_2rem_0_2.5rem] grid lg:grid-cols-16 gap-x-10 mb-10">
        <div className="lg:col-span-12 space-y-5">
          <div className="space-y-5">
            <p className="text-4xl font-semibold align-middle tracking-tight">
              Your <span className="text-[#FB4500] ">Events</span>
            </p>
            <Carousel className="max-w-[calc(100vw-5rem)] sm:max-w-full ">
              <CarouselContent className="">
                {userEventResponse?.map(async (userEvent) => {
                  const { data, error } = await supabase
                    .from('events')
                    .select()
                    .eq('id', userEvent.event)
                    .single();

                  if (error) handleErrors(error.message, 500);

                  return (
                    data && (
                      <CarouselItem key={data.id} className="sm:basis-1/2">
                        <Link href={`/${data.id}`}>
                          <EventCard key={userEvent.id} fetchedEvent={data} />
                        </Link>
                      </CarouselItem>
                    )
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
          <div className="space-y-5">
            <p className="text-4xl font-semibold align-middle tracking-tight">
              Discover <span className="text-[#FB4500] ">Events</span>
            </p>
            <div className="grid md:grid-cols-3 lg:grid-cols-2 gap-5">
              {publicEventsRes?.map((publicEvent) => {
                if (userEventResponse) {
                  if (
                    userEventResponse.find(
                      (userEvent) => userEvent.event === publicEvent.id,
                    )
                  )
                    return;
                }
                return (
                  <Link href={`/${publicEvent.id}`} key={publicEvent.id}>
                    <EventCard
                      key={publicEvent.id}
                      fetchedEvent={publicEvent}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        {data && (
          <div className="h-fit col-span-4 hidden lg:flex flex-col items-center space-y-4 overflow-hidden bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
            <div
              className=" w-full relative h-[100px] bg-cover"
              style={{
                backgroundImage: `url(https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uLyfLM67vyCg6g2be6u6dUiifpf3AY0tcaE_FlKcMFi4pl4N1k4HzYqP2h7Xu945HEIdV96Ps7eSMF_GWpGTLbj2W0nxg5yhzP31jUwdtlKN71lcKL0jAceVGTv_5Hv2tm5mChtMDdVk6yak3dgbME3xe4r9b_yokZRekuoFGzNA=s0-d)`,
              }}
            >
              <div
                className="absolute bottom-[-30px] left-[30px] w-[70px] h-[70px] bg-cover rounded-full flex justify-end"
                style={{
                  backgroundImage: `url(${supabase.storage.from('user_assets').getPublicUrl(`${data.id}/avatar.png?${new Date().toISOString()}`).data.publicUrl})`,
                }}
              >
                <div className="w-[20px] h-[20px] bg-green-400 rounded-full border-transparent"></div>
              </div>
            </div>
            <div className="w-full flex justify-end px-4">
              <Link href="/@me/settings">
                <PhGearFill className="text-2xl" />
              </Link>
            </div>
            <div className="w-full px-4">
              <p className="font-semibold text-4xl ">{data.username}</p>
              <p className="text-[#948b96]">{data.bio}</p>
            </div>
            <div className="flex w-full pb-2 ">
              <div className="w-full px-4">
                <div>
                  <p className="text-xs font-bold text-[#938a95]">
                    EVENTS JOINED
                  </p>
                  <p className="text-4xl">{userEventResponse?.length}</p>
                </div>
              </div>
              <div className="w-full px-3 ">
                <div>
                  <p className="text-xs font-bold text-[#938a95]">
                    UPCOMING EVENTS
                  </p>
                  <p className="text-4xl">
                    {userEventResponse &&
                      (
                        await filter(userEventResponse, async (userEvent) => {
                          const { data, error } = await supabase
                            .from('events')
                            .select()
                            .eq('id', userEvent.event)
                            .single();

                          if (error) handleErrors(error.message, 500);
                          return (
                            data?.start_time &&
                            new Date(data.start_time) > new Date()
                          );
                        })
                      ).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    );
  }
}
