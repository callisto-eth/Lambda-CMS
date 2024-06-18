'use client';

import * as React from 'react';
import { add, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TimePickerDemo } from './time-picker-demo';

export function DateTimePicker({
  initialValue,
  date,
  setDate,
}: {
  initialValue: Date;
  date: Date;
  setDate: (...event: any[]) => void;
}) {
  const handleSelect = React.useCallback(
    (newDay: Date | undefined) => {
      if (!newDay) return;
      if (!date) {
        setDate(newDay);
        return;
      }
      const diff = newDay.getTime() - date.getTime();
      const diffInDays = diff / (1000 * 60 * 60 * 24);
      const newDateFull = add(date, { days: Math.ceil(diffInDays) });
      setDate(newDateFull);
    },
    [date, setDate],
  );

  React.useEffect(() => {
    handleSelect(initialValue);
  }, [handleSelect, initialValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'bg-transparent outline-none py-2.5 border border-white border-opacity-10 rounded-xl w-full justify-start',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP HH:mm:ss') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-xl overflow-hidden">
        <Calendar
          mode="single"
          className="bg-[#212325]"
          fromDate={initialValue}
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border bg-[#212325]">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
