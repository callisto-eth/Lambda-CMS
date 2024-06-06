'use client';

import {
  Mail,
  MessageSquare,
  Plus,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MaterialSymbolsCalendarMonthRounded,
  MaterialSymbolsJoin,
  PepiconsPencilLeave,
} from './Icons';
import Link from 'next/link';
import JoinEventDialog from './JoinEventDialog';
import CreateEventModal from './CreateEventModal';
import { Dialog } from './ui/dialog';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export function AvatarDropDown() {
  const supabaseClient = createClient();

  const [isCreateEventDialogOpen, setIsCreateEventDialogOpen] = useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<any>();

  useEffect(() => {
    supabaseClient.auth.getUser().then((user) => {
      if (user) setUserProfile(user.data.user);
    });
  }, []);
  return (
    <Dialog
      open={isCreateEventDialogOpen || isJoinDialogOpen}
      onOpenChange={
        isCreateEventDialogOpen
          ? setIsCreateEventDialogOpen
          : setIsJoinDialogOpen
      }
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="select-none cursor-pointer">
          <Avatar>
            <AvatarImage
              src={
                supabaseClient.storage
                  .from('user_assets')
                  .getPublicUrl(
                    `${userProfile?.id}/avatar.png?t=${new Date().toISOString()}`,
                  ).data.publicUrl
              }
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px] m-5 rounded-xl dark:bg-[#2b2d2e]">
          <DropdownMenuGroup className="*:rounded-lg">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/@me/events" className="flex items-center">
                <MaterialSymbolsCalendarMonthRounded className="mr-2 h-4 w-4" />
                <span>My Events</span>
              </Link>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/@me/settings">Settings</Link>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="*:rounded-lg *:cursor-pointer">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Invite friends</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Username</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem></DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => {
                setIsCreateEventDialogOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>New Event</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setIsJoinDialogOpen(true);
              }}
            >
              <MaterialSymbolsJoin className="mr-2 h-4 w-4" />
              <span>Join Event</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const { error } = await supabaseClient.auth.signOut();
                if (!error) window.location.reload();
              }}
            >
              <PepiconsPencilLeave className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {isCreateEventDialogOpen ? (
        <CreateEventModal setModalState={setIsCreateEventDialogOpen} />
      ) : (
        <JoinEventDialog />
      )}
    </Dialog>
  );
}
