import {
  MdiDotsHorizontal,
  PhChatsCircleFill,
} from '@/components/common/Icons';
import JoinButton from '@/components/common/JoinButton';
import LeaveEventButton from '@/components/event/LeaveEventButton';
import TicketModal from '@/components/event/TicketModal';
import Space from '@/components/event/pages/Space';
import Timeline from '@/components/event/pages/Timeline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database } from '@/types/supabase';
import { handleErrors } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import randomColor from 'randomcolor';

export default async function EventInfo({
  params,
}: {
  params: { event_id: string };
}) {
  const supabase = createClient();

  const {
    data: fetchEventResponseData,
    error: fetchedEventResponseError,
    status: fetchedEventStatus,
  }: {
    data: Database['public']['Tables']['events']['Row'] | null;
    error: string | null;
    status: number;
  } = await (
    await fetch(
      process.env.NODE_ENV === 'production'
        ? 'https://lambda.events/api/event/fetch'
        : `http://localhost:3000/api/event/fetch`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
        body: JSON.stringify({ eventId: params.event_id }),
      },
    )
  ).json();

  if (fetchedEventResponseError)
    handleErrors(fetchedEventResponseError, fetchedEventStatus);

  const userData = await supabase.auth.getUser();

  if (fetchEventResponseData) {
    const {
      data: eventAttendeesResponse,
      error: eventAttendeesError,
      status: eventAttendeesStatus,
    }: {
      data:
        | Database['connections']['Tables']['event_attendees']['Row'][]
        | null;
      error: string | null;
      status: number;
    } = await (
      await fetch(
        process.env.NODE_ENV === 'production'
          ? 'https://lambda.events/api/event/attendee/fetch'
          : `http://localhost:3000/api/event/attendee/fetch`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId: fetchEventResponseData.id }),
        },
      )
    ).json();

    const bannerImage = supabase.storage
      .from('event_assets')
      .getPublicUrl(
        `${fetchEventResponseData.id}/banner.png?time=${new Date().toISOString()}`,
      ).data.publicUrl;

    const avatarImage = supabase.storage
      .from('event_assets')
      .getPublicUrl(
        `${fetchEventResponseData.id}/avatar.png?time=${new Date().toISOString()}`,
      ).data.publicUrl;

    const bannerAvailabilty = await fetch(bannerImage);
    const avatarAvailabilty = await fetch(avatarImage);

    if (eventAttendeesError)
      handleErrors(eventAttendeesError, eventAttendeesStatus);

    if (fetchEventResponseData && eventAttendeesResponse) {
      return (
        <main className="px-10 *:font-DM-Sans">
          <div
            className="w-[calc(100vh - 5rem)] md:h-[250px] h-[200px] bg-cover bg-center rounded-[40px] relative"
            style={{
              backgroundImage:
                bannerAvailabilty.status !== 400
                  ? `url(${bannerImage})`
                  : undefined,
              backgroundColor:
                bannerAvailabilty.status === 400
                  ? randomColor({ luminosity: 'dark', format: 'rgb' })
                  : undefined,
            }}
          >
            <div
              className="absolute md:w-[150px] flex justify-center items-center md:h-[150px] w-[100px] h-[100px] rounded-full bg-cover border-[6px] bottom-[-50px] left-[10%] border-[#212325]"
              style={{
                backgroundImage:
                  avatarAvailabilty.status !== 400
                    ? `url(${avatarImage})`
                    : undefined,
                backgroundColor:
                  avatarAvailabilty.status === 400
                    ? randomColor({ luminosity: 'dark', format: 'rgb' })
                    : undefined,
              }}
            >
              {avatarAvailabilty.status === 400 && (
                <p className="text-6xl font-bold">
                  {fetchEventResponseData.name.charAt(0).toUpperCase() +
                    fetchEventResponseData.name.slice(-1).toUpperCase()}
                </p>
              )}
            </div>
            <div className="absolute space-x-2 bottom-[135px] md:bottom-[-20px] right-[5%] flex ">
              {eventAttendeesResponse.some(
                (attendee) => attendee.attendee === userData.data.user?.id,
              ) ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center p-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]">
                      <MdiDotsHorizontal className="text-2xl" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="m-3 rounded-xl *:rounded-lg *:cursor-pointer">
                      <LeaveEventButton
                        eventID={fetchEventResponseData.id}
                        userID={userData.data.user?.id as string}
                      />
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link
                    href={`/e/${fetchEventResponseData.id}/discussion `}
                    className="inline-flex items-center p-2 space-x-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
                  >
                    <PhChatsCircleFill className="text-2xl" />
                    <p className="hidden lg:block">Discussion</p>
                  </Link>
                  <TicketModal
                    eventId={fetchEventResponseData.id}
                    userData={userData.data.user}
                  />
                </>
              ) : (
                <JoinButton eventID={fetchEventResponseData.id} />
              )}
            </div>
          </div>
          <div className="lg:px-[10%] my-16">
            <p className="font-bold text-5xl">{fetchEventResponseData.name}</p>
            <p className="text-xl my-5 font-light">
              {fetchEventResponseData.description}
            </p>

            <Tabs defaultValue="timeline">
              <div className="w-fit mx-auto">
                <TabsList className="grid w-fit grid-flow-col gap-2 bg-[#2B2D2E] rounded-2xl *:p-3 h-fit *:rounded-xl *:text-base">
                  <TabsTrigger
                    value="timeline"
                    className="data-[state=active]:bg-[#FB4500] "
                  >
                    Timeline
                  </TabsTrigger>
                  {fetchEventResponseData.spaces && (
                    <TabsTrigger
                      value="spaces"
                      className="data-[state=active]:bg-[#FB4500] w-[90px]"
                    >
                      Space
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>
              <TabsContent value="timeline">
                <Timeline
                  eventId={fetchEventResponseData.id}
                  eventAttendeeResponse={eventAttendeesResponse.find(
                    (eventAttendee) => {
                      return eventAttendee.attendee === userData.data.user?.id;
                    },
                  )}
                />
              </TabsContent>
              <TabsContent value="spaces">
                {fetchEventResponseData.spaces && (
                  <Space
                    spaceId={fetchEventResponseData.spaces as string}
                    eventName={fetchEventResponseData.name}
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      );
    }
  }
}