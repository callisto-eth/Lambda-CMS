'use client';

import Link from 'next/link';
import { PhChatsCircleFill } from './Icons';

export default function DiscussionButton({ event_id }: { event_id: string }) {
  return (
    <Link
      href={`/${event_id}/discussion `}
      className="inline-flex items-center p-2 space-x-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
    >
      <PhChatsCircleFill className="text-2xl" />
      <p className="hidden lg:block">Discussion</p>
    </Link>
  );
}
