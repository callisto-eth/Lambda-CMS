import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type JoinChatSchema = {
  chat: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const data: JoinChatSchema = await req.json();
  const user = await supabase.auth.getUser();

  if (user.data.user) {
    let { data: joinChatResponse, error: joinChatError } = await supabase
      .schema('connections')
      .from('chat_members')
      .insert({
        chat: data.chat,
        member: user.data.user?.id,
      })
      .select();

    if (joinChatError) {
      if (process.env.NODE_ENV === 'development')
        console.log(joinChatError.message);
      return NextResponse.json(
        { error: joinChatError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: joinChatResponse }, { status: 200 });
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
