import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const reqJSON = await req.json();
  const supabase = createClient();
  const { data: fetchedEvents, error } = await supabase
    .from('events')
    .select()
    .eq('organizer', reqJSON.organizerID);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(
    {
      data: fetchedEvents,
    },
    {
      status: 200,
    },
  );
}
