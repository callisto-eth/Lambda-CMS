import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userEmail }: { userEmail: string } = await req.json();
  const supabase = createClient();
  const { data: fetchUserResponse, error: fetchUserError } = await supabase
    .from('profiles')
    .select()
    .eq('email', userEmail);

  if (fetchUserResponse?.length == 0) {
    return NextResponse.json(false, { status: 404 });
  } else {
    return NextResponse.json(fetchUserResponse, { status: 200 });
  }
}
