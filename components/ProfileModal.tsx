'use client';

import ImageUpload from '@/components/ImageUpload';
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { profileSchema } from '@/types/subevent';
import { animatePageIn } from '@/utils/animation';
import { createClient } from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { GlassDialogContent } from './GlassModalContent';

const Dialog = dynamic(
  () => import('@/components/ui/dialog').then((mod) => mod.Dialog),
  { ssr: false },
);
export default function ProfileModal() {
  const [uploadedFileProfile, setUploadedProfileFile] = useState<
    string | ArrayBuffer | null
  >();
  const [modalState, setModalState] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then((userData) => {
      if (userData.data.user) {
        supabase
          .from('profiles')
          .select()
          .eq('id', userData.data.user.id)
          .then((data) => {
            if (data.data?.length === 0) setModalState(true);
          });
      }
    });
  }, [supabase]);

  const profileForm = useForm({ resolver: zodResolver(profileSchema) });

  function onSubmit(fieldValues: z.infer<typeof profileSchema>) {
    fetch('/api/profile/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldValues),
    })
      .then((res) => res.json())
      .then(() => {
        const modalData = document.createElement('div');
        modalData.className = 'flex justify-center items-center flex-col';
        const userName = document.createElement('p');
        const profileImage = document.createElement('div');
        profileImage.className =
          'w-[100px] bg-cover h-[100px] rounded-full shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_5px_#fb4500,0_0_15px_#fb4500,0_0_30px_#fb4500] my-5';
        profileImage.style.backgroundImage = `url(${fieldValues['profile_image']})`;
        userName.innerText = `Welcome, ${fieldValues['username']}`;
        userName.className = 'font-DM-Sans text-4xl font-medium text-white';
        modalData.appendChild(userName);
        modalData.appendChild(profileImage);

        setModalState(false);
        animatePageIn(() => {}, modalData);
      });
  }

  return (
    <div>
      <Dialog open={modalState} onOpenChange={setModalState} modal>
        <GlassDialogContent
          title="Profile"
          onInteractOutside={(eV) => {
            eV.preventDefault();
          }}
          onEscapeKeyDown={(eV) => {
            eV.preventDefault();
          }}
        >
          <div className="leading-tight">
            <p className="text-3xl font-semibold">Profile</p>
            <p className="text-lg">
              Craft your event persona and join the excitement with a click –
              create your profile now!
            </p>
          </div>
          <Form {...profileForm}>
            <form
              className="space-y-4"
              onSubmit={profileForm.handleSubmit(
                onSubmit as SubmitHandler<FieldValues>,
              )}
            >
              <FormField
                name="profile_image"
                control={profileForm.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        formField={profileForm}
                        avatarImage={true}
                        uploadedFile={uploadedFileProfile}
                        setUploadedFile={setUploadedProfileFile}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="username"
                control={profileForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="bio"
                control={profileForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input
                        required
                        className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={!profileForm.formState.isValid}
                className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
              >
                Save
              </Button>
            </form>
          </Form>
        </GlassDialogContent>
      </Dialog>
    </div>
  );
}
