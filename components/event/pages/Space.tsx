'use client';

import { GlassDialogContent } from '@/components/common/GlassModalContent';
import {
  MaterialSymbolsAddCircle,
  MaterialSymbolsCancel,
  MaterialSymbolsLightAttachment,
} from '@/components/common/Icons';
const PostBox = lazy(() => import('@/components/common/PostBox'));
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Database } from '@/types/supabase';
import { handleErrors } from '@/utils/helpers';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangeEvent,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Space({
  spaceId,
  eventName,
}: {
  spaceId: string;
  eventName: string;
}) {
  const [imageDataURLs, setImageDataURLs] = useState<(string | ArrayBuffer)[]>(
    [],
  );

  const [spacePosts, setSpacePosts] =
    useState<Database['public']['Views']['profile_posts']['Row'][]>();

  useEffect(() => {
    fetch('/api/space/posts/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ spaceId: spaceId }),
    })
      .then((res) => res.json())
      .then(({ data, error, status }) => {
        if (error) handleErrors(error, status);
        if (data) setSpacePosts(data);
      });
  }, [spaceId]);

  const [modalState, setModalState] = useState(false);

  const { toast } = useToast();

  const fileReaderCallback = useCallback(
    (eV: ChangeEvent<HTMLInputElement>) => {
      if (eV.target.files?.length !== 0 && eV.target.files) {
        const fileReader = new FileReader();
        fileReader.onabort = () =>
          toast({
            title: 'Image Upload',
            description: 'File reading was aborted',
          });
        fileReader.onerror = () =>
          toast({
            title: 'Image Upload',
            description: 'File reading errored out',
          });
        fileReader.onload = async () => {
          const dataUrl = fileReader.result;
          if (dataUrl) setImageDataURLs((prev) => [...prev, dataUrl]);
        };

        Array.from(eV.target.files).forEach((file) => {
          fileReader.readAsDataURL(file);
        });
      }
    },
    [setImageDataURLs, toast],
  );

  const createPostSchema = z.custom<
    Database['connections']['Tables']['spaces_posts']['Insert'] & {
      mediaFiles: FileList;
    }
  >((fieldValues) => {
    if (imageDataURLs.length > 0) fieldValues.mediaFiles = imageDataURLs;
    if (fieldValues.title && fieldValues.title.trim().length === 0) {
      return false;
    }
    if (fieldValues.content && fieldValues.content.trim().length === 0) {
      return false;
    }

    return true;
  });

  const createPostForm = useForm({
    resolver: zodResolver(createPostSchema),
  });

  async function onSubmit(fieldValues: z.infer<typeof createPostSchema>) {
    const {
      data,
      error,
      status,
    }: {
      data: Database['connections']['Tables']['spaces_posts']['Row'] | null;
      error: string | null;
      status: number;
    } = await (
      await fetch('/api/space/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          spaceId: spaceId,
          postTitle: fieldValues.title,
          postContent: fieldValues.content,
          mediaFiles: fieldValues.mediaFiles,
        }),
      })
    ).json();

    if (error || status !== 200) {
      toast({
        title: '❌ Post Creation',
        description: error,
      });
    } else {
      setModalState(false);
      toast({
        title: '🎉 Post Creation',
        description: 'Post created successfully',
      });
      createPostForm.reset();
      setImageDataURLs([]);
    }
  }

  return (
    <main className="mt-5">
      <div className="flex items-center space-x-2">
        <Dialog open={modalState} onOpenChange={setModalState}>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-fit transition-shadow hover:shadow-[0_0_2px_#fb4500,inset_0_0_2px_#fb4500,0_0_2px_#fb4500,0_0_10px_#fb4500,0_0_10px_#fb4500] py-1.5 px-2 hover:bg-[#FB4500] rounded-full text-base space-x-2 bg-[#FB4500] text-[#212325]">
            <MaterialSymbolsAddCircle className="text-xl" />
            <p className="pr-1">New</p>
          </DialogTrigger>
          <GlassDialogContent>
            <div className="leading-tight space-y-1">
              <p className="text-3xl font-semibold">Create</p>
              <p>Conjure your creativity and create a new post 😀</p>
            </div>
            <Form {...createPostForm}>
              <form
                className="space-y-2"
                onSubmit={createPostForm.handleSubmit(
                  onSubmit as SubmitHandler<FieldValues>,
                )}
              >
                <FormField
                  name="title"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Title"
                            className="bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  name="content"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Content"
                            className="bg-transparent resize-none h-[150px] outline-none py-2.5 border border-white border-opacity-10 rounded-xl"
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                {imageDataURLs.length > 0 && (
                  <div className="space-y-2 ">
                    <p>Attachements</p>
                    <div className="flex space-x-2">
                      {imageDataURLs.map((imageDataURL, index) => {
                        return (
                          <div
                            key={imageDataURL.toString() + '_' + index}
                            className="bg-cover bg-center w-20 h-20 rounded-xl relative"
                            style={{
                              backgroundImage: `url(${imageDataURL})`,
                            }}
                          >
                            <MaterialSymbolsCancel
                              className="absolute right-0 m-1 cursor-pointer"
                              onClick={() => {
                                setImageDataURLs((prev) =>
                                  prev.filter((_, i) => i !== index),
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                {imageDataURLs.length < 3 && (
                  <div className="border border-white border-opacity-10 w-fit rounded-xl cursor-pointer">
                    <label htmlFor="fileUpload">
                      <MaterialSymbolsLightAttachment className="text-2xl m-3 cursor-pointer" />
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      disabled={imageDataURLs.length >= 3}
                      className="transition-colors file:mr-5 bg-transparent  h-fit py-1.5 px-2 text-[#212325] rounded-full"
                      onChange={(eV) => {
                        fileReaderCallback(eV);
                        eV.target.value = '';
                        eV.target.files = null;
                      }}
                      hidden
                    />
                  </div>
                )}
                <Button
                  disabled={createPostForm.formState.isSubmitting}
                  type="submit"
                  className="font-DM-Sans p-3 rounded-xl w-full bg-[#323132] text-md font-semibold text-[#b4b3b4] hover:bg-[#b4b3b4] hover:text-[#323132]"
                >
                  Publish
                </Button>
              </form>
            </Form>
          </GlassDialogContent>
        </Dialog>
      </div>
      <div>
        {spacePosts &&
          spacePosts.map((spacePost) => {
            return (
              <Suspense
                key={spacePost.id}
                fallback={
                  <Skeleton className="w-full h-[200px] rounded-3xl my-5" />
                }
              >
                <PostBox
                  postResponse={spacePost}
                  key={spacePost.id}
                  eventName={eventName}
                />
              </Suspense>
            );
          })}
      </div>
    </main>
  );
}
