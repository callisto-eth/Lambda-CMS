'use client';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import DataTable from '../DataTable';

export default function Users({ eventID }: { eventID: string }) {
  const supabaseClient = createClient();

  useEffect(() => {
    supabaseClient
      .schema('public')
      .from('profile_attendees')
      .select()
      .eq('event', eventID)
      .then((response) => {
        if (response.data) setEventAttendeesResponse(response.data);
      });
  }, [supabaseClient, eventID]);
  const [eventAttendeesResponse, setEventAttendeesResponse] =
    useState<Database['public']['Views']['profile_attendees']['Row'][]>();

  return (
    eventAttendeesResponse && (
      <main className="col-span-10">
        <DataTable eventAttendeesResponse={eventAttendeesResponse} />
      </main>
    )
  );
}
