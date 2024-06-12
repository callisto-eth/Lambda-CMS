import { createClient } from '@/utils/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabaseClient = createClient();
  const userData = await supabaseClient.auth.getUser();
  const { eventId }: { eventId: string } = await req.json();
  if (eventId) {
    const { data: subEventsResponse, error } = await supabaseClient
      .from('sub_events')
      .select('*')
      .order('start_time', { ascending: true })
      .eq('event', eventId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(subEventsResponse, {
      status: 200,
    });
  }
  if (!userData.data.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
}
