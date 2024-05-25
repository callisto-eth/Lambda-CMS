import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { FormControl } from './ui/form';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export default function CalendarPopover({ field }: { field: any }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'w-full px-2 text-left font-DM-Sans rounded-xl p-2 bg-transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              format(field.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
