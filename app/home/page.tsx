'use client';

import {
  MingcuteFullMoonFill,
  PhBellFill,
  PhChatTeardropFill,
  PhGearFill,
  SolarHomeAngleBold,
} from '@/components/Icons';
import Link from 'next/link';

export default function CommunityPage() {
  return (
    <main>
      <nav className="w-[70px] flex flex-col h-screen py-5 text-[#b3b3b3]">
        <div>
          <MingcuteFullMoonFill className="text-5xl mx-auto text-[#FB4500]" />
        </div>
        <div className="place-items-center text-3xl space-y-6 flex-grow flex flex-col justify-center">
          <Link href="/@me" className="hover:text-[#FB4500] transition-colors">
            <SolarHomeAngleBold />
          </Link>
          <Link href="/chat" className="hover:text-[#FB4500] transition-colors">
            <PhChatTeardropFill />
          </Link>
          <Link
            href="/notifications"
            className="hover:text-[#FB4500] transition-colors"
          >
            <PhBellFill />
          </Link>
          <Link
            href="/settings"
            className="hover:text-[#FB4500] transition-colors"
          >
            <PhGearFill />
          </Link>
        </div>
        <div>
          <MingcuteFullMoonFill className="text-5xl mx-auto" />
        </div>
      </nav>
    </main>
  );
}
