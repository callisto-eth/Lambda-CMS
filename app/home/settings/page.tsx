'use client';

import Link from 'next/link';

import {
  IconParkSolidCircularConnection,
  MaterialSymbolsEdit,
  MaterialSymbolsSettings,
} from '@/components/Icons';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Json } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const supabaseClient = createClient();

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'General' | 'Connections'>(
    'General',
  );

  const { toast } = useToast();

  const [userProfile, setUserProfile] = useState<{
    bio: string;
    created_at: string;
    id: string;
    metadata: Json;
    username: string;
    visibility: 'PRIVATE' | 'PUBLIC';
  }>();

  useEffect(() => {
    supabaseClient.auth.getUser().then((userData) => {
      if (userData.data.user) {
        supabaseClient
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
  }, []);

  const updateProfileSchema = z.object({
    id: z.string().optional(),
    username: z.string({
      required_error: "Username can't be empty",
    }),
    bio: z.string({
      required_error: "Bio can't be empty",
    }),
    visibility: z.enum(['PUBLIC', 'PRIVATE'], {
      required_error: 'Please select a visibility option',
    }),
  });

  const updateProfileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  function onSubmit(fieldValues: z.infer<typeof updateProfileSchema>) {
    fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldValues),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(() => {
        toast({
          title: '✅ Profile Updated',
          description:
            'Your profile has been updated successfully. Enjoy the new look of yours 😍',
        });
      });
  }

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
              color: activeTab === 'Connections' ? 'white' : '#b4b3b4',
            }}
            onClick={() => {
              setActiveTab('Connections');
            }}
            className="transition-colors flex items-center gap-x-2 outline-none"
          >
            <IconParkSolidCircularConnection />
            <span>Connections</span>
          </Link>
        </nav>
        {activeTab === 'General' && userProfile ? (
          <div className="space-y-4 col-span-10">
            <p className="text-5xl font-semibold">General</p>
            <Form {...updateProfileForm}>
              <form
                className="grid md:grid-cols-12 gap-y-16 md:gap-16"
                onSubmit={updateProfileForm.handleSubmit(
                  onSubmit as SubmitHandler<FieldValues>,
                )}
              >
                <div className="col-span-4 md:order-1">
                  <div
                    className="w-[200px] h-[200px] bg-cover rounded-full relative"
                    style={{
                      backgroundImage: `url(${
                        supabaseClient.storage
                          .from('user_assets')
                          .getPublicUrl(`${userProfile?.id}/avatar.png`).data
                          .publicUrl
                      })`,
                    }}
                  >
                    <Button className="p-4 bg-[#FB4500] hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] transition-shadow hover:bg-[#FB4500] rounded-full w-fit h-fit absolute bottom-0">
                      <MaterialSymbolsEdit className="text-xl" />
                    </Button>
                  </div>
                </div>
                <div className="col-span-8 space-y-4 mb-5 lg:mb-0">
                  <FormField
                    name="username"
                    control={updateProfileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            required
                            className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                            type="text"
                            defaultValue={userProfile?.username}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Your name may appear around Lambda whenever you create
                          an event and so on. You can remove it at any time.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="bio"
                    control={updateProfileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Input
                            defaultValue={userProfile?.bio}
                            required
                            className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                            type="text"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us about yourself. This will be displayed on your
                          profile.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="visibility"
                    control={updateProfileForm.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profile Visibility</FormLabel>
                        <FormControl>
                          <RadioGroup
                            defaultValue={userProfile?.visibility}
                            className="flex w-full space-x-2"
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="PUBLIC" id="r1" />
                              </FormControl>
                              <FormLabel htmlFor="r1">Public</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="PRIVATE" id="r2" />
                              </FormControl>
                              <FormLabel htmlFor="r2">Private</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormDescription>
                          You can be Sneaky Beaky or completely Visible 🤣
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={!updateProfileForm.formState.isDirty}
                    className="font-DM-Sans py-3 px-10 rounded-xl w-fit bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
                  >
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        ) : (
          <div className="grid gap-6 col-span-10"></div>
        )}
      </div>
    </div>
  );
}
