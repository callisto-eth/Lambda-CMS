import { subEventMetadata } from '@/types/subevent';
import { SheetContent } from '../ui/sheet';

import Map from '../Map';
import { MaterialSymbolsLightMap, PhLinkDuotone } from '../Icons';
import Link from 'next/link';
import { z } from 'zod';

export default function SubeventDetails({
  subEventResponse,
}: {
  subEventResponse: z.infer<typeof subEventMetadata>;
}) {
  return (
    <SheetContent className="overflow-y-scroll p-0 font-DM-Sans w-[calc(100vw-1rem)] border border-white border-opacity-10   m-2 h-[calc(100vh-1rem)] bg-black rounded-3xl text-white  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">
      <div className="border-b border-white w-full py-6 border-opacity-10"></div>
      <div className="p-5 flex flex-col items-center space-y-4">
        <div
          className="w-[300px] h-[300px] rounded-3xl bg-cover"
          style={{
            backgroundImage: `url(https://api.lambda.events/storage/v1/object/public/event_assets/7e8eb3c0-df80-4350-abeb-c6044fda323f/banner.png)`,
          }}
        ></div>
        <p className="text-4xl font-semibold w-full text-left text-ellipsis">
          {subEventResponse.topic}
        </p>
        <div className="w-full space-y-6">
          <div className="flex items-center ml-1 mb-2 flex-grow">
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
                    ? `${new Date(subEventResponse.start_time as string)
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
                  new Date(subEventResponse.end_time as string).toDateString()
                    ? `${new Date(subEventResponse.start_time as string)
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
                      {subEventResponse.metadata['raw']['display_name']
                        .split(' ')
                        .slice(-1)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className="font-semibold text-[#97a5a6] text-lg">About</p>
            <hr className="mb-2 border-white border-opacity-10" />
            <p>{subEventResponse.description}</p>
          </div>
          {subEventResponse.platform === 'OFFLINE' && (
            <div className="w-full">
              <p className="font-semibold text-[#97a5a6] text-lg">Location</p>
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
