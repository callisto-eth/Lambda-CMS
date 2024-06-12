import {
  MajesticonsStatusOnline,
  MaterialSymbolsCurrencyRupee,
  MaterialSymbolsInfo,
  MaterialSymbolsLightMap,
  PhLinkDuotone,
  PhUsersFourDuotone,
} from '../Icons';
import JoinSubEventButton from './JoinSubEventButton';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { AnimatedTooltip } from '../ui/animated-tooltip';
import Link from 'next/link';

import { z } from 'zod';
import { subEventMetadata } from '@/types/subevent';
import Map from '../Map';

export default function SubeventCard({
  subEventResponse,
}: {
  subEventResponse: z.infer<typeof subEventMetadata>;
}) {
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
    <div className="grid grid-cols-16 *:font-DM-Sans">
      <div className="w-[1px] bg-[#fb4500] h-full col-span-1">
        <div className="w-[15px] h-[15px] bg-[#fb4500] rounded-full ml-[-7.5px]"></div>
      </div>
      <div className="col-span-15 lg:col-span-10 space-y-5 mt-[-8px] pb-8">
        <p className="text-xl font-semibold text-[#fb4500]">
          {subEventResponse.start_time
            ?.split('T')[0]
            .split('-')
            .reverse()
            .join('/')}
        </p>
        <div className="p-5 bg-[#2b2d2e] rounded-2xl">
          <p className="text-lg font-medium text-[#c0c0c1]">
            {new Date(subEventResponse.start_time as string)
              .toString()
              .split(' ')[4]
              .split(':')
              .slice(0, 2)
              .join(':')}{' '}
            -{' '}
            {new Date(subEventResponse.end_time as string)
              .toString()
              .split(' ')[4]
              .split(':')
              .slice(0, 2)
              .join(':')}
          </p>
          <p className="text-3xl font-semibold">{subEventResponse.topic}</p>
          <div className="mt-2 flex space-x-4 *:font-medium">
            <p className="flex items-center space-x-2">
              <MajesticonsStatusOnline />
              <span>
                {subEventResponse.platform.charAt(0) +
                  subEventResponse.platform.slice(1).toLowerCase()}
              </span>
            </p>
            <p className="flex items-center space-x-2">
              <PhUsersFourDuotone />
              <span>{subEventResponse.max_attendees}</span>
            </p>
            <p className="flex items-center space-x-2">
              <MaterialSymbolsCurrencyRupee />
              <span>
                {subEventResponse.entry_price !== 0
                  ? subEventResponse.entry_price
                  : 'Free'}
              </span>
            </p>
          </div>
          <div className="mt-4 flex space-x-3">
            <JoinSubEventButton subEventID={subEventResponse.id} />
            <Sheet>
              <SheetTrigger asChild>
                <Button className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors py-2 px-3 text-[#212325] rounded-full bg-white backdrop-blur-sm bg-opacity-70 border border-opacity-10 border-gray-100">
                  <MaterialSymbolsInfo className="text-2xl" />
                  <p className="px-1 text-base">Details</p>
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-scroll p-0 font-DM-Sans w-[calc(100vw-1rem)] border border-white border-opacity-10   m-2 h-[calc(100vh-1rem)] bg-black rounded-3xl text-white  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">
                <div className="border-b border-white w-full py-6 border-opacity-10"></div>
                <div className="p-5 flex flex-col items-center space-y-4">
                  <div
                    className="w-[300px] h-[300px] rounded-3xl bg-cover"
                    style={{
                      backgroundImage: `url(https://api.lambda.events/storage/v1/object/public/event_assets/7e8eb3c0-df80-4350-abeb-c6044fda323f/banner.png)`,
                    }}
                  ></div>
                  <p className="text-3xl font-semibold">
                    {subEventResponse.topic}
                  </p>
                  <div className="w-full space-y-6">
                    <div className="flex items-center ml-1 mb-2 flex-grow">
                      <AnimatedTooltip
                        items={people}
                        className="border border-white border-opacity-10 bg-[#2b2d2e]"
                      />
                      <p className="ml-6 text-[#aeaeaf]">+ 432 People</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-fit rounded-lg overflow-hidden border border-[#262729]">
                          <p className="bg-[#262729] text-[10px] text-center">
                            {new Date(subEventResponse.start_time as string)
                              .toString()
                              .split(' ')[1] !==
                            new Date(subEventResponse.end_time as string)
                              .toString()
                              .split(' ')[1]
                              ? `${new Date(
                                  subEventResponse.start_time as string,
                                )
                                  .toString()
                                  .split(' ')[1]
                                  .toUpperCase()} - ${new Date(
                                  subEventResponse.end_time as string,
                                )
                                  .toString()
                                  .split(' ')[1]
                                  .toUpperCase()}`
                              : new Date(subEventResponse.start_time as string)
                                  .toString()
                                  .split(' ')[1]
                                  .toUpperCase()}
                          </p>
                          <p className="px-2 font-semibold text-[#a4a5a6] py-1">
                            {new Date(
                              subEventResponse.start_time as string,
                            ).toDateString() !==
                            new Date(
                              subEventResponse.end_time as string,
                            ).toDateString()
                              ? `${new Date(
                                  subEventResponse.start_time as string,
                                )
                                  .toString()
                                  .split(' ')[2]
                                  .toUpperCase()} - ${new Date(
                                  subEventResponse.end_time as string,
                                )
                                  .toString()
                                  .split(' ')[2]
                                  .toUpperCase()}`
                              : new Date(subEventResponse.start_time as string)
                                  .toString()
                                  .split(' ')[2]
                                  .toUpperCase()}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-lg">
                            {`${monthParser(
                              new Date(subEventResponse.start_time as string)
                                .toString()
                                .split(' ')
                                .slice(0, 3)[0],
                            )}, ${monthParser(
                              new Date(subEventResponse.start_time as string)
                                .toString()
                                .split(' ')
                                .slice(1, 3)
                                .join(' '),
                            )}`}
                          </p>
                          <p className="text-sm">
                            {new Date(subEventResponse.start_time as string)
                              .toString()
                              .split(' ')[4]
                              .split(':')
                              .slice(0, 2)
                              .join(':')}{' '}
                            -{' '}
                            {monthParser(
                              new Date(subEventResponse.end_time as string)
                                .toString()
                                .split(' ')
                                .slice(1, 3)
                                .join(' '),
                            )}
                            ,{' '}
                            {new Date(subEventResponse.end_time as string)
                              .toString()
                              .split(' ')[4]
                              .split(':')
                              .slice(0, 2)
                              .join(':')}
                          </p>
                        </div>
                      </div>
                      <div className="h-full">
                        {subEventResponse.platform === 'ONLINE' ? (
                          <p className="flex items-center space-x-2 h-full">
                            <span className="flex items-center justify-center h-full border border-white p-3 border-opacity-10 rounded-xl">
                              <PhLinkDuotone className="text-2xl" />
                            </span>
                            <Link href={subEventResponse.metadata['link']}>
                              {subEventResponse.metadata['link']}
                            </Link>
                          </p>
                        ) : (
                          <div className="flex items-center space-x-2 h-full text-base">
                            <Link
                              href={`https://maps.google.com/?q=${subEventResponse.metadata.y},${subEventResponse.metadata.x}`}
                              className="hover:bg-[#262729] transition-colors flex items-center justify-center h-full border border-white p-3 border-opacity-10 rounded-xl"
                            >
                              <MaterialSymbolsLightMap className="text-2xl" />
                            </Link>

                            <p className="flex flex-col">
                              <span className="font-semibold">
                                {subEventResponse.metadata['raw']['name']}
                              </span>
                              <span className="text-sm">
                                {subEventResponse.metadata['raw'][
                                  'display_name'
                                ]
                                  .split(' ')
                                  .slice(-1)}
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-[#97a5a6] text-lg">
                        About
                      </p>
                      <hr className="mb-2 border-white border-opacity-10" />
                      <p>{subEventResponse.description}</p>
                    </div>
                    {subEventResponse.platform === 'OFFLINE' && (
                      <div className="w-full">
                        <p className="font-semibold text-[#97a5a6] text-lg">
                          Location
                        </p>
                        <hr className="mb-2 border-white border-opacity-10" />
                        <p className="font-medium text-lg">
                          {subEventResponse.metadata['raw']['name']}
                        </p>
                        <p className="font-extralight">
                          {subEventResponse.metadata['raw']['display_name']}
                        </p>
                        <Map
                          xVal={subEventResponse.metadata.x}
                          yVal={subEventResponse.metadata.y}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}

function monthParser(monthString: string) {
  switch (monthString) {
    case 'Fri':
      return 'Friday';
    case 'Sat':
      return 'Saturday';
    case 'Sun':
      return 'Sunday';
    case 'Mon':
      return 'Monday';
    case 'Tue':
      return 'Tuesday';
    case 'Wed':
      return 'Wednesday';
    case 'Thu':
      return 'Thursday';
    default:
      return monthString;
  }
}
