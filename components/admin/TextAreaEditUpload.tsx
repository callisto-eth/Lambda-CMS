'use client';

import React, {
  Dispatch,
  SetStateAction,
  TextareaHTMLAttributes,
  useState,
} from 'react';
import { Button } from '../ui/button';
import { CharmTick, MaterialSymbolsEdit } from '../Icons';
import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

export interface TextAreaEditUploadProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  inputClassName?: string;
  pClassName?: string;
  uploadCallback: (
    value: string,
    setEditMode: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
}

export const TextAreaEditUpload = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaEditUploadProps
>(({ inputClassName, pClassName, ...props }, ref) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(props.defaultValue);
  props.uploadCallback.bind(null, editValue as string, setEditMode);
  return editMode ? (
    <p className={cn('flex space-x-8', pClassName)}>
      <TextareaAutosize
        className={cn(
          inputClassName,
          'outline-none resize-none focus:outline-none border-none ',
        )}
        ref={ref}
        defaultValue={editValue}
        onChange={(e) => setEditValue(e.target.value)}
      />
      <Button
        onClick={() => {
          props.uploadCallback(editValue as string, setEditMode);
        }}
        className="transition-colors bg-green-400 hover:bg-green-400/90 h-fit py-1.5 px-2 text-[#212325] rounded-full  bg-opacity-70"
      >
        <CharmTick className="text-lg" />
      </Button>
    </p>
  ) : (
    <p className={cn('flex space-x-8', pClassName)}>
      <span>{editValue}</span>
      <Button
        onClick={() => {
          setEditMode(true);
        }}
        className="transition-colors bg-primary hover:bg-primary/90 h-fit py-1.5 px-2 text-[#212325] rounded-full bg-white bg-opacity-70"
      >
        <MaterialSymbolsEdit className="text-lg" />
      </Button>
    </p>
  );
});
