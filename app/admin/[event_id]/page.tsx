'use client';

import Link from 'next/link';

import {
  MaterialSymbolsSettings,
  MingcutePlugin2Fill,
  PhUsersFourDuotone,
  SolarDangerBold,
} from '@/components/Icons';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Json } from '@/types/supabase';
import { TextAreaEditUpload } from '@/components/admin/TextAreaEditUpload';
import { useToast } from '@/components/ui/use-toast';
import SingleImageUpload from '@/components/admin/SingleImageUpload';
import BannerImageUpload from '@/components/admin/BannerImageUpload';
import Users from '@/components/admin/pages/Users';
import Danger from '@/components/admin/pages/Danger';
const supabase = createClient();

export default function Dashboard({
  params,
}: {
  params: { event_id: string };
}) {
  const [activeTab, setActiveTab] = useState<
    'General' | 'Plugins' | 'Users' | 'Danger Area'
  >('General');

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

  useEffect(() => {
    setEventAvatar(
      supabase.storage
        .from('event_assets')
        .getPublicUrl(
          `${eventDataResponse?.id}/avatar.png?time=${new Date().toISOString()}`,
        ).data.publicUrl,
    );
    setEventBanner(
      supabase.storage
        .from('event_assets')
        .getPublicUrl(
          `${eventDataResponse?.id}/banner.png?time=${new Date().toISOString()}`,
        ).data.publicUrl,
    );
  }, [eventDataResponse]);

  const { toast } = useToast();

  const [eventAvatar, setEventAvatar] = useState<string>();
  const [eventBanner, setEventBanner] = useState<string>();

  return (
    eventDataResponse && (
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
            <Link
              href="#"
              style={{
                color: activeTab === 'Users' ? 'white' : '#b4b3b4',
              }}
              onClick={() => {
                setActiveTab('Users');
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <PhUsersFourDuotone />
              <span>Users</span>
            </Link>
            <Link
              href="#"
              style={{
                color: activeTab === 'Danger Area' ? 'white' : '#b4b3b4',
              }}
              onClick={() => {
                setActiveTab('Danger Area');
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <SolarDangerBold />
              <span>Danger Area</span>
            </Link>
          </nav>
          {activeTab === 'General' && userProfile && (
            <main className="*:font-DM-Sans col-span-10">
              <div
                className="w-[calc(100vh - 5rem)] md:h-[250px] h-[200px] bg-cover bg-center rounded-[40px] relative flex justify-end"
                style={{
                  backgroundImage: `url(${eventBanner})`,
                }}
              >
                <BannerImageUpload
                  defaultValue={eventBanner as string}
                  setDefaultValue={setEventBanner}
                  uploadCallback={async (uploadImage) => {
                    const { error } = await supabase.storage
                      .from('event_assets')
                      .update(
                        `${eventDataResponse?.id}/banner.png`,
                        uploadImage,
                      );

                    if (error) {
                      toast({
                        title: '❌ Image Upload',
                        description: 'File reading errored out',
                      });
                    }

                    toast({
                      title: '✅ Image Upload',
                      description: 'Image uploaded successfully',
                    });
                  }}
                />
                <SingleImageUpload
                  defaultValue={eventAvatar as string}
                  uploadCallback={async (uploadImage) => {
                    const { error } = await supabase.storage
                      .from('event_assets')
                      .update(
                        `${eventDataResponse?.id}/avatar.png`,
                        uploadImage,
                      );

                    if (error) {
                      toast({
                        title: '❌ Image Upload',
                        description: 'File reading errored out',
                      });
                    }

                    toast({
                      title: '✅ Image Upload',
                      description: 'Image uploaded successfully',
                    });
                  }}
                />
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
                          description:
                            'Event name has been updated successfully',
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
          {activeTab === 'Users' && userProfile && (
            <Users eventID={params.event_id} />
          )}
          {activeTab === 'Danger Area' && userProfile && (
            <Danger eventID={params.event_id} />
          )}
        </div>
      </div>
    )
  );
}
