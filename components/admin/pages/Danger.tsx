'use client';

import { SolarDangerBold } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import DangerZoneCard from '../DangerZoneCard';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';

function Danger({ eventID }: { eventID: string }) {
  const { toast } = useToast();
  const supabaseClient = createClient();
  return (
    <div className="col-span-10 space-y-8">
      <p className="text-5xl font-bold flex items-center space-x-2">
        <SolarDangerBold className="text-red-500 text-6xl" />
        <span>Danger Area</span>
      </p>

      <div className="border border-white border-opacity-10 rounded-2xl">
        <DangerZoneCard
          optionTitle="Disable Space"
          optionDesc="Disable Space. Currently Space is enabled. Disabling the space
              will purge the Posts. Please be certain."
          onClick={async () => {
            const spaceID = await supabaseClient
              .from('events')
              .select('spaces')
              .eq('id', eventID)
              .single();
            if (spaceID.data) {
              const { error } = await supabaseClient
                .from('spaces')
                .delete()
                .match({ id: spaceID.data.spaces });

              if (error) {
                toast({
                  title: '❌ Error disabling the Space',
                  description: error.message,
                });
              }

              toast({
                title: '🚀 Space disabled',
                description: 'Space has been disabled successfully',
              });
            }
          }}
        />
        <DangerZoneCard
          optionDesc="Disable the Chat. Currently Chat is enabled. Disabling the chat
              will purge the Chats. Please be certain."
          optionTitle="Disable Chat"
        />
        <DangerZoneCard
          optionTitle="Purge Chats"
          optionDesc="Purge the Chat. You can't turn back from this. Please be certain."
        />
        <DangerZoneCard
          optionDesc="Transfer this event ownership to another user. You can't turn back
              from this. Please be certain."
          optionTitle="Transfer Ownership"
        />
        <DangerZoneCard
          optionDesc="Once you delete this Event there is no going back. Please be
              certain."
          optionTitle="Delete this Event"
        />
      </div>
    </div>
  );
}

export default Danger;
