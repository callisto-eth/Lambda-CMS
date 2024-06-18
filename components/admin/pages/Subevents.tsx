'use client';

import { CreateSubEventModal } from '../CreateSubEventModal';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import { TextAreaEditUpload } from '../TextAreaEditUpload';
import { useToast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from '@/components/ui/accordion';
import { MaterialSymbolsEdit } from '@/components/common/Icons';
import UpdateSubEventModal from '../UpdateSubEventModal';

export default function Subevents({ eventId }: { eventId: string }) {
  const [modalState, setModalState] = useState(false);
  const [editModalState, setEditModalState] = useState(false);
  const [subEventResponse, setSubEventResponse] =
    useState<Database['public']['Tables']['sub_events']['Row'][]>();
  const supabaseClient = createClient();
  useEffect(() => {
    supabaseClient
      .from('sub_events')
      .select()
      .eq('event', eventId)
      .then((response) => {
        if (response.data) {
          setSubEventResponse(response.data);
        }
      });
  }, [eventId, supabaseClient]);

  const { toast } = useToast();
  return (
    <main className="col-span-10 space-y-4 mb-5">
      <div className="sm:flex  space-x-0 sm:space-x-4 space-y-4 md:space-y-0 justify-between items-center p-5  border border-white border-opacity-10 rounded-3xl">
        <div>
          <p className="text-lg font-semibold">Create a Subevent</p>
          <p className="text-sm font-light">
            Create a subevent for the event. Subevents can be used to manage the
            event in a more detailed manner.
          </p>
        </div>
        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogTrigger className="py-2 hover:text-white hover:bg-red-500 bg-transparent text-red-500 border border-red-500 p-4 rounded-full text-base">
            Create a Subevent
          </DialogTrigger>
          <CreateSubEventModal
            subEventResponse={subEventResponse}
            setSubEventResponse={setSubEventResponse}
            setModalState={setModalState}
            eventId={eventId}
          />
        </Dialog>
      </div>
      {subEventResponse && (
        <div className="space-y-4">
          {subEventResponse.map((subEvent, index) => (
            <div
              key={subEvent.id}
              className="p-4 bg-[#2B2D2E] rounded-3xl space-y-2"
            >
              <p className="text-base font-medium text-[#c0c0c1] tracking-wide">
                SUBEVENT #{`${index + 1}`}
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value={subEvent.id} className="border-none">
                  <AccordionTrigger className="py-0 outline-none hover:no-underline">
                    <TextAreaEditUpload
                      buttonVariant="small"
                      pClassName="text-4xl font-medium"
                      inputClassName="w-full"
                      defaultValue={subEvent.topic}
                      uploadCallback={async (topicText, setEditMode) => {
                        const { error } = await supabaseClient
                          .from('sub_events')
                          .update({ topic: topicText })
                          .eq('id', subEvent.id);
                        if (error) {
                          setEditMode(false);
                          toast({
                            title: '❌ Error',
                            description: 'Failed to update Subevent Topic',
                          });
                        }
                        setEditMode(false);
                        toast({
                          title: '✅ Success',
                          description: 'Successfully updated Subevent Topic',
                        });
                      }}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="py-0 mt-2 space-y-4">
                    <TextAreaEditUpload
                      buttonVariant="small"
                      pClassName="text-base font-light"
                      inputClassName="w-full font-light"
                      defaultValue={subEvent.description}
                      uploadCallback={async (descText, setEditMode) => {
                        const { error } = await supabaseClient
                          .from('sub_events')
                          .update({ description: descText })
                          .eq('id', subEvent.id);
                        if (error) {
                          setEditMode(false);
                          toast({
                            title: '❌ Error',
                            description:
                              'Failed to update Subevent Description',
                          });
                        }
                        setEditMode(false);
                        toast({
                          title: '✅ Success',
                          description:
                            'Successfully updated Subevent Description',
                        });
                      }}
                    />
                    <Dialog
                      open={editModalState}
                      onOpenChange={setEditModalState}
                    >
                      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-fit py-1.5 px-2 text-[#948b96] rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
                        <MaterialSymbolsEdit className="text-xl" />
                        <p className="px-1">Edit</p>
                      </DialogTrigger>
                      <UpdateSubEventModal
                        subEventId={subEvent.id}
                        setEditModalState={setEditModalState}
                      />
                    </Dialog>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
