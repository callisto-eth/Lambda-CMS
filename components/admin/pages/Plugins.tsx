'use client';

import { MingcutePlugin2Fill } from '@/components/Icons';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CreateSubEventModal } from '../CreateSubEventModal';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';

export default function Plugins({ event_id }: { event_id: string }) {
  const [modalState, setModalState] = useState(false);
  const [subEvents, setSubEvents] =
    useState<Database['public']['Tables']['sub_events']['Row']>();
  const supabaseClient = createClient();
  useEffect(() => {
    supabaseClient
      .from('sub_events')
      .select('*')
      .eq('event_id', event_id)
      .single()
      .then((subEventData) => {
        if (subEventData.data) setSubEvents(subEventData.data);
      });
  }, []);
  return (
    <div className="col-span-10 space-y-8">
      <p className="text-6xl font-bold flex items-center space-x-2">
        <MingcutePlugin2Fill className="text-6xl" />
        <span>Plugins</span>
      </p>
      <div className="border border-white border-opacity-10 rounded-2xl">
        <div className="sm:flex space-x-0 sm:space-x-4 space-y-4 md:space-y-0 justify-between items-center p-5  border-b border-white border-opacity-10 last:border-b-0">
          <div>
            <p className="text-lg font-semibold">Create a Sub-Event</p>
            <p className="text-sm font-light">
              Create a sub-event for this event. Sub-events can have their own
              schedule, speakers, and entry price. Each subevent is associated
              with its own Plugin
            </p>
          </div>
          <Dialog open={modalState} onOpenChange={setModalState}>
            <DialogTrigger>
              <Button
                type="button"
                className="hover:text-white hover:bg-[#FB4500] bg-transparent text-[#FB4500] border border-[#FB4500] p-4 rounded-full text-base"
              >
                Create a Sub-Event
              </Button>
            </DialogTrigger>
            <CreateSubEventModal
              eventId={event_id}
              setModalState={setModalState}
            />
          </Dialog>
        </div>
      </div>
      {subEvents && (
        <div>
          <p></p>
        </div>
      )}
    </div>
  );
}
