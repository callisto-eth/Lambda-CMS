'use client';

import EventCard from '@/components/EventCard';
import { MaterialSymbolsFilterVintage, PhGearFill } from '@/components/Icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [userProfile, setUserProfile] = useState<
    Database['public']['Tables']['profiles']['Row'] | null
  >();

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

  const [userImage, setUserImage] = useState<string | null>();
  const [userEvents, setUserEvents] = useState<
    Database['public']['Tables']['events']['Row'][] | null
  >();

  useEffect(() => {
    if (userProfile) {
      setUserImage(
        supabaseClient.storage
          .from('user_assets')
          .getPublicUrl(
            `${userProfile.id}/avatar.png?t=${new Date().toISOString()}`,
          ).data.publicUrl,
      );

      supabaseClient
        .schema('connections')
        .from('event_attendees')
        .select()
        .eq('attendee', userProfile.id)
        .then((data) => {
          if (data.data)
            data.data.map((event) => {
              supabaseClient
                .from('events')
                .select()
                .eq('id', event.event)
                .single()
                .then((eventData) => {
                  if (!userEvents && eventData.data) {
                    setUserEvents([eventData.data]);
                  } else {
                    if (userEvents)
                      setUserEvents([...userEvents, eventData.data!]);
                  }
                });
            });
        });
    }
  }, [userProfile]);

  return (
    <main className="md:px-12 px-10 *:font-DM-Sans grid md:grid-cols-16 gap-x-10">
      <div className="md:col-span-12 space-y-5">
        <div>
          <p className="text-4xl font-medium tracking-tight">
            Upcoming <span className="text-[#fb4500] ">Events</span>
          </p>
          <div className="grid md:grid-cols-2 mt-5">
            {userEvents
              ?.filter((event) => {
                return event.start_time > new Date().toISOString();
              })
              .map((event) => (
                <EventCard fetchedEvent={event} key={event.id} />
              ))}
          </div>
        </div>
        <div>
          <p className="text-4xl font-medium tracking-tight">
            Past <span className="text-[#fb4500] ">Events</span>
          </p>
          <div className="grid md:grid-cols-2 mt-5">
            {userEvents
              ?.filter((event) => {
                return event.start_time > new Date().toISOString();
              })
              .map((event) => (
                <EventCard fetchedEvent={event} key={event.id} />
              ))}
          </div>
        </div>
      </div>

      {userProfile && (
        <div className="h-fit col-span-4 hidden md:flex flex-col items-center space-y-4 overflow-hidden bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
          <div
            className=" w-full relative h-[100px] bg-cover"
            style={{
              backgroundImage: `url(https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_uLyfLM67vyCg6g2be6u6dUiifpf3AY0tcaE_FlKcMFi4pl4N1k4HzYqP2h7Xu945HEIdV96Ps7eSMF_GWpGTLbj2W0nxg5yhzP31jUwdtlKN71lcKL0jAceVGTv_5Hv2tm5mChtMDdVk6yak3dgbME3xe4r9b_yokZRekuoFGzNA=s0-d)`,
            }}
          >
            <div
              className="absolute bottom-[-30px] left-[30px] w-[70px] h-[70px] bg-cover rounded-full flex justify-end"
              style={{
                backgroundImage: `url(${userImage})`,
              }}
            >
              <div className="w-[20px] h-[20px] bg-green-400 rounded-full border-transparent"></div>
            </div>
          </div>
          <div className="w-full flex justify-end px-4">
            <Link href="/@me/settings">
              <PhGearFill className="text-2xl" />
            </Link>
          </div>
          <div className="w-full px-4">
            <p className="font-semibold text-4xl ">{userProfile?.username}</p>
            <p className="text-[#948b96]">{userProfile?.bio}</p>
          </div>
          <div className="flex w-full pb-2 ">
            <div className="w-full px-4">
              <div>
                <p className="text-xs font-bold text-[#938a95]">
                  EVENTS JOINED
                </p>
                <p className="text-4xl">69</p>
              </div>
            </div>
            <div className="w-full px-3 ">
              <div>
                <p className="text-xs font-bold text-[#938a95]">
                  UPCOMING EVENTS
                </p>
                <p className="text-4xl">None</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
