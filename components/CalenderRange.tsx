'use effect';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

export function DatePickerWithRange({
  className,
  field,
}: React.HTMLAttributes<HTMLDivElement> & { field: any }) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-fit px-3 hover:bg-transparent hover:text-white justify-start text-left font-normal rounded-xl transparent bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-white border-opacity-10',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field?.value ? (
              field.value.to ? (
                <>
                  {format(field.value.from, 'LLL dd, y')} -{' '}
                  {format(field.value.to, 'LLL dd, y')}
                </>
              ) : (
                format(field.value.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 overflow-hidden rounded-2xl"
          align="start"
        >
          <Calendar
            className="dark:bg-[#212325]"
            initialFocus
            mode="range"
            defaultMonth={field?.from}
            selected={field.value}
            onSelect={field.onChange}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
