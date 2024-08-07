'use client';

import { z } from 'zod';
import {
  EosIconsThreeDotsLoading,
  MajesticonsStatusOnline,
  PhCaretLeft,
  SolarCalendarAddBoldDuotone,
} from '../common/Icons';
import { DialogContent } from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import ImageUpload from '../common/ImageUpload';
import { DatePickerWithRange } from '../common/CalenderRange';
import { Checkbox } from '../ui/checkbox';
import { CreateEventSchema } from '@/app/api/event/create/route';
import { animatePageIn } from '@/utils/animation';
import { useToast } from '../ui/use-toast';
import { createEventSchema } from '@/types/subevent';

export default function CreateEventModal({
  setModalState,
}: {
  setModalState: (val: boolean) => void;
}) {
  const createEventForm = useForm({
    resolver: zodResolver(createEventSchema),
  });

  const [contentState, setContentState] = useState<
    'basic' | 'plugins' | 'preview'
  >('basic');

  useEffect(() => {
    createEventForm.formState.isValid;
  }, [contentState, createEventForm.formState.isValid]);

  const [uploadedFileBanner, setUploadedBannerFile] = useState<
    string | ArrayBuffer | null
  >();

  const [uploadedFileProfile, setUploadedProfileFile] = useState<
    string | ArrayBuffer | null
  >();

  const [createdEvent, setCreatedEvent] = useState<CreateEventSchema | null>();

  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  function onSubmit(values: z.infer<typeof createEventSchema>) {
    if (isPublished) {
      setIsSubmitting(true);
      const uploadData: CreateEventSchema = {
        name: values.event_name,
        description: values.event_desc,
        start_time: values.date.from.toISOString(),
        end_time: values.date.to.toISOString(),
        spaces_enabled: values.spaces_enabled || false,
        chat_enabled: values.chat_enabled || false,
        platform: values.event_mode.toUpperCase() as 'ONLINE' | 'OFFLINE',
        visibility: values.event_visibility.toUpperCase() as
          | 'PRIVATE'
          | 'PUBLIC',
        avatar_image: uploadedFileProfile as string,
        banner_image: uploadedFileBanner as string,
      };
      fetch('/api/event/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }).then((res) => {
        res.json().then((data) => {
          if (data.data) {
            console.log('Hello');

            const modalData = document.createElement('div');
            modalData.className = 'flex justify-center items-center flex-col';
            const modalText = document.createElement('p');
            modalText.innerText = `🎉 Your event was successfully created`;
            modalText.className =
              'font-DM-Sans text-4xl font-medium text-white';
            modalData.appendChild(modalText);
            setCreatedEvent(data.data);
            setModalState(false);
            animatePageIn(() => {}, modalData);
            setIsSubmitting(false);
          } else {
            toast({
              title: '❌ Error',
              description: 'There was an error creating your event',
            });
            setIsSubmitting(false);
          }
        });
      });
    }
  }

  const [isPublished, setIsPublished] = useState(false);

  return (
    <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
      <PhCaretLeft
        className="absolute top-4 left-4 cursor-pointer font-bold text-current"
        onClick={() => {
          if (contentState == 'plugins') setContentState('basic');
          if (contentState == 'preview') setContentState('plugins');
        }}
      />
      <div className="leading-tight mt-6">
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
        <form
          className="font-DM-Sans"
          onSubmit={createEventForm.handleSubmit(
            onSubmit as SubmitHandler<FieldValues>,
          )}
        >
          <div
            data-state={contentState}
            className="space-y-4 hidden data-[state=basic]:block mb-4"
          >
            <FormField
              name="event_name"
              control={createEventForm.control}
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
              control={createEventForm.control}
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
            <FormField
              name="date"
              control={createEventForm.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    {DatePickerWithRange({
                      field,
                      className: 'w-full',
                      fromDate: new Date(),
                    })}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="event_mode"
              control={createEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex w-full space-x-2"
                      onValueChange={field.onChange}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ONLINE" id="r1" />
                        </FormControl>
                        <FormLabel htmlFor="r1">Online</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="OFFLINE" id="r2" />
                        </FormControl>
                        <FormLabel htmlFor="r2">Offline</FormLabel>
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
            className="hidden data-[state=plugins]:block space-y-4"
            style={{
              marginBottom: !createdEvent ? '1rem' : '0',
            }}
          >
            <div>
              <p className="mb-2">Image</p>
              <ImageUpload
                formField={createEventForm}
                avatarImage={false}
                uploadedFile={uploadedFileBanner}
                setUploadedFile={setUploadedBannerFile}
              />
              <div className="mt-[-40px] ml-[20px]">
                <ImageUpload
                  formField={createEventForm}
                  avatarImage={true}
                  uploadedFile={uploadedFileProfile}
                  setUploadedFile={setUploadedProfileFile}
                />
              </div>
            </div>
            <FormField
              name="event_visibility"
              control={createEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event visibility</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex w-full space-x-2"
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
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="spaces_enabled"
              control={createEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enable spaces</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="flex"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="chat_enabled"
              control={createEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enable chat</FormLabel>
                  <FormControl>
                    <Checkbox
                      className="flex"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div
            data-state={contentState}
            className="hidden data-[state=preview]:block mb-4"
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
                className="bg-cover rounded-xl mt-[-50px] ml-[20px] space-y-2"
                style={{
                  backgroundImage: `url(${uploadedFileProfile})`,
                  borderRadius: '100px',
                  height: '80px',
                  width: '80px',
                }}
              />
            )}
            <p className="text-2xl font-semibold">
              {createEventForm.getValues()['event_name']}
            </p>
            <p>{createEventForm.getValues()['event_desc']}</p>
            <p className="flex items-center space-x-2">
              <SolarCalendarAddBoldDuotone />
              <span>
                {`${
                  createEventForm
                    .getValues()
                    ['date']?.from.toString()
                    .split(' ')[1]
                } ${
                  createEventForm
                    .getValues()
                    ['date']?.from.toString()
                    .split(' ')[2]
                } - ${
                  createEventForm
                    .getValues()
                    ['date']?.to?.toString()
                    .split(' ')[1]
                } ${
                  createEventForm
                    .getValues()
                    ['date']?.to?.toString()
                    .split(' ')[2]
                }`}
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <MajesticonsStatusOnline />
              <span>
                {createEventForm.getValues()['event_mode']?.charAt(0) +
                  createEventForm
                    .getValues()
                    ['event_mode']?.slice(1)
                    .toLowerCase()}
              </span>
            </p>
          </div>
          {contentState != 'preview' ? (
            <Button
              type="button"
              disabled={
                !createEventForm.formState.isValid && contentState == 'plugins'
              }
              className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
              onClick={() => {
                if (contentState == 'basic') setContentState('plugins');
                if (
                  contentState == 'plugins' &&
                  createEventForm.formState.isValid
                )
                  setContentState('preview');
              }}
            >
              Continue
            </Button>
          ) : (
            !createdEvent && (
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setIsPublished(true)}
                className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
              >
                {isSubmitting ? (
                  <EosIconsThreeDotsLoading className="text-3xl" />
                ) : (
                  'Publish'
                )}
              </Button>
            )
          )}
        </form>
      </Form>
    </DialogContent>
  );
}
