import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const eventData: Database['public']['Tables']['events']['Update'] =
    await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (user.data.user && eventData.id) {
    const { data: updateEventResponse, error: updateEventError } =
      await supabase
        .from('events')
        .update(eventData)
        .eq('id', eventData.id)
        .select();

    if (updateEventError) {
      if (process.env.NODE_ENV === 'development')
        console.log(updateEventError.message);
      return NextResponse.json(
        { error: updateEventError.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        data: updateEventResponse,
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
