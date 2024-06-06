'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import timesago from 'timesago';

export default function MessageContent({
  author,
  body,
  timestamp,
}: {
  author: string;
  body: string;
  timestamp: string;
}) {
  const [userName, setUserName] = useState<string>();
  const supabase = createClient();
  useEffect(() => {
    supabase
      .from('profiles')
      .select('username')
      .eq('id', author)
      .single()
      .then((data) => {
        if (data) setUserName(data.data?.username as string);
      });
  }, []);
  return (
    <div className="flex space-x-4 mb-5 mr-5">
      <Avatar>
        <AvatarImage
          src={
            supabase.storage
              .from('user_assets')
              .getPublicUrl(
                `${author}/avatar.png?t=${new Date().toISOString()}`,
              ).data.publicUrl
          }
        ></AvatarImage>
        <AvatarFallback>{userName?.slice(0, 3).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{userName}</p>
          <p className="text-xs text-[#948b96]">{timesago(timestamp)}</p>
        </div>
        <p className="font-light text-sm">{body}</p>
      </div>
    </div>
  );
}
