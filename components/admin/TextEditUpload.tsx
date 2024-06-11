'use client';

import React, { InputHTMLAttributes, useState } from 'react';
import { Button } from '../ui/button';
import { CharmTick, MaterialSymbolsEdit } from '../Icons';
import { cn } from '@/lib/utils';

export interface TextEditUploadProps
  extends InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string;
  pClassName?: string;
  buttonVariant?: string;
}

export const TextEditUpload = React.forwardRef<
  HTMLInputElement,
  TextEditUploadProps
>(({ inputClassName, pClassName, ...props }, ref) => {
  const [editMode, setEditMode] = useState(false);
  return editMode ? (
    <p
      className={cn(
        'flex items-center w-fit ',
        pClassName,
        props.className,
        props.buttonVariant !== 'small' ? `space-x-8` : `space-x-4`,
      )}
    >
      <input
        className={cn(
          inputClassName,
          props.className,
          'outline-none focus:outline-none border-none my-[-7.5px]',
        )}
        ref={ref}
        {...props}
      />
      <Button
        onClick={() => {
          setEditMode(false);
        }}
        className="transition-colors bg-green-400 hover:bg-green-400/90 h-fit py-1.5 px-2 text-[#212325] rounded-full  bg-opacity-70"
      >
        <CharmTick
          className={props.buttonVariant !== 'small' ? `text-lg` : `text-xs`}
        />
      </Button>
    </p>
  ) : (
    <p
      className={cn('flex items-center space-x-8', pClassName, props.className)}
    >
      <span>{props.defaultValue}</span>
      <Button
        onClick={() => {
          setEditMode(true);
        }}
        className="transition-colors bg-primary hover:bg-primary/90 h-fit py-1.5 px-2 text-[#212325] rounded-full bg-white bg-opacity-70"
      >
        <MaterialSymbolsEdit
          className={props.buttonVariant !== 'small' ? `text-lg` : `text-xs`}
        />
      </Button>
    </p>
  );
});

TextEditUpload.displayName = 'TextEditUpload';
