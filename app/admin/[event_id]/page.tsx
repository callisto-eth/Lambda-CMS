'use client';

import Link from 'next/link';

import {
  MaterialSymbolsSettings,
  MingcutePlugin2Fill,
  PhUsersFourDuotone,
  SolarDangerBold,
} from '@/components/common/Icons';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Database, Json } from '@/types/supabase';
import { useToast } from '@/components/ui/use-toast';
import Users from '@/components/admin/pages/Users';
import Danger from '@/components/admin/pages/Danger';
import General from '@/components/settings/pages/General';
import Subevents from '@/components/admin/pages/Subevents';
import { useSearchParams } from 'next/navigation';

const supabase = createClient();

export default function Dashboard({
  params,
}: {
  params: { event_id: string };
}) {
  const [userProfile, setUserProfile] =
    useState<Database['public']['Tables']['profiles']['Row']>();

  const [eventDataResponse, setEventDataResponseData] =
    useState<Database['public']['Tables']['events']['Row']>();

  const searchParams = useSearchParams();
  const tabOption: string = searchParams.get('tabOption') as string;

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
  }, [params.event_id]);

  return (
    eventDataResponse && (
      <div className="*:font-DM-Sans px-8 md:px-12">
        <div className="grid items-start lg:grid-cols-12 gap-y-10">
          <nav className="grid gap-4 text-sm text-muted-foreground *:text-xl col-span-2">
            <Link
              href="?tabOption=General"
              style={{
                color: tabOption === 'General' ? 'white' : '#b4b3b4',
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <MaterialSymbolsSettings />
              <span>General</span>
            </Link>
            <Link
              href="?tabOption=Subevents"
              style={{
                color: tabOption === 'Subevents' ? 'white' : '#b4b3b4',
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <MingcutePlugin2Fill />
              <span>Subevents</span>
            </Link>
            <Link
              href="?tabOption=Users"
              style={{
                color: tabOption === 'Users' ? 'white' : '#b4b3b4',
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <PhUsersFourDuotone />
              <span>Users</span>
            </Link>
            <Link
              href="?tabOption=Danger%20Area"
              style={{
                color: tabOption === 'Danger Area' ? 'white' : '#b4b3b4',
              }}
              className="transition-colors flex items-center gap-x-2 outline-none"
            >
              <SolarDangerBold />
              <span>Danger Area</span>
            </Link>
          </nav>
          {tabOption === 'General' && userProfile && (
            <General eventDataResponse={eventDataResponse} />
          )}
          {tabOption === 'Subevents' && userProfile && (
            <Subevents eventId={params.event_id} />
          )}
          {tabOption === 'Users' && userProfile && (
            <Users eventID={params.event_id} />
          )}
          {tabOption === 'Danger Area' && userProfile && (
            <Danger eventID={params.event_id} />
          )}
        </div>
      </div>
    )
  );
}
