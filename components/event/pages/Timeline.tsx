import SubeventCard from '../SubeventCard';
import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';
import { Database } from '@/types/supabase';

export default async function Timeline({
  eventId,
  eventAttendeeResponse,
}: {
  eventId: string;
  eventAttendeeResponse?:
    | Database['connections']['Tables']['event_attendees']['Row']
    | null;
}) {
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

  return (
    subeventResponse && (
      <main className="my-10">
        {subeventResponse.map((subEvent) => (
          <SubeventCard
            eventAttendeeResponse={eventAttendeeResponse}
            key={subEvent.id}
            subEventResponse={subEvent}
            eventID={eventId}
          />
        ))}
      </main>
    )
  );
}
