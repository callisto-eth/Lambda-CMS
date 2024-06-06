import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type SendMessageSchema = {
  event: string;
  body: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
}
