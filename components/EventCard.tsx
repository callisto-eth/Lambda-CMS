import {
  MajesticonsStatusOnline,
  MaterialSymbolsAlarm,
  PhCaretRightBold,
} from '@/components/Icons';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { createClient } from '@/utils/supabase/client';

export default function EventCard({ fetchedEvent }: { fetchedEvent: any }) {
  const supabase = createClient();

  const people = [
    {
      id: 1,
      name: 'John Doe',
      designation: 'Software Engineer',
      image:
        'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80',
    },
    {
      id: 2,
      name: 'Robert Johnson',
      designation: 'Product Manager',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: 'Jane Smith',
      designation: 'Data Scientist',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
  ];
  return (
    <div className="relative cursor-pointer">
      <svg
        width="350"
        height="292"
        viewBox="0 0 350 292"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[350px] h-auto absolute z-[-1]"
      >
        <g filter="url(#filter0_b_201_571)">
          <path
            d="M24 53C24 36.4315 37.4315 23 54 23H94V93H24V53Z"
            fill="white"
            fillOpacity="0.1"
          />
          <path
            d="M94.5 23V22.5H94H54C37.1553 22.5 23.5 36.1553 23.5 53V93V93.5H24H94H94.5V93V23Z"
            stroke="white"
            strokeOpacity="0.13"
          />
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M304 0H130.725C108.081 0 89.7246 18.3563 89.7246 41V48.1824C89.7246 70.8261 71.3683 89.1824 48.7246 89.1824H41C18.3563 89.1824 0 107.539 0 130.182V245.419C0 270.825 20.5949 291.419 46 291.419H304C329.405 291.419 350 270.825 350 245.42V46C350 20.5949 329.405 0 304 0Z"
          fill="#2B2D2E"
        />
        <defs>
          <filter
            id="filter0_b_201_571"
            x="11.6"
            y="10.6"
            width="94.8"
            height="94.8"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.7" />
            <feComposite
              in2="SourceAlpha"
              operator="in"
              result="effect1_backgroundBlur_201_571"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_backgroundBlur_201_571"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
      <div className="w-[350px] h-[290px] p-2 grid grid-rows-12 grid-cols-12 *:font-DM-Sans">
        <div className="col-span-3 pl-3 pt-1 space-y-[-6px] *:text-center *:font-bold *:text-[#FB4500] place-self-center row-span-4">
          <p className="text-base">DEC</p>
          <p className="text-3xl">29</p>
        </div>
        <div className="col-span-9 flex justify-between items-center text-sm row-span-1 px-5 pt-1 font-semibold *:text-[#FB4500]">
          <p className="flex items-center space-x-1">
            <MaterialSymbolsAlarm />
            <span>
              {fetchedEvent.start_time
                .split('T')[1]
                .split('+')[0]
                .split(':', 2)
                .join(':')}
            </span>
          </p>
          <p className="flex items-center space-x-1">
            <MajesticonsStatusOnline />
            <span>
              {fetchedEvent.platform.charAt(0) +
                fetchedEvent.platform.slice(1).toLowerCase()}
            </span>
          </p>
        </div>
        <div className="row-span-3 text-left col-span-9 px-5 text-3xl font-bold leading-tight">
          {fetchedEvent.name}
        </div>
        <div className="col-span-12 row-span-2 flex justify-between items-center">
          <div className="flex items-center ml-1 mb-2 flex-grow">
            <AnimatedTooltip items={people} />
            <p className="ml-6">+ 432 People</p>
          </div>
          <div className="mr-2 flex items-center space-x-1 mb-2 cursor-pointer">
            <span>Details</span>
            <PhCaretRightBold className="text-sm" />
          </div>
        </div>
        <div
          className="col-span-12 row-span-6 bg-cover rounded-[40px]"
          style={{
            backgroundImage: `url(${
              supabase.storage
                .from('event_assets')
                .getPublicUrl(`${fetchedEvent.id}/banner.png`).data.publicUrl
            })`,
          }}
        ></div>
      </div>
    </div>
  );
}
