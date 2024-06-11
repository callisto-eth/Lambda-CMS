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
import { useToast } from '@/components/ui/use-toast';
import Users from '@/components/admin/pages/Users';
import Danger from '@/components/admin/pages/Danger';
import General from '@/components/settings/pages/General';
import Subevents from '@/components/admin/pages/Subevents';

const supabase = createClient();

export default function Dashboard({
  params,
}: {
  params: { event_id: string };
}) {
  const [activeTab, setActiveTab] = useState<
    'General' | 'Subevents' | 'Users' | 'Danger Area'
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

  const { toast } = useToast();

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
                color: activeTab === 'Subevents' ? 'white' : '#b4b3b4',
              }}
              onClick={() => {
                setActiveTab('Subevents');
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <MingcutePlugin2Fill />
              <span>Subevents</span>
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
            <General eventDataResponse={eventDataResponse} />
          )}
          {activeTab === 'Subevents' && userProfile && (
            <Subevents eventId={params.event_id} />
          )}
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
