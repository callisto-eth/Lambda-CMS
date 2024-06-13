import SubeventCard from '../SubeventCard';
import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';
import { createClient } from '@/utils/supabase/server';

export default async function Timeline({ eventId }: { eventId: string }) {
  const supabaseClient = createClient();
  const subeventResponse: z.infer<typeof subEventMetadata>[] = await (
    await fetch(
      process.env.NODE_ENV === 'production'
        ? 'https://lambda.events/api/subevent/fetch'
        : 'http://localhost:3000/api/subevent/fetch',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eventId }),
      },
    )
  ).json();

  const userData = await supabaseClient.auth.getUser();

  const userStatus =
    userData.data.user &&
    (await supabaseClient
      .schema('connections')
      .from('event_attendees')
      .select('*')
      .eq('attendee', userData.data.user.id)
      .eq('event', eventId)
      .single());

  return (
    subeventResponse && (
      <main className="my-10">
        {subeventResponse.map((subEvent) => (
          <SubeventCard
            userStatus={userStatus?.data || null}
            key={subEvent.id}
            subEventResponse={subEvent}
            eventID={eventId}
          />
        ))}
      </main>
    )
  );
}
