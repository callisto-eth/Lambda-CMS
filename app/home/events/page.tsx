'use client';

import EventCard from '@/components/EventCard';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const [fetchedEvents, setFetchedEvents] = useState<any>();
  const [organizerID, setOrganizerID] = useState<string | undefined>('');
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then((user) => {
      setOrganizerID(user.data.user?.id);
    });
    if (organizerID) {
      fetch('/api/organizer/event/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organizerID: organizerID }),
      })
        .then((res) => res.json())
        .then((data) => {
          setFetchedEvents(data.data);
        });
    }
  }, [organizerID]);

  return (
    <main className="grid gap-5 md:gap-0 md:grid-cols-3 w-fit mx-auto md:w-full px-0 md:px-10">
      {fetchedEvents &&
        fetchedEvents.map((fetchedEvent: any) => {
          return (
            <Link href={`/admin/${fetchedEvent.id}`}>
              <EventCard fetchedEvent={fetchedEvent} />
            </Link>
          );
        })}
    </main>
  );
}
