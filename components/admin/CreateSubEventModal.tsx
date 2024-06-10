'use client';

import { z } from 'zod';
import { DialogContent } from '../ui/dialog';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { DatePickerWithRange } from '../CalenderRange';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import ImageUpload from '../ImageUpload';
import { useEffect, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

export function CreateSubEventModal({
  eventId,
  setModalState,
}: {
  eventId: string;
  setModalState: (field: boolean) => void;
}) {
  const { toast } = useToast();
  useEffect(() => {}, []);
  const createSubEventSchema = z.object({
    topic: z.string({
      message: 'Please enter a valid topic',
    }),
    description: z.string({
      message: 'Please enter a valid description',
    }),
    date: z.object({
      from: z.date({
        message: 'Please enter a valid date',
      }),
      to: z.date({
        message: 'Please enter a valid date',
      }),
    }),
    entry_price: z.string(),
    banner_image: z.string().optional(),
    max_attendees: z.string(),
    platform: z.enum(['ONLINE', 'OFFLINE', 'HYBRID']),
  });

  const createSubEventForm = useForm({
    resolver: zodResolver(createSubEventSchema),
  });

  async function onSubmit(fieldValues: z.infer<typeof createSubEventSchema>) {
    const createSubeventResponse = await fetch('/api/subevent/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: eventId,
        topic: fieldValues.topic,
        description: fieldValues.description,
        start_time: fieldValues.date.from.toLocaleTimeString(),
        end_time: fieldValues.date.to.toLocaleTimeString(),
        entry_price: fieldValues.entry_price,
        max_attendees: fieldValues.max_attendees,
        platform: fieldValues.platform,
        banner_image: fieldValues.banner_image,
      }),
    });

    if (createSubeventResponse.status === 201) {
      setModalState(false);
      toast({
        title: '✅ Subevent Created',
        description: 'Subevent has been created successfully',
      });
    }
  }

  const [uploadedFileBanner, setUploadedBannerFile] = useState<
    string | ArrayBuffer | null
  >();

  return (
    <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
      <div>
        <p className="text-3xl font-bold text-white">Create</p>
        <p className="text-lg">Create a sub-event for this event 🎉</p>
      </div>
      <ScrollArea className="h-[400px]">
        <Form {...createSubEventForm}>
          <form
            className="space-y-4 mr-6"
            onSubmit={createSubEventForm.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          >
            <div>
              <p className="mb-2">Image</p>
              <ImageUpload
                formField={createSubEventForm}
                avatarImage={false}
                uploadedFile={uploadedFileBanner}
                setUploadedFile={setUploadedBannerFile}
              />
            </div>
            <FormField
              name="topic"
              control={createSubEventForm.control}
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
              name="description"
              control={createSubEventForm.control}
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
              control={createSubEventForm.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    {DatePickerWithRange({ field, className: 'w-full' })}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="platform"
              control={createSubEventForm.control}
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
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="HYBRID" id="r3" />
                        </FormControl>
                        <FormLabel htmlFor="r3">Hybrid</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="max_attendees"
              control={createSubEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Attendees</FormLabel>
                  <FormControl>
                    <Input
                      min={1}
                      placeholder="Max Attendees"
                      type="number"
                      {...field}
                      className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="entry_price"
              control={createSubEventForm.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entry Price</FormLabel>
                  <FormControl>
                    <Input
                      min={0}
                      placeholder="Entry Price"
                      type="number"
                      {...field}
                      className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
            >
              Publish
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
}
