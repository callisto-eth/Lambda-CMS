'use client';

import { z } from 'zod';
import { SolarCalendarAddBoldDuotone } from './Icons';
import { DialogContent } from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CalendarPopover from './CalendarForm';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from './ui/button';
import { useState } from 'react';
import { Separator } from './ui/separator';
import ImageUpload from './ImageUpload';

export default function CreateEventModal() {
  const createEventSchema = z.object({
    event_name: z.string(),
    event_desc: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    event_mode: z.string(),
    base_plugin: z.string(),
    sub_event: z.string(),
  });
  const createEventForm = useForm({
    resolver: zodResolver(createEventSchema),
  });

  const [contentState, setContentState] = useState<
    'basic' | 'plugins' | 'preview'
  >('basic');

  const [uploadedFileBanner, setUploadedBannerFile] = useState<
    string | ArrayBuffer | null
  >();

  const [uploadedFileProfile, setUploadedProfileFile] = useState<
    string | ArrayBuffer | null
  >();

  return (
    <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
      <SolarCalendarAddBoldDuotone className="text-6xl text-[#d83e08]" />
      <div className="leading-tight">
        <p className="text-3xl font-semibold">
          {contentState === 'basic'
            ? 'Basics'
            : contentState === 'plugins'
              ? 'Config'
              : 'Preview'}
        </p>
        <p className="text-lg">
          {contentState === 'basic'
            ? 'We need some basic information about the event you want to host 😀'
            : contentState === 'plugins'
              ? 'Configure and customize your event to the fullest 🎉'
              : 'Preview your event before publishing 🚀'}
        </p>
      </div>
      <Form {...createEventForm}>
        <form className="font-DM-Sans">
          <div
            data-state={contentState}
            className="space-y-4 hidden data-[state=basic]:block mb-4"
          >
            <FormField
              name="event_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      type="text"
                      {...field}
                      className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="event_desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Description"
                      type="text"
                      {...field}
                      className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-2">
              <FormField
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>{CalendarPopover({ field })}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>{CalendarPopover({ field })}</FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="event_mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode</FormLabel>
                  <FormControl>
                    <RadioGroup
                      defaultValue="online"
                      className="flex w-full space-x-2"
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="online" id="r1" />
                        </FormControl>
                        <FormLabel htmlFor="r1">Online</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="offline" id="r2" />
                        </FormControl>
                        <FormLabel htmlFor="r2">Offline</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="hybrid" id="r3" />
                        </FormControl>
                        <FormLabel htmlFor="r3">Hybrid</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div
            data-state={contentState}
            className="hidden data-[state=plugins]:block mb-4"
          >
            <p className="mb-2">Image</p>
            <ImageUpload
              avatarImage={false}
              uploadedFile={uploadedFileBanner}
              setUploadedFile={setUploadedBannerFile}
            />
            <div className="mt-[-40px] ml-[20px]">
              <ImageUpload
                avatarImage={true}
                uploadedFile={uploadedFileProfile}
                setUploadedFile={setUploadedProfileFile}
              />
            </div>
          </div>
          <div
            data-state={contentState}
            className="hidden data-[state=preview]:block"
          >
            {uploadedFileBanner && (
              <div
                className="bg-cover rounded-xl mb-4"
                style={{
                  backgroundImage: `url(${uploadedFileBanner})`,
                  borderRadius: '20px',
                  height: '160px',
                  width: '100%',
                }}
              />
            )}
            {uploadedFileProfile && (
              <div
                className="bg-cover rounded-xl mb-4 mt-[-50px] ml-[20px]"
                style={{
                  backgroundImage: `url(${uploadedFileProfile})`,
                  borderRadius: '100px',
                  height: '80px',
                  width: '80px',
                }}
              />
            )}
          </div>
          <Button
            type="button"
            className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
            onClick={() => {
              if (contentState == 'basic') setContentState('plugins');
              if (contentState == 'plugins') setContentState('preview');
            }}
          >
            {contentState == 'preview' ? 'Publish' : 'Continue'}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
