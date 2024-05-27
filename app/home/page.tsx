import { AvatarDropDown } from '@/components/AvatarDropdown';
import CreateEventModal from '@/components/CreateEventModal';
import {
  IconamoonDiscoverFill,
  MaterialSymbolsAddCircle,
  MaterialSymbolsJoin,
  MaterialSymbolsTipsAndUpdates,
  MdiLambda,
} from '@/components/Icons';
import JoinEventDialog from '@/components/JoinEventDialog';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <nav className="flex p-10 items-center justify-between space-x-12">
        <MdiLambda className="text-5xl text-[#FB4500]" />
        <div className="font-DM-Sans text-2xl font-medium text-[#948B96] flex space-x-4 flex-grow">
          <Link href="#" className="flex items-center space-x-2">
            <span>
              <MaterialSymbolsTipsAndUpdates />
            </span>
            <span className="text-lg">Events</span>
          </Link>
          <Link href="#" className="flex items-center space-x-2">
            <span>
              <IconamoonDiscoverFill />
            </span>
            <span className="text-lg">Discover</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4 font-DM-Sans">
          <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-fit py-1.5 px-2 text-[#948b96] rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-10 border border-opacity-10 border-gray-100">
              <MaterialSymbolsAddCircle className="text-xl" />
              <p className="px-1">Create</p>
            </DialogTrigger>
            <CreateEventModal />
          </Dialog>
          <JoinEventDialog />
          <AvatarDropDown />
        </div>
      </nav>
      
    </main>
  );
}
