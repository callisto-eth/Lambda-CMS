'use client';

import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from '../ui/input';
import { SolarCloudUploadBoldDuotone } from './Icons';
import { toast } from '../ui/use-toast';

export default function ImageUpload({
  size,
  avatarImage,
  uploadedFile,
  setUploadedFile,
  formField,
}: {
  size?: 'big' | 'small';
  avatarImage: boolean;
  uploadedFile: string | ArrayBuffer | null | undefined;
  setUploadedFile: Dispatch<
    SetStateAction<string | ArrayBuffer | null | undefined>
  >;
  formField: any;
}) {
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      acceptedFiles.forEach((acceptedFile) => {
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
          formField.setValue(
            avatarImage ? 'profile_image' : 'banner_image',
            dataUrl,
          );
          setUploadedFile(dataUrl);
        };

        fileReader.readAsDataURL(acceptedFile);
      });
    },
    [setUploadedFile, avatarImage, formField],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div>
        {!uploadedFile && (
          <label
            {...getRootProps()}
            className="relative flex flex-col items-center justify-center py-6 border border-gray-300 border-opacity-10 cursor-pointer bg-transparent"
            style={{
              borderRadius: !avatarImage ? '20px' : '100px',
              height: avatarImage
                ? size == 'big'
                  ? '160px'
                  : '80px'
                : '160px',
              width: avatarImage ? (size == 'big' ? '160px' : '80px') : '100%',
              backgroundColor: avatarImage ? '#0e0f10' : 'transparent',
            }}
          >
            <div className="text-center">
              <div className="rounded-md max-w-min mx-auto">
                <SolarCloudUploadBoldDuotone className="text-5xl text-gray-600" />
              </div>

              {!avatarImage && (
                <>
                  <p className="mt-2 text-sm text-gray-600">
                    <span className="font-semibold">Drag files</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Click to upload files &#40;files should be under 10 MB &#41;
                  </p>
                </>
              )}
            </div>
          </label>
        )}

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          className="hidden"
        />

        {uploadedFile && (
          <div
            className="bg-cover rounded-xl"
            style={{
              backgroundImage: `url(${uploadedFile})`,
              borderRadius: !avatarImage ? '20px' : '100px',
              height: avatarImage
                ? size == 'big'
                  ? '160px'
                  : '80px'
                : '160px',
              width: avatarImage ? (size == 'big' ? '160px' : '80px') : '100%',
            }}
          ></div>
        )}
      </div>
    </div>
  );
}
