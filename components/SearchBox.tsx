'use client';
import { SearchIcon } from 'lucide-react';
import { Input } from './ui/input';

export default function SearchBox() {
  return (
    <div className="flex items-center">
      <Input
        type="text"
        className="w-[300px] md:w-[450px] bg-transparent outline-none py-2.5 border border-r-0 border-white border-opacity-10 rounded-[0.75rem_0rem_0_0.75rem]"
      />
      <div className="border border-l-0 border-white border-opacity-10 rounded-[0rem_0.75rem_0.75rem_0rem]">
        <SearchIcon className="w-[20px] m-2" />
      </div>
    </div>
  );
}
