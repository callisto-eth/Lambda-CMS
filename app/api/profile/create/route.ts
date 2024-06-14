import { dataURLtoFile } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const reqJSON = await req.json();
  const { username, bio, profile_image } = reqJSON;
  const userData = await supabase.auth.getUser();
  if (userData.data.user) {
    const { data: createProfileResponse, error } = await supabase
      .from('profiles')
      .insert({
        id: userData.data.user.id,
        username,
        bio,
      });

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

    if (profile_image) {
      let { error: uploadAvatarImageError } = await supabase.storage
        .from('user_assets')
        .upload(
          `${userData.data.user.id}/avatar.png`,
          dataURLtoFile(profile_image, 'avatar.png'),
          {
            upsert: true,
          },
        );

      if (uploadAvatarImageError) {
        return NextResponse.json(
          { error: uploadAvatarImageError.message },
          { status: 500 },
        );
      }
    }
    return NextResponse.json(
      {
        data: createProfileResponse,
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
