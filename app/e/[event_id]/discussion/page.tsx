'use client';

import { Textarea } from '@/components/ui/textarea';

import { Button } from '@/components/ui/button';
import { MingcuteSendFill } from '@/components/common/Icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { z } from 'zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageContent from '@/components/event/MessageContent';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type Message = {
  author: string;
  chat: string;
  content: string;
  created_at: string;
  id: number;
  media: string[];
};

export default function Chat({ params }: { params: { event_id: string } }) {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatID, setChatID] = useState<string>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    supabase.auth.getUser().then((user) => {
      if (user.data?.user) {
        supabase
          .from('profiles')
          .select('username')
          .eq('id', user.data.user.id)
          .single()
          .then((data) => {
            if (data) setUserName(data.data?.username as string);
          });
      }
    });
    supabase
      .from('events')
      .select('*')
      .eq('id', params.event_id)
      .single()
      .then((data) => {
        if (data.data) {
          setChatID(data.data?.chat as string);
          fetch(`/api/chat/message/fetch?chat=${data.data?.chat}`, {
            method: 'GET',
          })
            .then((res) => res.json())
            .then((data) => {
              setMessages(data.data);
            });
        }
      });
  }, [params.event_id, supabase]);

  async function streamMessages(chat: string) {
    supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'connections',
          table: 'chat_messages',
          filter: `chat=eq.${chat}`,
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            {
              id: payload.new.id,
              author: payload.new.author,
              media: [],
              content: payload.new.content,
              chat: payload.new.chat,
              created_at: payload.new.created_at,
            },
          ]);
        },
      )
      .subscribe();
  }

  streamMessages(chatID as string);

  return (
    <main className="relative lg:mx-10 mx-5 *:font-DM-Sans flex flex-col lg:h-[calc(100vh-150px)] h-[calc(100vh-110px)]">
      <ScrollArea className="flex-grow">
        {messages.map((m, i) => {
          return (
            <MessageContent
              key={i}
              author={m.author}
              body={m.content}
              timestamp={m.created_at}
            />
          );
        })}
      </ScrollArea>
      <MessageBox chat={chatID as string} />
    </main>
  );
}

const MessageBox = ({ chat }: { chat: string }) => {
  const sendMessageSchema = z.object({
    message: z.string().min(1),
  });
  const sendMessageForm = useForm({
    resolver: zodResolver(sendMessageSchema),
  });

  function onSubmit(fieldValues: z.infer<typeof sendMessageSchema>) {
    sendMessageForm.setValue('message', '');
    fetch('/api/chat/message/send', {
      method: 'POST',
      body: JSON.stringify({
        chat: chat,
        body: fieldValues.message,
      }),
    });
  }
  return (
    <Form {...sendMessageForm}>
      <form
        onSubmit={sendMessageForm.handleSubmit(
          onSubmit as SubmitHandler<FieldValues>,
        )}
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
                    {...field}
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
