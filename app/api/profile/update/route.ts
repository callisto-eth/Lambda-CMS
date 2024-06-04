import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const reqJSON = await req.json();
  const supabase = createClient();
  const userData = await supabase.auth.getUser();
  const { username, bio, visibility } = reqJSON;

  if (userData.data.user) {
    const { data: updateProfileResponse, error } = await supabase
      .from('profiles')
      .update({
        username,
        bio,
        visibility,
      })
      .eq('id', userData.data.user.id)
      .select();

    if (error) {
      return NextResponse.json(
        {
          error,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        data: updateProfileResponse,
      },
      {
        status: 200,
      },
    );
  }

  if (!userData.data.user) {
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
