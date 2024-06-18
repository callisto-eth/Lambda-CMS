import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

type SignInRequestSchema = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const req_data: SignInRequestSchema = await req.json();

  let { data, error } = await supabase.auth.signInWithPassword({
    email: req_data.email,
    password: req_data.password,
  });

  if (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Could not authenticate user' },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
