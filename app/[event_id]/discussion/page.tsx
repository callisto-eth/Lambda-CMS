'use client';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';
import { MingcuteSendFill } from '@/components/Icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageContent from '@/components/MessageContent';

export default function Chat({ params }: { params: { event_id: string } }) {
  return (
    <main className="relative lg:mx-10 mx-5 *:font-DM-Sans flex flex-col lg:h-[calc(100vh-150px)] h-[calc(100vh-110px)]">
      <ScrollArea className="flex-grow">
        <MessageContent />
        <MessageContent />
      </ScrollArea>
      <MessageBox />
    </main>
  );
}

const MessageBox = () => {
  const sendMessageSchema = z.object({});
  const sendMessageForm = useForm({
    resolver: zodResolver(sendMessageSchema),
  });

  function onSubmit(fieldValues: z.infer<typeof sendMessageSchema>) {}
  return (
    <Form {...sendMessageForm}>
      <form
        onSubmit={sendMessageForm.handleSubmit(onSubmit)}
        className="w-full mt-5 border border-opacity-10 border-[#948B96] bg-background rounded-xl"
      >
        <FormField
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="message" className="sr-only">
                Message
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="resize-none border-0 text-base p-3 px-6 shadow-none focus-visible:ring-0 focus:outline-none focus:ring-0 "
                  />
                  <Button
                    type="submit"
                    className="absolute right-[-10px] font-DM-Sans  bottom-[-15px] inline-flex items-center p-2  justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] hover:bg-[#FB4500] rounded-full text-base bg-[#FB4500] text-[#212325]"
                  >
                    <MingcuteSendFill className="text-2xl" />
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
