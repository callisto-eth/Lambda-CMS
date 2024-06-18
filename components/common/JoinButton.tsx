'use client';

import { MaterialSymbolsJoin } from './Icons';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export default function JoinButton({ eventID }: { eventID: string }) {
  const { toast } = useToast();
  return (
    <Button
      onClick={async () => {
        const joinEventResponse = await fetch('/api/event/join', {
          method: 'POST',
          body: JSON.stringify({
            id: eventID,
          }),
        });

        if (joinEventResponse.status === 200) {
          toast({
            title: '✅ Joined event',
            description: 'You have successfully joined the event',
          });

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }

        if (joinEventResponse.status === 401) {
          toast({
            title: '❌ Unauthorized',
            description: 'You must be logged in to join the event',
          });
        }

        if (joinEventResponse.status === 500) {
          toast({
            title: '❌ Something went Wrong',
            description: 'Please try again later',
          });
        }
      }}
      className="inline-flex items-center py-2 px-3 space-x-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
    >
      <MaterialSymbolsJoin className="text-2xl" />
      <p>Join</p>
    </Button>
  );
}
