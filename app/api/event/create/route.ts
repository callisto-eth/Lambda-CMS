import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { dataURLtoFile } from '@/utils/helpers';

export type CreateEventSchema = {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  spaces_enabled: boolean;
  chat_enabled: boolean;
  platform: 'ONLINE' | 'OFFLINE' | 'HYBRID';
  visibility: 'PRIVATE' | 'PUBLIC';
  avatar_image?: string;
  banner_image?: string;
};

export async function POST(req: NextRequest) {
  const data: CreateEventSchema = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  if (data && user.data.user) {
    let spaceChatData: {
      spaceId: string | null;
      chatId: string | null;
    } = {
      spaceId: null,
      chatId: null,
    };
    if (data.spaces_enabled) {
      let { data: CreateSpaceResponse, error: createSpacesError } =
        await supabase
          .from('spaces')
          .insert({
            allow_participants: true,
          })
          .select();

      if (createSpacesError) {
        return NextResponse.json(
          { error: createSpacesError.message },
          { status: 500 },
        );
      }
      if (CreateSpaceResponse)
        spaceChatData.spaceId = CreateSpaceResponse[0].id;
    }

    if (data.chat_enabled) {
      let { data: CreateChatResponse, error: createChatError } = await supabase
        .from('chats')
        .insert({
          type: 'GROUP',
        })
        .select();

      if (createChatError) {
        return NextResponse.json(
          { error: createChatError.message },
          { status: 500 },
        );
      }
      if (CreateChatResponse) {
        spaceChatData.chatId = CreateChatResponse[0].id;
      }
    }
    let { data: createEventResponse, error: createEventError } = await supabase
      .from('events')
      .insert({
        name: data.name,
        description: data.description,
        start_time: data.start_time,
        end_time: data.end_time,
        platform: data.platform,
        visibility: data.visibility,
        organizer: user.data.user.id,
        chat: spaceChatData.chatId,
        spaces: spaceChatData.spaceId,
      })
      .select();
    if (createEventError) {
      return NextResponse.json(
        { error: createEventError.message },
        { status: 500 },
      );
    }

    if (createEventResponse) {
      if (data.avatar_image) {
        let { error: uploadAvatarImageError } = await supabase.storage
          .from('event_assets')
          .upload(
            `${createEventResponse[0].id}/avatar.png`,
            dataURLtoFile(data.avatar_image, 'avatar.png'),
          );

        if (uploadAvatarImageError) {
          console.log('Image:' + uploadAvatarImageError.cause);
          return NextResponse.json(
            { error: uploadAvatarImageError.message },
            { status: 500 },
          );
        }
      }

      if (data.banner_image) {
        let { error: uploadBannerImageError } = await supabase.storage
          .from('event_assets')
          .upload(
            `${createEventResponse[0].id}/banner.png`,
            dataURLtoFile(data.banner_image, 'banner.png'),
          );

        if (uploadBannerImageError) {
          console.log(uploadBannerImageError.cause);
          return NextResponse.json(
            { error: uploadBannerImageError.message },
            { status: 500 },
          );
        }
      }

      if (createEventResponse[0] && user.data.user) {
        let { error: adminJoinError } = await supabase
          .schema('connections')
          .from('event_attendees')
          .insert({
            event: createEventResponse[0].id,
            attendee: user.data.user?.id,
            role: 'ORGANIZER',
          });

        if (adminJoinError && createEventResponse) {
          console.log(adminJoinError);

          await supabase
            .from('events')
            .delete()
            .eq('id', createEventResponse[0].id);

          return NextResponse.json(
            { error: adminJoinError.message },
            { status: 500 },
          );
        }
      }

      return NextResponse.json(
        {
          data: createEventResponse,
        },
        {
          status: 201,
        },
      );
    }
  }

  if (!user.data.user) {
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
