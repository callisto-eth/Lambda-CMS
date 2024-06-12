import DiscussionButton from '@/components/DiscussionButton';
import { MdiDotsHorizontal, PepiconsPencilLeave } from '@/components/Icons';
import JoinButton from '@/components/JoinButton';
import Timeline from '@/components/event/pages/Timeline';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server';

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
          <div className="absolute space-x-4 bottom-[-20px] right-[5%] ">
            {eventAttendeesResponse!.some(
              (attendee) => attendee.attendee === userData.data.user?.id,
            ) ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center p-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]">
                    <MdiDotsHorizontal className="text-2xl" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="m-3 rounded-xl *:rounded-lg *:cursor-pointer">
                    <DropdownMenuItem>
                      <PepiconsPencilLeave className="mr-2 h-4 w-4" />
                      <span>Leave</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DiscussionButton
                  chat_id={eventDataResponse[0].chat as string}
                  event_id={params.event_id}
                />
              </>
            ) : (
              <JoinButton eventID={eventDataResponse[0].id} />
            )}
          </div>
        </div>
        <div className="lg:px-[10%] my-16">
          <p className="font-bold text-5xl">{eventDataResponse[0].name}</p>
          <p className="text-xl mt-4 font-light">
            {eventDataResponse[0].description}
          </p>
          <hr className="my-5 border-[#544f55]" />
          <Tabs defaultValue="timeline">
            <div className="flex justify-center">
              <TabsList className="grid w-fit grid-cols-3 gap-2  bg-[#2B2D2E] rounded-2xl *:p-3 h-fit *:rounded-xl *:text-base">
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-[#FB4500] "
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="spaces"
                  className="data-[state=active]:bg-[#FB4500]"
                >
                  Space
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-[#FB4500]"
                >
                  Contact
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="timeline">
              <Timeline eventId={params.event_id} />
            </TabsContent>
            <TabsContent value="spaces">Space</TabsContent>
            <TabsContent value="contact">Contact</TabsContent>
          </Tabs>
        </div>
      </main>
    );
  }
}
