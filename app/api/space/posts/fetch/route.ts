import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabaseClient = createClient();
  const { spaceId } = await req.json();

  if (spaceId) {
    const { data: spacePostsData, error: spacePostsError } =
      await supabaseClient
        .schema('public')
        .from('profile_posts')
        .select('*')
        .eq('space', spaceId);

    if (spacePostsError) {
      return NextResponse.json(
        {
          data: null,
          error: spacePostsError.message,
          status: 500,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        data: spacePostsData,
        error: null,
        status: 200,
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      data: null,
      error: 'Bad Request',
      status: 400,
    },
    {
      status: 400,
    },
  );
}
