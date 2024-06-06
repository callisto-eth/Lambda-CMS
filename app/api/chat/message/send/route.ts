import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type SendMessageSchema = {
  chat: string;
  body: string;
};

export async function POST(req: NextRequest) {
  const data: SendMessageSchema = await req.json();
  console.log(data)
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  let { data: sendMessageResponse, error: sendMessageError } = await supabase
    .schema('connections')
    .from('chat_messages')
    //@ts-ignore - fuck you typescript retarded bitch
    .insert({
      chat: data.chat,
      author: user.data.user?.id,
      content: data.body,
    })
    .select();

  if (sendMessageError) {
    console.log(sendMessageError.message)
    return NextResponse.json(
      { error: sendMessageError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: sendMessageResponse }, { status: 200 });
}
