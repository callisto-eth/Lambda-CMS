import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type JoinFreeEventSchema = {
  id: string;
};

export async function POST(req: NextRequest) {
  const data: JoinFreeEventSchema = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (user.data.user) {
    let { data: joinEventResponse, error } = await supabase
      .schema('connections')
      .from('event_attendees')
      .insert({
        event: data.id,
        attendee: user.data.user?.id,
        role: 'E_EVENT_PARTICIPANT',
      });

    if (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }

    return NextResponse.json(
      {
        data: joinEventResponse,
      },
      {
        status: 200,
      },
    );
  }

  if (!user.data.user) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json(
    {
      error: 'Bad Request',
    },
    {
      status: 400,
    },
  );
}
