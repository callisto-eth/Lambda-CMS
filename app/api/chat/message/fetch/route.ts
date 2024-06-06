import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  const supabase = createClient();
  const url = new URL(req.url);
  const chat = url.searchParams.get('chat');

  if (!chat) {
    return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
  }

  let { data: fetchMessagesResponse, error: fetchMessagesError } =
    await supabase
      .schema('connections')
      .from('chat_messages')
      .select('*')
      .eq('chat', chat);

  if (fetchMessagesError) {
    return NextResponse.json(
      { error: fetchMessagesError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: fetchMessagesResponse }, { status: 200 });
}
