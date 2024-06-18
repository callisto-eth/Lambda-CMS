'use client';

import { Database } from '@/types/supabase';

import { FlowbiteCaretSortSolid } from '../common/Icons';
import { Badge } from '../ui/badge';
import DataRow from './DataRow';
import { useState } from 'react';

export default function DataTable({
  eventAttendeesResponse,
}: {
  eventAttendeesResponse: Database['public']['Views']['profile_attendees']['Row'][];
}) {
  const [eventAttendees, setEventAttendees] = useState<
    Database['public']['Views']['profile_attendees']['Row'][]
  >(eventAttendeesResponse);
  return (
    <main className="font-DM-Sans">
      <div className="rounded-2xl border border-white border-opacity-10">
        <div className="px-5 py-3 font-semibold text-2xl border-b border-white border-opacity-10 flex items-center space-x-3">
          <p>Your Attendees</p>
          <Badge>Beta</Badge>
        </div>

        <table className="w-full">
          <thead className="bg-[#b4b3b4] w-full">
            <tr className="*:font-semibold *:px-5 *:py-2.5 *:text-[#212325] *:cursor-pointer *:text-left w-full">
              <th
                className="flex items-center space-x-2"
                onClick={() => {
                  const arrayRev = [...eventAttendees].reverse();
                  setEventAttendees(arrayRev);
                }}
              >
                <span>Name</span>
                <FlowbiteCaretSortSolid />
              </th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventAttendees.map((eventAttendee) => {
              return (
                <DataRow eventAttendee={eventAttendee} key={eventAttendee.id} />
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
