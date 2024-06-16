'use client';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Button } from '../ui/button';
import { PhHandPalmFill } from '../Icons';
import { Database } from '@/types/supabase';
import { GlassDialogContent } from '../GlassModalContent';
import { Dialog, DialogTrigger } from '../ui/dialog';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../ui/use-toast';

export default function QRScanner({
  eventId,
  eventAttendeeResponse,
  subEventId,
}: {
  eventId: string;
  subEventId: string;
  eventAttendeeResponse: Database['connections']['Tables']['event_attendees']['Row'];
}) {
  const [passId, setPassId] = useState<string | null>(null);
  const supabaseClient = createClient();
  const { toast } = useToast();
  useEffect(() => {
    if (passId) {
      supabaseClient
        .schema('connections')
        .from('event_attendees')
        .select('*')
        .eq('pass_id', passId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            toast({
              title: '❌ Error',
              description: 'An error occured please try again',
            });
          }

          if (data) {
            if (eventId !== data.event) {
              toast({
                title: '❌ Error',
                description: 'This pass is not for this event',
              });
            } else {
              supabaseClient
                .schema('connections')
                .from('subevent_attendees')
                .select('*')
                .eq('subevent', subEventId)
                .eq('event_attendee', data.id)
                .single()
                .then(({ data, error }) => {
                  if (error) {
                    toast({
                      title: '❌ Error',
                      description: 'An error occured please try again',
                    });
                  }

                  if (data) {
                    supabaseClient
                      .schema('connections')
                      .from('admissions')
                      .upsert({
                        admitted: true,
                        subevent_attendee: data.id,
                        pass: passId,
                      })
                      .then(({ error }) => {
                        if (error) {
                          toast({
                            title: '❌ Error',
                            description: 'An error occured please try again',
                          });
                        } else {
                          toast({
                            title: '✅ Success',
                            description: 'Attendee admitted',
                          });
                        }
                      });
                  }
                });
            }
          }
        });
    }
  }, [passId]);

  return (
    eventAttendeeResponse &&
    eventAttendeeResponse.role === ('ADMIN' || 'ORGANIZER') && (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors p-2 text-[#212325] rounded-full bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
            <PhHandPalmFill className="text-2xl" />
          </Button>
        </DialogTrigger>
        <GlassDialogContent>
          <div>
            <p className="text-3xl font-semibold">Scan</p>
            <p>Scan the QR code of the attendee to admit them to the event.</p>
          </div>
          <div className="flex items-center justify-center">
            <Scanner
              onScan={(dataScanned) => {
                const dataJSON = JSON.parse(dataScanned[0].rawValue);
                if (dataJSON.pass_id) setPassId(dataJSON.pass_id);
              }}
              styles={{
                finderBorder: 1,
                video: {
                  width: '200px',
                  borderRadius: '10px',
                },
                container: {
                  width: '200px',
                  height: '200px',
                  overflow: 'hidden',
                  borderRadius: '10px',
                },
              }}
            />
          </div>
        </GlassDialogContent>
      </Dialog>
    )
  );
}
