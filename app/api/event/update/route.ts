import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type UpdateEventSchema = {
  id: string;
  name?: string;
  description?: string;
  entry_price?: string;
  start_time?: string;
  end_time?: string;
  spaces?: string;
  chat?: string;
  platform?: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  organizer?: string;
  visibility?: 'PRIVATE' | 'PUBLIC';
};

export async function PUT(req: NextRequest) {
  const data: UpdateEventSchema = await req.json();
  const supabase = createClient();

  let { data: updateEventResponse, error } = await supabase
    .from('events')
    .update(data)
    .eq('id', data.id)
    .select();

  console.log(error);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: Number(error.code) },
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
