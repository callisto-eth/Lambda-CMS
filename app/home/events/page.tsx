'use client';

import EventCard from '@/components/EventCard';

import { createClient } from '@/utils/supabase/client';
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
          console.log(data.data);
        });
    }
  }, [organizerID]);

  return (
    <main className="px-10">
      {fetchedEvents &&
        fetchedEvents.map((fetchedEvent: any) => {
          return (
            <EventCard fetchedEvent={fetchedEvent} key={fetchedEvent.id} />
          );
        })}
    </main>
  );
}
