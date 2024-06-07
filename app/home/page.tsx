'use client';

import { MaterialSymbolsFilterVintage } from '@/components/Icons';
import PostBox from '@/components/PostBox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Json } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userProfile, setUserProfile] = useState<{
    bio: string;
    created_at: string;
    id: string;
    metadata: Json;
    username: string;
    visibility: 'PRIVATE' | 'PUBLIC';
  } | null>();

  const supabaseClient = createClient();
  useEffect(() => {
    supabaseClient.auth.getUser().then((userData) => {
      if (userData.data.user) {
        supabaseClient
          .from('profiles')
          .select()
          .eq('id', userData.data.user.id)
          .single()
          .then((userData) => {
            if (userData) {
              setUserProfile(userData.data);
            }
          });
      }
    });
  }, []);

  return (
    <main className="px-5 md:px-10 *:font-DM-Sans grid md:grid-cols-16 gap-x-10">
      <div className="col-span-4 grid grid-flow-row-dense">
        <div></div>
      </div>
      <div className="col-span-8">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-fit py-1.5 px-2 text-[#948b96] rounded-full bg-clip-padding backdrop-filter text-base bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
            <MaterialSymbolsFilterVintage className="text-xl" />
            <p className="px-1">Filter</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent></DropdownMenuContent>
        </DropdownMenu>
        <PostBox />
        <PostBox />
      </div>

      <div className="col-span-4 hidden md:flex flex-col items-center space-y-4 bg-[#2B2D2E] h-fit rounded-3xl overflow-hidden">
        <div className="bg-red-400 w-full relative h-[100px]">
          <div
            className="absolute bottom-[-30px] left-[30px] w-[70px] h-[70px] bg-cover rounded-full flex justify-end"
            style={{
              backgroundImage: `url(${supabaseClient.storage.from('user_assets').getPublicUrl(`${userProfile?.id}/avatar.png?t=${new Date().toISOString()}`).data.publicUrl})`,
            }}
          >
            <div className="w-[20px] h-[20px] bg-green-400 rounded-full border-transparent"></div>
          </div>
        </div>
        <div className="w-full p-4">
          <p className="font-semibold text-4xl mt-3">{userProfile?.username}</p>
          <p className="text-[#948b96]">{userProfile?.bio}</p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
