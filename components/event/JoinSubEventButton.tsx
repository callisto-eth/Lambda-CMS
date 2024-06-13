'use client';

import { memo } from 'react';
import { MaterialSymbolsJoin } from '../Icons';
import { Button } from '../ui/button';
import { Database } from '@/types/supabase';

function JoinSubEventButton({
  onClick,
  userStatus,
}: {
  onClick: () => Promise<void>;
  userStatus:
    | Database['connections']['Tables']['event_attendees']['Row']
    | null;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={!userStatus ? true : false}
      className="inline-flex items-center py-2 px-3 space-x-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
    >
      <MaterialSymbolsJoin className="text-2xl" />
      <p>Join</p>
    </Button>
  );
}

export default memo(JoinSubEventButton);
