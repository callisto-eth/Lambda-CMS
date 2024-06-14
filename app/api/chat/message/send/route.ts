import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type SendMessageSchema = {
  chat: string;
  body: string;
};

export async function POST(req: NextRequest) {
  const data: SendMessageSchema = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user.data.user) {
    let { data: sendMessageResponse, error: sendMessageError } = await supabase
      .schema('connections')
      .from('chat_messages')
      .insert({
        chat: data.chat,
        author: user.data.user?.id,
        content: data.body,
        medias: [],
      })
      .select();

    if (sendMessageError) {
      if (process.env.NODE_ENV === 'development')
        console.log(sendMessageError.message);
      return NextResponse.json(
        { error: sendMessageError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: sendMessageResponse }, { status: 200 });
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
