'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { createClient } from '@/utils/supabase/client';
import { error } from 'console';
import { useToast } from './ui/use-toast';
import { set } from 'date-fns';

export default function ConnectionButton({
  IdentityIcon,
}: {
  IdentityIcon: ReactNode;
}) {
  const [userIdents, setUserIdents] = useState<any>();

  useEffect(() => {
    supabase.auth.getUserIdentities().then((data) => {
      setUserIdents(data.data?.identities);
    });
  }, []);

  const { toast } = useToast();

  const supabase = createClient();
  return (
    <div className="flex space-x-4">
      {userIdents &&
      userIdents?.some((identity: any) => identity.provider === 'github') ? (
        <Button
          className="inline-flex items-center p-2 justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
          onClick={async () => {
            {
              const githubIdentity = userIdents?.find(
                (identity: any) => identity.provider === 'github',
              );

              const { data, error } =
                await supabase.auth.unlinkIdentity(githubIdentity);

              setUserIdents(
                userIdents.filter(
                  (identity: any) => identity.provider !== 'github',
                ),
              );

              if (error) {
                toast({
                  title: '❌ Error',
                  description: error.message,
                });
              }

              toast({
                title: '✅ Success',
                description: 'Successfully Unlinked',
              });
            }
          }}
        >
          {IdentityIcon}
        </Button>
      ) : (
        <Button
          className="transition-colors  text-primary-foreground hover:bg-primary/90 h-fit p-2 text-[#948b96] rounded-full bg-clip-padding backdrop-filter text-base bg-transparent backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100"
          onClick={async () => {
            await supabase.auth.linkIdentity({
              provider: 'github',
              options: {
                redirectTo: 'http://localhost:3000/@me/settings',
              },
            });
          }}
        >
          {IdentityIcon}
        </Button>
      )}
    </div>
  );
}
