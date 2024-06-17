import SubeventCard from '../SubeventCard';
import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';
import { Database } from '@/types/supabase';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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

  return subeventResponse.length !== 0 ? (
    <main className="my-10 relative">
      {subeventResponse.map((subEvent) => (
        <Suspense
          key={subEvent.id}
          fallback={<Skeleton className="w-full h-[200px]" key={subEvent.id} />}
        >
          <SubeventCard
            eventAttendeeResponse={eventAttendeeResponse}
            key={subEvent.id}
            subEventResponse={subEvent}
            eventID={eventId}
          />
        </Suspense>
      ))}
    </main>
  ) : (
    <main className="text-center text-4xl font-medium my-20">
      Umm! No Subevents 😔
    </main>
  );
}
