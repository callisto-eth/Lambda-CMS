import SubeventCard from '../SubeventCard';
import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';

export default async function Timeline({ eventId }: { eventId: string }) {
  const subeventResponse: z.infer<typeof subEventMetadata>[] = await (
    await fetch('http://localhost:3000/api/subevent/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
    })
  ).json();

  return (
    subeventResponse && (
      <main className="my-10">
        {subeventResponse.map((subEvent) => (
          <SubeventCard key={subEvent.id} subEventResponse={subEvent} />
        ))}
      </main>
    )
  );
}
