import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { eventId } = await req.json();
  const supabase = createClient();
  if (eventId) {
    const { data: eventAttendeesResponse, error: eventAttendeesError } =
      await supabase
        .schema('connections')
        .from('event_attendees')
        .select('*')
        .eq('event', eventId);

    if (eventAttendeesError) {
      if (process.env.NODE_ENV === 'development')
        console.log(eventAttendeesError);

      return NextResponse.json(
        { data: null, error: eventAttendeesError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: null,
        data: eventAttendeesResponse,
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      data: null,
      error: 'Bad Request',
    },
    {
      status: 400,
    },
  );
}
