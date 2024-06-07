'use client';

import Link from 'next/link';

import {
  MaterialSymbolsEdit,
  MaterialSymbolsSettings,
  MingcutePlugin2Fill,
} from '@/components/Icons';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Json } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { TextEditUpload } from '@/components/admin/TextEditUpload';
import { TextAreaEditUpload } from '@/components/admin/TextAreaEditUpload';
import { useToast } from '@/components/ui/use-toast';
const supabase = createClient();

export default function Dashboard({
  params,
}: {
  params: { event_id: string };
}) {
  const [activeTab, setActiveTab] = useState<'General' | 'Plugins'>('General');

  const [userProfile, setUserProfile] = useState<{
    bio: string;
    created_at: string;
    id: string;
    metadata: Json;
    username: string;
    visibility: 'PRIVATE' | 'PUBLIC';
  }>();

  const [eventDataResponse, setEventDataResponseData] = useState<{
    chat: string | null;
    created_at: string;
    description: string;
    end_time: string;
    id: string;
    name: string;
    organizer: string;
    platform: 'ONLINE' | 'OFFLINE' | 'HYBRID';
    spaces: string | null;
    start_time: string;
    visibility: 'PRIVATE' | 'PUBLIC';
  }>();

  useEffect(() => {
    supabase.auth.getUser().then((userData) => {
      if (userData.data.user) {
        supabase
          .from('profiles')
          .select()
          .eq('id', userData.data.user.id)
          .single()
          .then((profileData) => {
            if (profileData.data) {
              setUserProfile(profileData.data);
            }
          });
      }
    });

    supabase
      .from('events')
      .select('*')
      .eq('id', params.event_id)
      .single()
      .then((eventData) => {
        if (eventData.data) {
          setEventDataResponseData(eventData.data);
        }
      });
  }, []);

  const { toast } = useToast();

  return (
    <div className="*:font-DM-Sans px-8 md:px-12">
      <div className="grid items-start lg:grid-cols-12 gap-y-10">
        <nav className="grid gap-4 text-sm text-muted-foreground *:text-xl col-span-2">
          <Link
            href="#"
            style={{
              color: activeTab === 'General' ? 'white' : '#b4b3b4',
            }}
            onClick={() => {
              setActiveTab('General');
            }}
            className="transition-colors flex items-center gap-x-2 outline-none"
          >
            <MaterialSymbolsSettings />
            <span>General</span>
          </Link>
          <Link
            href="#"
            style={{
              color: activeTab === 'Plugins' ? 'white' : '#b4b3b4',
            }}
            onClick={() => {
              setActiveTab('Plugins');
            }}
            className="transition-colors flex items-center gap-x-2 outline-none"
          >
            <MingcutePlugin2Fill />
            <span>Plugins</span>
          </Link>
        </nav>
        {activeTab === 'General' && userProfile && (
          <main className="*:font-DM-Sans col-span-10">
            <div
              className="w-[calc(100vh - 5rem)] md:h-[250px] h-[200px] bg-cover bg-center rounded-[40px] relative flex justify-end"
              style={{
                backgroundImage: `url(${
                  supabase.storage
                    .from('event_assets')
                    .getPublicUrl(
                      `${eventDataResponse?.id}/banner.png?time=${new Date().toISOString()}`,
                    ).data.publicUrl
                })`,
              }}
            >
              <label htmlFor="banner_upload">
                <div className="m-6 transition-colors bg-primary hover:bg-primary/90 h-fit py-1.5 px-2 text-[#212325] rounded-full bg-white bg-opacity-70">
                  <MaterialSymbolsEdit className="cursor-pointer" />
                </div>
                <input
                  type="file"
                  id="banner_upload"
                  className="transition-colors file:mr-5 bg-transparent  h-fit py-1.5 px-2 text-[#212325] rounded-full"
                  hidden
                />
              </label>

              <label
                className="absolute cursor-pointer md:w-[150px] overflow-hidden md:h-[150px] w-[100px] h-[100px] rounded-full bg-cover border-[6px] bottom-[-50px] left-[10%] border-[#212325]"
                style={{
                  backgroundImage: `url(${
                    supabase.storage
                      .from('event_assets')
                      .getPublicUrl(
                        `${eventDataResponse?.id}/avatar.png?time=${new Date().toISOString()}`,
                      ).data.publicUrl
                  })`,
                }}
              >
                <div className="w-full h-full hover:bg-black/50 transition-colors duration-500" />
                <input type="file" id="avatar_upload" hidden />
              </label>
            </div>
            <div className="lg:px-[10%] my-16 space-y-4">
              <TextAreaEditUpload
                defaultValue={eventDataResponse?.name}
                pClassName="text-5xl font-bold"
                inputClassName="w-full"
                uploadCallback={async (editValue, setEditMode) => {
                  if (eventDataResponse) {
                    const updateEventResponse = await fetch(
                      '/api/event/update',
                      {
                        method: 'PUT',
                        body: JSON.stringify({
                          id: eventDataResponse.id,
                          name: editValue,
                        }),
                      },
                    );

                    if (updateEventResponse.status === 200) {
                      toast({
                        title: ' ✅ Event name updated',
                        description: 'Event name has been updated successfully',
                      });

                      setEditMode(false);
                    }
                  }
                }}
              />
              <TextAreaEditUpload
                autoFocus
                defaultValue={eventDataResponse?.description}
                pClassName="text-xl mt-4 font-light"
                inputClassName="w-full"
                uploadCallback={async (editValue, setEditMode) => {
                  if (eventDataResponse) {
                    const updateEventResponse = await fetch(
                      '/api/event/update',
                      {
                        method: 'PUT',
                        body: JSON.stringify({
                          id: eventDataResponse.id,
                          description: editValue,
                        }),
                      },
                    );

                    if (updateEventResponse.status === 200) {
                      toast({
                        title: ' ✅ Event Description updated',
                        description:
                          'Event Description has been updated successfully',
                      });

                      setEditMode(false);
                    }
                  }
                }}
              />
            </div>
          </main>
        )}
        {activeTab === 'Plugins' && userProfile && <div></div>}
      </div>
    </div>
  );
}
