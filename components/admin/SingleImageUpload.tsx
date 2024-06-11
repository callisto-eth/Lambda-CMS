'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { CharmTick, MaterialSymbolsEdit } from '../Icons';
import { useToast } from '../ui/use-toast';

export default function SingleImageUpload({
  defaultValue,
  uploadCallback,
}: {
  defaultValue: string;
  uploadCallback: (file: File) => Promise<void>;
}) {
  const [uploadImage, setUploadImage] = useState<File | null>();
  const [imageTempURL, setImageTempURL] = useState<
    string | ArrayBuffer | null
  >();

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
          setImageTempURL(dataUrl);
        };

        fileReader.readAsDataURL(eV.target.files[0]);
      }
    },
    [],
  );
  const { toast } = useToast();
  return (
    <label
      className="absolute cursor-pointer md:w-[150px] overflow-hidden md:h-[150px] w-[100px] h-[100px] rounded-full bg-cover border-[6px] bottom-[-50px] left-[10%] border-[#212325]"
      htmlFor="image_upload"
      style={{
        backgroundImage: `url(${imageTempURL ? imageTempURL : defaultValue})`,
      }}
    >
      <div
        onClick={async () => {
          if (uploadImage) {
            await uploadCallback(uploadImage);
            setUploadImage(null);
          }
        }}
        className="opacity-0 hover:transition-colors hover:opacity-100 w-full h-full hover:bg-black/50 transition-colors duration-500 flex justify-center items-center"
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
          id="image_upload"
          hidden
          onChange={(eV) => {
            fileReaderCallback(eV);
          }}
        />
      ) : (
        <></>
      )}
    </label>
  );
}
