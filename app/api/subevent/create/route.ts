import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { dataURLtoFile } from '@/utils/helpers';

type createSubeventSchema = {
  event: string;
  topic: string;
  description: string;
  start_time: string;
  end_time: string;
  entry_price: string;
  max_attendees: number;
  platform: 'ONLINE' | 'OFFLINE';
  avatar_image?: string;
  banner_image?: string;
};

export async function POST(req: NextRequest) {
  const data: createSubeventSchema = await req.json();
  const supabase = createClient();

  let { data: createSubeventResponse, error: subeventCreationError } =
    await supabase
      .from('sub_events')
      // @ts-ignore - Types are not correct, pliz regenerate obsidian
      .insert({
        event: data.event,
        topic: data.topic,
        description: data.description,
        start_time: data.start_time,
        end_time: data.end_time,
        entry_price: data.entry_price,
        max_attendees: data.max_attendees,
        platform: data.platform,
      })
      .select();

  if (subeventCreationError) {
    return NextResponse.json(
      { error: subeventCreationError.message },
      { status: 500 },
    );
  }
  if (createSubeventResponse) {
    if (data.avatar_image) {
      let { error: uploadAvatarImageError } = await supabase.storage
        .from('subevent_assets')
        .upload(
          `${createSubeventResponse[0].id}/avatar.png`,
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
        .from('subevent_assets')
        .upload(
          `${createSubeventResponse[0].id}/banner.png`,
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
  }

  return NextResponse.json({ data: createSubeventResponse }, { status: 201 });
}
