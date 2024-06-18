import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

import {
  AntDesignUserSwitchOutlined,
  ClarityAdministratorLine,
  FluentOrganizationHorizontal24Filled,
  MaterialSymbolsAddModerator,
  MaterialSymbolsPersonOutline,
} from '../common/Icons';
import CTAButton from '../common/CTAButton';
import { Database } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../ui/use-toast';
import { handleErrors } from '@/utils/helpers';

export default function DataRow({
  eventAttendee,
}: {
  eventAttendee: Database['public']['Views']['profile_attendees']['Row'];
}) {
  const supabase = createClient();
  const { toast } = useToast();

  async function roleUpdate(
    roleName: 'PARTICIPANT' | 'ADMIN' | 'ORGANIZER',
    eventAttendee: any,
  ) {
    const { error } = await supabase
      .schema('connections')
      .from('event_attendees')
      .update({ role: roleName })
      .eq('id', eventAttendee.id);

    if (error) handleErrors(error.message, 500);

    toast({
      title: '✅ Role Updated',
      description: `Role updated to ${roleName} for ${eventAttendee.username}`,
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <tr className="*:px-5 *:py-3">
      <td>{eventAttendee.username}</td>
      <td>
        {eventAttendee!.role!.charAt(0) +
          eventAttendee!.role!.slice(1).toLocaleLowerCase()}
      </td>
      <td className="space-x-2 flex">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CTAButton>
              <AntDesignUserSwitchOutlined />
              <p>Switch</p>
            </CTAButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="m-2 bg-[#212325]">
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={async () => {
                await roleUpdate('PARTICIPANT', eventAttendee);
              }}
            >
              <MaterialSymbolsPersonOutline />
              <p>Participant</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={async () => {
                await roleUpdate('ADMIN', eventAttendee);
              }}
            >
              <ClarityAdministratorLine />
              <p>Admin</p>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={async () => {
                await roleUpdate('ORGANIZER', eventAttendee);
              }}
            >
              <FluentOrganizationHorizontal24Filled />
              <p>Organizer</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CTAButton variant="lambdaGlow">
              <MaterialSymbolsAddModerator />
              <p>Mod</p>
            </CTAButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="m-2 bg-[#212325]">
            <DropdownMenuItem
              className="flex items-center space-x-2"
              onClick={async () => {
                const { error } = await supabase
                  .schema('connections')
                  .from('event_attendees')
                  .delete()
                  .eq('id', eventAttendee.id!);

                if (error) handleErrors(error.message, 500);

                toast({
                  title: '✅ User Kicked',
                  description: `User kicked from the event`,
                });

                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            >
              <MaterialSymbolsPersonOutline />
              <p>Kick</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
