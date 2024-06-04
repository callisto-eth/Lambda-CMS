import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type UpdateEventSchema = {
  id: string;
  name?: string;
  description?: string;
  entry_price?: string;
  start_time?: string;
  end_time?: string;
  spaces_enabled?: boolean;
  chat_enabled?: boolean;
};

export async function PUT(req: NextRequest) {
  const data: UpdateEventSchema = await req.json();
  const supabase = createClient();

  let { data: updateEventResponse, error } = await supabase
    .from('events')
    .update(data)
    .eq('id', data.id)
    .select();

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
