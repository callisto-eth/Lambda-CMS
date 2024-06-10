'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import { CharmTick, MaterialSymbolsEdit } from '../Icons';
import { useToast } from '../ui/use-toast';

export default function BannerImageUpload({
  defaultValue,
  setDefaultValue,
  uploadCallback,
}: {
  defaultValue: string;
  setDefaultValue: (value: string) => void;
  uploadCallback: (file: File) => Promise<void>;
}) {
  const [uploadImage, setUploadImage] = useState<File | null>();
  const { toast } = useToast();
  const fileReaderCallback = useCallback(
    (eV: ChangeEvent<HTMLInputElement>) => {
      if (eV.target.files?.length !== 0 && eV.target.files) {
        setUploadImage(eV.target.files[0]);

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
          setDefaultValue(dataUrl as string);
        };

        fileReader.readAsDataURL(eV.target.files[0]);
      }
    },
    [setDefaultValue, toast],
  );

  return (
    <label htmlFor="banner_upload">
      <div
        onClick={async () => {
          if (uploadImage) {
            await uploadCallback(uploadImage);
            setUploadImage(null);
          }
        }}
        className="m-6 transition-colors bg-primary hover:bg-primary/90 h-fit py-1.5 px-2 text-[#212325] rounded-full bg-white bg-opacity-70"
      >
        {!uploadImage ? (
          <MaterialSymbolsEdit className="text-lg" />
        ) : (
          <CharmTick className="text-lg" />
        )}
      </div>
      {!uploadImage ? (
        <input
          type="file"
          id="banner_upload"
          className="transition-colors file:mr-5 bg-transparent  h-fit py-1.5 px-2 text-[#212325] rounded-full"
          onChange={(eV) => {
            fileReaderCallback(eV);
          }}
          hidden
        />
      ) : (
        <></>
      )}
    </label>
  );
}
