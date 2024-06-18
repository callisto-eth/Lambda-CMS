'use client';

import { SolarDangerBold } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import DangerZoneCard from '../DangerZoneCard';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

function Danger({ eventID }: { eventID: string }) {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const supabaseClient = createClient();
  return (
    <div className="col-span-10 space-y-8">
      <p className="text-6xl font-bold flex items-center space-x-2">
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

            toast({
              title: '❌ Error disabling the Space',
              description: 'No Space found',
            });
          }}
        />
        <DangerZoneCard
          optionDesc="Disable the Chat. Currently Chat is enabled. Disabling the chat
              will purge the Chats. Please be certain."
          optionTitle="Disable Chat"
          onClick={async () => {
            const chatID = await supabaseClient
              .from('events')
              .select('chat')
              .eq('id', eventID)
              .single();

            if (chatID.data) {
              const { error } = await supabaseClient
                .from('chats')
                .delete()
                .match({ id: chatID.data.chat });

              if (error) {
                toast({
                  title: '❌ Error disabling the Chat',
                  description: error.message,
                });
              }

              toast({
                title: '🚀 Chat disabled',
                description: 'Chat has been disabled successfully',
              });
            }

            toast({
              title: '❌ Error disabling the Chat',
              description: 'No Chat found',
            });
          }}
        />
        <DangerZoneCard
          optionTitle="Purge Chats"
          optionDesc="Purge the Chat. You can't turn back from this. Please be certain."
          onClick={async () => {
            const chatID = await supabaseClient
              .from('events')
              .select('chat')
              .eq('id', eventID)
              .single();

            if (chatID.data?.chat) {
              console.log('Hello');

              const { error } = await supabaseClient
                .schema('connections')
                .from('chat_messages')
                .delete()
                .match({ chat: chatID.data.chat });

              if (error) {
                toast({
                  title: '❌ Error purging the Chat',
                  description: error.message,
                });
              }

              toast({
                title: '🚀 Chat purged',
                description: 'Chat has been purged successfully',
              });
            } else {
              toast({
                title: '❌ Error purging the Chat',
                description: 'No Chat found',
              });
            }
          }}
        />
        <DangerZoneCard
          optionDesc="Transfer this event ownership to another user. You can't turn back
              from this. Please be certain."
          optionTitle="Transfer Ownership"
          onClick={async () => {
            setShowDialog(true);
          }}
        />
        <DangerZoneCard
          optionDesc="Once you delete this Event there is no going back. Please be
              certain."
          optionTitle="Delete this Event"
          onClick={async () => {
            const { error } = await supabaseClient
              .from('events')
              .delete()
              .eq('id', eventID);

            if (error) {
              toast({
                title: '❌ Error deleting the Event',
                description: error.message,
              });
            }

            toast({
              title: '🚀 Event deleted',
              description: 'Event has been deleted successfully',
            });

            window.location.href = '/@me/events';
          }}
        />
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10"></DialogContent>
      </Dialog>
    </div>
  );
}

export default Danger;
