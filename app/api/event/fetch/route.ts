import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { eventId } = await req.json();
  const supabase = createClient();

  if (eventId) {
    const { data: eventDataResponse, error: eventDataError } = await supabase
      .from('events')
      .select('*')
      .eq('slug', eventId);

    if (!eventDataResponse) {
      return NextResponse.json(
        { data: null, error: 'Event not found', status: 404 },
        { status: 404 },
      );
    }

    if (eventDataError) {
      if (process.env.NODE_ENV === 'development') console.log(eventDataError);

      return NextResponse.json(
        { data: null, error: eventDataError, status: 500 },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error: null,
        data: eventDataResponse[0],
        status: 200,
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
      status: 400,
    },
    {
      status: 400,
    },
  );
}
