import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type SignupRequestSchema = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const data: SignupRequestSchema = await req.json();

  let { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo:
        process.env.NODE_ENV === 'production'
          ? `https://lambda.events/auth/callback`
          : 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Could not authenticate user' },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: 'Signed in' }, { status: 200 });
}
