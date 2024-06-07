'use client';

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';

import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { DataTable } from '../DataTable';

export default function Users({ eventID }: { eventID: string }) {
  type User = {
    userName: string;
    userRole: string;
  };

  const columnDef: ColumnDef<User>[] = [
    {
      accessorKey: 'userName',
      header: 'Name',
    },
    {
      accessorKey: 'userRole',
      header: 'Role',
    },
  ];

  const fakeData: User[] = [
    {
      userName: 'John Doe',
      userRole: 'Organizer',
    },
    {
      userName: 'Jane Doe',
      userRole: 'Participant',
    },
  ];

  const supabaseClient = createClient();

  const dataTable = useReactTable({
    data: fakeData,
    columns: columnDef,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    supabaseClient
      .schema('connections')
      .from('event_attendees')
      .select()
      .eq('event', eventID)
      .then((response) => {
        if (response.data) setEventAttendeesResponse(response.data);
      });
  }, []);
  const [eventAttendeesResponse, setEventAttendeesResponse] =
    useState<Database['connections']['Tables']['event_attendees']['Row'][]>();

  return (
    eventAttendeesResponse && (
      <main className="col-span-10">
        <DataTable tableColumns={columnDef} tableData={fakeData} />
      </main>
    )
  );
}
