import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// TODO: Implement sending media (images, videos, files)
type SendMessageSchema = {
  event: string;
  body: string;
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  const { data: sentMessage, error: sendMessageError } = await supabase
    .from('chat_messages')
    .insert({
      event: data.event,
      author: user.data.user?.id,
      body: data.body,
    })
    .select();

  if (sendMessageError) {
    console.log(sendMessageError);
    return NextResponse.json(
      { error: sendMessageError.message },
      { status: 500 },
    );
  }

  return NextResponse.json({ data: sentMessage }, { status: 200 });
}
