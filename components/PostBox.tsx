import { Button } from './ui/button';
import { IconParkSolidLike, MingcuteComment2Fill } from './Icons';
import { Database } from '@/types/supabase';
import timesago from 'timesago';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function PostBox({
  eventName,
  postResponse,
}: {
  eventName: string;
  postResponse: Database['public']['Views']['profile_posts']['Row'];
}) {
  const supabaseClient = createClient();
  const [postLikes, setPostLikes] = useState(
    postResponse.likes as string[] | undefined,
  );
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    setAvatarUrl(
      supabaseClient.storage
        .from('user_assets')
        .getPublicUrl(
          `/${postResponse.author}/avatar.png?time=${new Date().toISOString()}`,
        ).data.publicUrl,
    );
  }, [postResponse.author]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    supabaseClient.auth.getUser().then((userData) => {
      if (userData.data.user && postLikes) {
        setIsLiked(postLikes.includes(userData.data.user.id));
      }
    });
  }, []);

  return (
    <div className="space-y-4 border-t-[1px] border-[#948b96] border-opacity-30 mt-4 pt-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div
            className="bg-cover rounded-full w-[50px] h-[50px]"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          ></div>
          <div>
            <p>{postResponse.username}</p>
            <p className="text-xs text-[#948b96]">e/{`${eventName}`}</p>
          </div>
        </div>
        <p className="text-sm text-[#948b96]">
          {timesago(postResponse.created_at as string)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{postResponse.title}</p>
        <pre className="font-extralight font-DM-Sans whitespace-pre-wrap leading-tight">
          {postResponse.content}
        </pre>
      </div>
      <div className="flex space-x-2">
        <Button
          type="button"
          onClick={async () => {
            const userData = await supabaseClient.auth.getUser();
            if (userData.data.user) {
              if (isLiked) {
                setIsLiked(false);
                setPostLikes(
                  postLikes?.filter((like) => like !== postResponse.author),
                );
                const { data, error } = await supabaseClient
                  .schema('connections')
                  .from('spaces_posts')
                  .update({
                    likes: postResponse.likes?.filter(
                      (like) => like !== userData.data.user!.id,
                    ),
                  })
                  .eq('id', postResponse.id as string)
                  .select('likes')
                  .single();
              } else {
                setIsLiked(true);
                if (postLikes?.includes(userData.data.user.id)) {
                  setIsLiked(false);
                  return;
                }
                const { data, error } = await supabaseClient
                  .schema('connections')
                  .from('spaces_posts')
                  .update({
                    likes: postResponse.likes
                      ? [
                          ...Array.from(postResponse.likes),
                          userData.data.user.id,
                        ]
                      : [userData.data.user.id],
                  })
                  .eq('id', postResponse.id as string)
                  .select('likes')
                  .single();

                if (data) setPostLikes(data.likes as string[]);
                if (error) {
                  setIsLiked(false);
                }
              }
            }
          }}
          className={cn(
            'inline-flex px-3 items-center justify-center hover:bg-red-400 hover:text-[#212325] h-fit py-1.5 text-red-400 rounded-full text-base bg-transparent backdrop-blur-sm border border-red-400',
            isLiked && 'bg-red-400 text-[#212325]',
          )}
        >
          <IconParkSolidLike className="text-xl" />
          <p className="px-1">{postLikes?.length}</p>
        </Button>
      </div>
    </div>
  );
}
