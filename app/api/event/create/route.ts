import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export type CreateEventSchema = {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  spaces_enabled: boolean;
  chat_enabled: boolean;
  platform: 'E_EVENT_ONLINE' | 'E_EVENT_OFFLINE' | 'E_EVENT_HYBRID';
  visibility: 'E_EVENT_PRIVATE' | 'E_EVENT_PUBLIC';
  avatar_image?: string;
  banner_image?: string;
};

export async function POST(req: NextRequest) {
  const data: CreateEventSchema = await req.json();
  const supabase = createClient();
  const user = await supabase.auth.getUser();

  let { data: createEventResponse, error: createEventError } = await supabase
    .from('events')
    .insert({
      name: data.name,
      organizer: user.data.user?.id,
      description: data.description,
      start_time: data.start_time,
      end_time: data.end_time,
      platform: data.platform,
      visibility: data.visibility,
      spaces_enabled: data.spaces_enabled,
      chat_enabled: data.chat_enabled,
    })
    .select();
  if (createEventError) {
    return NextResponse.json(
      { error: createEventError.message },
      { status: 500 },
    );
  }

  if (createEventResponse) {
    let imageUrls = {
      avatar: '',
      banner: '',
    };

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

      let { data: fetchAvatarResponse } = supabase.storage
        .from('event_assets')
        .getPublicUrl(`${createEventResponse[0].id}/avatar.png`);

      imageUrls.avatar = fetchAvatarResponse.publicUrl;
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
      let { data: fetchBannerResponse } = supabase.storage
        .from('event_assets')
        .getPublicUrl(`${createEventResponse[0].id}/banner.png`);

      imageUrls.banner = fetchBannerResponse.publicUrl;
    }

    let { error: eventAssetUpdateError } = await supabase
      .from('events')
      .update({
        avatar: imageUrls.avatar,
        banner: imageUrls.banner,
      })
      .eq('id', createEventResponse[0].id);

    if (eventAssetUpdateError) {
      console.log('here?', eventAssetUpdateError.code);
      return NextResponse.json(
        { error: eventAssetUpdateError.message },
        { status: 500 },
      );
    }

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

function dataURLtoFile(dataUrl: string, filename: string) {
  let arr = dataUrl.split(','),
    //@ts-ignore
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
