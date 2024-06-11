'use client';

import BannerImageUpload from '@/components/admin/BannerImageUpload';
import SingleImageUpload from '@/components/admin/SingleImageUpload';
import { TextAreaEditUpload } from '@/components/admin/TextAreaEditUpload';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function General({
  eventDataResponse,
}: {
  eventDataResponse: Database['public']['Tables']['events']['Row'];
}) {
  const supabase = createClient();
  const { toast } = useToast();
  useEffect(() => {
    setEventAvatar(
      supabase.storage
        .from('event_assets')
        .getPublicUrl(
          `${eventDataResponse?.id}/avatar.png?time=${new Date().toISOString()}`,
        ).data.publicUrl,
    );
    setEventBanner(
      supabase.storage
        .from('event_assets')
        .getPublicUrl(
          `${eventDataResponse?.id}/banner.png?time=${new Date().toISOString()}`,
        ).data.publicUrl,
    );
  }, []);

  const [eventAvatar, setEventAvatar] = useState<string>();
  const [eventBanner, setEventBanner] = useState<string>();

  return (
    <main className="*:font-DM-Sans col-span-10">
      <div
        className="w-[calc(100vh - 5rem)] md:h-[250px] h-[200px] bg-cover bg-center rounded-[40px] relative flex justify-end"
        style={{
          backgroundImage: `url(${eventBanner})`,
        }}
      >
        <BannerImageUpload
          defaultValue={eventBanner as string}
          setDefaultValue={setEventBanner}
          uploadCallback={async (uploadImage) => {
            const { error } = await supabase.storage
              .from('event_assets')
              .update(`${eventDataResponse?.id}/banner.png`, uploadImage);

            if (error) {
              toast({
                title: '❌ Image Upload',
                description: 'File reading errored out',
              });
            }

            toast({
              title: '✅ Image Upload',
              description: 'Image uploaded successfully',
            });
          }}
        />
        <SingleImageUpload
          defaultValue={eventAvatar as string}
          uploadCallback={async (uploadImage) => {
            const { error } = await supabase.storage
              .from('event_assets')
              .update(`${eventDataResponse?.id}/avatar.png`, uploadImage);

            if (error) {
              toast({
                title: '❌ Image Upload',
                description: 'File reading errored out',
              });
            }

            toast({
              title: '✅ Image Upload',
              description: 'Image uploaded successfully',
            });
          }}
        />
      </div>
      <div className="lg:px-[10%] my-16 space-y-4">
        <TextAreaEditUpload
          defaultValue={eventDataResponse?.name}
          pClassName="text-5xl font-bold"
          inputClassName="w-full"
          uploadCallback={async (editValue, setEditMode) => {
            if (eventDataResponse) {
              const updateEventResponse = await fetch('/api/event/update', {
                method: 'PUT',
                body: JSON.stringify({
                  id: eventDataResponse.id,
                  name: editValue,
                }),
              });

              if (updateEventResponse.status === 200) {
                toast({
                  title: ' ✅ Event name updated',
                  description: 'Event name has been updated successfully',
                });

                setEditMode(false);
              }
            }
          }}
        />
        <TextAreaEditUpload
          autoFocus
          defaultValue={eventDataResponse?.description}
          pClassName="text-xl mt-4 font-light"
          inputClassName="w-full"
          uploadCallback={async (editValue, setEditMode) => {
            if (eventDataResponse) {
              const updateEventResponse = await fetch('/api/event/update', {
                method: 'PUT',
                body: JSON.stringify({
                  id: eventDataResponse.id,
                  description: editValue,
                }),
              });

              if (updateEventResponse.status === 200) {
                toast({
                  title: ' ✅ Event Description updated',
                  description:
                    'Event Description has been updated successfully',
                });

                setEditMode(false);
              }
            }
          }}
        />
      </div>
    </main>
  );
}
