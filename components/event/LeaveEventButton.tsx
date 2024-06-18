'use client';

import { PepiconsPencilLeave } from '../common/Icons';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../ui/use-toast';

export default function LeaveEventButton({
  userID,
  eventID,
}: {
  userID: string;
  eventID: string;
}) {
  const supabase = createClient();
  const { toast } = useToast();
  return (
    <DropdownMenuItem
      onClick={async () => {
        const { error } = await supabase
          .schema('connections')
          .from('event_attendees')
          .delete()
          .eq('event', eventID)
          .eq('attendee', userID);

        if (!error) {
          window.location.reload();
        } else {
          toast({
            title: '❌ Something went Wrong',
            description: 'Please try again later',
          });
        }
      }}
    >
      <PepiconsPencilLeave className="mr-2 h-4 w-4" />
      <span>Leave</span>
    </DropdownMenuItem>
  );
}
