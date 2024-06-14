import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { dataURLtoFile } from '@/utils/helpers';
import { Database } from '@/types/supabase';

export async function POST(req: NextRequest) {
  const data: Database['public']['Tables']['sub_events']['Row'] & {
    banner_image: string;
  } = await req.json();
  const supabase = createClient();

  let { data: createSubeventResponse, error: subeventCreationError } =
    await supabase
      .from('sub_events')
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
    if (data.banner_image) {
      let { error: uploadBannerImageError } = await supabase.storage
        .from('subevent_assets')
        .upload(
          `${createSubeventResponse[0].id}/banner.png`,
          dataURLtoFile(data.banner_image, 'banner.png'),
        );

      if (uploadBannerImageError) {
        console.log(uploadBannerImageError.message);
        return NextResponse.json(
          { error: uploadBannerImageError.message },
          { status: 500 },
        );
      }
    }
    return NextResponse.json({ data: createSubeventResponse }, { status: 201 });
  }
}
