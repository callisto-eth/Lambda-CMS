import Navbar from '@/components/common/Navbar';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  params,
  children,
}: {
  params: { event_id: string };
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const { data: eventResponse, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', params.event_id)
    .single();

  if (data.user) {
    const { data: eventAttendeesResponse, error } = await supabase
      .schema('connections')
      .from('event_attendees')
      .select('*')
      .eq('event', params.event_id)
      .eq('attendee', data.user.id)
      .single();

    if (!eventAttendeesResponse) throw new Error('401 UNAUTHORIZED');

    if (eventAttendeesResponse) {
      if (eventAttendeesResponse.role !== 'ORGANIZER')
        throw new Error('401 UNAUTHORIZED');
    }
  }

  if (!data.user) redirect('/');

  if (!eventResponse) throw new Error('404 EVENT_NOT_FOUND');

  if (error) throw new Error('500 SERVER ERROR');

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
