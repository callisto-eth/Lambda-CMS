'use client';

import { DialogContent } from '../ui/dialog';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { createClient } from '@/utils/supabase/client';
import { Database } from '@/types/supabase';
import { DateTimePicker } from '../ui/date-time-picker';
import { useToast } from '../ui/use-toast';
import SearchAddress from '../ui/search-addresses';

export default function UpdateSubEventModal({
  subEventId,
  setEditModalState,
}: {
  setEditModalState: (state: boolean) => void;
  subEventId: string;
}) {
  const updateSubEventForm = useForm();
  const supabaseClient = createClient();
  const [subEventResponse, setSubEventResponse] =
    useState<Database['public']['Tables']['sub_events']['Row']>();

  const { toast } = useToast();

  useEffect(() => {
    supabaseClient
      .from('sub_events')
      .select()
      .eq('id', subEventId)
      .single()
      .then((response) => {
        if (response.data) {
          setSubEventResponse(response.data);
        }
      });
  }, []);

  async function onSubmit(fieldValues: any) {
    Object.keys(fieldValues).forEach((key) =>
      fieldValues[key] === undefined ? delete fieldValues[key] : {},
    );

    const { data, error } = await supabaseClient
      .from('sub_events')
      .update(fieldValues)
      .eq('id', subEventId);

    if (error) {
      toast({
        title: '❌ Error',
        description: error.message,
      });
    } else {
      if (data) {
        toast({
          title: '✅ Success',
          description: 'Subevent updated successfully',
        });
      }
    }

    setEditModalState(false);
  }

  return (
    subEventResponse && (
      <DialogContent className="p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10">
        <div className="space-y-1">
          <p className="text-4xl font-bold">Configuration</p>
          <p>Update the subevent details 🎉</p>
        </div>
        <Form {...updateSubEventForm}>
          <form
            className="space-y-4"
            onSubmit={updateSubEventForm.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          >
            <FormField
              name="start_time"
              control={updateSubEventForm.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    {
                      <DateTimePicker
                        initialValue={new Date(Date.now())}
                        date={field.value}
                        setDate={field.onChange}
                      />
                    }
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="end_time"
              control={updateSubEventForm.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    {
                      <DateTimePicker
                        initialValue={
                          new Date(updateSubEventForm.watch('start_time'))
                        }
                        date={field.value}
                        setDate={field.onChange}
                      />
                    }
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="platform"
              control={updateSubEventForm.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Mode</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
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
                );
              }}
            />
            <div className="flex items-center space-x-4">
              <FormField
                name="max_attendees"
                control={updateSubEventForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Attendees</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        defaultValue={subEventResponse.max_attendees}
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
                control={updateSubEventForm.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Price</FormLabel>
                    <FormControl>
                      <Input
                        min={0}
                        defaultValue={subEventResponse.entry_price}
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
            </div>
            <FormField
              name="metadata"
              control={updateSubEventForm.control}
              render={({ field }) => {
                return (
                  updateSubEventForm.watch('platform') &&
                  (updateSubEventForm.watch('platform') === 'ONLINE' ? (
                    <FormItem>
                      <FormLabel>Redirect Link</FormLabel>
                      <FormControl>
                        <Input
                          required
                          value={field.value?.link}
                          onChange={(eV) => {
                            field.onChange({
                              link: eV.target.value,
                            });
                          }}
                          className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                          placeholder="Enter a link to redirect to"
                        />
                      </FormControl>
                    </FormItem>
                  ) : updateSubEventForm.watch('platform') === 'OFFLINE' ? (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <SearchAddress onSelectLocation={field.onChange} />
                      </FormControl>
                    </FormItem>
                  ) : (
                    <p>Feature not Available</p>
                  ))
                );
              }}
            />
            <Button
              type="submit"
              className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
            >
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    )
  );
}
