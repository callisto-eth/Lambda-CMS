import { dataURLtoFile } from '@/utils/helpers';
import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function POST(req: NextRequest) {
  const supabaseClient = createClient();

  const reqJSON = await req.json();

  if (reqJSON.spaceId && reqJSON.postTitle && reqJSON.postContent) {
    const postID = v4();
    if (reqJSON.mediaFiles) {
      const mediaFiles: File[] = reqJSON.mediaFiles.map((file: string) => {
        return dataURLtoFile(file, 'image');
      });

      mediaFiles.forEach(async (mediaFile, fileIndex) => {
        const { error: mediaUploadError } = await supabaseClient.storage
          .from('space_assets')
          .upload(`${reqJSON.spaceId}/${postID}/${fileIndex}`, mediaFile);

        if (mediaUploadError) {
          return NextResponse.json(
            {
              data: null,
              error: mediaUploadError.message,
              status: 500,
            },
            {
              status: 500,
            },
          );
        }
      });
    }

    const { data: postInsertResponse, error: postInsertError } =
      await supabaseClient
        .schema('connections')
        .from('spaces_posts')
        .insert({
          id: postID,
          space: reqJSON.spaceId,
          title: reqJSON.postTitle,
          content: reqJSON.postContent,
          author: reqJSON.authorID,
        })
        .select('*')
        .single();

    if (postInsertError) {
      return NextResponse.json(
        {
          data: null,
          error: postInsertError.message,
          status: 500,
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(
      {
        error: null,
        data: postInsertResponse,
        status: 200,
      },
      {
        status: 200,
      },
    );
  }

  return NextResponse.json(
    {
      data: null,
      error: 'Bad Request',
      status: 400,
    },
    {
      status: 400,
    },
  );
}
