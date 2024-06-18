'use client';

import Link from 'next/link';

import {
  CharmTick,
  IconParkSolidCircularConnection,
  MaterialSymbolsEdit,
  MaterialSymbolsSettings,
  PajamasGithub,
} from '@/components/common/Icons';
import { useEffect, useState, SVGProps, ReactNode } from 'react';
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import ImageUpload from '@/components/common/ImageUpload';
import { dataURLtoFile } from '@/utils/helpers';
import { error } from 'console';
import Connections from '@/components/settings/pages/Connections';

const supabase = createClient();

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
  }, []);

  useEffect(() => {
    if (userProfile) {
      setProfileImage(
        supabase.storage
          .from('user_assets')
          .getPublicUrl(
            `${userProfile.id}/avatar.png?t=${new Date().toISOString()}`,
          ).data.publicUrl,
      );
    }
  }, [userProfile]);

  const [uploadedFileProfile, setUploadedProfileFile] = useState<
    string | ArrayBuffer | null
  >();

  const [profileImage, setProfileImage] = useState<string | undefined>();

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

  const updateProfileImageSchema = z.object({
    profile_image: z.string({
      required_error: 'Please select a profile image',
    }),
  });

  const updateProfileForm = useForm({
    resolver: zodResolver(updateProfileSchema),
  });

  const updateProfileImageForm = useForm({
    resolver: zodResolver(updateProfileImageSchema),
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

  async function onSubmitProfileImage(
    fieldValues: z.infer<typeof updateProfileImageSchema>,
  ) {
    if (userProfile) {
      let { error: uploadAvatarImageError } = await supabase.storage
        .from('user_assets')
        .upload(
          `${userProfile.id}/avatar.png`,
          dataURLtoFile(fieldValues.profile_image, 'avatar.png'),
          { upsert: true, cacheControl: '1' },
        );

      if (uploadAvatarImageError) {
        return toast({
          title: '🚨 Image Upload',
          description: uploadAvatarImageError.message,
        });
      }

      setProfileImage(
        supabase.storage
          .from('user_assets')
          .getPublicUrl(
            `${userProfile.id}/avatar.png?t=${new Date().toISOString()}`,
          ).data.publicUrl,
      );

      return toast({
        title: '✅ Image Uploaded',
        description: 'Your profile image has been updated successfully.',
      });
    }
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
            <div className="grid md:grid-cols-12 gap-y-16 md:gap-16">
              <div className="col-span-4 md:order-1">
                <Form {...updateProfileImageForm}>
                  <form
                    onSubmit={updateProfileImageForm.handleSubmit(
                      onSubmitProfileImage as SubmitHandler<FieldValues>,
                    )}
                    className="w-[200px] h-[200px] bg-cover rounded-full relative"
                    style={{
                      backgroundImage: `url(${profileImage})`,
                    }}
                  >
                    <FormField
                      name="profile_image"
                      control={updateProfileImageForm.control}
                      render={({ field }) => (
                        <FormItem className="profile_image">
                          <FormControl>
                            <Dialog>
                              <DialogTrigger>
                                <Button
                                  type="button"
                                  className="p-4 bg-[#FB4500] hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] transition-shadow hover:bg-[#FB4500] rounded-full w-fit h-fit absolute bottom-0"
                                >
                                  <MaterialSymbolsEdit className="text-xl" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent
                                className="p-1 rounded-full bg-[#212325]"
                                title="Profile"
                              >
                                <ImageUpload
                                  size="big"
                                  formField={updateProfileImageForm}
                                  avatarImage={true}
                                  uploadedFile={uploadedFileProfile}
                                  setUploadedFile={setUploadedProfileFile}
                                />
                                <Button
                                  disabled={uploadedFileProfile === undefined}
                                  type="button"
                                  onClick={() => {
                                    updateProfileImageForm.handleSubmit(
                                      onSubmitProfileImage as SubmitHandler<FieldValues>,
                                    )();
                                  }}
                                  className="p-4 bg-[#FB4500] hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] transition-shadow hover:bg-[#FB4500] rounded-full w-fit h-fit absolute bottom-0 right-0"
                                >
                                  <CharmTick className="text-xl" />
                                </Button>
                              </DialogContent>
                            </Dialog>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
              <Form {...updateProfileForm}>
                <form
                  onSubmit={updateProfileForm.handleSubmit(
                    onSubmit as SubmitHandler<FieldValues>,
                  )}
                  className="col-span-8 space-y-4 mb-5 lg:mb-0"
                >
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
                  <Button
                    type="submit"
                    disabled={!updateProfileForm.formState.isDirty}
                    className="font-DM-Sans py-3 px-10 rounded-xl w-fit bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
                  >
                    Save
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        ) : (
          <></>
        )}
        {activeTab === 'Connections' && userProfile && <Connections />}
      </div>
    </div>
  );
}
