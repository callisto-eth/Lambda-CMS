import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const supabase = createClient();
  const url = new URL(req.url);
  const chat = url.searchParams.get('chat');
  const userData = await supabase.auth.getUser();

  if (userData.data.user) {
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat ID is required' },
        { status: 400 },
      );
    }

    let { data: addUserMessageResponse, error: addUserMessageError } =
      await supabase.schema('connections').from('chat_members').upsert({
        chat: chat,
        member: userData.data.user.id,
        created_at: new Date().toISOString(),
      });

    if (addUserMessageError) {
      return NextResponse.json(
        { error: addUserMessageError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: addUserMessageResponse }, { status: 200 });
  }

  if (!userData.data.user) {
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
