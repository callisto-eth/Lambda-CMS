import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type JoinChatSchema = {
  chat: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const data: JoinChatSchema = await req.json();
  const user = await supabase.auth.getUser();

  let { data: joinChatResponse, error: joinChatError } = await supabase
    .schema('connections')
    .from('chat_members')
    // @ts-ignore
    .insert({
      chat: data.chat,
      member: user.data.user?.id,
    })
    .select();
}
