'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { CornerDownLeft, Mic, Paperclip } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Message = {
  id: number;
  author: string;
  body: string;
  event: string;
  timestamp: string;
};

export default function MessageTestPage() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);

  async function fetchMessages() {
    supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
        },
        (payload) => {
          setMessages((prev) => [
            ...prev,
            {
              id: payload.new.id,
              author: payload.new.author,
              body: payload.new.body,
              event: payload.new.event,
              timestamp: payload.new.created_at,
            },
          ]);
        },
      )
      .subscribe();
  }

  fetchMessages();

  return (
    <div className="h-full w-full grid">
      <div className="flex flex-col w-full justify-center items-center">
        {messages.map((m) => {
          return (
            <div className="flex items-center gap-8 p-4 w-[90%]" key={m.id}>
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="https://ui.shadcn.com/avatars/01.png"
                  alt="Avatar"
                />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{m.author}</p>
                <p className="text-sm text-muted-foreground">{m.body}</p>
              </div>
              <div className="ml-auto font-medium text-white/40">
                {m.timestamp}
              </div>
            </div>
          );
        })}
        <div className="absolute bottom-[40px] w-full flex flex-col justify-center items-center">
          <SendMessageBox />
        </div>
      </div>
    </div>
  );
}

function SendMessageBox() {
  const [message, setMessage] = useState<string>();

  async function sendMessage(body: string) {
    let testEv = 'fe0bfdbe-dd64-4677-a90b-66f9f129778c';
    fetch('/api/chat/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: testEv,
        body: body,
      }),
    });
  }
  return (
    <form
      className="relative overflow-hidden rounded-lg border border-[#948B96] bg-background focus-within:ring-1 focus-within:ring-ring w-[90%] "
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message || '');
      }}
    >
      <Label htmlFor="message" className="sr-only">
        Message
      </Label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0 text-xl2"
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        onSubmit={(e) => {
          e.currentTarget.value = '';
        }}
      />
      <div className="flex items-center p-3 pt-0">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Paperclip className="size-4" />
                <span className="sr-only">Attach file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Attach File</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Mic className="size-4" />
                <span className="sr-only">Use Microphone</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top">Use Microphone</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button type="submit" size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
  );
}
