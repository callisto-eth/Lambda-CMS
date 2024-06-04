'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

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

  async function sendMessage() {
    let testEv = 'fe0bfdbe-dd64-4677-a90b-66f9f129778c';
    fetch('/api/chat/message/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: testEv,
        body: 'test message',
      }),
    
    })
  }
  fetchMessages();

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send message
      </button>
      {messages.map((m) => {
        return (
          <div key={m.id}>
            <p>{m.author}</p>
            <p>{m.body}</p>
            <p>{m.event}</p>
            <p>{m.timestamp}</p>
          </div>
        );
      })}
    </div>
  );
}
