import { X } from 'lucide-react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { DialogOverlay, DialogPortal } from './ui/dialog';
import React from 'react';
import { cn } from '@/lib/utils';

export const GlassDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] focus:outline-none z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] p-6 w-[370px] bg-black rounded-3xl text-white font-DM-Sans bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10',
        className,
      )}
      {...props}
    >
      {children}
      {props.title != 'Profile' && (
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
GlassDialogContent.displayName = 'GlassModalContent';
