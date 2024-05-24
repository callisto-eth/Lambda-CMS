import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

type SignupRequestSchema = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const origin = headers().get('origin');
  const req_data: SignupRequestSchema = await req.json();

  let { data, error } = await supabase.auth.signUp({
    email: req_data.email,
    password: req_data.password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    if (error.code === 'user_already_exists') {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: req_data.email,
        password: req_data.password,
      });

      if (error) {
        return NextResponse.json(
          { message: 'Could not authenticate user' },
          { status: Number(error.code) },
        );
      }

      return NextResponse.json(data, {
        status: 200,
      });
    }
    return NextResponse.json(
      { message: 'Could not authenticate user' },
      { status: Number(error.code) },
    );
  }

  return NextResponse.json(data, {
    status: 200,
  });
}
