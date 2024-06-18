'use client';

import { AvatarDropDown } from '@/components/common/AvatarDropdown';
import CreateEventModal from '@/components/event/CreateEventModal';
import {
  MaterialSymbolsAddCircle,
  MaterialSymbolsJoin,
  MdiLambda,
} from '@/components/common/Icons';
import JoinEventDialog from '@/components/event/JoinEventDialog';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';

export default function Navbar() {
  const [modalState, setModalState] = useState(false);

  return (
    <nav className="p-8 flex items-center justify-between md:space-x-12 space-x-4">
      <MdiLambda className="text-5xl text-[#FB4500]" />
      <div className="flex items-center space-x-4 font-DM-Sans">
        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogTrigger className="hidden md:inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-fit py-1.5 px-2 text-[#948b96] rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
            <MaterialSymbolsAddCircle className="text-xl" />
            <p className="px-1">Create</p>
          </DialogTrigger>
          <CreateEventModal setModalState={setModalState} />
        </Dialog>
        <Dialog>
          <DialogTrigger className="hidden md:inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] py-1.5 px-2 hover:bg-[#FB4500] rounded-full text-base space-x-2 bg-[#FB4500] text-[#212325]">
            <MaterialSymbolsJoin className="text-xl" />
            <p className="px-1">Join</p>
          </DialogTrigger>
          <JoinEventDialog />
        </Dialog>
        <AvatarDropDown />
      </div>
    </nav>
  );
}
