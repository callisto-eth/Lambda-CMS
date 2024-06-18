'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

import { useToast } from '../../ui/use-toast';
import { PajamasGithub } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';

type Provider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'figma'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'kakao'
  | 'keycloak'
  | 'linkedin'
  | 'linkedin_oidc'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos'
  | 'zoom'
  | 'fly';

type IdType = {
  name: string;
  icon: ReactNode;
  supabaseIdentifier: Provider;
};

const lambdaIdentities: IdType[] = [
  {
    name: 'GitHub',
    icon: <PajamasGithub className="text-5xl" />,
    supabaseIdentifier: 'github',
  },
];

export default function Connections() {
  const { toast } = useToast();

  const supabase = createClient();

  const [userIdents, setUserIdents] = useState<any>();

  useEffect(() => {
    supabase.auth.getUserIdentities().then((data) => {
      setUserIdents(data.data?.identities);
    });
  }, [supabase.auth]);

  return (
    <main className="col-span-10 space-y-4">
      <div className="space-y-1">
        <p className="text-5xl font-bold">Connections</p>
        <p className="text-lg">
          Link your accounts with Lambda and manage your connected accounts 😍
        </p>
      </div>
      <div className="flex space-x-4">
        {userIdents &&
          lambdaIdentities
            .filter((lambdaIdentity) => {
              return !userIdents.slice(1).some((userIdent: any) => {
                return userIdent.provider === lambdaIdentity.supabaseIdentifier;
              });
            })
            .map((lambdaIdentity) => {
              return (
                <Button
                  key={lambdaIdentity.name}
                  onClick={async () => {
                    await supabase.auth.linkIdentity({
                      options: {
                        redirectTo:
                          process.env.NODE_ENV !== 'production'
                            ? 'http://localhost:3000/auth/callback'
                            : 'https://lambda.events/auth/callback',
                      },
                      provider: lambdaIdentity.supabaseIdentifier,
                    });
                  }}
                  className="transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] bg-[#fb4500] text-[#212325] hover: h-fit p-2 rounded-full hover:bg-[#fb4500]"
                >
                  {lambdaIdentity.icon}
                </Button>
              );
            })}
      </div>
      {userIdents &&
        userIdents.slice(1).map((userIdent: any) => {
          return (
            <div
              className="border border-white border-opacity-10 p-5 rounded-3xl"
              key={userIdent.provider}
            >
              {lambdaIdentities
                .filter((lambdaIdentity) => {
                  return (
                    userIdent.provider === lambdaIdentity.supabaseIdentifier
                  );
                })
                .map((lambdaIdentity) => {
                  return (
                    <div
                      key={lambdaIdentity.name}
                      className="flex justify-between items-center"
                    >
                      <div className="flex space-x-4">
                        <div>{lambdaIdentity.icon}</div>
                        <div>
                          <p className="font-bold">
                            {userIdent.identity_data.preferred_username}
                          </p>
                          <p>
                            {userIdent.provider.charAt(0).toUpperCase() +
                              userIdent.provider.slice(1)}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={async () => {
                          await supabase.auth.unlinkIdentity(userIdent);
                          window.location.reload();
                        }}
                        type="button"
                        className="hover:text-white hover:bg-red-500 bg-transparent text-red-500 border border-red-500 p-4 rounded-full text-base"
                      >
                        Unlink Identity
                      </Button>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </main>
  );
}
