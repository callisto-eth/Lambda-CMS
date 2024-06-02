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
        width="472"
        height="393"
        viewBox="0 0 472 393"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[350px] h-auto absolute z-[-1]"
      >
        <g filter="url(#filter0_b_201_571)">
          <path
            d="M27 53C27 36.4315 40.4315 23 57 23H127V123H27V53Z"
            fill="white"
            fill-opacity="0.1"
          />
          <path
            d="M127.5 23V22.5H127H57C40.1553 22.5 26.5 36.1553 26.5 53V123V123.5H27H127H127.5V123V23Z"
            stroke="white"
            stroke-opacity="0.13"
          />
        </g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M426 0H162C139.356 0 121 18.3563 121 41V79.2689C121 101.913 102.644 120.269 80 120.269H41C18.3563 120.269 0 138.625 0 161.269V347C0 372.405 20.5949 393 46 393H426C451.405 393 472 372.405 472 347V46C472 20.5949 451.405 0 426 0Z"
          fill="#2B2D2E"
        />
        <defs>
          <filter
            id="filter0_b_201_571"
            x="14.6"
            y="10.6"
            width="124.8"
            height="124.8"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
        <div className="col-span-3 pl-2 space-y-[-6px] *:text-center *:font-bold *:text-[#FB4500] place-self-center row-span-4">
          <p className="text-lg">DEC</p>
          <p className="text-4xl">29</p>
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
              {fetchedEvent.platform?.split('_')[2]?.charAt(0).toUpperCase() +
                fetchedEvent.platform?.split('_')[2]?.slice(1).toLowerCase()}
            </span>
          </p>
        </div>
        <div className="row-span-3 text-left col-span-9 px-5 text-2xl font-bold leading-tight">
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
          className="col-span-12 row-span-6 bg-cover rounded-3xl"
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
